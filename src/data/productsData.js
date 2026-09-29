export const PRODUCTS_LIST = [
  // 1. Antep Usulü Özel Sarmalar & Şişler
  {
    id: 'tavuk-sarma',
    name: 'Tavuk Sarma',
    category: 'sarma-sis',
    categoryName: 'Özel Sarma',
    desc: 'Tavuk but eti, sumaklı soğan piyazı ve taze yeşilliklerle tırnak lavaşta.',
    ingredients: 'Tavuk but eti, sumaklı soğan piyazı, tırnak lavaş.',
    image: '/images/tavuk_durum.jpg'
  },
  {
    id: 'nohut-sarma',
    name: 'Nohut Sarma',
    category: 'sarma-sis',
    categoryName: 'Özel Sarma',
    desc: 'Sıcak Antep nohudu, sumak, kimyon ve taze soğan piyazıyla tırnak lavaşta.',
    ingredients: 'Antep nohudu, kimyon, sumak, taze soğan piyazı, tırnak lavaş.',
    image: '/images/nohut_durum.jpg'
  },
  {
    id: 'ciger-kavurma-sarma',
    name: 'Ciğer Kavurma Sarma',
    category: 'sarma-sis',
    categoryName: 'Özel Sarma',
    desc: 'Kavrulmuş taze kuzu ciğeri, sumaklı maydanoz piyazı ve baharatlarla tırnak lavaşta.',
    ingredients: 'Taze kuzu ciğeri, sumaklı maydanoz piyazı, baharatlar, tırnak lavaş.',
    image: '/images/ciger_durum.jpg'
  },
  {
    id: 'antep-tava-sarma',
    name: 'Antep Usulü Tava Sarma',
    category: 'sarma-sis',
    categoryName: 'Özel Sarma',
    desc: 'Fırında pişmiş lezzetli tava eti, biber, domates ve baharatlarla tırnak lavaşta.',
    ingredients: 'Fırın tava eti, kapya biber, domates, baharatlar, tırnak lavaş.',
    image: '/images/antep_tava_durum.jpg'
  },
  {
    id: 'tavuk-sis',
    name: 'Tavuk Şiş',
    category: 'sarma-sis',
    categoryName: 'Özel Şiş',
    desc: 'Közde pişirilmiş tavuk şiş, sumaklı piyaz ve köz biber ile tırnak lavaşta.',
    ingredients: 'Közde tavuk şiş, sumaklı soğan piyazı, köz biber, tırnak lavaş.',
    image: '/images/tavuk_sis.jpg'
  },

  // 2. Dürüm Çeşitleri
  {
    id: 'tavuk-sote',
    name: 'Tavuk Sote Dürüm',
    category: 'durum',
    categoryName: 'Dürüm Çeşitleri',
    desc: 'Biber ve domatesle sotelenmiş tavuk eti, taze yeşilliklerle sıcak lavaşta.',
    ingredients: 'Sotelenmiş tavuk eti, biber, domates, taze lavaş.',
    image: '/images/tavuk_sote_durum.jpg'
  },
  {
    id: 'cig-kofte',
    name: 'Çiğ Köfte Dürüm',
    category: 'durum',
    categoryName: 'Dürüm Çeşitleri',
    desc: 'Antep usulü çiğ köfte, marul, taze yeşillikler ve nar ekşisiyle lavaşta.',
    ingredients: 'Antep usulü çiğ köfte, marul, nar ekşisi, lavaş.',
    image: '/images/cig_kofte_durum.jpg'
  },
  {
    id: 'karisik-kizartma',
    name: 'Karışık Kızartma Dürüm',
    category: 'durum',
    categoryName: 'Dürüm Çeşitleri',
    desc: 'Kızarmış patlıcan, kabak ve biber, domates sosu ile sıcak lavaşta.',
    ingredients: 'Kızarmış patlıcan, kabak, yeşil biber, domates sosu, lavaş.',
    image: '/images/karisik_kizartma.jpg'
  },

  // 3. Yan Lezzetler
  {
    id: 'patates-kizartmasi',
    name: 'Patates Kızartması',
    category: 'yan-lezzetler',
    categoryName: 'Yan Lezzet',
    desc: 'Çıtır sıcak patates kızartması porsiyonu.',
    ingredients: 'Çıtır patates kızartması.',
    image: '/images/patates_kizartmasi.jpg'
  },

  // 4. İçecekler (Klasik Kapalı Ambalajlı)
  {
    id: 'buyuk-ayran',
    name: 'Büyük Yayık Ayran',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Bol köpüklü, soğuk ve ferahlatıcı Antep yayık ayranı.',
    ingredients: 'Soğuk yayık ayranı.',
    image: '/images/products/ayran_buyuk.jpg'
  },
  {
    id: 'kucuk-ayran',
    name: 'Küçük Ayran',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Soğuk ve ferahlatıcı klasik kapalı ayran.',
    ingredients: 'Kapalı bardak ayran.',
    image: '/images/products/ayran_kucuk.jpg'
  },
  {
    id: 'kola',
    name: 'Kola',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Buz gibi soğuk kutu kola.',
    ingredients: 'Kutu kola.',
    image: '/images/products/kola.jpg'
  },
  {
    id: 'su',
    name: 'Doğal Kaynak Suyu',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Soğuk doğal kaynak suyu.',
    ingredients: 'Doğal kaynak suyu.',
    image: '/images/products/su.jpg'
  },
  {
    id: 'sade-soda',
    name: 'Sade Maden Suyu (Soda)',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Soğuk ferahlatıcı sade maden suyu.',
    ingredients: 'Cam şişe sade maden suyu.',
    image: '/images/products/sade_soda.jpg'
  },
  {
    id: 'meyveli-soda',
    name: 'Meyveli Soda',
    category: 'icecekler',
    categoryName: 'Soğuk İçecek',
    desc: 'Soğuk ferahlatıcı meyveli maden suyu.',
    ingredients: 'Cam şişe meyveli maden suyu.',
    image: '/images/products/meyveli_soda.jpg'
  }
];

export const PRODUCT_CATEGORIES = [
  { id: 'all', name: 'Tüm Ürünler', icon: '✦', count: 15 },
  { id: 'sarma-sis', name: 'Sarma & Şiş', icon: '🌯', count: 5 },
  { id: 'durum', name: 'Dürüm Çeşitleri', icon: '🔥', count: 3 },
  { id: 'yan-lezzetler', name: 'Yan Lezzetler', icon: '🍟', count: 1 },
  { id: 'icecekler', name: 'Soğuk İçecekler', icon: '🥤', count: 6 }
];
