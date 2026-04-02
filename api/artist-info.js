const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';
const SPOTIFY_CLIENT_ID = 'a59a086013264e74bf476425dfa3579c';
const SPOTIFY_CLIENT_SECRET = '1512309451e04aa09707a3de58de79f2';

async function getSpotifyToken() {
  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  const d = await r.json();
  return d.access_token;
}

async function getSpotifyArtist(name, token) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const d = await r.json();
  const artist = d?.artists?.items?.[0];
  if (!artist) return null;
  const image = artist.images?.[0]?.url || null;
  const popularity = artist.popularity || 0;
  const followers = artist.followers?.total || 0;
  return { image, popularity, followers, spotifyId: artist.id };
}

async function getSpotifyTopTracks(spotifyId, token) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${spotifyId}/top-tracks?market=US`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const d = await r.json();
  return (d?.tracks || []).slice(0, 5).map(t => ({
    title: t.name,
    youtube_query: `${t.artists[0].name} ${t.name} official MV`,
    youtube_music_query: `${t.artists[0].name} ${t.name}`,
  }));
}

async function getTopArtistByGenre(genre, token) {
  const tagMap = {
    'pop': 'pop',
    'k-pop': 'k-pop',
    'hip-hop': 'hip-hop',
    'r-b': 'r&b',
    'band': 'rock',
    'jazz': 'jazz',
    'reggae': 'reggae',
  };
  const tag = tagMap[genre] || 'pop';

  // 최대 5번 시도 - 팔로워 100만 이상인 유명 가수만
  for (let attempt = 0; attempt < 5; attempt++) {
    const page = Math.floor(Math.random() * 60) + 1;
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=50&page=${page}`;
    const r = await fetch(url);
    const d = await r.json();
    const artists = d?.topartists?.artist || [];
    if (!artists.length) continue;

    // 랜덤으로 5명 뽑아서 그 중 팔로워 100만 이상인 첫 번째 사용
    const shuffled = artists.sort(() => Math.random() - 0.5).slice(0, 5);
    for (const artist of shuffled) {
      const spotifyCheck = await getSpotifyArtist(artist.name, token);
      if (spotifyCheck && spotifyCheck.followers >= 1000000) {
        return artist.name;
      }
    }
  }
  // 5번 다 실패하면 그냥 page 1 top 50 중 랜덤
  const fallbackUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=50&page=1`;
  const fr = await fetch(fallbackUrl);
  const fd = await fr.json();
  const fallback = fd?.topartists?.artist || [];
  return fallback[Math.floor(Math.random() * Math.min(fallback.length, 50))].name;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { genre, language } = req.body;

  const langMap = {
    en: 'English', ko: '한국어', ja: '日本語', zh: '中文', es: 'Español', fr: 'Français',
  };
  const langLabel = langMap[language] || 'English';

  try {
    // 1. 장르에서 아티스트 이름 가져오기
    const artistName = await getTopArtistByGenre(genre);

    // 2. Spotify에서 이미지 + top tracks
    const token = await getSpotifyToken();
    const spotifyData = await getSpotifyArtist(artistName, token);
    let songs = [];
    if (spotifyData?.spotifyId) {
      songs = await getSpotifyTopTracks(spotifyData.spotifyId, token);
    }

    // 3. Groq에서 아티스트 정보 (흥미로운 내용 위주)
    const prompt = `You are a music journalist writing for a global audience. Write about the artist "${artistName}".

STRICT LANGUAGE RULE: Write EVERYTHING in ${langLabel} ONLY.
- Zero tolerance for mixing languages
- No Chinese characters, no Arabic script, no romanization mixed with ${langLabel}
- If ${langLabel} is Korean (한국어), write purely in Korean Hangul
- If ${langLabel} is English, write purely in English

Write content that makes readers genuinely curious - include:
- Controversies, scandals, or surprising life events
- Record-breaking achievements or interesting rivalries
- Behind-the-scenes facts most people don't know
- How they rose to fame or overcame hardship

Respond ONLY with this exact JSON, no other text:
{
  "debut": "1-2 sentences in ${langLabel}: when they debuted + one surprising fact about their early career",
  "bio": "2-3 sentences in ${langLabel}: focus on controversies, rivalries, record-breaking moments, or shocking facts that make readers want to know more"
}`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are a music journalist. Respond with valid JSON only. Write ALL text exclusively in ${langLabel}. Never mix languages. Focus on surprising, controversial, or record-breaking facts.`,
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const groqData = await groqRes.json();
    const text = groqData.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.status(200).json({
      artistName,
      debut: parsed.debut || '',
      bio: parsed.bio || '',
      songs,
      imageUrl: spotifyData?.image || null,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed', detail: e.message });
  }
}
