const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';

async function getWikipediaImage(name) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
    const r = await fetch(url);
    const d = await r.json();
    return d?.thumbnail?.source || d?.originalimage?.source || null;
  } catch (e) {
    return null;
  }
}

async function getTopTracks(artistName) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_KEY}&format=json&limit=5`;
    const r = await fetch(url);
    const d = await r.json();
    const tracks = d?.toptracks?.track;
    if (!tracks || !tracks.length) return null;
    return tracks.map(t => ({
      title: t.name,
      youtube_query: `${artistName} ${t.name} official`,
      youtube_music_query: `${artistName} ${t.name}`,
    }));
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { artistName, language } = req.body;

  const langMap = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文',
    es: 'Español',
    fr: 'Français',
  };
  const langLabel = langMap[language] || 'English';

  const [imageUrl, topTracks] = await Promise.all([
    getWikipediaImage(artistName),
    getTopTracks(artistName),
  ]);

  const prompt = `You are a music expert. Write information about the artist "${artistName}".

CRITICAL LANGUAGE RULE: You MUST write the "debut" and "bio" fields EXCLUSIVELY in ${langLabel}.
- Do NOT use any Chinese characters (漢字/한자)
- Do NOT use any Arabic script
- Do NOT use any Japanese characters unless the language is Japanese
- Do NOT mix languages
- Write naturally as a native ${langLabel} speaker would

Respond ONLY with this exact JSON structure, nothing else:
{
  "debut": "2-3 sentences in ${langLabel} only about when they debuted and their career milestones",
  "bio": "2-3 sentences in ${langLabel} only about their music style, characteristics, and achievements"
}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 600,
        messages: [
          {
            role: 'system',
            content: `You are a music expert. Respond with valid JSON only. The "debut" and "bio" fields must be written exclusively in ${langLabel}. Never mix languages or use characters from other writing systems.`,
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.status(200).json({
      debut: parsed.debut || '',
      bio: parsed.bio || '',
      songs: topTracks || [],
      imageUrl,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch artist info', detail: e.message });
  }
}
