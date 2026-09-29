export const MENU_ITEMS = [
  // 1. Tavuk Sarma
  {
    id: 'tavuk-sarma',
    name: 'Özel Soslu Tavuk Sarma',
    category: 'sarma',
    tag: 'Şefin İmzası',
    price: 185,
    oldPrice: 210,
    rating: 4.95,
    reviews: 1420,
    prepTime: '6-8 dk',
    spiciness: 2,
    calories: '540 kcal',
    image: '/images/tavuk_durum.jpg',
    realImage: '/images/real/real_tavuk_porsiyon.jpg',
    description: '24 saat özel biber salçası ve zeytinyağıyla terbiye edilmiş tavuk göğsü & but eti; odun ateşinde mühürlenip köz biber, sumaklı soğan ve taze tırnaklı lavaşa sarılır.',
    highlights: ['24 Saat Terbiyeli', 'Odun Ateşi Közü', 'Gizli Baharatlı Özel Sos'],
    ingredients: ['Marine Tavuk Eti', 'Köz Kırmızı Biber', 'Sumaklı Soğan Piyazı', 'Taze Nane & Maydanoz', 'Özel Faruk Usta Sosu'],
    isPopular: true
  },
  // 2. Tavuk Şiş
  {
    id: 'tavuk-sis',
    name: 'Meşe Közünde Tavuk Şiş',
    category: 'sarma',
    tag: 'Ocakbaşı Köz',
    price: 210,
    oldPrice: 235,
    rating: 4.92,
    reviews: 1190,
    prepTime: '8-10 dk',
    spiciness: 2,
    calories: '580 kcal',
    image: '/images/tavuk_sis.jpg',
    realImage: '/images/real/real_tavuk_sis_ocak.jpg',
    description: 'Meşe kömürü mangalında nar gibi kızaran sulu tavuk but şişler, közlenmiş Antep biberi ve köz domates eşliğinde taze lavaş veya porsiyon olarak sunulur.',
    highlights: ['Mangalda Köz Ateşi', 'Sulu & Yumuşak Lokum Et', 'Köz Domates & Biber Garnitür'],
    ingredients: ['Tavuk But Şiş', 'Köz Yeşil Antep Biberi', 'Köz Köy Domatesi', 'Sumaklı Maydanoz', 'Tırnak Lavaş'],
    isPopular: true
  },
  // 3. Nohut Sarma
  {
    id: 'nohut-sarma',
    name: 'Gaziantep Meşhur Nohut Sarma',
    category: 'sarma',
    tag: 'Antep Efsanesi',
    price: 140,
    oldPrice: 160,
    rating: 4.98,
    reviews: 2350,
    prepTime: '3-5 dk',
    spiciness: 3,
    calories: '420 kcal',
    image: '/images/nohut_durum.jpg',
    realImage: '/images/real/real_nohut_prep.jpg',
    description: 'Et ve ilikli kemik suyunda 8 saat kaynayan lokum nohutlar; tezgâhta tırnaklı sıcacık lavaşa kepçeyle dökülür. Taze çekilmiş Antep kimyonu, sumak, pul biber, maydanoz ve soğanla sarılır.',
    highlights: ['8 Saat Kemik Suyunda Pişmiş', 'Taş Fırın Tırnak Lavaş', 'Özel Antep Kimyonu & Sumak'],
    ingredients: ['Kemik Sulu Nohut', 'Gaziantep Kimyonu', 'Hakiki Sumak', 'İpek Pul Biber', 'Maydanoz', 'Kırmızı Soğan', 'Domates', 'Tırnak Lavaş'],
    isPopular: true
  },
  // 4. Ciğer Kavurma Sarma
  {
    id: 'ciger-kavurma-sarma',
    name: 'Közde Ciğer Kavurma Sarma',
    category: 'sarma',
    tag: 'Hakiki Kuzu Ciğeri',
    price: 240,
    oldPrice: 270,
    rating: 4.97,
    reviews: 1980,
    prepTime: '5-7 dk',
    spiciness: 4,
    calories: '510 kcal',
    image: '/images/ciger_durum.jpg',
    realImage: '/images/real/real_counter_showcase.jpg',
    description: 'Günlük taze kuzu ciğeri; yüksek ateşte kuyruk yağıyla cızbız kavrulup acı toz biber ve kimyonla harmanlanır. İncecik tırnak lavaş içinde bol sumaklı nane ve soğan piyazıyla sunulur.',
    highlights: ['Günlük Taze Kuzu Ciğeri', 'Kuyruk Yağında Cızbız', 'Bol Sumak & Taze Nane'],
    ingredients: ['Kuzu Ciğeri', 'Kuyruk Yağı', 'Antep Acı Biberi', 'Kimyon', 'Sumak', 'Mor Soğan', 'Taze Nane', 'Tırnak Lavaş'],
    isPopular: true
  },
  // 5. Tavuk Sote Dürüm
  {
    id: 'tavuk-sote-durum',
    name: 'Tereyağlı Tavuk Sote Dürüm',
    category: 'durum',
    tag: 'Bol Soslu Lezzet',
    price: 195,
    oldPrice: 220,
    rating: 4.88,
    reviews: 870,
    prepTime: '6-8 dk',
    spiciness: 2,
    calories: '560 kcal',
    image: '/images/tavuk_sote_durum.jpg',
    realImage: '/images/real/real_counter_showcase.jpg',
    description: 'Köy tereyağında renkli köy biberleri, taze domates ve sarımsakla sotelenen lokum tavuk parçaları; enfes kıvamlı sosuyla sıcak lavaşa bolca sarılır.',
    highlights: ['Köy Tereyağı Ustalığı', 'Yumuşacık Tavuk Lokumları', 'Bol Akışkan Sos'],
    ingredients: ['Tavuk Göğsü', 'Köy Tereyağı', 'Köy Biberi', 'Domates Sosu', 'Dağ Kekiği', 'Sarımsak', 'Tırnak Lavaş'],
    isPopular: false
  },
  // 6. Antep Usulü Tava Sarma
  {
    id: 'antep-tava-sarma',
    name: 'Antep Usulü Sac Tava Sarma',
    category: 'sarma',
    tag: 'Zırh Kıyma Spesiyal',
    price: 260,
    oldPrice: 290,
    rating: 4.96,
    reviews: 1450,
    prepTime: '7-9 dk',
    spiciness: 3,
    calories: '620 kcal',
    image: '/images/antep_tava_durum.jpg',
    realImage: '/images/real/real_antep_tava_lavas.jpg',
    description: 'Gaziantep kasap geleneği zırhtan çekilmiş et, sarımsak, kapya biber ve domatesle bakır sac tavada kendi lezzetiyle pişer; dumanı üstünde taş fırın tırnak lavaşa sarılır.',
    highlights: ['Bakır Sac Tavada Pişirilir', 'Zırh Kıyma & Sarımsak Dengesi', 'Açık Lavaş Üzerinde Şölen'],
    ingredients: ['Zırh Kıyma (Dana/Kuzu)', 'Sarımsak', 'Kapya Biber', 'Köy Domatesi', 'Tereyağı', 'Antep Baharatları', 'Tırnak Lavaş'],
    isPopular: true
  },
  // 7. Çiğ Köfte Dürüm (NEW!)
  {
    id: 'cig-kofte-durum',
    name: 'Gaziantep Usulü Çiğ Köfte Dürüm',
    category: 'durum',
    tag: 'İsotlu & Cevizli',
    price: 120,
    oldPrice: 140,
    rating: 4.91,
    reviews: 1120,
    prepTime: '2-4 dk',
    spiciness: 4,
    calories: '360 kcal',
    image: '/images/cig_kofte_durum.jpg',
    realImage: '/images/real/real_counter_showcase.jpg',
    description: 'Geleneksel bakır leğende saatlerce yoğrulan hakiki Urfa & Antep isotlu, cevizli çiğ köfte; taze çıtır göbek marul, nane, limon ve hakiki nar ekşisiyle incecik lavaşa sarılır.',
    highlights: ['Taş Değirmen İsotu', 'Hakiki Nar Ekşisi', 'Taze Çıtır Yeşillikler'],
    ingredients: ['Esmer Bulgur', 'Antep İsotu', 'Ceviz İçi', 'Kaya Tuzu', 'Taze Nane', 'Göbek Marul', 'Limon', 'Nar Ekşisi', 'İnce Lavaş'],
    isPopular: true
  },
  // 8. Karışık Kızartma Dürüm
  {
    id: 'karisik-kizartma-durum',
    name: 'Yoğurtlu Karışık Kızartma Dürüm',
    category: 'durum',
    tag: 'Çıtır Sebze Şöleni',
    price: 165,
    oldPrice: 185,
    rating: 4.89,
    reviews: 980,
    prepTime: '5-7 dk',
    spiciness: 1,
    calories: '490 kcal',
    image: '/images/karisik_kizartma.jpg',
    realImage: '/images/real/real_nohut_prep.jpg',
    description: 'Tezgâhtan taze kızarmış patlıcan, kabak, tatlı biber ve patates kızartması; sarımsaklı süzme yoğurt ve kızgın tereyağlı pul biber sosuyla tırnak lavaşta enfes bir buluşma.',
    highlights: ['Taze Çıtır Sebzeler', 'Sarımsaklı Süzme Yoğurt', 'Kızgın Tereyağı Sosu'],
    ingredients: ['Patlıcan', 'Kabak', 'Köy Biberi', 'Patates Kızartması', 'Sarımsaklı Süzme Yoğurt', 'Tereyağlı Sos', 'Tırnak Lavaş'],
    isPopular: true
  },
  // 9. Patates Kızartması
  {
    id: 'patates-kizartmasi',
    name: 'Antep Baharatlı Çıtır Patates Kızartması',
    category: 'fried',
    tag: 'Sıcak & Çıtır',
    price: 90,
    oldPrice: 105,
    rating: 4.85,
    reviews: 750,
    prepTime: '4-5 dk',
    spiciness: 1,
    calories: '380 kcal',
    image: '/images/patates_kizartmasi.jpg',
    realImage: '/images/real/real_nohut_prep.jpg',
    description: 'Gaziantep baharat çeşnisi, kekik ve tatlı kırmızı biber tozuyla harmanlanan tezgâh sıcaklığında çıtır çıtır altın patatesler.',
    highlights: ['Özel Antep Baharat Harmanı', 'Tezgâhtan Sıcak & Çıtır', 'Dip Soslar Eşliğinde'],
    ingredients: ['Özel Kesim Patates', 'Dağ Kekiği', 'Tatlı Kırmızı Biber', 'Kaya Tuzu', 'Sarımsaklı Mayonez'],
    isPopular: false
  },
  // 10. Katmer & İçecekler
  {
    id: 'katmer-tatli-icecek',
    name: 'Antep Fıstıklı Katmer & Yayık Ayran',
    category: 'drinks_dessert',
    tag: 'Fıstık & Kaymak Şöleni',
    price: 175,
    oldPrice: 200,
    rating: 4.99,
    reviews: 2150,
    prepTime: '5-6 dk',
    spiciness: 0,
    calories: '610 kcal',
    image: '/images/tatli_icecek.jpg',
    realImage: '/images/tatli_icecek.jpg',
    description: 'Bol hakiki Antep boz fıstığı ve manda kaymağıyla çıtırdayan sıcak katmer, yanında bakır maşrapada buz gibi bol köpüklü yayık ayranı.',
    highlights: ['Hakiki Antep Boz Fıstığı', 'Manda Kaymağı', 'Bakır Maşrapada Yayık Ayran'],
    ingredients: ['İnce Baklava Yufkası', 'Antep Boz Fıstığı', 'Manda Kaymağı', 'Hakiki Yayık Ayranı'],
    isPopular: true
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Tüm Menü', icon: 'Sparkles' },
  { id: 'sarma', name: 'Sarma & Şiş Çeşitleri', icon: 'UtensilsCrossed' },
  { id: 'durum', name: 'Dürüm Çeşitleri', icon: 'Flame' },
  { id: 'fried', name: 'Patates & Kızartmalar', icon: 'Award' },
  { id: 'drinks_dessert', name: 'Katmer & İçecekler', icon: 'Coffee' },
];

export const RESTAURANT_INFO = {
  name: 'Sarmacı Faruk',
  subtitle: 'Gaziantep Meşhur Dürüm Evi',
  established: 1971,
  tagline: 'Köz Ateşinden Taze Lavaşın Kalbine Gaziantep Efsanesi',
  phone: '05302574909',
  phoneFormatted: '0530 257 49 09',
  phoneTel: 'tel:05302574909',
  whatsapp: '905302574909',
  address: 'Karagöz, karahoca sokak no,21, Gaziantep, 27000',
  addressShort: 'Karagöz Mah. Karahoca Sok. No:21, Gaziantep',
  postalCode: '27000',
  city: 'Gaziantep',
  hours: 'Her Gün: 06:00 - 03:00 (Sabah 6 - Gece 3 Açık)',
  instagram: 'sarmacifaruk',
  instagramHandle: '@sarmacifaruk',
  instagramUrl: 'https://instagram.com/sarmacifaruk',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Karagöz+karahoca+sokak+no+21+Gaziantep+27000',
  googleMapsEmbed: 'https://maps.google.com/maps?q=Karag%C3%B6z,+karahoca+sokak+no,21,+Gaziantep,+27000&t=&z=16&ie=UTF8&iwloc=&output=embed',
  rating: 4.9,
  totalReviews: 7350
};

export const REAL_KITCHEN_GALLERY = [
  {
    id: 'k1',
    title: 'Faruk Usta Tezgahı: Sıcak Nohut Sarımı',
    subtitle: 'Kemik sulu taze nohut, tırnaklı lavaş ve kızartma tezgahımız',
    image: '/images/real/real_nohut_prep.jpg',
    tag: 'Canlı Tezgah'
  },
  {
    id: 'k2',
    title: 'Közde Odun Ateşi Tavuk Şişler',
    subtitle: 'Meşe kömüründe nar gibi pişen çıtır tavuk şişlerimiz',
    image: '/images/real/real_tavuk_sis_ocak.jpg',
    tag: 'Ocakbaşı Köz'
  },
  {
    id: 'k3',
    title: 'Taş Fırın Tırnak Lavaşta Antep Tava',
    subtitle: 'Zırhtan çıkan kıyma, köz domates ve taze yeşillikler',
    image: '/images/real/real_antep_tava_lavas.jpg',
    tag: 'Faruk Usta Spesiyal'
  },
  {
    id: 'k4',
    title: 'Tavuk Sarma & Köz Porsiyon Tabağı',
    subtitle: 'Özel terbiye ile közlenmiş domates ve sumaklı piyaz',
    image: '/images/real/real_tavuk_porsiyon.jpg',
    tag: 'Köz Ateşi'
  },
  {
    id: 'k5',
    title: 'Sıcak Büfemiz & Günlük Taze Pişenler',
    subtitle: 'Nohut, ciğer kavurma ve çıtır altın patatesler',
    image: '/images/real/real_counter_showcase.jpg',
    tag: 'Günlük Taze'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: '/images/real/real_nohut_prep.jpg',
    likes: '6,420',
    comments: '284',
    caption: 'Gaziantep Karagöz’deki ocağımızda sabahın ilk nohut sarması yapılıyor! 🔥 Kemik suyunda demlenen nohut ve taş fırın tırnak lavaş… Bekliyoruz! 🌯 @sarmacifaruk #NohutSarma #Gaziantep'
  },
  {
    id: 2,
    image: '/images/real/real_tavuk_sis_ocak.jpg',
    likes: '5,890',
    comments: '197',
    caption: 'Meşe kömüründe nar gibi kızaran Tavuk Şişler hazır! Dumanı ve kokusu Karagöz sokaklarını sardı. 🍗🔥 Hemen sipariş için profil linkine tıklayın! 0530 257 49 09'
  },
  {
    id: 3,
    image: '/images/real/real_antep_tava_lavas.jpg',
    likes: '7,150',
    comments: '392',
    caption: 'Tırnaklı sıcacık lavaşın üstüne zırh kıyması, sarımsak ve Antep baharatı serildiğinde akan sular durur! 🤤 Antep Usulü Tava Sarma efsanesi Sarmacı Faruk’ta!'
  },
  {
    id: 4,
    image: '/images/cig_kofte_durum.jpg',
    likes: '4,930',
    comments: '165',
    caption: 'Gaziantep usulü bol isotlu ve cevizli el yoğurması Çiğ Köfte Dürüm! Çıtır marul ve hakiki nar ekşisiyle günün her saati hazır. 🌯🍋 #ÇiğKöfte #SarmacıFaruk'
  }
];

export const SLIDESHOW_IMAGES = [
  {
    url: '/images/hero.jpg',
    title: 'Sarmacı Faruk Gaziantep Ziyafeti',
    subtitle: 'Hakiki Antep Usulü Özel Sarma & Dürüm Çeşitleri'
  },
  {
    url: '/images/tavuk_durum.jpg',
    title: 'Özel Soslu Tavuk Sarma',
    subtitle: 'Odun Ateşi Közünde Marine Lokum Tavuk'
  },
  {
    url: '/images/nohut_durum.jpg',
    title: 'Gaziantep Meşhur Nohut Sarma',
    subtitle: '8 Saat İlikli Kemik Suyunda Pişen Antep Nohudu'
  },
  {
    url: '/images/ciger_durum.jpg',
    title: 'Közde Ciğer Kavurma Sarma',
    subtitle: 'Zırhtan Çıkan Günlük Taze Kuzu Ciğeri'
  },
  {
    url: '/images/antep_tava_durum.jpg',
    title: 'Antep Usulü Sac Tava Sarma',
    subtitle: 'Zırh Kıyma, Kapya Biber ve Taş Fırın Tırnak Lavaş'
  },
  {
    url: '/images/tavuk_sis.jpg',
    title: 'Közde Odun Ateşi Tavuk Şiş',
    subtitle: 'Meşe Kömüründe Nar Gibi Kızaran Efsane Lezzet'
  },
  {
    url: '/images/cig_kofte_durum.jpg',
    title: 'Cevizli & İsotlu Çiğ Köfte Dürüm',
    subtitle: 'Taş Dibek Antep İsotu ve Taze Yeşillikler'
  }
];

