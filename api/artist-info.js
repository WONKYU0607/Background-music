const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';

async function getArtistImage(artistName) {
  // 1. Wikipedia 시도
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artistName)}`);
    const d = await res.json();
    const img = d?.originalimage?.source || d?.thumbnail?.source || null;
    if (img) return img;
  } catch {}

  // 2. MusicBrainz에서 아티스트 ID 찾고 Cover Art로 이미지 가져오기
  try {
    const mbRes = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&limit=1&fmt=json`, {
      headers: { 'User-Agent': 'MusicCard/1.0 (musiccard@vercel.app)' }
    });
    const mbData = await mbRes.json();
    const mbId = mbData?.artists?.[0]?.id;
    if (mbId) {
      // Fanart.tv 대신 Wikipedia에서 MusicBrainz ID로 재검색
      const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(artistName)}&prop=pageimages&format=json&pithumbsize=500&origin=*`);
      const wikiData = await wikiRes.json();
      const pages = wikiData?.query?.pages;
      if (pages) {
        const page = Object.values(pages)[0];
        if (page?.thumbnail?.source) return page.thumbnail.source;
      }
    }
  } catch {}

  return null;
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

async function generateWithGroq(artistName, langLabel) {
  const systemPrompt = `You are a music journalist. Output valid JSON only. Write ALL text exclusively in ${langLabel}. Absolutely no mixing of any other language, script, or writing system. Every single character must be in ${langLabel}.`;

  const userPrompt = `Write about the music artist "${artistName}" entirely in ${langLabel}.

Do NOT translate or reference any English text. Write everything from your own knowledge in pure ${langLabel}.

DEBUT field (1-2 sentences in ${langLabel}):
- When they debuted (year, how they started)
- One surprising fact about their early career

BIO field (3-4 sentences in ${langLabel}):
Write the most shocking, fascinating facts. Be SPECIFIC with real names, years, events:
- If they died: exact cause, age, location, any controversies or conspiracy theories
- Famous song origin: what real trauma or event inspired it
- Famous rivalry or public scandal with specific details
- A record broken or award snubbed with specifics
- Behind-the-scenes drama most fans don't know

BAD example (too vague): "They broke many records and had controversies."
GOOD example (specific): "1994년 시애틀 자택에서 27세의 나이로 발견된 커트 코베인의 사망은 공식적으로 자살로 처리됐지만, 그의 어머니와 수많은 팬들은 여전히 타살 의혹을 제기하고 있다."

Return ONLY this JSON, no other text:
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
      temperature: 0.5,
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
    const [imageUrl, songs, info] = await Promise.all([
      getArtistImage(artistName),
      getLastFmTopTracks(artistName),
      generateWithGroq(artistName, langLabel),
    ]);

    res.status(200).json({
      artistName,
      debut: info.debut || '',
      bio: info.bio || '',
      songs,
      imageUrl,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
