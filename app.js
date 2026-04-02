const LASTFM_KEY = '7baf30c47f469a44767a435eda336653';

const GENRES = [
  { id: 'all', label: { ko: '전체', en: 'All', ja: 'すべて', zh: '全部', es: 'Todo', fr: 'Tout' } },
  { id: 'k-pop', label: { ko: 'K-POP', en: 'K-POP', ja: 'K-POP', zh: 'K-POP', es: 'K-POP', fr: 'K-POP' } },
  { id: 'pop', label: { ko: '팝', en: 'Pop', ja: 'ポップ', zh: '流行', es: 'Pop', fr: 'Pop' } },
  { id: 'rock', label: { ko: '록', en: 'Rock', ja: 'ロック', zh: '摇滚', es: 'Rock', fr: 'Rock' } },
  { id: 'hip-hop', label: { ko: '힙합', en: 'Hip-Hop', ja: 'ヒップホップ', zh: '嘻哈', es: 'Hip-Hop', fr: 'Hip-Hop' } },
  { id: 'r-b', label: { ko: 'R&B', en: 'R&B', ja: 'R&B', zh: 'R&B', es: 'R&B', fr: 'R&B' } },
  { id: 'electronic', label: { ko: '일렉트로닉', en: 'Electronic', ja: 'エレクトロニック', zh: '电子', es: 'Electrónica', fr: 'Électronique' } },
  { id: 'jazz', label: { ko: '재즈', en: 'Jazz', ja: 'ジャズ', zh: '爵士', es: 'Jazz', fr: 'Jazz' } },
  { id: 'classical', label: { ko: '클래식', en: 'Classical', ja: 'クラシック', zh: '古典', es: 'Clásica', fr: 'Classique' } },
  { id: 'indie', label: { ko: '인디', en: 'Indie', ja: 'インディー', zh: '独立', es: 'Indie', fr: 'Indé' } },
  { id: 'metal', label: { ko: '메탈', en: 'Metal', ja: 'メタル', zh: '金属', es: 'Metal', fr: 'Métal' } },
  { id: 'country', label: { ko: '컨트리', en: 'Country', ja: 'カントリー', zh: '乡村', es: 'Country', fr: 'Country' } },
];

const UI_TEXT = {
  ko: { title: '오늘의 아티스트', loadBtn: '새 아티스트 불러오기', slide: '밀어서 잠금해제', debut: '데뷔 & 이력', bio: '아티스트 소개', songs: '대표곡 & 듣기', listen: '듣기', loading: '아티스트 정보 불러오는 중...', error: '오류가 발생했어요. 다시 시도해주세요.', genre: '장르', lang: '언어' },
  en: { title: "Today's Artist", loadBtn: 'Load New Artist', slide: 'Slide to unlock', debut: 'Debut & Career', bio: 'About', songs: 'Top Songs', listen: 'Play', loading: 'Loading artist info...', error: 'Error occurred. Please try again.', genre: 'Genre', lang: 'Language' },
  ja: { title: '今日のアーティスト', loadBtn: '新しいアーティスト', slide: 'スライドでロック解除', debut: 'デビュー＆経歴', bio: 'アーティスト紹介', songs: '代表曲', listen: '聴く', loading: 'アーティスト情報を読み込み中...', error: 'エラーが発生しました。', genre: 'ジャンル', lang: '言語' },
  zh: { title: '今日艺术家', loadBtn: '加载新艺术家', slide: '滑动解锁', debut: '出道 & 经历', bio: '艺术家介绍', songs: '代表歌曲', listen: '听', loading: '正在加载艺术家信息...', error: '发生错误，请重试。', genre: '流派', lang: '语言' },
  es: { title: 'Artista del día', loadBtn: 'Cargar nuevo artista', slide: 'Desliza para desbloquear', debut: 'Debut & Carrera', bio: 'Sobre el artista', songs: 'Canciones principales', listen: 'Escuchar', loading: 'Cargando información...', error: 'Error. Inténtalo de nuevo.', genre: 'Género', lang: 'Idioma' },
  fr: { title: "Artiste du jour", loadBtn: 'Nouvel artiste', slide: 'Glisser pour déverrouiller', debut: 'Débuts & Carrière', bio: "À propos", songs: 'Meilleures chansons', listen: 'Écouter', loading: 'Chargement...', error: 'Erreur. Réessayez.', genre: 'Genre', lang: 'Langue' },
};

const LANGUAGES = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
];

let currentLang = 'ko';
let currentGenre = 'all';
let isLoading = false;
let currentArtistName = null;

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
  renderGenreTabs();
}

async function setLang(id) {
  currentLang = id;
  renderLangTabs();
  renderGenreTabs();
  updateUIText();
  // 현재 아티스트가 있으면 해당 언어로 정보 다시 불러오기
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

async function getTopArtistByGenre(genre) {
  const tag = genre === 'all' ? '' : genre;
  let url;
  if (tag) {
    const page = Math.floor(Math.random() * 5) + 1;
    url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=50&page=${page}`;
  } else {
    url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${LASTFM_KEY}&format=json&limit=50`;
  }
  const res = await fetch(url);
  const data = await res.json();
  const artists = tag ? data?.topartists?.artist : data?.artists?.artist;
  if (!artists || !artists.length) throw new Error('No artists found');
  return artists[Math.floor(Math.random() * artists.length)];
}

async function getArtistImage(artistName) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_KEY}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    const images = data?.artist?.image;
    if (!images || !images.length) return null;
    // 가장 큰 이미지부터 순서대로 시도
    const sizes = ['mega', 'extralarge', 'large', 'medium'];
    for (const size of sizes) {
      const found = images.find(i => i.size === size);
      if (found && found['#text'] && found['#text'].trim() !== '') {
        return found['#text'];
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function getArtistInfoFromAPI(artistName) {
  const res = await fetch('/api/artist-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artistName, language: currentLang }),
  });
  if (!res.ok) throw new Error('API error');
  return await res.json();
}

function renderArtistInfo(artistName, imageUrl, info) {
  const heroEl = document.getElementById('artist-hero-inner');
  if (imageUrl) {
    heroEl.innerHTML = `<img src="${imageUrl}" alt="${artistName}" style="width:100%;height:100%;object-fit:cover;opacity:0.85;" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:linear-gradient(135deg,#2d2d5e,#4a2d6e)\\'>🎤</div>'">`;
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
    const item = document.createElement('div');
    item.className = 'song-item';
    item.innerHTML = `
      <span class="song-title">${song.title}</span>
      <a class="yt-btn" href="${ytUrl}" target="_blank">
        <span class="yt-icon"></span>
        <span class="yt-btn-label">${t('listen')}</span>
      </a>
    `;
    songsList.appendChild(item);
  });

  document.getElementById('content-area').style.display = 'flex';
}

// 언어 바뀔 때 현재 아티스트 정보만 다시 불러오기 (사진은 유지)
async function reloadArtistInfo(artistName) {
  if (isLoading) return;
  isLoading = true;

  const overlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');
  overlay.style.display = 'flex';
  loadingText.textContent = t('loading');

  try {
    const info = await getArtistInfoFromAPI(artistName);
    const currentImg = document.getElementById('artist-hero-inner').querySelector('img');
    const imageUrl = currentImg ? currentImg.src : null;
    renderArtistInfo(artistName, imageUrl, info);
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
    const artist = await getTopArtistByGenre(currentGenre);
    const artistName = artist.name;
    currentArtistName = artistName;

    const [imageUrl, info] = await Promise.all([
      getArtistImage(artistName),
      getArtistInfoFromAPI(artistName),
    ]);

    renderArtistInfo(artistName, imageUrl, info);
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
