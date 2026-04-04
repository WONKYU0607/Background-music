const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';

async function getWikipediaData(artistName) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artistName)}`);
    const d = await res.json();
    return {
      image: d?.thumbnail?.source || d?.originalimage?.source || null,
      extract: d?.extract || null,
    };
  } catch { return { image: null, extract: null }; }
}

async function getLastFmTopTracks(artistName) {
  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_KEY}&format=json&limit=5`);
    const d = await res.json();
    const tracks = d?.toptracks?.track || [];
    return tracks.map(t => ({
      title: t.name,
      youtube_query: `${artistName} ${t.name} official`,
      youtube_music_query: `${artistName} ${t.name}`,
    }));
  } catch { return []; }
}

async function generateWithGroq(artistName, wikiText, langLabel) {
  const hasWiki = wikiText && wikiText.length > 50;

  const systemPrompt = `You are a music journalist writing short, punchy content for a mobile app lockscreen.
Output valid JSON only. Write ALL text exclusively in ${langLabel}. Never mix languages or writing systems. Zero tolerance.`;

  const userPrompt = `Write about the artist "${artistName}" in ${langLabel}.

DEBUT field (1-2 sentences):
- Exactly when they debuted (year, month if known)
- One surprising or little-known fact about how they got started

BIO field (3-4 sentences - make readers go "wow I didn't know that!"):
Pick the most shocking facts from these categories:
- Death/health crisis: exact cause, age, conspiracy theories if any
- Song origin story: what real event, trauma, or social issue inspired a famous song
- Shocking rivalry or public feud with another artist (names, details)
- Record broken or major award snubbed (specifics)
- Behind-the-scenes drama most fans don't know

Be SPECIFIC. Use real names, real years, real events. No vague statements like "broke many records".
Example of BAD bio: "They broke many records and had controversies."
Example of GOOD bio: "In 1994, Kurt Cobain was found dead at 27 in his Seattle home — the official cause was suicide, but fans and his mother still believe it was murder. Nirvana's 'Smells Like Teen Spirit' was actually written as a joke mocking the band's own mainstream success."

${hasWiki ? `Wikipedia reference:\n${wikiText.slice(0, 1200)}` : `Write from your own knowledge about ${artistName}.`}

Return ONLY this JSON:
{"debut":"...","bio":"..."}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 600,
      temperature: 0.6,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '{}';
  const clean = raw.replace(/```json|```/g, '').trim();
  try { return JSON.parse(clean); }
  catch { return { debut: '', bio: '' }; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { artistName, language } = req.body;
  if (!artistName) return res.status(400).json({ error: 'artistName required' });

  const langMap = { en: 'English', ko: '한국어', ja: '日本語', zh: '中文', es: 'Español', fr: 'Français' };
  const langLabel = langMap[language] || 'English';

  try {
    const [wikiData, songs] = await Promise.all([
      getWikipediaData(artistName),
      getLastFmTopTracks(artistName),
    ]);

    const info = await generateWithGroq(artistName, wikiData.extract, langLabel);

    res.status(200).json({
      artistName,
      debut: info.debut || '',
      bio: info.bio || '',
      songs,
      imageUrl: wikiData.image || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
