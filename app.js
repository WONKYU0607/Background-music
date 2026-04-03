const GENRES = [
  { id: 'pop',     label: { en: 'Pop',     ko: '팝',   ja: 'ポップ',        zh: '流行',  es: 'Pop',     fr: 'Pop'     } },
  { id: 'k-pop',   label: { en: 'K-Pop',   ko: 'K-POP',ja: 'K-POP',        zh: 'K-POP', es: 'K-Pop',   fr: 'K-Pop'   } },
  { id: 'hip-hop', label: { en: 'Hip-Hop', ko: '힙합', ja: 'ヒップホップ',  zh: '嘻哈',  es: 'Hip-Hop', fr: 'Hip-Hop' } },
  { id: 'r-b',     label: { en: 'R&B',     ko: 'R&B',  ja: 'R&B',          zh: 'R&B',   es: 'R&B',     fr: 'R&B'     } },
  { id: 'band',    label: { en: 'Band',    ko: '밴드', ja: 'バンド',        zh: '乐队',  es: 'Banda',   fr: 'Groupe'  } },
  { id: 'jazz',    label: { en: 'Jazz',    ko: '재즈', ja: 'ジャズ',        zh: '爵士',  es: 'Jazz',    fr: 'Jazz'    } },
  { id: 'reggae',  label: { en: 'Reggae',  ko: '레게', ja: 'レゲエ',        zh: '雷鬼',  es: 'Reggae',  fr: 'Reggae'  } },
];

const UI_TEXT = {
  en: { loadBtn: 'New Artist',     slide: 'Slide to unlock', debut: 'Career',         bio: 'Did You Know?',    songs: 'Top Songs', loading: 'Loading artist...', error: 'Error. Please try again.', genre: 'Genre', lang: 'Lang' },
  ko: { loadBtn: '새 아티스트',    slide: '밀어서 잠금해제', debut: '데뷔 & 이력',    bio: '알고 계셨나요?',   songs: '대표곡',    loading: '불러오는 중...',     error: '오류가 발생했어요.',        genre: '장르',  lang: '언어' },
  ja: { loadBtn: '新アーティスト', slide: 'スライドで解除',  debut: 'デビュー',       bio: '豆知識',           songs: '代表曲',    loading: '読み込み中...',      error: 'エラーが発生しました。',    genre: 'ジャンル', lang: '言語' },
  zh: { loadBtn: '新艺术家',       slide: '滑动解锁',        debut: '出道经历',       bio: '你知道吗？',       songs: '热门歌曲',  loading: '加载中...',          error: '发生错误，请重试。',        genre: '流派',  lang: '语言' },
  es: { loadBtn: 'Nuevo artista',  slide: 'Desliza',         debut: 'Carrera',        bio: '¿Sabías que?',     songs: 'Canciones', loading: 'Cargando...',        error: 'Error. Inténtalo.',         genre: 'Género', lang: 'Idioma' },
  fr: { loadBtn: 'Nouvel artiste', slide: 'Glisser',         debut: 'Carrière',       bio: 'Le saviez-vous ?', songs: 'Chansons',  loading: 'Chargement...',      error: 'Erreur. Réessayez.',        genre: 'Genre', lang: 'Langue' },
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
  'pop': [
    'Taylor Swift','Ed Sheeran','Adele','Bruno Mars','Ariana Grande','Justin Bieber','Billie Eilish','Harry Styles','Dua Lipa','The Weeknd',
    'Katy Perry','Lady Gaga','Rihanna','Beyonce','Sam Smith','Olivia Rodrigo','Shawn Mendes','Charlie Puth','Sia','Maroon 5',
    'Post Malone','Selena Gomez','Justin Timberlake','Miley Cyrus','Camila Cabello','Lizzo','Halsey','Demi Lovato','Nick Jonas','Meghan Trainor',
    'Ava Max','Carly Rae Jepsen','Jason Derulo','Bebe Rexha','Zara Larsson','Anne-Marie','James Arthur','Lewis Capaldi','Conan Gray','Rina Sawayama',
    'Pink','Nelly Furtado','Kelly Clarkson','Avril Lavigne','Britney Spears','Christina Aguilera','Spice Girls','One Direction','Jonas Brothers','5 Seconds of Summer',
    'Shakira','Jennifer Lopez','Enrique Iglesias','Ricky Martin','Pitbull','Gloria Estefan','Celine Dion','Whitney Houston','Mariah Carey','Janet Jackson',
    'Michael Jackson','Elvis Presley','Elton John','George Michael','ABBA','Bee Gees','Fleetwood Mac','Eagles','Stevie Wonder','Lionel Richie',
    'Phil Collins','Billy Joel','Rod Stewart','Cyndi Lauper','Madonna','Prince','David Bowie','Paul McCartney','Robbie Williams','Amy Winehouse',
    'Lana Del Rey','Lorde','Hozier','Passenger','James Bay','Tom Odell','Dermot Kennedy','Picture This','Niall Horan','Liam Payne',
    'Zayn','Louis Tomlinson','Jess Glynne','Sigrid','Dagny','Aurora','Astrid S','MO','Tove Lo','Robyn',
    'Ace of Base','Aqua','Vengaboys','Cascada','September','Agnes','Yohanna','Bjork','Enya','Kate Bush',
    'Sade','Lisa Stansfield','Dido','Natalie Imbruglia','Savage Garden','Daniel Bedingfield','Craig David','Leona Lewis','Alexandra Burke','Olly Murs',
    'JLS','Little Mix','Girls Aloud','The Saturdays','Sugababes','All Saints','Eternal','Destiny's Child','Backstreet Boys','NSYNC',
    'Westlife','Boyzone','Take That','911','A1','Blue','East 17','New Kids on the Block','98 Degrees','O-Town',
    'P!nk','Kesha','Ke$ha','Fergie','Gwen Stefani','No Doubt','Alanis Morissette','Sheryl Crow','Natalie Merchant','Sarah McLachlan',
    'Alanis Morissette','Fiona Apple','Jewel','Paula Cole','Meredith Brooks','Garbage','Shirley Manson','PJ Harvey','Tori Amos','Sinead O'Connor',
    'Annie Lennox','Eurythmics','Culture Club','Boy George','Duran Duran','Wham','Simply Red','Simply Red','Wet Wet Wet','Hue and Cry',
    'Siouxsie and the Banshees','The Cure','Depeche Mode','New Order','Pet Shop Boys','Erasure','Yazoo','OMD','Soft Cell','Human League',
    'Tears for Fears','a-ha','Howard Jones','China Crisis','Prefab Sprout','Lloyd Cole','The Housemartins','The Christians','Crowded House','Split Enz',
    'Roxette','Ace of Base','Cardigans','Sahara Hotnights','The Hives','Mando Diao','Kent','Soundtrack of Our Lives','bob hund','Refused',
    'Lykke Li','Jose Gonzalez','First Aid Kit','Fever Ray','The Knife','Jens Lekman','Peter Bjorn and John','I'm from Barcelona','Shout Out Louds','El Perro del Mar',
    'Coldplay','Snow Patrol','Keane','Travis','The Script','Kodaline','Passenger','James Bay','Tom Odell','Dermot Kennedy',
    'Ed Sheeran','Sam Smith','Adele','Amy Winehouse','Duffy','Joss Stone','Corinne Bailey Rae','Jack Johnson','John Mayer','Jason Mraz',
    'Train','Matchbox Twenty','Rob Thomas','Counting Crows','Third Eye Blind','Semisonic','Barenaked Ladies','Gin Blossoms','Toad the Wet Sprocket','Fastball',
    'Savage Garden','Sixpence None The Richer','Tal Bachman','Five for Fighting','Dido','Nelly Furtado','Michelle Branch','Vanessa Carlton','Avril Lavigne','Alanis Morissette'
  ],
  'k-pop': [
    'BTS','BLACKPINK','EXO','TWICE','Stray Kids','aespa','NewJeans','IVE','NCT 127','GOT7',
    'BIGBANG','2NE1','SHINee','Red Velvet','ITZY','Monsta X','SEVENTEEN','TXT','IU','Psy',
    'Super Junior','Girls Generation','Apink','MAMAMOO','ASTRO','ATEEZ','ENHYPEN','Wanna One','KARD','CL',
    'Taeyang','G-Dragon','Zico','Dean','Crush','Dynamic Duo','Epik High','Lee Hi','Hyuna','Sunmi',
    'Wonder Girls','4Minute','After School','Miss A','Sistar','AOA','T-ara','f(x)','Infinite','Block B',
    'B1A4','BAP','Teen Top','VIXX','BtoB','Dreamcatcher','Momoland','Loona','Everglow','Oh My Girl',
    'Gfriend','Weki Meki','Fromis 9','Cherry Bullet','Cravity','The Boyz','AB6IX','Verivery','Pentagon','UP10TION',
    'Golden Child','ONF','Ciipher','TOO','Kingdom','Mirae','Drippin','Vanner','E'LAST','GHOST9',
    'SHINee','2PM','2AM','Beast','B2ST','ZE:A','UKISS','F.T. Island','CNBlue','DAY6',
    'N.Flying','Highlight','Boyfriend','MYNAME','HISTORY','Cross Gene','Topp Dogg','MADTOWN','24K','Romeo',
    'Sonamoo','LABOUM','Hello Venus','Bestie','Stellar','Rainbow','Nine Muses','EXID','Dal Shabet','Jewelry',
    'Secret','Brown Eyed Girls','4L','5Dolls','A Pink','Crayon Pop','Tiny-G','Spica','Rania','Chocolat',
    'Tara','KARA','Brown Eyed Girls','Boa','Lee Hyori','FinKL','SES','Shinhwa','H.O.T','g.o.d',
    'Fly to the Sky','Turbo','Sechs Kies','NRG','S.E.S.','1TYM','Jinusean','Leessang','UV','Swings',
    'Beenzino','Dok2','The Quiett','Simon D','Jay Park','Loco','Gray','Elo','Hoody','Rad Museum',
    'Heize','Suran','Eaeon','Colde','offonoff','Cifika','So!YoON!','Yerin Baek','BOL4','Melomance',
    'Standing Egg','Urban Zakapa','10cm','Busker Busker','Roy Kim','Lim Chang-jung','Park Hyo-shin','Naul','Kim Bum-soo','Sung Si-kyung',
    'Lee Seung-gi','Lee Juck','Gummy','Ailee','Baek Ji-young','Davichi','Sistar19','Hyolyn','Bora','Soyou',
    'Kwon Jin-ah','Jung Seung-hwan','Oh Hyuk','Hyukoh','Jannabi','Nell','The Rose','DAY6','N.Flying','FT Island',
    'CNBlue','Lee Hong-ki','Jung Yong-hwa','Yoon Do-hyun','Kim Jong-wan','Kim Feel','Paul Kim','Lim Young-woong','Kim Ho-joong','Young K',
    'Wonstein','pH-1','Owen Ovadoz','Woo','Lee Young-ji','BIBI','SOLE','Jvcki Wai','Ash Island','Haon',
    'Kid Milli','Lil Boi','Sik-K','Punchnello','pH-1','Loopy','Coogie','Giriboy','Olltii','Loco',
    'Khundi Panda','Mushvenom','Superbee','Osshun Gum','C Jamm','Hangzoo','Deepflow','G2','Ama B','DOK2',
    'G-Dragon','T.O.P','Taeyang','Daesung','Seungri','CL','Minzy','Park Bom','Dara','Jessica',
    'Taeyeon','Tiffany','Sooyoung','Yoona','Yuri','Seohyun','Sunny','Hyoyeon','Krystal','Sulli',
    'Suzy','miss A','JYP','Rain','Se7en','Wheesung','Brian Joo','K.Will','MC Mong','Lee Seung-gi'
  ],
  'hip-hop': [
    'Drake','Kendrick Lamar','Eminem','Jay-Z','Kanye West','Cardi B','Nicki Minaj','Post Malone','Travis Scott','J. Cole',
    'Lil Wayne','Snoop Dogg','50 Cent','Nas','ASAP Rocky','Megan Thee Stallion','Tyler the Creator','Future','Lil Uzi Vert','21 Savage',
    'DaBaby','Roddy Ricch','Juice WRLD','Logic','Big Sean','Wiz Khalifa','Mac Miller','Kid Cudi','Chance the Rapper','Childish Gambino',
    '2 Chainz','Meek Mill','Rick Ross','Gucci Mane','Young Thug','Lil Baby','Gunna','Jack Harlow','Polo G','Don Toliver',
    'Ice Cube','Ice-T','Run DMC','Beastie Boys','LL Cool J','Public Enemy','Tupac Shakur','The Notorious B.I.G.','Missy Elliott','Lauryn Hill',
    'Andre 3000','Outkast','Lupe Fiasco','Common','Talib Kweli','Mos Def','DMX','Ja Rule','Busta Rhymes','Method Man',
    'Redman','Ghostface Killah','Raekwon','GZA','RZA','Wu-Tang Clan','Cypress Hill','Bone Thugs-n-Harmony','Twista','Tech N9ne',
    'Atmosphere','Aesop Rock','MF Doom','Madlib','J Dilla','Pharrell Williams','Timbaland','Ludacris','T.I.','Young Jeezy',
    'Fabolous','Jadakiss','Styles P','Sheek Louch','The LOX','Swizz Beatz','Just Blaze','DJ Premier','Pete Rock','Large Professor',
    'Q-Tip','Phife Dawg','A Tribe Called Quest','De La Soul','Jungle Brothers','Black Sheep','Leaders of the New School','Fu-Schnickens','Artifacts','Smif-N-Wessun',
    'Black Moon','Heltah Skeltah','Originoo Gunn Clappaz','Buckshot','5th Platoon','Cocoa Brovaz','Boot Camp Clik','Gang Starr','Guru','DJ Premier',
    'Biggie Smalls','Jay-Z','Nas','Rakim','Big Daddy Kane','Kool G Rap','KRS-One','Boogie Down Productions','NWA','Eazy-E',
    'Dr. Dre','Ice Cube','MC Ren','Yella','Above the Law','King Tee','Compton's Most Wanted','AMG','Hi-C','Mc Eiht',
    'Spice 1','Too Short','E-40','Mac Dre','Brotha Lynch Hung','C-Bo','Messy Marv','Cellski','B-Legit','Celly Cel',
    'Bun B','Pimp C','UGK','Scarface','Z-Ro','Slim Thug','Paul Wall','Mike Jones','Chamillionaire','Lil Keke',
    'Big Moe','Fat Pat','DJ Screw','H.A.W.K.','ESG','Devin the Dude','Odd Future','Earl Sweatshirt','Frank Ocean','Hodgy',
    'Left Brain','Mike G','Jasper Dolphin','Taco','Domo Genesis','Syd','Matt Martians','Casey Veggies','Na'el','Mike G',
    'Big K.R.I.T.','Curren$y','Wale','Kid Ink','Ace Hood','Stalley','Rittz','Yelawolf','Machine Gun Kelly','Token',
    'NF','Lecrae','Andy Mineo','KB','Trip Lee','Propaganda','Json','Derek Minor','Sho Baraka','Social Club Misfits',
    'Flame','Da T.R.U.T.H.','Beautiful Eulogy','Braille','Odd Thomas','Listeners','Humble Beast','116 Clique','Reach Records','Cross Movement',
    'The Lox','Dipset','Cam'ron','Jim Jones','Juelz Santana','Freekey Zekey','Hell Rell','JR Writer','Sen City','Un Kasa',
    'Lil Kim','Foxy Brown','Trina','Eve','Remy Ma','Khia','Gangsta Boo','La Chat','Jacki-O','Rasheeda',
    'Iggy Azalea','Angel Haze','Azealia Banks','Snow tha Product','Nitty Scott','MC Lyte','Queen Latifah','Salt-N-Pepa','TLC','Destiny's Child',
    'Lauryn Hill','Mary J. Blige','Aaliyah','Faith Evans','Lil Mo','Tweet','Blu Cantrell','Amerie','Ashanti','Ciara',
    'Monica','Brandy','Kelis','Mya','Nivea','Brooke Valentine','Keyshia Cole','Tiffany Evans','Teairra Mari','Letoya Luckett',
    'Da Brat','Boss','Yo-Yo','Conscious Daughters','Heather B','Bahamadia','Jean Grae','Invincible','Eternia','Psalm One',
    'Dessa','Sonia Sanchez','Nikki Giovanni','Gil Scott-Heron','The Last Poets','Amiri Baraka','Saul Williams','Ursula Rucker','Taalam Acey','Def Poetry Jam',
    'Mos Def','Talib Kweli','Dead Prez','Immortal Technique','Jedi Mind Tricks','Army of the Pharaohs','Vinnie Paz','Planetary','Esoteric','R.A. the Rugged Man',
    '2Pac','Biggie','Big L','Big Pun','Pun','Fat Joe','Terror Squad','M.O.P.','Lil Fame','Billy Danze',
    'Onyx','Sticky Fingaz','Fredro Starr','Sonsee','Crisis','Brickz','Dirt McGirt','ODB','Ghostface Killah','Raekwon'
  ],
  'r-b': [
    'Beyonce','Rihanna','Frank Ocean','The Weeknd','SZA','Usher','Alicia Keys','John Legend','Mary J. Blige','Ne-Yo',
    'Chris Brown','Miguel','Jhene Aiko','Khalid','Daniel Caesar','Summer Walker','Bryson Tiller','Normani','Lucky Daye','Jazmine Sullivan',
    'Giveon','Brent Faiyaz','6LACK','Kehlani','Victoria Monet','Ella Mai','Tank','Teyana Taylor','Jeremih','Jacquees',
    'Trey Songz','Lloyd','Omarion','Mario','Ginuwine','H.E.R.','PJ Morton','Eric Bellinger','Musiq Soulchild','Maxwell',
    'D'Angelo','Erykah Badu','Jill Scott','Anthony Hamilton','Ledisi','Marsha Ambrosius','Fantasia','Jennifer Hudson','Keyshia Cole','Monica',
    'Brandy','TLC','En Vogue','SWV','Xscape','Total','702','Brownstone','Soul for Real','Silk',
    'Troop','El DeBarge','DeBarge','New Edition','Bell Biv Devoe','Bobby Brown','Johnny Gill','Ralph Tresvant','Babyface','Toni Braxton',
    'Whitney Houston','Mariah Carey','Janet Jackson','Anita Baker','Aretha Franklin','Patti LaBelle','Diana Ross','Gladys Knight','Chaka Khan','Luther Vandross',
    'Stevie Wonder','Al Green','Smokey Robinson','Teddy Pendergrass','Lionel Richie','Barry White','Marvin Gaye','Isaac Hayes','Curtis Mayfield','Al Green',
    'Sam Cooke','Otis Redding','James Brown','Ray Charles','Etta James','Tina Turner','Ike Turner','Wilson Pickett','Solomon Burke','Percy Sledge',
    'Eddie Floyd','Sam and Dave','Booker T and the MGs','Stax Records','Volt Records','Atlantic Records','Motown Records','Chess Records','Sue Records','Specialty Records',
    'Four Tops','Temptations','Supremes','Miracles','Contours','Marvelettes','Martha and the Vandellas','Jr. Walker','Commodores','Earth Wind and Fire',
    'Kool and the Gang','Maze','Frankie Beverly','Isley Brothers','O'Jays','Harold Melvin','Blue Notes','Stylistics','Delfonics','Spinners',
    'Chi-Lites','Dramatics','Moments','Whatnauts','Main Ingredient','Manhattans','Tavares','Heatwave','Rose Royce','Rufus',
    'Chaka Khan','Average White Band','Tower of Power','War','Ohio Players','Funkadelic','Parliament','George Clinton','Bootsy Collins','Bernie Worrell',
    'Roger Troutman','Zapp','Gap Band','Charlie Wilson','Leon Sylvers','Dynasty','Shalamar','Jeffrey Daniel','Howard Hewett','Jody Watley',
    'Alexander O'Neal','Cherrelle','Pebbles','Lisa Lisa','Cult Jam','Full Force','Exposé','Freestyle','Sweet Sensation','Cover Girls',
    'Seduction','Coro','Trinere','Lissette','Brenda K. Starr','TKA','George LaMond','Judy Torres','Cynthia','Stevie B',
    'Color Me Badd','Hi-Five','Another Bad Creation','Boyz II Men','Jodeci','Dru Hill','Next','112','Jagged Edge','B2K',
    'Pretty Ricky','Pleasure P','Sammie','Bobby Valentino','Pleasure','Avant','Joe','Case','Carl Thomas','Donell Jones',
    'Jon B','Changing Faces','Ideal','Wild Orchid','Blaque','3LW','Destiny's Child','Solange','Beyonce','Kelly Rowland',
    'Michelle Williams','LeToya','LaTavia','Fantasia','Jennifer Hudson','Jordin Sparks','Melanie Fiona','Estelle','Leona Lewis','Alexandra Burke',
    'Adele','Amy Winehouse','Duffy','Joss Stone','Corinne Bailey Rae','Laura Mvula','Lianne La Havas','Emeli Sande','Rebecca Ferguson','Beverley Knight',
    'Mica Paris','Alison Moyet','Ruby Turner','Brenda Cochrane','Lisa Stansfield','Des'ree','Sinitta','Lulu','Shirley Bassey','Cleo Laine',
    'Roberta Flack','Donny Hathaway','Minnie Riperton','Jean Carne','Phyllis Hyman','Deniece Williams','Randy Crawford','Regina Belle','Peabo Bryson','James Ingram'
  ],
  'band': [
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
    'Shinedown','Staind','Puddle of Mudd','Drowning Pool','Default','Theory of a Deadman','Saliva','Cold','Injected','Submersed',
    'Lifehouse','Switchfoot','Relient K','MxPx','Anberlin','Hawthorne Heights','Senses Fail','Silverstein','Underoath','Norma Jean',
    'Poison the Well','Remembering Never','Beloved','Nodes of Ranvier','As I Lay Dying','Killswitch Engage','All That Remains','Shadows Fall','Unearth','Darkest Hour',
    'Lamb of God','Mastodon','Tool','A Perfect Circle','Deftones','System of a Down','Rage Against the Machine','Audioslave','Temple of the Dog','Mad Season',
    'Blind Melon','Live','Better Than Ezra','Toadies','Spacehog','Dishwalla','Sponge','Fuel','Oleander','Stroke 9',
    'Vertical Horizon','SR-71','Something Corporate','The Starting Line','Finch','Armor for Sleep','Story of the Year','From First to Last','Emery','Copeland',
    'Further Seems Forever','Dashboard Confessional','Brand New','Taking Back Sunday','Thrice','Atreyu','Avenged Sevenfold','Bullet for My Valentine','Trivium','Chimaira',
    'Soilwork','In Flames','Dark Tranquillity','At the Gates','The Haunted','Arch Enemy','Carcass','Cathedral','Napalm Death','Cannibal Corpse',
    'Morbid Angel','Death','Obituary','Entombed','Dismember','Grave','Unleashed','Hypocrisy','Enslaved','Mayhem',
    'Darkthrone','Burzum','Emperor','Immortal','Satyricon','Gorgoroth','Dimmu Borgir','Cradle of Filth','Behemoth','Marduk',
    'Watain','Dark Funeral','Funeral Mist','Deathspell Omega','Mgla','Batushka','Ghost','Tribulation','Vampire','Morbus Chron',
    'Graveyard','Kadavar','Blues Pills','Witchcraft','Orchid','Dead Meadow','Naam','Earthless','Yob','Sleep',
    'Electric Wizard','Bongzilla','Weedeater','Eyehategod','Crowbar','Down','Pantera','Superjoint Ritual','Philip H. Anselmo','Corrosion of Conformity',
    'Clutch','Fu Manchu','Monster Magnet','Nebula','Karma to Burn','Sixty Watt Shaman','Spirit Caravan','The Obsessed','Wino','St. Vitus',
    'Candlemass','Trouble','Pentagram','Witchfinder General','Black Widow','Coven','Black Mass','Catapilla','Comus','Incredible Hog',
    'Atomic Rooster','Uriah Heep','Budgie','Hawkwind','Groundhogs','Chicken Shack','Ten Years After','Savoy Brown','Blodwyn Pig','Jethro Tull',
    'Fairport Convention','Steeleye Span','Pentangle','Incredible String Band','Trees','Mellow Candle','Spirogyra','Mr. Fox','Dando Shaft','Forest'
  ],
  'jazz': [
    'Miles Davis','John Coltrane','Louis Armstrong','Ella Fitzgerald','Frank Sinatra','Billie Holiday','Duke Ellington','Charlie Parker','Herbie Hancock','Thelonious Monk',
    'Chet Baker','Dave Brubeck','Nina Simone','Norah Jones','Diana Krall','John Scofield','Pat Metheny','Wynton Marsalis','Kamasi Washington','Gregory Porter',
    'Robert Glasper','Esperanza Spalding','Brad Mehldau','Joshua Redman','Chris Potter','Kurt Rosenwinkel','Bill Evans','Wes Montgomery','Chick Corea','McCoy Tyner',
    'Wayne Shorter','Sonny Rollins','Dizzy Gillespie','Art Blakey','Clifford Brown','Stan Getz','Dexter Gordon','Cannonball Adderley','Lee Morgan','Freddie Hubbard',
    'Woody Shaw','Lee Konitz','Paul Desmond','Gerry Mulligan','Zoot Sims','Al Cohn','Jim Hall','Joe Pass','Barney Kessel','Charlie Christian',
    'Django Reinhardt','Stephane Grappelli','Oscar Peterson','Art Tatum','Bud Powell','Red Garland','Tommy Flanagan','Hank Jones','Barry Harris','Cedar Walton',
    'Kenny Barron','Mulgrew Miller','Cyrus Chestnut','Gonzalo Rubalcaba','Michel Camilo','Danilo Perez','Chucho Valdes','Hugh Masekela','Miriam Makeba','Abdullah Ibrahim',
    'Ray Charles','Mose Allison','Horace Silver','Bobby Timmons','Junior Mance','Les McCann','Eddie Harris','Ramsey Lewis','Ahmad Jamal','Nat King Cole',
    'Oscar Brown Jr','Mark Murphy','Jon Hendricks','Annie Ross','Dave Lambert','Lambert Hendricks and Ross','Betty Carter','Sheila Jordan','Abbey Lincoln','Cassandra Wilson',
    'Dianne Reeves','Dee Dee Bridgewater','Carmen McRae','Sarah Vaughan','Anita O'Day','June Christy','Chris Connor','Helen Merrill','Shirley Horn','Stacey Kent',
    'Jane Monheit','Tierney Sutton','Karrin Allyson','Holly Cole','Patricia Barber','Madeleine Peyroux','Jamie Cullum','Michael Buble','Harry Connick Jr','Joe Williams',
    'Jon Faddis','Tom Harrell','Arturo Sandoval','Claudio Roditi','Valery Ponomarev','Brian Lynch','Jeremy Pelt','Nicholas Payton','Terence Blanchard','Roy Hargrove',
    'Wallace Roney','Marcus Roberts','Marcus Printup','Ryan Kisor','Jim Rotondi','Tim Hagans','Randy Brecker','Michael Brecker','Bob Berg','Joe Lovano',
    'Jerry Bergonzi','George Garzone','Bill Barron','Ted Curson','Booker Ervin','Clifford Jordan','Junior Cook','Hank Mobley','Benny Golson','Johnny Griffin',
    'Warne Marsh','Art Pepper','Herb Geller','Bill Perkins','Jack Montrose','Bob Cooper','Richie Kamuca','Jimmy Giuffre','Bob Brookmeyer','Al Grey',
    'Slide Hampton','Curtis Fuller','Grachan Moncur III','Roswell Rudd','Paul Rutherford','Albert Mangelsdorff','Ray Anderson','Craig Harris','Frank Lacy','Steve Turre',
    'James Carter','David Murray','David S. Ware','Charles Gayle','Peter Brotzmann','Evan Parker','Derek Bailey','Fred Frith','Henry Kaiser','Eugene Chadbourne',
    'John Zorn','Bill Frisell','Marc Ribot','Nels Cline','Ben Monder','Lage Lund','Jonathan Kreisberg','Mike Moreno','Lionel Loueke','Rez Abbasi',
    'Gilad Hekselman','Julian Lage','Mary Halvorson','Brandon Ross','Jean-Paul Bourelly','Kevin Eubanks','Russell Malone','Peter Bernstein','Mark Whitfield','Howard Alden',
    'Gene Bertoncini','Bucky Pizzarelli','John Pizzarelli','Kenny Burrell','Grant Green','Milt Jackson','Bobby Hutcherson','Gary Burton','Dave Samuels','Terry Gibbs',
    'Lionel Hampton','Milt Jackson','Red Norvo','Victor Feldman','Julius Watkins','Ray Draper','Don Butterfield','Harvey Phillips','Howard Johnson','Bob Stewart',
    'Charles Mingus','Scott LaFaro','Paul Chambers','Ron Carter','Niels-Henning Pedersen','Dave Holland','Charlie Haden','Gary Peacock','Eddie Gomez','Marc Johnson',
    'John Patitucci','Christian McBride','Avishai Cohen','Ben Street','Larry Grenadier','Matt Penman','Scott Colley','Thomas Morgan','Eric Revis','Damon Banks',
    'Gerald Cleaver','Jack DeJohnette','Tony Williams','Elvin Jones','Roy Haynes','Max Roach','Billy Higgins','Jimmy Cobb','Philly Joe Jones','Art Taylor',
    'Louis Hayes','Albert Heath','Mickey Roker','Ben Riley','Grady Tate','Mel Lewis','Buddy Rich','Gene Krupa','Louie Bellson','Jo Jones'
  ],
  'reggae': [
    'Bob Marley','Damian Marley','Shaggy','Sean Paul','Shabba Ranks','Buju Banton','Burning Spear','Jimmy Cliff','Steel Pulse','Ziggy Marley',
    'Sizzla','Capleton','Beenie Man','Morgan Heritage','Lucky Dube','Peter Tosh','Bunny Wailer','Chronixx','Protoje','Koffee',
    'Jesse Royal','Kabaka Pyramid','Jah Cure','Tarrus Riley','Etana','Romain Virgo','Busy Signal','Mavado','Vybz Kartel','Popcaan',
    'Aidonia','Konshens','I-Octane','Demarco','Richie Spice','Fantan Mojah','Luciano','Anthony B','Cocoa Tea','Freddie McGregor',
    'Dennis Brown','Gregory Isaacs','Toots and the Maytals','Desmond Dekker','Ken Boothe','John Holt','Alton Ellis','Delroy Wilson','Slim Smith','Stranger Cole',
    'Keith Hudson','Prince Far I','Lee Perry','King Tubby','Augustus Pablo','Scientist','Yellowman','Eek-A-Mouse','Brigadier Jerry','Charlie Chaplin',
    'Josey Wales','Lieutenant Stitchie','Papa San','Ninja Man','Bounty Killer','Elephant Man','Spragga Benz','Merciless','Tony Rebel','Garnett Silk',
    'Culture','Israel Vibration','The Abyssinians','Melodians','Ethiopians','Wailing Souls','Mighty Diamonds','Third World','Inner Circle','Maxi Priest',
    'Aswad','Bitty McLean','Kofi','UB40','Musical Youth','Eddy Grant','Joan Armatrading','Janet Kay','Carroll Thompson','Sandra Cross',
    'Barry Biggs','Boris Gardiner','Ernie Smith','Dobby Dobson','Hopeton Lewis','Pat Kelly','Stranger and Patsy','Marcia Griffiths','Judy Mowatt','Rita Marley',
    'I Threes','Junior Murvin','Max Romeo','Big Youth','U-Roy','I-Roy','Dennis Alcapone','Dillinger','Trinity','Ranking Trevor',
    'Tapper Zukie','Prince Jazzbo','Ranking Joe','General Echo','Lone Ranger','Nicodemus','Papa Michigan','General Saint','Clint Eastwood','Toyan',
    'Half Pint','Sugar Minott','Johnny Osbourne','Don Carlos','Black Uhuru','Sly and Robbie','Robbie Shakespeare','Sly Dunbar','Mikey Chung','Earl Chinna Smith',
    'Augustus Pablo','Lloyd Parks','Fully Fullwood','Bagga Walker','George Fullwood','Boris Gardiner','Gladstone Anderson','Winston Wright','Ansel Collins','Jackie Mittoo',
    'Skatalites','Don Drummond','Roland Alphonso','Tommy McCook','Johnny Moore','Lester Sterling','Lloyd Brevett','Lloyd Knibb','Jah Jerry','Drumbago',
    'Toots Hibbert','Leroy Sibbles','Heptones','Melodians','Ethiopians','Wailing Souls','Abyssinians','Culture','Burning Spear','Steel Pulse',
    'Aswad','Misty in Roots','Capital Letters','Merger','Musical Youth','UB40','Madness','Specials','Selecter','Beat',
    'English Beat','Toasters','Hepcat','Pietasters','Stubborn All-Stars','Slackers','Aggrolites','Reel Big Fish','Less Than Jake','Mighty Mighty Bosstones',
    'Sublime','311','No Doubt','Gwen Stefani','Pepper','Slightly Stoopid','Rebelution','Stick Figure','Iration','Ballyhoo',
    'Collie Buddz','Matisyahu','Michael Franti','Spearhead','Ziggy Marley','Stephen Marley','Ky-Mani Marley','Julian Marley','Jo Mersa Marley','Skip Marley',
    'Wyclef Jean','Lauryn Hill','Fugees','Pras Michel','Beenie Man','Bounty Killer','Elephant Man','TOK','Voicemail','Vybz Kartel',
    'Alkaline','Mavado','Popcaan','Dre Island','Lila Ike','Sevana','Jah9','Queen Ifrica','Ce'cile','Lady Saw',
    'Tanya Stephens','Diana King','Nadine Sutherland','Pam Hall','Marcia Griffiths','Judy Mowatt','Rita Marley','Sister Nancy','Macka Diamond','Spice',
    'Ishawna','Dovey Magnum','Lisa Mercedez','Jada Kingdom','Shenseea','Shaneil Muir','Govana','Skillibeng','Teejay','Intence',
    'Jahvillani','Masicka','Chronic Law','Squash','6ixx','Tommy Lee Sparta','Alkaline','Rygin King','Valiant','Chunkz'
  ],
};

function getNextArtist(genre) {
  const list = ARTIST_LISTS[genre] || ARTIST_LISTS['pop'];
  const seenKey = 'musiccard_seen_' + genre;
  const orderKey = 'musiccard_order_' + genre;

  let seen = [];
  let order = [];

  try {
    seen = JSON.parse(localStorage.getItem(seenKey) || '[]');
    order = JSON.parse(localStorage.getItem(orderKey) || '[]');
  } catch(e) {}

  if (order.length === 0) {
    order = [...list].sort(() => Math.random() - 0.5);
    seen = [];
  }

  const next = order.find(function(a) { return !seen.includes(a); });
  if (!next) {
    order = [...list].sort(() => Math.random() - 0.5);
    seen = [order[0]];
    localStorage.setItem(orderKey, JSON.stringify(order));
    localStorage.setItem(seenKey, JSON.stringify(seen));
    return order[0];
  }

  seen.push(next);
  localStorage.setItem(orderKey, JSON.stringify(order));
  localStorage.setItem(seenKey, JSON.stringify(seen));
  return next;
}

let currentLang = 'en';
let currentGenre = 'pop';
let isLoading = false;
let currentArtistName = null;
let currentImageUrl = null;

try {
  currentLang = localStorage.getItem('musiccard_lang') || 'en';
  currentGenre = localStorage.getItem('musiccard_genre') || 'pop';
} catch(e) {}

function t(key) {
  return (UI_TEXT[currentLang] && UI_TEXT[currentLang][key]) || UI_TEXT['en'][key];
}

function renderGenreTabs() {
  var container = document.getElementById('genre-tabs');
  if (!container) return;
  container.innerHTML = GENRES.map(function(g) {
    return '<button class="genre-tab ' + (g.id === currentGenre ? 'active' : '') + '" onclick="setGenre(\'' + g.id + '\')">' + (g.label[currentLang] || g.label['en']) + '</button>';
  }).join('');
}

function renderLangTabs() {
  var container = document.getElementById('lang-tabs');
  if (!container) return;
  container.innerHTML = LANGUAGES.map(function(l) {
    return '<button class="lang-tab ' + (l.id === currentLang ? 'active' : '') + '" onclick="setLang(\'' + l.id + '\')">' + l.label + '</button>';
  }).join('');
}

function setGenre(id) {
  currentGenre = id;
  try { localStorage.setItem('musiccard_genre', id); } catch(e) {}
  renderGenreTabs();
}

async function setLang(id) {
  currentLang = id;
  try { localStorage.setItem('musiccard_lang', id); } catch(e) {}
  renderLangTabs();
  renderGenreTabs();
  updateUIText();
  if (currentArtistName) {
    await reloadArtistInfo(currentArtistName);
  }
}

function updateUIText() {
  var el;
  el = document.getElementById('load-btn'); if(el) el.textContent = t('loadBtn');
  el = document.getElementById('slide-hint-text'); if(el) el.textContent = t('slide');
  el = document.getElementById('label-debut'); if(el) el.textContent = t('debut');
  el = document.getElementById('label-bio'); if(el) el.textContent = t('bio');
  el = document.getElementById('label-songs'); if(el) el.textContent = t('songs');
  el = document.getElementById('genre-label'); if(el) el.textContent = t('genre');
  el = document.getElementById('lang-label'); if(el) el.textContent = t('lang');
}

async function fetchArtistInfo(artistName, genre) {
  var res = await fetch('/api/artist-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre: genre || currentGenre, language: currentLang, artistName: artistName }),
  });
  if (!res.ok) throw new Error('API error ' + res.status);
  return await res.json();
}

function renderArtistInfo(info) {
  var artistName = info.artistName || currentArtistName;
  var imageUrl = info.imageUrl || null;
  currentArtistName = artistName;
  currentImageUrl = imageUrl;

  var heroEl = document.getElementById('artist-hero-inner');
  if (imageUrl) {
    heroEl.innerHTML = '<img src="' + imageUrl + '" alt="' + artistName + '" style="width:100%;height:100%;object-fit:cover;object-position:center top;opacity:0.95;" onerror="this.parentElement.innerHTML=\'<div style=\\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:linear-gradient(135deg,#2d2d5e,#4a2d6e)\\\'>🎤</div>\'">';
  } else {
    heroEl.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;background:linear-gradient(135deg,#2d2d5e,#4a2d6e);">🎤</div>';
  }

  var nameEl = document.getElementById('artist-name');
  if(nameEl) nameEl.textContent = artistName;

  var genreEl = document.getElementById('artist-genre');
  if(genreEl) {
    var gObj = GENRES.find(function(g){ return g.id === currentGenre; });
    genreEl.textContent = gObj ? (gObj.label[currentLang] || gObj.label['en']) : currentGenre;
  }

  var debutEl = document.getElementById('info-debut');
  if(debutEl) debutEl.textContent = info.debut || '';

  var bioEl = document.getElementById('info-bio');
  if(bioEl) bioEl.textContent = info.bio || '';

  var songsList = document.getElementById('songs-list');
  if(songsList) {
    songsList.innerHTML = '';
    (info.songs || []).forEach(function(song) {
      var ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(song.youtube_query);
      var ytmUrl = 'https://music.youtube.com/search?q=' + encodeURIComponent(song.youtube_music_query || song.title);
      var item = document.createElement('div');
      item.className = 'song-item';
      item.innerHTML = '<span class="song-title">' + song.title + '</span>' +
        '<div style="display:flex;gap:6px;flex-shrink:0;">' +
        '<a class="yt-btn" href="' + ytUrl + '" target="_blank" title="YouTube">' +
        '<svg width="18" height="13" viewBox="0 0 18 13" fill="none"><path d="M17.6 2.03C17.4 1.27 16.8 0.67 16.04 0.47 14.63 0.1 9 0.1 9 0.1S3.37 0.1 1.96 0.47C1.2 0.67 0.6 1.27 0.4 2.03 0.03 3.44 0.03 6.5 0.03 6.5S0.03 9.56 0.4 10.97C0.6 11.73 1.2 12.33 1.96 12.53 3.37 12.9 9 12.9 9 12.9S14.63 12.9 16.04 12.53C16.8 12.33 17.4 11.73 17.6 10.97 17.97 9.56 17.97 6.5 17.97 6.5S17.97 3.44 17.6 2.03Z" fill="white"/><path d="M7.2 9.26L11.84 6.5 7.2 3.74V9.26Z" fill="#FF0000"/></svg>' +
        '</a>' +
        '<a class="ytm-btn" href="' + ytmUrl + '" target="_blank" title="YouTube Music">' +
        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="4" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10C3 6.13 6.13 3 10 3Z" fill="#FF0000"/></svg>' +
        '</a></div>';
      songsList.appendChild(item);
    });
  }

  var contentArea = document.getElementById('content-area');
  if(contentArea) contentArea.style.display = 'flex';
}

async function reloadArtistInfo(artistName) {
  if (isLoading) return;
  isLoading = true;
  var overlay = document.getElementById('loading-overlay');
  var loadingText = document.getElementById('loading-text');
  if(overlay) overlay.style.display = 'flex';
  if(loadingText) loadingText.textContent = t('loading');
  try {
    var info = await fetchArtistInfo(artistName, currentGenre);
    info.imageUrl = currentImageUrl;
    renderArtistInfo(info);
    updateUIText();
  } catch(e) {
    if(loadingText) loadingText.textContent = t('error');
    setTimeout(function(){ if(overlay) overlay.style.display = 'none'; }, 2000);
    isLoading = false;
    return;
  }
  if(overlay) overlay.style.display = 'none';
  isLoading = false;
}

async function loadArtist() {
  if (isLoading) return;
  isLoading = true;

  var overlay = document.getElementById('loading-overlay');
  var contentArea = document.getElementById('content-area');
  var loadingText = document.getElementById('loading-text');

  if(overlay) overlay.style.display = 'flex';
  if(contentArea) contentArea.style.display = 'none';
  if(loadingText) loadingText.textContent = t('loading');

  try {
    var artistName = getNextArtist(currentGenre);
    var info = await fetchArtistInfo(artistName, currentGenre);
    renderArtistInfo(info);
    if(overlay) overlay.style.display = 'none';
  } catch(e) {
    if(loadingText) loadingText.textContent = t('error');
    setTimeout(function(){ if(overlay) overlay.style.display = 'none'; }, 2000);
  }

  isLoading = false;
}

document.addEventListener('DOMContentLoaded', function() {
  renderGenreTabs();
  renderLangTabs();
  updateUIText();
});
