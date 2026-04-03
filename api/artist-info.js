const GENRE_MAP = {
  'pop':     ['Taylor Swift','Ed Sheeran','Adele','Bruno Mars','Ariana Grande','Justin Bieber','Billie Eilish','Harry Styles','Dua Lipa','The Weeknd','Katy Perry','Lady Gaga','Rihanna','Beyoncé','Sam Smith','Olivia Rodrigo','Shawn Mendes','Charlie Puth','Sia','Maroon 5'],
  'k-pop':   ['BTS','BLACKPINK','EXO','TWICE','Stray Kids','aespa','NewJeans','IVE','NCT 127','GOT7','BIGBANG','2NE1','SHINee','Red Velvet','ITZY','Monsta X','SEVENTEEN','TXT','IU','Psy'],
  'hip-hop': ['Drake','Kendrick Lamar','Eminem','Jay-Z','Kanye West','Cardi B','Nicki Minaj','Post Malone','Travis Scott','J. Cole','Lil Wayne','Snoop Dogg','50 Cent','Nas','A$AP Rocky','Megan Thee Stallion','Tyler the Creator','Future','Lil Uzi Vert','21 Savage'],
  'r-b':     ['Beyoncé','Rihanna','Frank Ocean','The Weeknd','SZA','H.E.R.','Usher','Alicia Keys','John Legend','Mary J. Blige','Ne-Yo','Chris Brown','Miguel','Jhené Aiko','Khalid','Daniel Caesar','Summer Walker','Bryson Tiller','Normani','Lucky Daye'],
  'band':    ['Coldplay','Imagine Dragons','Linkin Park','Green Day','Foo Fighters','Red Hot Chili Peppers','Arctic Monkeys','The 1975','Radiohead','Nirvana','Metallica','AC/DC','Queen','The Beatles','U2','Oasis','Muse','Twenty One Pilots','Fall Out Boy','Panic! at the Disco'],
  'jazz':    ['Miles Davis','John Coltrane','Louis Armstrong','Ella Fitzgerald','Frank Sinatra','Billie Holiday','Duke Ellington','Charlie Parker','Herbie Hancock','Thelonious Monk','Chet Baker','Dave Brubeck','Nina Simone','Norah Jones','Diana Krall','John Scofield','Pat Metheny','Wynton Marsalis','Kamasi Washington','Gregory Porter'],
  'reggae':  ['Bob Marley','Damian Marley','Shaggy','Sean Paul','Shabba Ranks','Buju Banton','Burning Spear','Toots and the Maytals','Jimmy Cliff','Steel Pulse','Ziggy Marley','Sizzla','Capleton','Beenie Man','Morgan Heritage','Lucky Dube','Peter Tosh','Bunny Wailer','Chronixx','Protoje'],
};

async function getDeezerArtist(artistName) {
  try {
    const r = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`);
    const d = await r.json();
    const artist = d?.data?.[0];
    if (!artist) return null;
    return {
      image: artist.picture_xl || artist.picture_big || artist.picture || null,
      deezerId: artist.id,
    };
  } catch { return null; }
}

async function getDeezerTopTracks(deezerId, artistName) {
  try {
    const r = await fetch(`https://api.deezer.com/artist/${deezerId}/top?limit=5`);
    const d = await r.json();
    return (d?.data || []).slice(0, 5).map(t => ({
      title: t.title,
      youtube_query: `${artistName} ${t.title} official`,
      youtube_music_query: `${artistName} ${t.title}`,
    }));
  } catch { return []; }
}

async function getWikipediaSummary(artistName) {
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artistName)}`);
    const d = await r.json();
    return d?.extract || null;
  } catch { return null; }
}

async function translateWithGroq(text, artistName, langLabel) {
  if (!text) return { debut: `${artistName} is a renowned artist.`, bio: `${artistName} has made significant contributions to music.` };
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
          content: `You are a translator. Output valid JSON only. Write ALL text exclusively in ${langLabel}. Never mix languages.`,
        },
        {
          role: 'user',
          content: `Summarize this Wikipedia text about "${artistName}" in ${langLabel}.
Focus on: debut year, controversies, record-breaking facts, surprising career events.
Return ONLY this JSON (no other text):
{"debut":"1-2 sentences in ${langLabel} about debut and early career","bio":"2-3 sentences in ${langLabel} about most interesting/surprising facts"}

Wikipedia: ${text.slice(0, 800)}`,
        },
      ],
    }),
  });
  const d = await r.json();
  const raw = d.choices?.[0]?.message?.content || '{}';
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

  const { genre, language, artistName: reqArtistName } = req.body;
  const langMap = { en: 'English', ko: '한국어', ja: '日本語', zh: '中文', es: 'Español', fr: 'Français' };
  const langLabel = langMap[language] || 'English';

  try {
    // 1. 프론트에서 선택한 아티스트 사용 (로테이션 관리는 프론트에서)
    const artistName = reqArtistName || (() => {
      const list = GENRE_MAP[genre] || GENRE_MAP['pop'];
      return list[Math.floor(Math.random() * list.length)];
    })();

    // 2. Deezer(무인증) + Wikipedia 병렬 호출
    const [deezerData, wikiText] = await Promise.all([
      getDeezerArtist(artistName),
      getWikipediaSummary(artistName),
    ]);

    // 3. Deezer top tracks
    const songs = deezerData?.deezerId
      ? await getDeezerTopTracks(deezerData.deezerId, artistName)
      : [];

    // 4. Groq 번역
    const info = await translateWithGroq(wikiText, artistName, langLabel);

    res.status(200).json({
      artistName,
      debut: info.debut || '',
      bio: info.bio || '',
      songs,
      imageUrl: deezerData?.image || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message, detail: e.stack });
  }
}
