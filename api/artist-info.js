const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';
const SPOTIFY_CLIENT_ID = 'a59a086013264e74bf476425dfa3579c';
const SPOTIFY_CLIENT_SECRET = '1512309451e04aa09707a3de58de79f2';

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
  if (!d.access_token) throw new Error('Spotify token failed: ' + JSON.stringify(d));
  return d.access_token;
}

async function getSpotifyArtistData(name, token) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const d = await r.json();
  const artist = d?.artists?.items?.[0];
  if (!artist) return null;
  return {
    image: artist.images?.[0]?.url || null,
    followers: artist.followers?.total || 0,
    spotifyId: artist.id,
  };
}

async function getSpotifyTopTracks(spotifyId, artistName, token) {
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

async function getArtistFromLastFm(genre) {
  const tagMap = {
    'pop': 'pop', 'k-pop': 'k-pop', 'hip-hop': 'hip-hop',
    'r-b': 'r&b', 'band': 'rock', 'jazz': 'jazz', 'reggae': 'reggae',
  };
  const tag = tagMap[genre] || 'pop';
  // 상위 10페이지(500명) 안에서만 뽑아서 어느 정도 유명한 가수 보장
  const page = Math.floor(Math.random() * 10) + 1;
  const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=50&page=${page}`;
  const r = await fetch(url);
  const d = await r.json();
  const artists = d?.topartists?.artist || [];
  if (!artists.length) throw new Error('No artists from LastFM');
  return artists[Math.floor(Math.random() * artists.length)].name;
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
    // 1. LastFM에서 아티스트 이름
    const artistName = await getArtistFromLastFm(genre || 'pop');

    // 2. Spotify 토큰 + 아티스트 데이터 + top tracks 한번에
    const token = await getSpotifyToken();
    const spotifyData = await getSpotifyArtistData(artistName, token);
    const songs = spotifyData?.spotifyId
      ? await getSpotifyTopTracks(spotifyData.spotifyId, artistName, token)
      : [];

    // 3. Groq으로 흥미로운 정보 생성
    const prompt = `Music journalist task: Write about "${artistName}" in ${langLabel} ONLY.

LANGUAGE RULE: Every single word must be in ${langLabel}. No exceptions. No mixing.
- Korean requested → pure Hangul only
- English requested → pure English only
- Never use Chinese characters, Arabic, or any other script

Content focus: Make it surprising and engaging:
- Scandals, controversies, or unexpected life events  
- Record-breaking achievements, rivalries, or feuds
- Shocking behind-the-scenes facts
- Comeback stories or career-defining moments

Return ONLY this JSON, nothing else:
{
  "debut": "1-2 sentences in ${langLabel}: debut year + one surprising early career fact",
  "bio": "2-3 sentences in ${langLabel}: focus on the most shocking or impressive facts about this artist"
}`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 400,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are a music journalist. Output valid JSON only. Write ALL text in ${langLabel} exclusively. Zero tolerance for language mixing.`,
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const groqData = await groqRes.json();
    const raw = groqData.choices?.[0]?.message?.content || '{}';
    const clean = raw.replace(/```json|```/g, '').trim();
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
