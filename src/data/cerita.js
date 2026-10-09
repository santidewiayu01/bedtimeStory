// Data halaman /cerita (perpustakaan cerita). File ini sengaja terpisah dari
// data/stories.js supaya carousel cerita di Beranda tidak ikut berubah.
//
// Sampul cerita belum diserahkan tim desain, jadi setiap cerita memakai
// sampul ilustratif dari komponen <StoryCover> (gradien + ikon, warna Minilemon).
// Jika sampul asli sudah ada, isi `image: '/assets/stories/<file>.png'` pada
// cerita terkait dan kartu/detail otomatis memakai gambar itu.
import {
  Bug,
  Crown,
  Fish,
  Flower2,
  HandHeart,
  Moon,
  Sparkles,
  Ship,
  Star,
  Turtle,
  Wallet,
} from 'lucide-react'

export const ALL_CATEGORY = 'semua'

// `pill` = warna label kategori pada kartu & detail (token warna Minilemon).
export const ceritaCategories = [
  { id: ALL_CATEGORY, label: 'Semua', icon: Sparkles },
  { id: 'dongeng', label: 'Dongeng', icon: Crown, pill: 'bg-lavender-400 text-navy-950' },
  { id: 'kisah-nabi', label: 'Kisah Nabi', icon: Moon, pill: 'bg-mint-400 text-navy-950' },
  { id: 'fabel', label: 'Fabel', icon: Turtle, pill: 'bg-coral-400 text-navy-950' },
  { id: 'cerita-moral', label: 'Cerita Moral', icon: HandHeart, pill: 'bg-yellow-400 text-navy-950' },
]

export const getCategory = (id) => ceritaCategories.find((c) => c.id === id)

// Bentuk cerita:
// { id, category, title, summary, ageRange, value, moral, badge?, featured?,
//   cover: { icon, from, to }, keywords: [], pages: [[paragraf, ...], ...] }
// Setiap elemen `pages` adalah satu halaman baca (1-2 paragraf).
const stories = [
  // ------------------------------------------------------------ DONGENG
  {
    id: 'bintang-kecil-takut-gelap',
    category: 'dongeng',
    featured: true,
    title: 'Kerlip, Bintang Kecil yang Takut Gelap',
    summary: 'Kerlip bersinar paling redup dan selalu bersembunyi. Sampai suatu malam, ada yang membutuhkan cahayanya.',
    ageRange: '4-8 thn',
    value: 'Berani',
    moral:
      'Berani bukan berarti tidak pernah takut. Berani adalah tetap melangkah dan menolong, walau hati masih berdebar.',
    cover: { icon: Star, from: '#2c3d85', to: '#8b7cf6' },
    keywords: ['bintang', 'langit', 'malam', 'gelap', 'berani', 'takut', 'bulan'],
    pages: [
      [
        'Di langit yang luas, tinggallah ribuan bintang. Salah satunya bernama Kerlip, bintang paling kecil dengan sinar paling redup.',
        'Setiap malam, saat bintang-bintang lain berkilau, Kerlip bersembunyi di balik awan tipis. "Aku takut gelap," bisiknya pelan. "Langit malam begitu hitam dan sepi."',
      ],
      [
        'Bintang Besar yang bijaksana melihatnya dan tersenyum. "Kerlip, kenapa kamu bersembunyi?"',
        '"Sinarku terlalu kecil, Bintang Besar. Aku takut tidak ada yang melihat. Aku takut gelapnya menelanku."',
        '"Gelap tidak akan menelanmu," jawab Bintang Besar lembut. "Gelap hanyalah tempat bagi cahaya untuk bersinar."',
      ],
      [
        'Suatu malam, awan tebal menutupi langit. Bulan pun ikut bersembunyi, dan semuanya menjadi sangat gelap.',
        'Di bawah sana, seekor anak kelinci tersesat di tengah hutan. "Ibu... di mana jalan pulang?" isaknya sambil gemetar.',
        'Kerlip mendengar tangisan itu. Hatinya berdebar sangat kencang.',
      ],
      [
        'Kerlip menarik napas dalam-dalam. Pelan-pelan ia keluar dari balik awan, lalu menyala sekuat tenaga.',
        'Sinarnya memang kecil, tetapi di tengah gelap yang pekat, cahaya kecil itu tampak jelas sekali.',
        '"Lihat! Ada bintang!" seru si kelinci. Ia berjalan mengikuti cahaya itu, selangkah demi selangkah, sampai melihat rumah tanah tempat ibunya menunggu.',
      ],
      [
        'Sejak malam itu, Kerlip tidak lagi bersembunyi. Ia masih sedikit takut pada gelap, tetapi ia tahu cahayanya berarti bagi seseorang.',
        'Jika kamu melihat bintang kecil yang berkedip-kedip malu di langit malam, mungkin itulah Kerlip, yang sedang menjaga mimpimu.',
      ],
    ],
  },
  {
    id: 'peri-lemon-kebun-ajaib',
    category: 'dongeng',
    title: 'Peri Lemon dan Kebun Ajaib',
    summary: 'Peri Lemi punya satu pohon lemon ajaib. Apa yang terjadi ketika kemarau membuat kebun desa mengering?',
    ageRange: '5-9 thn',
    value: 'Berbagi',
    moral: 'Kebaikan yang dibagikan akan tumbuh lebih besar. Saat berbagi, kita justru memiliki lebih banyak teman dan kebahagiaan.',
    cover: { icon: Flower2, from: '#ffc93c', to: '#34c78e' },
    keywords: ['peri', 'lemon', 'kebun', 'berbagi', 'kemarau', 'hujan', 'tanaman'],
    pages: [
      [
        'Di tepi sebuah desa, ada kebun kecil yang dijaga oleh peri bernama Lemi. Sayapnya berwarna kuning cerah, secerah buah lemon.',
        'Di tengah kebun, tumbuh satu pohon lemon ajaib. Bunganya wangi, dan buahnya selalu segar sepanjang tahun.',
      ],
      [
        'Suatu tahun, kemarau datang sangat panjang. Sungai mengecil, tanah retak, dan kebun-kebun di desa mulai layu.',
        'Hanya kebun Lemi yang tetap hijau, karena pohon lemon ajaibnya punya akar yang menyimpan air.',
        '"Aku harus menjaga lemon-lemon ini baik-baik," pikir Lemi. "Kalau habis, bagaimana nanti?"',
      ],
      [
        'Pagi itu, seorang nenek lewat sambil membawa ember kosong. "Permisi, Peri Lemi. Cucuku sedang batuk. Bolehkah aku meminta sedikit lemon?"',
        'Lemi ragu sejenak. Tetapi melihat wajah lelah sang nenek, ia memetik tiga buah lemon dan memberikannya dengan senyum.',
      ],
      [
        'Kabar itu menyebar. Satu per satu warga datang. Lemi membagikan buah lemonnya, bahkan juga menunjukkan cara menanam biji lemon.',
        'Anak-anak membantu menyiram bibit dengan air yang mereka bagi. Para ibu membawa roti dan teh hangat untuk Lemi. Kebun itu ramai tawa.',
      ],
      [
        'Beberapa minggu kemudian, awan gelap berkumpul dan hujan pun turun deras. Seluruh desa bersorak.',
        'Dan di setiap halaman rumah, tumbuh pohon lemon kecil, tanda terima kasih yang dirawat bersama.',
        'Lemi tersenyum. Ia sadar, lemonnya tidak berkurang, justru kebunnya kini menjadi seluruh desa.',
      ],
    ],
  },

  // ---------------------------------------------------------- KISAH NABI
  {
    id: 'kisah-nabi-yunus-as',
    category: 'kisah-nabi',
    featured: true,
    title: 'Kisah Nabi Yunus AS',
    summary: 'Nabi Yunus AS pernah berada di perut ikan besar. Dari kegelapan itu, ia belajar tentang sabar dan berdoa.',
    ageRange: '6-10 thn',
    value: 'Sabar',
    moral:
      'Jangan mudah putus asa. Saat kita melakukan kesalahan, segeralah memohon ampun kepada Allah. Allah Maha Penyayang dan selalu mendengar doa hamba-Nya.',
    cover: { icon: Fish, from: '#101a3f', to: '#2c3d85' },
    keywords: ['yunus', 'nabi', 'ikan', 'paus', 'laut', 'sabar', 'doa', 'ninawa', 'kisah nabi'],
    pages: [
      [
        'Dahulu, Allah mengutus Nabi Yunus AS kepada kaumnya di sebuah kota bernama Ninawa. Beliau mengajak mereka menyembah Allah dan berbuat baik kepada sesama.',
        'Berhari-hari dan bertahun-tahun, Nabi Yunus AS mengajak dengan sabar. Namun kaumnya tidak mau mendengarkan.',
      ],
      [
        'Nabi Yunus AS merasa sedih dan kecewa. Beliau pun pergi meninggalkan kaumnya sebelum mendapat izin dari Allah.',
        'Di tepi pantai, beliau menaiki sebuah kapal yang penuh penumpang. Kapal itu berlayar menuju tempat yang jauh.',
      ],
      [
        'Di tengah laut, badai besar datang. Ombak setinggi gunung menghantam kapal dari segala arah. Kapal hampir tenggelam.',
        'Para penumpang pun mengundi siapa yang harus turun supaya kapal menjadi lebih ringan. Undian itu jatuh pada Nabi Yunus AS. Beliau pun masuk ke dalam laut.',
      ],
      [
        'Dengan izin Allah, seekor ikan besar datang dan menelan Nabi Yunus AS. Beliau selamat di dalam perut ikan itu, di tengah kegelapan yang berlapis-lapis: gelapnya malam, gelapnya laut, dan gelapnya perut ikan.',
        'Di sana, Nabi Yunus AS menyadari kesalahannya. Beliau berdoa dengan penuh sesal:',
        '"Laa ilaaha illaa anta subhaanaka innii kuntu minazh-zhaalimiin." Artinya, "Tidak ada Tuhan selain Engkau. Maha Suci Engkau. Sesungguhnya aku termasuk orang-orang yang zalim."',
      ],
      [
        'Allah mendengar doa Nabi Yunus AS dan menerima tobatnya. Ikan itu pun memuntahkan beliau ke tepi pantai. Tubuh beliau lemah, tetapi beliau selamat.',
        'Allah menumbuhkan sebatang pohon rindang di dekatnya, sehingga Nabi Yunus AS bisa berteduh dan beristirahat.',
      ],
      [
        'Setelah sehat, Nabi Yunus AS kembali kepada kaumnya. Kali ini, hati mereka telah terbuka. Mereka beriman dan hidup lebih baik.',
        'Kisah ini mengajarkan kita untuk bersabar, tidak mudah putus asa, dan selalu berdoa, bahkan dari tempat yang paling gelap sekalipun.',
      ],
    ],
  },
  {
    id: 'kisah-nabi-nuh-as',
    category: 'kisah-nabi',
    title: 'Nabi Nuh AS dan Perahu Besar',
    summary: 'Nabi Nuh AS membangun perahu raksasa di daratan. Banyak yang menertawakan, tetapi beliau tetap yakin kepada Allah.',
    ageRange: '6-10 thn',
    value: 'Taat',
    badge: 'Baru',
    moral: 'Percayalah kepada Allah dan tetaplah berbuat baik, walau orang lain tidak mengerti atau menertawakan kita.',
    cover: { icon: Ship, from: '#202f6b', to: '#34c78e' },
    keywords: ['nuh', 'nabi', 'perahu', 'bahtera', 'banjir', 'taat', 'hewan', 'kisah nabi'],
    pages: [
      [
        'Nabi Nuh AS adalah salah seorang rasul Allah. Beliau mengajak kaumnya untuk menyembah Allah dan meninggalkan perbuatan buruk.',
        'Selama waktu yang sangat lama, Nabi Nuh AS tidak pernah lelah mengajak kaumnya. Namun hanya sedikit orang yang mau beriman.',
      ],
      [
        'Suatu hari, Allah memberi tahu Nabi Nuh AS bahwa akan datang banjir besar. Beliau diperintahkan membuat sebuah perahu yang besar.',
        'Nabi Nuh AS segera bekerja. Beliau menyusun papan demi papan dengan teliti, jauh dari laut, di tengah daratan.',
      ],
      [
        'Orang-orang yang lewat tertawa. "Lihat, ada yang membuat perahu di tempat kering!" ejek mereka.',
        'Nabi Nuh AS tidak membalas dengan marah. Beliau tetap tenang dan terus bekerja, karena yakin bahwa janji Allah pasti benar.',
      ],
      [
        'Ketika perahu selesai, langit mulai gelap dan air memancar dari dalam bumi. Hujan turun deras dan air naik dengan cepat.',
        'Nabi Nuh AS mengajak orang-orang beriman naik ke perahu. Beliau juga membawa sepasang hewan dari setiap jenis, supaya mereka selamat.',
      ],
      [
        'Perahu besar itu mengapung di atas air, aman di bawah penjagaan Allah. Setelah beberapa waktu, hujan berhenti dan air perlahan surut.',
        'Perahu pun berlabuh di sebuah bukit. Nabi Nuh AS dan para pengikutnya turun dengan penuh rasa syukur. Bumi kembali tenang, dan kehidupan baru dimulai.',
      ],
    ],
  },

  // -------------------------------------------------------------- FABEL
  {
    id: 'semut-dan-belalang',
    category: 'fabel',
    title: 'Semut dan Belalang',
    summary: 'Semut bekerja keras mengumpulkan makanan, sementara Belalang hanya bermain. Apa yang terjadi saat musim hujan tiba?',
    ageRange: '5-9 thn',
    value: 'Rajin',
    moral: 'Rajin dan bersiap sejak dini akan membuat hidup lebih tenang. Bermain itu menyenangkan, tetapi jangan lupa tugas penting.',
    cover: { icon: Bug, from: '#ff7a59', to: '#ffc93c' },
    keywords: ['semut', 'belalang', 'rajin', 'musim hujan', 'makanan', 'fabel', 'kerja keras'],
    pages: [
      [
        'Pada musim panas, matahari bersinar cerah. Di padang rumput, Belalang melompat ke sana kemari sambil bernyanyi riang.',
        'Tak jauh dari sana, sekelompok semut berjalan berbaris sambil memanggul butir-butir padi dan remah roti.',
      ],
      [
        '"Hai, Semut! Kenapa kalian bekerja terus? Ayo bernyanyi dan bermain bersamaku!" ajak Belalang.',
        '"Kami sedang mengumpulkan makanan untuk musim hujan," jawab Semut. "Nanti sulit mencari makanan di luar. Sebaiknya kamu juga mulai menyimpan."',
        'Belalang tertawa. "Musim hujan masih lama. Hari ini cuacanya indah, sayang kalau dilewatkan!"',
      ],
      [
        'Hari demi hari berlalu. Semut bekerja tanpa mengeluh dan gudang makanannya semakin penuh. Belalang terus bernyanyi dan bermain.',
        'Lalu, daun-daun menguning dan angin mulai bertiup dingin. Musim hujan pun tiba.',
      ],
      [
        'Hujan turun berhari-hari. Rumput menjadi basah dan padang berubah menjadi lumpur. Belalang menggigil kedinginan, perutnya keroncongan.',
        'Ia berjalan ke sarang Semut dan mengetuk pelan. "Semut, aku lapar dan kedinginan. Maukah kamu berbagi sedikit makanan?"',
      ],
      [
        'Semut memandang Belalang dengan iba. Ia tidak tega membiarkan temannya kelaparan. "Masuklah. Kami akan berbagi," katanya.',
        'Belalang makan sambil menunduk malu. "Terima kasih, Semut. Aku menyesal tidak mendengarkanmu. Mulai besok, aku akan belajar bekerja dan menabung makanan."',
        'Sejak itu, Belalang tidak hanya pandai bernyanyi, tetapi juga rajin bekerja.',
      ],
    ],
  },
  {
    id: 'kura-kura-dan-kelinci',
    category: 'fabel',
    title: 'Kura-kura dan Kelinci',
    summary: 'Kelinci berlari sangat cepat dan Kura-kura berjalan sangat pelan. Siapa yang akan sampai lebih dulu?',
    ageRange: '5-9 thn',
    value: 'Tekun',
    moral: 'Tekun dan tidak berhenti berusaha lebih penting daripada cepat. Jangan menyepelekan orang lain.',
    cover: { icon: Turtle, from: '#34c78e', to: '#101a3f' },
    keywords: ['kura-kura', 'kelinci', 'lomba', 'lari', 'tekun', 'sombong', 'fabel'],
    pages: [
      [
        'Di sebuah hutan, hiduplah Kelinci yang larinya secepat angin. Ia sering membanggakan kecepatannya di depan semua hewan.',
        '"Lihat, aku hewan tercepat! Tidak ada yang bisa menandingiku," katanya sambil tertawa.',
      ],
      [
        'Di dekat sana, Kura-kura berjalan perlahan sambil membawa cangkangnya. "Aku mungkin lambat," katanya dengan tenang, "tetapi aku tidak pernah berhenti."',
        'Kelinci tertawa terbahak-bahak. "Kamu mau lomba lari denganku? Itu mustahil!"',
        '"Mari kita coba," jawab Kura-kura.',
      ],
      [
        'Keesokan harinya, seluruh penghuni hutan berkumpul. Garis awal ditarik di bawah pohon besar, dan garis akhir di tepi sungai.',
        '"Bersedia... mulai!" seru Burung Hantu. Kelinci melesat seperti anak panah, sementara Kura-kura mulai melangkah, satu demi satu.',
      ],
      [
        'Kelinci sudah jauh di depan. Ia menoleh ke belakang dan tidak melihat Kura-kura. "Aku punya banyak waktu," pikirnya. "Sebaiknya aku tidur sebentar di bawah pohon rindang ini."',
        'Sementara itu, Kura-kura terus berjalan. Panas, lelah, dan haus tak membuatnya berhenti. Langkah kecilnya tidak pernah berhenti.',
      ],
      [
        'Ketika Kelinci terbangun, matahari sudah condong ke barat. Ia melompat dan berlari sekencang-kencangnya, tetapi sudah terlambat.',
        'Kura-kura sudah melewati garis akhir, disambut sorak-sorai hewan hutan.',
        '"Kamu benar," ujar Kelinci pelan. "Aku terlalu sombong. Terima kasih sudah mengajariku." Kura-kura tersenyum, dan sejak hari itu mereka bersahabat.',
      ],
    ],
  },

  // ------------------------------------------------------- CERITA MORAL
  {
    id: 'tetangga-yang-lapar',
    category: 'cerita-moral',
    featured: true,
    title: 'Tetangga yang Lapar',
    summary: 'Dimas menyadari ada yang berbeda dari rumah tetangganya. Ia pun belajar bahwa peduli bisa dimulai dari hal kecil.',
    ageRange: '6-10 thn',
    value: 'Peduli',
    badge: 'Baru',
    moral: 'Peduli pada tetangga berarti memperhatikan dan menolong dengan tulus. Berbagi sedikit makanan bisa sangat berarti bagi orang yang membutuhkan.',
    cover: { icon: HandHeart, from: '#ffc93c', to: '#ff7a59' },
    keywords: ['tetangga', 'peduli', 'berbagi', 'makanan', 'lapar', 'nenek', 'menolong'],
    pages: [
      [
        'Sore itu, Dimas pulang sekolah dengan perut keroncongan. Dari dapur, tercium aroma sup ayam buatan Ibu.',
        '"Wah, harum sekali!" serunya. "Ibu, kapan makan malam?"',
      ],
      [
        'Sambil menunggu, Dimas bermain di teras. Matanya tertuju pada rumah di sebelah, rumah Nenek Siti yang tinggal sendirian.',
        'Biasanya, pada jam seperti ini, ada asap tipis dari dapurnya dan aroma masakan yang sedap. Tetapi hari ini rumah itu sunyi.',
      ],
      [
        '"Bu, kenapa dapur Nenek Siti belum berasap?" tanya Dimas.',
        'Ibu berhenti mengaduk sup dan mengintip dari jendela. "Iya, ya. Mungkin Nenek sedang tidak enak badan. Yuk kita lihat."',
      ],
      [
        'Mereka mengetuk pintu. Nenek Siti membukanya dengan pelan, wajahnya pucat. "Maaf, Nak. Nenek tadi kurang sehat dan belum sempat memasak."',
        'Dimas merasa sedih. Ia menyadari bahwa tetangganya mungkin belum makan sejak pagi.',
      ],
      [
        '"Bu, bolehkah kita berbagi sup?" Ibu tersenyum dan mengangguk. Dimas membawa semangkuk sup hangat dengan hati-hati, lalu meletakkannya di meja Nenek Siti.',
        '"Terima kasih, Dimas. Kamu anak yang baik," ucap Nenek sambil tersenyum haru.',
      ],
      [
        'Malam itu, Dimas makan dengan lahap. Rasanya sup buatan Ibu lebih enak dari biasanya, mungkin karena hatinya senang.',
        'Sejak hari itu, Dimas lebih sering memperhatikan tetangga di sekitarnya. Ia belajar bahwa peduli dimulai dari hal kecil: melihat, bertanya, dan menolong.',
      ],
    ],
  },
  {
    id: 'dompet-di-bangku-taman',
    category: 'cerita-moral',
    title: 'Dompet di Bangku Taman',
    summary: 'Raka menemukan dompet berisi uang. Ia sangat ingin membeli sepatu baru, tetapi apa yang harus ia lakukan?',
    ageRange: '6-10 thn',
    value: 'Jujur',
    moral: 'Jujur berarti mengembalikan yang bukan milik kita, walau tidak ada yang melihat. Hati yang jujur terasa tenang dan bahagia.',
    cover: { icon: Wallet, from: '#8b7cf6', to: '#ffc93c' },
    keywords: ['dompet', 'jujur', 'uang', 'taman', 'sepatu', 'menemukan', 'raka'],
    pages: [
      [
        'Sepulang sekolah, Raka duduk di bangku taman untuk melepas lelah. Di sampingnya, ia melihat sebuah dompet cokelat.',
        'Raka melihat ke kiri dan ke kanan. Tidak ada orang yang tampak mencarinya.',
      ],
      [
        'Dengan ragu, ia membuka dompet itu. Di dalamnya ada beberapa lembar uang dan sebuah kartu nama.',
        '"Uang sebanyak ini cukup untuk membeli sepatu baru," batin Raka. Ia melirik sepatunya yang sudah usang.',
      ],
      [
        'Namun hatinya terasa tidak tenang. Ia teringat pesan Ayah: "Barang yang bukan milik kita harus dikembalikan kepada pemiliknya."',
        '"Pasti orang yang punya dompet ini sedang bingung mencarinya," gumam Raka. Ia menarik napas, lalu bangkit.',
      ],
      [
        'Raka membaca nama di kartu itu: Pak Anwar. Dengan bantuan Ayah, ia mencari alamatnya dan mengantarkan dompet itu.',
        'Pak Anwar sedang sibuk mencari-cari dengan cemas. Matanya berbinar saat melihat Raka. "Dompet saya! Terima kasih, Nak. Di dalamnya ada uang untuk biaya sekolah anak saya."',
      ],
      [
        'Pak Anwar memberikan sedikit uang sebagai tanda terima kasih. Raka menolak dengan sopan. Tetapi atas saran Ayah, ia menerimanya, dan mengucapkan terima kasih.',
        'Hari itu, Raka tidak langsung membeli sepatu baru. Namun hatinya terasa ringan, jauh lebih bahagia daripada saat ia membayangkan sepatu itu.',
      ],
    ],
  },
]

// Perkiraan waktu baca untuk anak: 80 kata per menit (kecepatan baca anak SD kelas awal), minimal 2 menit.
const wordCount = (s) =>
  s.pages
    .flat()
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

export const ceritaList = stories.map((s) => ({
  ...s,
  duration: `${Math.max(2, Math.round(wordCount(s) / 80))} menit`,
  // Satu langkah tambahan di akhir untuk layar "Pesan Moral".
  stepCount: s.pages.length + 1,
}))

export const featuredStories = ceritaList.filter((s) => s.featured)

export const getStory = (id) => ceritaList.find((s) => s.id === id) ?? null

// Pencarian: semua kata yang diketik harus ada di judul, ringkasan, kategori,
// nilai moral, atau kata kunci cerita (tidak peka huruf besar/kecil).
export function filterStories(list, { query, category }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  return list.filter((s) => {
    if (category !== ALL_CATEGORY && s.category !== category) return false
    if (tokens.length === 0) return true
    const haystack = [s.title, s.summary, s.value, getCategory(s.category)?.label, ...s.keywords]
      .join(' ')
      .toLowerCase()
    return tokens.every((t) => haystack.includes(t))
  })
}

// Cerita lain untuk bagian bawah detail: satu kategori dulu, lalu sisanya.
export function getRelatedStories(story, limit = 3) {
  const others = ceritaList.filter((s) => s.id !== story.id)
  const same = others.filter((s) => s.category === story.category)
  const rest = others.filter((s) => s.category !== story.category)
  return [...same, ...rest].slice(0, limit)
}

// Cerita sesudah/sebelum dalam urutan daftar (melingkar), untuk saran "Cerita berikutnya".
export function getNextStory(story) {
  const i = ceritaList.findIndex((s) => s.id === story.id)
  return ceritaList[(i + 1) % ceritaList.length]
}
