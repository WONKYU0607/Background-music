const GENRES = [
  { id: 'pop',     label: { en: 'Pop',     ko: '팝',   ja: 'ポップ',       zh: '流行',  es: 'Pop',     fr: 'Pop'     } },
  { id: 'k-pop',   label: { en: 'K-Pop',   ko: 'K-POP',ja: 'K-POP',       zh: 'K-POP', es: 'K-Pop',   fr: 'K-Pop'   } },
  { id: 'hip-hop', label: { en: 'Hip-Hop', ko: '힙합', ja: 'ヒップホップ', zh: '嘻哈',  es: 'Hip-Hop', fr: 'Hip-Hop' } },
  { id: 'r-b',     label: { en: 'R&B',     ko: 'R&B',  ja: 'R&B',         zh: 'R&B',   es: 'R&B',     fr: 'R&B'     } },
  { id: 'band',    label: { en: 'Band',    ko: '밴드', ja: 'バンド',       zh: '乐队',  es: 'Banda',   fr: 'Groupe'  } },
  { id: 'jazz',    label: { en: 'Jazz',    ko: '재즈', ja: 'ジャズ',       zh: '爵士',  es: 'Jazz',    fr: 'Jazz'    } },
  { id: 'reggae',  label: { en: 'Reggae',  ko: '레게', ja: 'レゲエ',       zh: '雷鬼',  es: 'Reggae',  fr: 'Reggae'  } },
];

const UI_TEXT = {
  en: { loadBtn: 'New Artist', slide: 'Slide to unlock', debut: 'Debut', bio: 'Did You Know?', songs: 'Top Songs', loading: 'Loading artist...', error: 'Error. Please try again.', genre: 'Genre', lang: 'Lang' },
  ko: { loadBtn: '새 아티스트', slide: '밀어서 잠금해제', debut: '데뷔', bio: '알고 계셨나요?', songs: '대표곡', loading: '불러오는 중...', error: '오류가 발생했어요.', genre: '장르', lang: '언어' },
  ja: { loadBtn: '新アーティスト', slide: 'スライドで解除', debut: 'デビュー', bio: '豆知識', songs: '代表曲', loading: '読み込み中...', error: 'エラーが発生しました。', genre: 'ジャンル', lang: '言語' },
  zh: { loadBtn: '新艺术家', slide: '滑动解锁', debut: '出道', bio: '你知道吗？', songs: '热门歌曲', loading: '加载中...', error: '发生错误，请重试。', genre: '流派', lang: '语言' },
  es: { loadBtn: 'Nuevo artista', slide: 'Desliza', debut: 'Debut', bio: '¿Sabías que?', songs: 'Canciones', loading: 'Cargando...', error: 'Error. Inténtalo.', genre: 'Género', lang: 'Idioma' },
  fr: { loadBtn: 'Nouvel artiste', slide: 'Glisser', debut: 'Débuts', bio: 'Le saviez-vous ?', songs: 'Chansons', loading: 'Chargement...', error: 'Erreur. Réessayez.', genre: 'Genre', lang: 'Langue' },
};

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'ko', label: '한국어' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
];

const ARTIST_LISTS = {
  pop: [
    'Taylor Swift','Ed Sheeran','Adele','Bruno Mars','Ariana Grande','Justin Bieber','Billie Eilish','Harry Styles','Dua Lipa','The Weeknd',
    'Katy Perry','Lady Gaga','Rihanna','Beyonce','Sam Smith','Olivia Rodrigo','Shawn Mendes','Charlie Puth','Sia','Maroon 5',
    'Post Malone','Selena Gomez','Justin Timberlake','Miley Cyrus','Camila Cabello','Lizzo','Halsey','Demi Lovato','Nick Jonas','Meghan Trainor',
    'Ava Max','Carly Rae Jepsen','Jason Derulo','Bebe Rexha','Zara Larsson','Anne-Marie','James Arthur','Lewis Capaldi','Conan Gray','Pink',
    'Nelly Furtado','Kelly Clarkson','Avril Lavigne','Britney Spears','Christina Aguilera','One Direction','Jonas Brothers','5 Seconds of Summer',
    'Shakira','Jennifer Lopez','Enrique Iglesias','Ricky Martin','Pitbull','Celine Dion','Whitney Houston','Mariah Carey','Janet Jackson',
    'Michael Jackson','Elvis Presley','Elton John','George Michael','ABBA','Bee Gees','Fleetwood Mac','Eagles','Stevie Wonder','Lionel Richie',
    'Phil Collins','Billy Joel','Rod Stewart','Cyndi Lauper','Madonna','Prince','David Bowie','Paul McCartney','Robbie Williams','Amy Winehouse',
    'Lana Del Rey','Lorde','Hozier','Passenger','James Bay','Tom Odell','Dermot Kennedy','Niall Horan','Zayn','Tove Lo',
    'Robyn','Bjork','Enya','Kate Bush','Sade','Dido','Natalie Imbruglia','Leona Lewis','Olly Murs','Little Mix',
    'Girls Aloud','Spice Girls','Backstreet Boys','NSYNC','Westlife','Boyzone','Take That','New Kids on the Block',
    'Kesha','Fergie','Gwen Stefani','No Doubt','Alanis Morissette','Sheryl Crow','Sarah McLachlan','Garbage','PJ Harvey','Tori Amos',
    'Sinead OConnor','Annie Lennox','Eurythmics','Culture Club','Duran Duran','Simply Red','Tears for Fears','a-ha','Pet Shop Boys','Erasure',
    'Depeche Mode','Human League','Soft Cell','OMD','Roxette','Cardigans','Lykke Li','First Aid Kit','Jose Gonzalez',
    'Coldplay','Snow Patrol','Keane','Travis','The Script','Kodaline','Jack Johnson','John Mayer','Jason Mraz','Train',
    'Matchbox Twenty','Counting Crows','Third Eye Blind','Barenaked Ladies','Gin Blossoms','Savage Garden','Michelle Branch','Vanessa Carlton'
  ],
  'k-pop': [
    'BTS','BLACKPINK','EXO','TWICE','Stray Kids','aespa','NewJeans','IVE','NCT 127','GOT7',
    'BIGBANG','2NE1','SHINee','Red Velvet','ITZY','Monsta X','SEVENTEEN','TXT','IU','Psy',
    'Super Junior','Girls Generation','Apink','MAMAMOO','ASTRO','ATEEZ','ENHYPEN','Wanna One','KARD','CL',
    'Taeyang','G-Dragon','Zico','Dean','Crush','Dynamic Duo','Epik High','Lee Hi','Hyuna','Sunmi',
    'Wonder Girls','4Minute','After School','Miss A','Sistar','AOA','T-ara','Infinite','Block B',
    'B1A4','BAP','Teen Top','VIXX','BtoB','Dreamcatcher','Momoland','Loona','Everglow','Oh My Girl',
    'Gfriend','Weki Meki','Fromis 9','Cherry Blossom','Cravity','The Boyz','AB6IX','Verivery','Pentagon','UP10TION',
    'Golden Child','ONF','Brown Eyed Girls','Boa','Lee Hyori','FinKL','SES','Shinhwa','HOT','god',
    'Fly to the Sky','Turbo','Sechs Kies','1TYM','Jinusean','Leessang','Jay Park','Loco','Gray','Heize',
    'Suran','BOL4','Melomance','Standing Egg','Urban Zakapa','10cm','Busker Busker','Roy Kim','Naul','Sung Si-kyung',
    'Ailee','Baek Ji-young','Davichi','Hyolyn','Kwon Jin-ah','Jung Seung-hwan','Hyukoh','Jannabi','Nell','The Rose',
    'DAY6','N.Flying','FT Island','CNBlue','Lee Hong-ki','Jung Yong-hwa','Wonstein','BIBI','SOLE','Lee Young-ji',
    'Lim Young-woong','Kim Ho-joong','Young K','Ash Island','Haon','Kid Milli','Sik-K','Punchnello','Giriboy','Olltii',
    'Khundi Panda','Superbee','Deepflow','DOK2','Taeyang','CL','Minzy','Park Bom','Jessica','Taeyeon',
    'Tiffany','Sooyoung','Yoona','Krystal','Suzy','Rain','Se7en','Wheesung','K.Will','MC Mong'
  ],
  'hip-hop': [
    'Drake','Kendrick Lamar','Eminem','Jay-Z','Kanye West','Cardi B','Nicki Minaj','Post Malone','Travis Scott','J. Cole',
    'Lil Wayne','Snoop Dogg','50 Cent','Nas','ASAP Rocky','Megan Thee Stallion','Tyler the Creator','Future','Lil Uzi Vert','21 Savage',
    'DaBaby','Roddy Ricch','Juice WRLD','Logic','Big Sean','Wiz Khalifa','Mac Miller','Kid Cudi','Chance the Rapper','Childish Gambino',
    '2 Chainz','Meek Mill','Rick Ross','Gucci Mane','Young Thug','Lil Baby','Gunna','Jack Harlow','Polo G','Don Toliver',
    'Ice Cube','Ice-T','Run DMC','Beastie Boys','LL Cool J','Public Enemy','Tupac Shakur','The Notorious BIG','Missy Elliott','Lauryn Hill',
    'Andre 3000','Outkast','Lupe Fiasco','Common','Talib Kweli','Mos Def','DMX','Ja Rule','Busta Rhymes','Method Man',
    'Redman','Ghostface Killah','Raekwon','GZA','RZA','Wu-Tang Clan','Cypress Hill','Bone Thugs-n-Harmony','Twista','Tech N9ne',
    'Atmosphere','Aesop Rock','MF Doom','Madlib','J Dilla','Pharrell Williams','Timbaland','Ludacris','T.I.','Young Jeezy',
    'Fabolous','Jadakiss','Swizz Beatz','DJ Premier','Pete Rock','Q-Tip','Phife Dawg','A Tribe Called Quest','De La Soul',
    'Jungle Brothers','Gang Starr','Guru','Rakim','Big Daddy Kane','Kool G Rap','KRS-One','Boogie Down Productions','NWA','Eazy-E',
    'Dr. Dre','Too Short','E-40','Mac Dre','Scarface','Bun B','Pimp C','UGK','Slim Thug','Paul Wall',
    'Mike Jones','Chamillionaire','Big KRIT','Curren$y','Wale','Kid Ink','Ace Hood','Stalley','Yelawolf','Machine Gun Kelly',
    'NF','Lecrae','Andy Mineo','Lil Kim','Foxy Brown','Trina','Eve','Remy Ma','Queen Latifah','Salt-N-Pepa',
    'MC Lyte','Da Brat','Yo-Yo','Jean Grae','Dessa','Immortal Technique','Jedi Mind Tricks','Vinnie Paz','R.A. the Rugged Man',
    'Big Pun','Fat Joe','Terror Squad','MOP','Lil Fame','Billy Danze','Onyx','Sticky Fingaz','Fredro Starr','DMX'
  ],
  'r-b': [
    'Beyonce','Rihanna','Frank Ocean','The Weeknd','SZA','Usher','Alicia Keys','John Legend','Mary J. Blige','Ne-Yo',
    'Chris Brown','Miguel','Jhene Aiko','Khalid','Daniel Caesar','Summer Walker','Bryson Tiller','Normani','Lucky Daye','Jazmine Sullivan',
    'Giveon','Brent Faiyaz','6LACK','Kehlani','Victoria Monet','Ella Mai','Tank','Teyana Taylor','Jeremih','Jacquees',
    'Trey Songz','Lloyd','Omarion','Mario','Ginuwine','HER','PJ Morton','Eric Bellinger','Musiq Soulchild','Maxwell',
    'DAngelo','Erykah Badu','Jill Scott','Anthony Hamilton','Ledisi','Marsha Ambrosius','Fantasia','Jennifer Hudson','Keyshia Cole','Monica',
    'Brandy','TLC','En Vogue','SWV','Xscape','Total','702','Brownstone','Soul for Real','Silk',
    'New Edition','Bell Biv Devoe','Bobby Brown','Johnny Gill','Ralph Tresvant','Babyface','Toni Braxton',
    'Whitney Houston','Mariah Carey','Janet Jackson','Anita Baker','Aretha Franklin','Patti LaBelle','Diana Ross','Gladys Knight','Chaka Khan','Luther Vandross',
    'Stevie Wonder','Al Green','Smokey Robinson','Teddy Pendergrass','Lionel Richie','Barry White','Marvin Gaye','Isaac Hayes','Curtis Mayfield',
    'Sam Cooke','Otis Redding','James Brown','Ray Charles','Etta James','Tina Turner','Wilson Pickett','Solomon Burke','Percy Sledge',
    'Four Tops','Temptations','Supremes','Miracles','Commodores','Earth Wind and Fire','Kool and the Gang','Maze','Frankie Beverly','Isley Brothers',
    'OJays','Stylistics','Delfonics','Spinners','Chi-Lites','Dramatics','Heatwave','Rose Royce','Rufus',
    'Funkadelic','Parliament','George Clinton','Bootsy Collins','Roger Troutman','Zapp','Gap Band','Charlie Wilson','Shalamar','Jody Watley',
    'Alexander ONeal','Cherrelle','Pebbles','Color Me Badd','Hi-Five','Boyz II Men','Jodeci','Dru Hill','Next','112',
    'Jagged Edge','B2K','Pretty Ricky','Pleasure P','Sammie','Bobby Valentino','Avant','Joe','Case','Carl Thomas',
    'Jon B','Changing Faces','Ideal','Blaque','Destiny Child','Solange','Kelly Rowland','Michelle Williams','Fantasia','Jennifer Hudson',
    'Jordin Sparks','Melanie Fiona','Estelle','Leona Lewis','Adele','Amy Winehouse','Duffy','Joss Stone','Corinne Bailey Rae','Laura Mvula',
    'Lianne La Havas','Emeli Sande','Rebecca Ferguson','Beverley Knight','Mica Paris','Roberta Flack','Donny Hathaway','Minnie Riperton',
    'Phyllis Hyman','Deniece Williams','Randy Crawford','Regina Belle','Peabo Bryson','James Ingram'
  ],
  band: [
    'Coldplay','Imagine Dragons','Linkin Park','Green Day','Foo Fighters','Red Hot Chili Peppers','Arctic Monkeys','The 1975','Radiohead','Nirvana',
    'Metallica','AC/DC','Queen','The Beatles','U2','Oasis','Muse','Twenty One Pilots','Fall Out Boy','Panic at the Disco',
    'My Chemical Romance','Paramore','Blink-182','Sum 41','Simple Plan','Good Charlotte','The Killers','Snow Patrol','Keane','The Script',
    'Kodaline','Bastille','Alt-J','Vampire Weekend','Foster the People','Tame Impala','Glass Animals','Biffy Clyro','Placebo','Travis',
    'The Rolling Stones','Led Zeppelin','Pink Floyd','The Who','The Doors','Jimi Hendrix','Cream','Grateful Dead','Jefferson Airplane','Fleetwood Mac',
    'Eagles','Aerosmith','Guns N Roses','Bon Jovi','Def Leppard','Iron Maiden','Judas Priest','Black Sabbath','Van Halen','Kiss',
    'Deep Purple','Rush','Yes','Genesis','Dire Straits','The Police','The Clash','Sex Pistols','Joy Division','New Order',
    'Depeche Mode','The Cure','Bauhaus','Interpol','The Strokes','Yeah Yeah Yeahs','White Stripes','The Black Keys','Death Cab for Cutie','Modest Mouse',
    'The Shins','Built to Spill','Pavement','Sonic Youth','Pixies','Dinosaur Jr','Mudhoney','Soundgarden','Alice in Chains','Pearl Jam',
    'Stone Temple Pilots','Bush','Collective Soul','Live','Matchbox Twenty','Third Eye Blind','Counting Crows','Semisonic','Barenaked Ladies','Gin Blossoms',
    'Toad the Wet Sprocket','Fastball','Everclear','Candlebox','Creed','Nickelback','Hinder','Three Days Grace','Breaking Benjamin','Seether',
    'Shinedown','Staind','Puddle of Mudd','Drowning Pool','Lifehouse','Switchfoot','Relient K','MxPx','Anberlin','Hawthorne Heights',
    'Senses Fail','Silverstein','Underoath','As I Lay Dying','Killswitch Engage','All That Remains','Shadows Fall','Unearth','Darkest Hour',
    'Lamb of God','Mastodon','Tool','A Perfect Circle','Deftones','System of a Down','Rage Against the Machine','Audioslave','Temple of the Dog',
    'Blind Melon','Live','Better Than Ezra','Toadies','Spacehog','Dishwalla','Sponge','Fuel','Oleander','Vertical Horizon',
    'Something Corporate','The Starting Line','Finch','Armor for Sleep','Story of the Year','Emery','Copeland','Further Seems Forever','Dashboard Confessional','Brand New',
    'Taking Back Sunday','Thrice','Atreyu','Avenged Sevenfold','Bullet for My Valentine','Trivium',
    'The Rolling Stones','Led Zeppelin','Pink Floyd','The Who','The Doors','Cream','Grateful Dead',
    'Aerosmith','Guns N Roses','Bon Jovi','Def Leppard','Iron Maiden','Black Sabbath','Van Halen','Kiss','Deep Purple',
    'Rush','Yes','Genesis','Dire Straits','The Police','The Clash','Interpol','The Strokes','White Stripes','The Black Keys'
  ],
  jazz: [
    'Miles Davis','John Coltrane','Louis Armstrong','Ella Fitzgerald','Frank Sinatra','Billie Holiday','Duke Ellington','Charlie Parker','Herbie Hancock','Thelonious Monk',
    'Chet Baker','Dave Brubeck','Nina Simone','Norah Jones','Diana Krall','John Scofield','Pat Metheny','Wynton Marsalis','Kamasi Washington','Gregory Porter',
    'Robert Glasper','Esperanza Spalding','Brad Mehldau','Joshua Redman','Chris Potter','Kurt Rosenwinkel','Bill Evans','Wes Montgomery','Chick Corea','McCoy Tyner',
    'Wayne Shorter','Sonny Rollins','Dizzy Gillespie','Art Blakey','Clifford Brown','Stan Getz','Dexter Gordon','Cannonball Adderley','Lee Morgan','Freddie Hubbard',
    'Woody Shaw','Lee Konitz','Paul Desmond','Gerry Mulligan','Zoot Sims','Al Cohn','Jim Hall','Joe Pass','Barney Kessel','Charlie Christian',
    'Django Reinhardt','Stephane Grappelli','Oscar Peterson','Art Tatum','Bud Powell','Red Garland','Tommy Flanagan','Hank Jones','Barry Harris','Cedar Walton',
    'Kenny Barron','Mulgrew Miller','Cyrus Chestnut','Gonzalo Rubalcaba','Michel Camilo','Danilo Perez','Chucho Valdes','Hugh Masekela','Miriam Makeba','Abdullah Ibrahim',
    'Ray Charles','Mose Allison','Horace Silver','Bobby Timmons','Junior Mance','Les McCann','Eddie Harris','Ramsey Lewis','Ahmad Jamal','Nat King Cole',
    'Oscar Brown Jr','Mark Murphy','Jon Hendricks','Annie Ross','Betty Carter','Sheila Jordan','Abbey Lincoln','Cassandra Wilson',
    'Dianne Reeves','Dee Dee Bridgewater','Carmen McRae','Sarah Vaughan','Anita O Day','June Christy','Chris Connor','Helen Merrill','Shirley Horn','Stacey Kent',
    'Jane Monheit','Tierney Sutton','Karrin Allyson','Holly Cole','Patricia Barber','Madeleine Peyroux','Jamie Cullum','Michael Buble','Harry Connick Jr','Joe Williams',
    'Jon Faddis','Tom Harrell','Arturo Sandoval','Claudio Roditi','Brian Lynch','Jeremy Pelt','Nicholas Payton','Terence Blanchard','Roy Hargrove','Wallace Roney',
    'Marcus Roberts','Ryan Kisor','Jim Rotondi','Tim Hagans','Randy Brecker','Michael Brecker','Bob Berg','Joe Lovano',
    'Jerry Bergonzi','George Garzone','Bill Barron','Ted Curson','Booker Ervin','Clifford Jordan','Junior Cook','Hank Mobley','Benny Golson','Johnny Griffin',
    'Warne Marsh','Art Pepper','Herb Geller','Bill Perkins','Jack Montrose','Bob Cooper','Richie Kamuca','Jimmy Giuffre','Bob Brookmeyer','Al Grey',
    'Slide Hampton','Curtis Fuller','Roswell Rudd','Paul Rutherford','Albert Mangelsdorff','Ray Anderson','Craig Harris','Frank Lacy','Steve Turre',
    'James Carter','David Murray','Charles Gayle','Peter Brotzmann','Evan Parker','Derek Bailey','John Zorn','Bill Frisell','Marc Ribot','Nels Cline',
    'Ben Monder','Lage Lund','Jonathan Kreisberg','Mike Moreno','Lionel Loueke','Rez Abbasi','Gilad Hekselman','Julian Lage','Mary Halvorson',
    'Charles Mingus','Scott LaFaro','Paul Chambers','Ron Carter','Dave Holland','Charlie Haden','Gary Peacock','Eddie Gomez','Marc Johnson',
    'John Patitucci','Christian McBride','Avishai Cohen','Ben Street','Larry Grenadier','Matt Penman','Scott Colley','Thomas Morgan',
    'Jack DeJohnette','Tony Williams','Elvin Jones','Roy Haynes','Max Roach','Billy Higgins','Jimmy Cobb','Philly Joe Jones','Art Taylor',
    'Louis Hayes','Albert Heath','Buddy Rich','Gene Krupa','Louie Bellson','Jo Jones'
  ],
  reggae: [
    'Bob Marley','Damian Marley','Shaggy','Sean Paul','Shabba Ranks','Buju Banton','Burning Spear','Jimmy Cliff','Steel Pulse','Ziggy Marley',
    'Sizzla','Capleton','Beenie Man','Morgan Heritage','Lucky Dube','Peter Tosh','Bunny Wailer','Chronixx','Protoje','Koffee',
    'Jesse Royal','Kabaka Pyramid','Jah Cure','Tarrus Riley','Etana','Romain Virgo','Busy Signal','Mavado','Vybz Kartel','Popcaan',
    'Aidonia','Konshens','I-Octane','Demarco','Richie Spice','Fantan Mojah','Luciano','Anthony B','Cocoa Tea','Freddie McGregor',
    'Dennis Brown','Gregory Isaacs','Toots and the Maytals','Desmond Dekker','Ken Boothe','John Holt','Alton Ellis','Delroy Wilson','Slim Smith','Stranger Cole',
    'Keith Hudson','Prince Far I','Lee Perry','King Tubby','Augustus Pablo','Scientist','Yellowman','Eek-A-Mouse','Brigadier Jerry','Charlie Chaplin',
    'Josey Wales','Lieutenant Stitchie','Papa San','Ninja Man','Bounty Killer','Elephant Man','Spragga Benz','Merciless','Tony Rebel','Garnett Silk',
    'Culture','Israel Vibration','The Abyssinians','Melodians','Ethiopians','Wailing Souls','Mighty Diamonds','Third World','Inner Circle','Maxi Priest',
    'Aswad','Bitty McLean','UB40','Musical Youth','Eddy Grant','Joan Armatrading','Janet Kay','Carroll Thompson','Sandra Cross',
    'Barry Biggs','Boris Gardiner','Ernie Smith','Dobby Dobson','Hopeton Lewis','Pat Kelly','Marcia Griffiths','Judy Mowatt','Rita Marley',
    'I Threes','Junior Murvin','Max Romeo','Big Youth','U-Roy','I-Roy','Dennis Alcapone','Dillinger','Trinity','Ranking Trevor',
    'Tapper Zukie','Ranking Joe','General Echo','Lone Ranger','Nicodemus','Papa Michigan','General Saint','Clint Eastwood','Toyan',
    'Half Pint','Sugar Minott','Johnny Osbourne','Don Carlos','Black Uhuru','Sly and Robbie','Robbie Shakespeare','Sly Dunbar','Jackie Mittoo',
    'Skatalites','Don Drummond','Roland Alphonso','Tommy McCook','Johnny Moore','Lester Sterling','Lloyd Brevett','Lloyd Knibb',
    'Toots Hibbert','Leroy Sibbles','Heptones','Misty in Roots','Capital Letters','Merger','Madness','Specials','Selecter','The Beat',
    'English Beat','Toasters','Hepcat','Pietasters','Slackers','Aggrolites','Reel Big Fish','Less Than Jake','Mighty Mighty Bosstones',
    'Sublime','311','No Doubt','Pepper','Slightly Stoopid','Rebelution','Stick Figure','Iration','Ballyhoo',
    'Collie Buddz','Matisyahu','Michael Franti','Spearhead','Stephen Marley','Ky-Mani Marley','Julian Marley','Jo Mersa Marley','Skip Marley',
    'Wyclef Jean','Lauryn Hill','Fugees','Queen Ifrica','Lady Saw','Tanya Stephens','Diana King','Nadine Sutherland','Pam Hall',
    'Sister Nancy','Macka Diamond','Spice','Ishawna','Dovey Magnum','Lisa Mercedez','Jada Kingdom','Shenseea','Shaneil Muir',
    'Govana','Skillibeng','Teejay','Intence','Jahvillani','Masicka','Chronic Law','Squash','Tommy Lee Sparta','Alkaline'
  ],
};

function getNextArtist(genre) {
  var list = ARTIST_LISTS[genre] || ARTIST_LISTS.pop;
  var seenKey = 'musiccard_seen_' + genre;
  var orderKey = 'musiccard_order_' + genre;
  var seen = [];
  var order = [];
  try {
    seen = JSON.parse(localStorage.getItem(seenKey) || '[]');
    order = JSON.parse(localStorage.getItem(orderKey) || '[]');
  } catch(e) {}
  if (!order.length) {
    order = list.slice().sort(function(){ return Math.random() - 0.5; });
    seen = [];
  }
  var next = null;
  for (var i = 0; i < order.length; i++) {
    if (seen.indexOf(order[i]) === -1) { next = order[i]; break; }
  }
  if (!next) {
    order = list.slice().sort(function(){ return Math.random() - 0.5; });
    seen = [order[0]];
    next = order[0];
  } else {
    seen.push(next);
  }
  try {
    localStorage.setItem(orderKey, JSON.stringify(order));
    localStorage.setItem(seenKey, JSON.stringify(seen));
  } catch(e) {}
  return next;
}

var currentLang = 'en';
var currentGenre = 'pop';
var isLoading = false;
var currentArtistName = null;
var currentImageUrl = null;

try {
  currentLang = localStorage.getItem('musiccard_lang') || 'en';
  currentGenre = localStorage.getItem('musiccard_genre') || 'pop';
} catch(e) {}

function t(key) {
  return (UI_TEXT[currentLang] && UI_TEXT[currentLang][key]) || UI_TEXT.en[key] || '';
}

function renderGenreTabs() {
  var container = document.getElementById('genre-tabs');
  if (!container) return;
  container.innerHTML = GENRES.map(function(g) {
    var active = g.id === currentGenre ? ' active' : '';
    var label = g.label[currentLang] || g.label.en;
    return '<button class="genre-tab' + active + '" onclick="setGenre(\'' + g.id + '\')">' + label + '</button>';
  }).join('');
}

function renderLangTabs() {
  var container = document.getElementById('lang-tabs');
  if (!container) return;
  container.innerHTML = LANGUAGES.map(function(l) {
    var active = l.id === currentLang ? ' active' : '';
    return '<button class="lang-tab' + active + '" onclick="setLang(\'' + l.id + '\')">' + l.label + '</button>';
  }).join('');
}

function setGenre(id) {
  currentGenre = id;
  try { localStorage.setItem('musiccard_genre', id); } catch(e) {}
  renderGenreTabs();
}

function setLang(id) {
  currentLang = id;
  try { localStorage.setItem('musiccard_lang', id); } catch(e) {}
  renderLangTabs();
  renderGenreTabs();
  updateUIText();
  if (currentArtistName) reloadArtistInfo(currentArtistName);
}

function updateUIText() {
  var ids = { 'load-btn': 'loadBtn', 'slide-hint-text': 'slide', 'label-debut': 'debut', 'label-bio': 'bio', 'label-songs': 'songs', 'genre-label': 'genre', 'lang-label': 'lang' };
  Object.keys(ids).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = t(ids[id]);
  });
}

function fetchArtistInfo(artistName, genre) {
  return fetch('/api/artist-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre: genre || currentGenre, language: currentLang, artistName: artistName }),
  }).then(function(res) {
    if (!res.ok) throw new Error('API error ' + res.status);
    return res.json();
  });
}

function renderArtistInfo(info) {
  var artistName = info.artistName || currentArtistName;
  var imageUrl = info.imageUrl || null;
  currentArtistName = artistName;
  currentImageUrl = imageUrl;

  var heroEl = document.getElementById('artist-hero-inner');
  if (heroEl) {
    var initials = artistName.split(' ').map(function(w){ return w[0] || ''; }).join('').slice(0,2).toUpperCase();
    var colorPalettes = ['135deg,#1a1a4e,#4a1a6e','135deg,#1a3a2e,#1a6e4a','135deg,#3a1a1a,#6e2a1a','135deg,#1a2a4e,#1a4a6e','135deg,#2a1a4e,#4e1a3a'];
    var ci = artistName.charCodeAt(0) % colorPalettes.length;
    var placeholder = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(' + colorPalettes[ci] + ');">' +
      '<div style="width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,0.12);border:1.5px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:600;color:rgba(255,255,255,0.85);">' + initials + '</div>' +
      '</div>';
    if (imageUrl) {
      var img = document.createElement('img');
      img.src = imageUrl;
      img.alt = artistName;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:center 20%;opacity:0.95;';
      img.onerror = function() { heroEl.innerHTML = placeholder; };
      heroEl.innerHTML = '';
      heroEl.appendChild(img);
    } else {
      heroEl.innerHTML = placeholder;
    }
  }

  var nameEl = document.getElementById('artist-name');
  if (nameEl) nameEl.textContent = artistName;

  var genreEl = document.getElementById('artist-genre');
  if (genreEl) {
    var gObj = GENRES.find(function(g) { return g.id === currentGenre; });
    genreEl.textContent = gObj ? (gObj.label[currentLang] || gObj.label.en) : currentGenre;
  }

  var debutEl = document.getElementById('info-debut');
  if (debutEl) debutEl.textContent = info.debut || '';

  var bioEl = document.getElementById('info-bio');
  if (bioEl) bioEl.textContent = info.bio || '';

  var songsList = document.getElementById('songs-list');
  if (songsList) {
    songsList.innerHTML = '';
    (info.songs || []).forEach(function(song) {
      var ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(song.youtube_query);
      var ytmUrl = 'https://music.youtube.com/search?q=' + encodeURIComponent(song.youtube_music_query || song.title);
      var item = document.createElement('div');
      item.className = 'song-item';
      item.innerHTML =
        '<span class="song-title">' + song.title + '</span>' +
        '<div style="display:flex;gap:6px;flex-shrink:0;">' +
          '<a class="yt-btn" href="' + ytUrl + '" target="_blank" title="YouTube">' +
            '<svg width="18" height="13" viewBox="0 0 18 13" fill="none"><path d="M17.6 2.03C17.4 1.27 16.8 0.67 16.04 0.47 14.63 0.1 9 0.1 9 0.1S3.37 0.1 1.96 0.47C1.2 0.67 0.6 1.27 0.4 2.03 0.03 3.44 0.03 6.5 0.03 6.5S0.03 9.56 0.4 10.97C0.6 11.73 1.2 12.33 1.96 12.53 3.37 12.9 9 12.9 9 12.9S14.63 12.9 16.04 12.53C16.8 12.33 17.4 11.73 17.6 10.97 17.97 9.56 17.97 6.5 17.97 6.5S17.97 3.44 17.6 2.03Z" fill="white"/><path d="M7.2 9.26L11.84 6.5 7.2 3.74V9.26Z" fill="#FF0000"/></svg>' +
          '</a>' +
          '<a class="ytm-btn" href="' + ytmUrl + '" target="_blank" title="YouTube Music">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="4" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10C3 6.13 6.13 3 10 3Z" fill="#FF0000"/></svg>' +
          '</a>' +
        '</div>';
      songsList.appendChild(item);
    });
  }

  var contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.style.display = 'flex';
}

function reloadArtistInfo(artistName) {
  if (isLoading) return;
  isLoading = true;
  var overlay = document.getElementById('loading-overlay');
  var loadingText = document.getElementById('loading-text');
  if (overlay) overlay.style.display = 'flex';
  if (loadingText) loadingText.textContent = t('loading');
  fetchArtistInfo(artistName, currentGenre).then(function(info) {
    info.imageUrl = currentImageUrl;
    renderArtistInfo(info);
    updateUIText();
    if (overlay) overlay.style.display = 'none';
    isLoading = false;
  }).catch(function() {
    if (loadingText) loadingText.textContent = t('error');
    setTimeout(function() { if (overlay) overlay.style.display = 'none'; }, 2000);
    isLoading = false;
  });
}

function loadArtist() {
  if (isLoading) return;
  isLoading = true;
  var overlay = document.getElementById('loading-overlay');
  var contentArea = document.getElementById('content-area');
  var loadingText = document.getElementById('loading-text');
  if (overlay) overlay.style.display = 'flex';
  if (contentArea) contentArea.style.display = 'none';
  if (loadingText) loadingText.textContent = t('loading');
  var artistName = getNextArtist(currentGenre);
  fetchArtistInfo(artistName, currentGenre).then(function(info) {
    renderArtistInfo(info);
    if (overlay) overlay.style.display = 'none';
    isLoading = false;
  }).catch(function() {
    if (loadingText) loadingText.textContent = t('error');
    setTimeout(function() { if (overlay) overlay.style.display = 'none'; }, 2000);
    isLoading = false;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderGenreTabs();
  renderLangTabs();
  updateUIText();
});
