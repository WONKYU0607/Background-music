const GENRES = [
  { id: 'pop',     label: { en: 'Pop',     ko: '팝',    ja: 'ポップ',       zh: '流行',  es: 'Pop',      fr: 'Pop'      } },
  { id: 'k-pop',   label: { en: 'K-Pop',   ko: 'K-POP', ja: 'K-POP',       zh: 'K-POP', es: 'K-Pop',    fr: 'K-Pop'    } },
  { id: 'hip-hop', label: { en: 'Hip-Hop', ko: '힙합',  ja: 'ヒップホップ', zh: '嘻哈',  es: 'Hip-Hop',  fr: 'Hip-Hop'  } },
  { id: 'r-b',     label: { en: 'R&B',     ko: 'R&B',   ja: 'R&B',         zh: 'R&B',   es: 'R&B',      fr: 'R&B'      } },
  { id: 'band',    label: { en: 'Band',    ko: '밴드',  ja: 'バンド',       zh: '乐队',  es: 'Banda',    fr: 'Groupe'   } },
  { id: 'jazz',    label: { en: 'Jazz',    ko: '재즈',  ja: 'ジャズ',       zh: '爵士',  es: 'Jazz',     fr: 'Jazz'     } },
  { id: 'reggae',  label: { en: 'Reggae',  ko: '레게',  ja: 'レゲエ',       zh: '雷鬼',  es: 'Reggae',   fr: 'Reggae'   } },
];

const UI_TEXT = {
  en: { loadBtn: 'New Artist',     slide: 'Slide to unlock', debut: 'Career',        bio: 'Did You Know?', songs: 'Top Songs',      listen: 'YT',  loading: 'Loading artist...', error: 'Error. Please try again.', genre: 'Genre', lang: 'Lang' },
  ko: { loadBtn: '새 아티스트',    slide: '밀어서 잠금해제', debut: '데뷔 & 이력',   bio: '알고 계셨나요?', songs: '대표곡',          listen: 'YT',  loading: '불러오는 중...',     error: '오류가 발생했어요.',        genre: '장르',  lang: '언어' },
  ja: { loadBtn: '新アーティスト', slide: 'スライドで解除',  debut: 'デビュー',      bio: '豆知識',        songs: '代表曲',          listen: 'YT',  loading: '読み込み中...',      error: 'エラーが発生しました。',    genre: 'ジャンル', lang: '言語' },
  zh: { loadBtn: '新艺术家',       slide: '滑动解锁',       debut: '出道经历',      bio: '你知道吗？',    songs: '热门歌曲',        listen: 'YT',  loading: '加载中...',          error: '发生错误，请重试。',        genre: '流派',  lang: '语言' },
  es: { loadBtn: 'Nuevo artista',  slide: 'Desliza',        debut: 'Carrera',       bio: '¿Sabías que?',  songs: 'Canciones',       listen: 'YT',  loading: 'Cargando...',        error: 'Error. Inténtalo.',         genre: 'Género', lang: 'Idioma' },
  fr: { loadBtn: 'Nouvel artiste', slide: 'Glisser',        debut: 'Carrière',      bio: 'Le saviez-vous ?', songs: 'Chansons',     listen: 'YT',  loading: 'Chargement...',      error: 'Erreur. Réessayez.',        genre: 'Genre', lang: 'Langue' },
};

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'ko', label: '한국어' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
];

// 설정 저장/불러오기
const ARTIST_LISTS = {
  'pop':     ['Taylor Swift','Ed Sheeran','Adele','Bruno Mars','Ariana Grande','Justin Bieber','Billie Eilish','Harry Styles','Dua Lipa','The Weeknd','Katy Perry','Lady Gaga','Rihanna','Beyoncé','Sam Smith','Olivia Rodrigo','Shawn Mendes','Charlie Puth','Sia','Maroon 5','Post Malone','Selena Gomez','Justin Timberlake','Miley Cyrus','Camila Cabello','Lizzo','Halsey','Demi Lovato','Nick Jonas','Meghan Trainor','Ava Max','Carly Rae Jepsen','Jason Derulo','Bebe Rexha','Zara Larsson','Anne-Marie','James Arthur','Lewis Capaldi','Tom Grennan','JP Saxe','Conan Gray'],
  'k-pop':   ['BTS','BLACKPINK','EXO','TWICE','Stray Kids','aespa','NewJeans','IVE','NCT 127','GOT7','BIGBANG','2NE1','SHINee','Red Velvet','ITZY','Monsta X','SEVENTEEN','TXT','IU','Psy','Super Junior','Girls Generation','f(x)','Apink','MAMAMOO','ASTRO','ATEEZ','ENHYPEN','Wanna One','IOI','KARD','CL','Taeyang','G-Dragon','Zico','Dean','pH-1','Crush','Dynamic Duo','Epik High'],
  'hip-hop': ['Drake','Kendrick Lamar','Eminem','Jay-Z','Kanye West','Cardi B','Nicki Minaj','Post Malone','Travis Scott','J. Cole','Lil Wayne','Snoop Dogg','50 Cent','Nas','A$AP Rocky','Megan Thee Stallion','Tyler the Creator','Future','Lil Uzi Vert','21 Savage','DaBaby','Roddy Ricch','Juice WRLD','XXXTentacion','Logic','Big Sean','Wiz Khalifa','Mac Miller','Kid Cudi','Chance the Rapper','Childish Gambino','2 Chainz','Meek Mill','Rick Ross','Gucci Mane','Young Thug','Lil Baby','Gunna','Jack Harlow','Polo G'],
  'r-b':     ['Beyoncé','Rihanna','Frank Ocean','The Weeknd','SZA','H.E.R.','Usher','Alicia Keys','John Legend','Mary J. Blige','Ne-Yo','Chris Brown','Miguel','Jhené Aiko','Khalid','Daniel Caesar','Summer Walker','Bryson Tiller','Normani','Lucky Daye','Jazmine Sullivan','Giveon','Brent Faiyaz','6LACK','Kehlani','Victoria Monét','Ella Mai','PJ Morton','Eric Bellinger','Tank','Teyana Taylor','Jeremih','Jacquees','Trey Songz','Lloyd','Omarion','Pleasure P','Mario','Ginuwine','R. Kelly'],
  'band':    ['Coldplay','Imagine Dragons','Linkin Park','Green Day','Foo Fighters','Red Hot Chili Peppers','Arctic Monkeys','The 1975','Radiohead','Nirvana','Metallica','AC/DC','Queen','The Beatles','U2','Oasis','Muse','Twenty One Pilots','Fall Out Boy','Panic! at the Disco','My Chemical Romance','Paramore','Blink-182','Sum 41','Simple Plan','Good Charlotte','The Killers','Snow Patrol','Keane','Travis','Biffy Clyro','Placebo','The Script','Kodaline','Bastille','Alt-J','Vampire Weekend','Foster the People','Tame Impala','Glass Animals'],
  'jazz':    ['Miles Davis','John Coltrane','Louis Armstrong','Ella Fitzgerald','Frank Sinatra','Billie Holiday','Duke Ellington','Charlie Parker','Herbie Hancock','Thelonious Monk','Chet Baker','Dave Brubeck','Nina Simone','Norah Jones','Diana Krall','John Scofield','Pat Metheny','Wynton Marsalis','Kamasi Washington','Gregory Porter','Robert Glasper','Esperanza Spalding','Cecile McLorin Salvant','Christian Scott','Ambrose Akinmusire','Mary Halvorson','Brad Mehldau','Joshua Redman','Chris Potter','Kurt Rosenwinkel','Bill Evans','Wes Montgomery','John McLaughlin','Chick Corea','McCoy Tyner','Wayne Shorter','Sonny Rollins','Dizzy Gillespie','Art Blakey','Clifford Brown'],
  'reggae':  ['Bob Marley','Damian Marley','Shaggy','Sean Paul','Shabba Ranks','Buju Banton','Burning Spear','Toots and the Maytals','Jimmy Cliff','Steel Pulse','Ziggy Marley','Sizzla','Capleton','Beenie Man','Morgan Heritage','Lucky Dube','Peter Tosh','Bunny Wailer','Chronixx','Protoje','Koffee','Jesse Royal','Kabaka Pyramid','Jah Cure','Tarrus Riley','Etana','Romain Virgo','Busy Signal','Mavado','Alkaline','Vybz Kartel','Popcaan','Aidonia','Konshens','I-Octane','Demarco','Cecile','Ce'cile','Richie Spice','Fantan Mojah'],
};

function getNextArtist(genre) {
  const list = ARTIST_LISTS[genre] || ARTIST_LISTS['pop'];
  const key = `musiccard_seen_${genre}`;
  const key_order = `musiccard_order_${genre}`;

  let seen = JSON.parse(localStorage.getItem(key) || '[]');
  let order = JSON.parse(localStorage.getItem(key_order) || '[]');

  // 처음이거나 다 돌았으면 셔플해서 새 순서 만들기
  if (order.length === 0) {
    order = [...list].sort(() => Math.random() - 0.5);
    seen = [];
    localStorage.setItem(key_order, JSON.stringify(order));
    localStorage.setItem(key, JSON.stringify(seen));
  }

  // 아직 안 나온 것 중 첫 번째
  const next = order.find(a => !seen.includes(a));
  if (!next) {
    // 다 돌았으면 리셋
    order = [...list].sort(() => Math.random() - 0.5);
    seen = [];
    localStorage.setItem(key_order, JSON.stringify(order));
    localStorage.setItem(key, JSON.stringify(seen));
    return order[0];
  }

  seen.push(next);
  localStorage.setItem(key, JSON.stringify(seen));
  return next;
}

let currentLang = localStorage.getItem('musiccard_lang') || 'en';
let currentGenre = localStorage.getItem('musiccard_genre') || 'pop';
let isLoading = false;
let currentArtistName = null;
let currentImageUrl = null;

function t(key) {
  return UI_TEXT[currentLang]?.[key] || UI_TEXT['en'][key];
}

function renderGenreTabs() {
  const container = document.getElementById('genre-tabs');
  container.innerHTML = GENRES.map(g => `
    <button class="genre-tab ${g.id === currentGenre ? 'active' : ''}" onclick="setGenre('${g.id}')">
      ${g.label[currentLang] || g.label['en']}
    </button>
  `).join('');
}

function renderLangTabs() {
  const container = document.getElementById('lang-tabs');
  container.innerHTML = LANGUAGES.map(l => `
    <button class="lang-tab ${l.id === currentLang ? 'active' : ''}" onclick="setLang('${l.id}')">
      ${l.label}
    </button>
  `).join('');
}

function setGenre(id) {
  currentGenre = id;
  localStorage.setItem('musiccard_genre', id);
  renderGenreTabs();
}

async function setLang(id) {
  currentLang = id;
  localStorage.setItem('musiccard_lang', id);
  renderLangTabs();
  renderGenreTabs();
  updateUIText();
  if (currentArtistName) {
    await reloadArtistInfo(currentArtistName);
  }
}

function updateUIText() {
  document.getElementById('load-btn').textContent = t('loadBtn');
  document.getElementById('slide-hint-text').textContent = t('slide');
  document.getElementById('label-debut').textContent = t('debut');
  document.getElementById('label-bio').textContent = t('bio');
  document.getElementById('label-songs').textContent = t('songs');
  document.getElementById('genre-label').textContent = t('genre');
  document.getElementById('lang-label').textContent = t('lang');
  const listenBtns = document.querySelectorAll('.yt-btn-label');
  listenBtns.forEach(b => b.textContent = t('listen'));
}

async function fetchArtistInfo(artistName, genre) {
  const res = await fetch('/api/artist-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre: genre || currentGenre, language: currentLang, artistName }),
  });
  if (!res.ok) throw new Error('API error');
  return await res.json();
}

function renderArtistInfo(info) {
  const artistName = info.artistName || currentArtistName;
  const imageUrl = info.imageUrl || null;
  currentArtistName = artistName;
  currentImageUrl = imageUrl;

  const heroEl = document.getElementById('artist-hero-inner');
  if (imageUrl) {
    heroEl.innerHTML = `<img src="${imageUrl}" alt="${artistName}" style="width:100%;height:100%;object-fit:cover;object-position:center top;opacity:0.95;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:linear-gradient(135deg,#2d2d5e,#4a2d6e)\\'>🎤</div>'">`;
  } else {
    heroEl.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:linear-gradient(135deg,#2d2d5e,#4a2d6e);">🎤</div>`;
  }

  document.getElementById('artist-name').textContent = artistName;
  document.getElementById('artist-genre').textContent = GENRES.find(g => g.id === currentGenre)?.label[currentLang] || currentGenre;
  document.getElementById('info-debut').textContent = info.debut || '';
  document.getElementById('info-bio').textContent = info.bio || '';

  const songsList = document.getElementById('songs-list');
  songsList.innerHTML = '';
  (info.songs || []).forEach(song => {
    const ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(song.youtube_query);
    const ytmUrl = 'https://music.youtube.com/search?q=' + encodeURIComponent(song.youtube_music_query || song.title);
    const item = document.createElement('div');
    item.className = 'song-item';
    item.innerHTML = `
      <span class="song-title">${song.title}</span>
      <div style="display:flex;gap:6px;flex-shrink:0;">
        <a class="yt-btn" href="${ytUrl}" target="_blank" title="YouTube">
          <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6 2.03C17.4 1.27 16.8 0.67 16.04 0.47 14.63 0.1 9 0.1 9 0.1S3.37 0.1 1.96 0.47C1.2 0.67 0.6 1.27 0.4 2.03 0.03 3.44 0.03 6.5 0.03 6.5S0.03 9.56 0.4 10.97C0.6 11.73 1.2 12.33 1.96 12.53 3.37 12.9 9 12.9 9 12.9S14.63 12.9 16.04 12.53C16.8 12.33 17.4 11.73 17.6 10.97 17.97 9.56 17.97 6.5 17.97 6.5S17.97 3.44 17.6 2.03Z" fill="white"/>
            <path d="M7.2 9.26L11.84 6.5 7.2 3.74V9.26Z" fill="#FF0000"/>
          </svg>
        </a>
        <a class="ytm-btn" href="${ytmUrl}" target="_blank" title="YouTube Music">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="white"/>
            <circle cx="10" cy="10" r="4" fill="#FF0000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10C3 6.13 6.13 3 10 3Z" fill="#FF0000"/>
          </svg>
        </a>
      </div>
    `;
    songsList.appendChild(item);
  });

  document.getElementById('content-area').style.display = 'flex';
}

async function reloadArtistInfo(artistName) {
  if (isLoading) return;
  isLoading = true;
  const overlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');
  overlay.style.display = 'flex';
  loadingText.textContent = t('loading');

  try {
    const info = await fetchArtistInfo(artistName, currentGenre);
    info.imageUrl = currentImageUrl;
    renderArtistInfo(info);
    updateUIText();
  } catch (e) {
    loadingText.textContent = t('error');
    setTimeout(() => { overlay.style.display = 'none'; }, 2000);
    isLoading = false;
    return;
  }
  overlay.style.display = 'none';
  isLoading = false;
}

async function loadArtist() {
  if (isLoading) return;
  isLoading = true;

  const overlay = document.getElementById('loading-overlay');
  const contentArea = document.getElementById('content-area');
  const loadingText = document.getElementById('loading-text');

  overlay.style.display = 'flex';
  contentArea.style.display = 'none';
  loadingText.textContent = t('loading');

  try {
    const artistName = getNextArtist(currentGenre);
    const info = await fetchArtistInfo(artistName, currentGenre);
    renderArtistInfo(info);
    overlay.style.display = 'none';
  } catch (e) {
    loadingText.textContent = t('error');
    setTimeout(() => { overlay.style.display = 'none'; }, 2000);
  }

  isLoading = false;
}

document.addEventListener('DOMContentLoaded', () => {
  renderGenreTabs();
  renderLangTabs();
  updateUIText();
});
