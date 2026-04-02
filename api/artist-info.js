const SPOTIFY_CLIENT_ID = 'a59a086013264e74bf476425dfa3579c';
const SPOTIFY_CLIENT_SECRET = '1512309451e04aa09707a3de58de79f2';

const GENRE_SEEDS = {
  'pop':     'pop',
  'k-pop':   'k-pop',
  'hip-hop': 'hip-hop',
  'r-b':     'r%26b',
  'band':    'rock',
  'jazz':    'jazz',
  'reggae':  'reggae',
};

async function getSpotifyToken() {
  const creds = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const d = await r.json();
  if (!d.access_token) throw new Error('Spotify auth failed');
  return d.access_token;
}

async function getRandomFamousArtist(genre, token) {
  const genreTag = GENRE_SEEDS[genre] || 'pop';
  // offset 랜덤으로 다양한 아티스트 뽑기 (popularity 60 이상만)
  const offset = Math.floor(Math.random() * 500);
  const url = `https://api.spotify.com/v1/search?q=genre:${genreTag}&type=artist&limit=50&offset=${offset}`;
  const r = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
  const d = await r.json();
  const artists = (d?.artists?.items || []).filter(a => a.popularity >= 60 && a.followers?.total >= 500000);
  if (!artists.length) {
    // fallback: offset 0, popularity 50 이상
    const r2 = await fetch(`https://api.spotify.com/v1/search?q=genre:${genreTag}&type=artist&limit=50&offset=0`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const d2 = await r2.json();
    const fallback = (d2?.artists?.items || []).filter(a => a.popularity >= 50);
    if (!fallback.length) throw new Error('No artists found');
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return artists[Math.floor(Math.random() * artists.length)];
}

async function getTopTracks(spotifyId, artistName, token) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${spotifyId}/top-tracks?market=US`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const d = await r.json();
  return (d?.tracks || []).slice(0, 5).map(t => ({
    title: t.name,
    youtube_query: `${artistName} ${t.name} official`,
    youtube_music_query: `${artistName} ${t.name}`,
  }));
}

async function getWikipediaSummary(artistName) {
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artistName)}`);
    const d = await r.json();
    return d?.extract || null;
  } catch { return null; }
}

async function translateWithGroq(text, artistName, langLabel) {
  if (!text) return { debut: '', bio: '' };
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 400,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `You are a translator. Translate and summarize the given text into ${langLabel} only. Output valid JSON only. Never mix languages.`,
        },
        {
          role: 'user',
          content: `Translate this Wikipedia text about "${artistName}" into ${langLabel}.
Extract the most interesting facts - focus on debut, career highlights, controversies, or record-breaking achievements.
Return ONLY this JSON:
{
  "debut": "1-2 sentences in ${langLabel}: when/how they debuted + one interesting early career fact",
  "bio": "2-3 sentences in ${langLabel}: most surprising or impressive facts about this artist"
}

Wikipedia text:
${text.slice(0, 1000)}`,
        },
      ],
    }),
  });
  const d = await r.json();
  const raw = d.choices?.[0]?.message?.content || '{}';
  const clean = raw.replace(/```json|```/g, '').trim();
  try {
    return JSON.parse(clean);
  } catch { return { debut: '', bio: '' }; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { genre, language } = req.body;
  const langMap = { en: 'English', ko: '한국어', ja: '日本語', zh: '中文', es: 'Español', fr: 'Français' };
  const langLabel = langMap[language] || 'English';

  try {
    // 1. Spotify 토큰
    const token = await getSpotifyToken();

    // 2. 유명 아티스트 선택 (Spotify popularity 기준)
    const artist = await getRandomFamousArtist(genre || 'pop', token);
    const artistName = artist.name;
    const imageUrl = artist.images?.[0]?.url || null;

    // 3. Top tracks + Wikipedia 병렬 호출
    const [songs, wikiText] = await Promise.all([
      getTopTracks(artist.id, artistName, token),
      getWikipediaSummary(artistName),
    ]);

    // 4. Groq으로 번역/요약만
    const info = await translateWithGroq(wikiText, artistName, langLabel);

    res.status(200).json({
      artistName,
      debut: info.debut || '',
      bio: info.bio || '',
      songs,
      imageUrl,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed', detail: e.message });
  }
}
