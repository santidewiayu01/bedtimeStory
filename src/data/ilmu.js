// Data halaman /ilmu (pusat belajar). File ini terpisah dari data/science.js
// supaya kartu kategori di Beranda tidak ikut berubah.
//
// Gambar memakai ilustrasi asli dari tim desain (public/assets/asset asli/icon sains).
// Ilustrasi tersedia per KATEGORI, jadi setiap materi memakai gambar kategorinya
// kecuali materi itu mengisi `image` sendiri.
import { FlaskConical, HeartPulse, Leaf, Orbit, PawPrint, Sparkles } from 'lucide-react'

const ICON_ROOT = '/assets/asset asli/icon sains'
const art = (file) => encodeURI(`${ICON_ROOT}/${file}`)

export const ALL_CATEGORY = 'semua'

// `pill` = warna label kategori pada kartu & detail (token warna Minilemon).
export const ilmuCategories = [
  { id: ALL_CATEGORY, label: 'Semua', icon: Sparkles },
  { id: 'sains', label: 'Sains', icon: FlaskConical, image: art('Icon 6.png'), pill: 'bg-yellow-400 text-navy-950' },
  { id: 'tata-surya', label: 'Tata Surya', icon: Orbit, image: art('Icon 1.png'), pill: 'bg-navy-700 text-white' },
  { id: 'hewan', label: 'Hewan', icon: PawPrint, image: art('icon 3.png'), pill: 'bg-coral-400 text-navy-950' },
  { id: 'alam', label: 'Alam', icon: Leaf, image: art('Icon 5.png'), pill: 'bg-mint-400 text-navy-950' },
  { id: 'tubuh-manusia', label: 'Tubuh Manusia', icon: HeartPulse, image: art('Icon 2.png'), pill: 'bg-lavender-400 text-navy-950' },
]

export const getCategory = (id) => ilmuCategories.find((c) => c.id === id)

// Bentuk materi:
// { id, category, title, summary, intro, sections: [{ heading, text }],
//   funFact, activity?, keywords: [] , featured? }
const materials = [
  // ------------------------------------------------------------- SAINS
  {
    id: 'es-bisa-mencair',
    category: 'sains',
    title: 'Kenapa Es Bisa Mencair?',
    summary: 'Kenali tiga wujud air dan temukan apa yang terjadi pada es batu saat terkena panas.',
    intro:
      'Pernahkah kamu melihat es batu di dalam gelas perlahan berubah menjadi air? Perubahan ini terjadi karena panas.',
    sections: [
      {
        heading: 'Tiga wujud air',
        text: 'Air bisa berwujud padat, cair, atau gas. Es adalah air padat, air minum adalah air cair, dan uap yang naik dari air panas adalah air gas. Ketiganya tetap air, hanya wujudnya yang berbeda.',
      },
      {
        heading: 'Apa yang terjadi saat es mencair?',
        text: 'Es tersusun dari partikel air yang sangat kecil dan saling berpegangan erat. Ketika es menerima panas, partikel-partikel itu bergerak makin cepat lalu saling melepaskan diri. Saat itulah es berubah menjadi air. Es mulai mencair pada suhu 0 derajat Celsius.',
      },
      {
        heading: 'Bisa dibalik lagi',
        text: 'Kalau air didinginkan sampai 0 derajat Celsius atau lebih dingin, air akan membeku menjadi es lagi. Itulah yang terjadi di dalam freezer.',
      },
    ],
    funFact:
      'Es mengapung di air karena es lebih ringan daripada air cair dengan ukuran yang sama. Itulah sebabnya gunung es bisa mengapung di laut.',
    activity:
      'Letakkan satu es batu di tempat teduh dan satu lagi di tempat yang terkena sinar matahari. Perhatikan mana yang mencair lebih dulu. Menurutmu, kenapa?',
    keywords: ['wujud benda', 'mencair', 'membeku', 'suhu', 'air'],
  },
  {
    id: 'gaya-dorong-tarik',
    category: 'sains',
    title: 'Gaya: Mendorong dan Menarik',
    summary: 'Dari membuka pintu sampai menendang bola, semua gerakan itu butuh gaya.',
    intro:
      'Saat kamu membuka pintu, menendang bola, atau menarik laci, kamu sedang menggunakan gaya.',
    sections: [
      {
        heading: 'Gaya itu apa?',
        text: 'Gaya adalah dorongan atau tarikan. Gaya bisa membuat benda mulai bergerak, bergerak lebih cepat, melambat, berhenti, atau berubah bentuk. Semakin besar gayanya, semakin besar pengaruhnya.',
      },
      {
        heading: 'Gravitasi',
        text: 'Gravitasi adalah gaya tarik Bumi. Karena gravitasi, bola yang kamu lempar ke atas akan jatuh lagi, dan benda-benda tidak melayang di udara.',
      },
      {
        heading: 'Gesekan',
        text: 'Gesekan terjadi saat dua benda bersentuhan dan menahan gerak. Sepatu bergerigi tidak mudah tergelincir karena gesekannya besar, sedangkan lantai licin gesekannya kecil.',
      },
    ],
    funFact:
      'Gravitasi di Bulan kira-kira seperenam gravitasi Bumi. Karena itu astronaut bisa melompat tinggi di sana!',
    activity:
      'Dorong mobil mainan di lantai keramik, lalu di atas karpet. Di mana mobil meluncur lebih jauh? Jawabannya ada pada gesekan.',
    keywords: ['gaya', 'gravitasi', 'gesekan', 'dorong', 'tarik'],
  },
  {
    id: 'pelangi-dan-cahaya',
    category: 'sains',
    title: 'Dari Mana Warna Pelangi?',
    summary: 'Cahaya matahari ternyata terdiri dari banyak warna. Tetes air hujan membuatnya terlihat.',
    intro: 'Setelah hujan, kadang ada lengkungan warna-warni di langit. Itulah pelangi!',
    sections: [
      {
        heading: 'Cahaya matahari punya banyak warna',
        text: 'Cahaya matahari tampak putih, padahal terdiri dari banyak warna yang bercampur: merah, jingga, kuning, hijau, biru, nila, dan ungu.',
      },
      {
        heading: 'Tetes air memisahkan warna',
        text: 'Saat cahaya matahari masuk ke tetes air hujan, cahaya itu membelok dan terpisah menjadi warna-warnanya. Warna-warna itu lalu dipantulkan ke mata kita sebagai pelangi.',
      },
      {
        heading: 'Kapan pelangi muncul?',
        text: 'Pelangi muncul ketika matahari bersinar dan di arah yang berlawanan masih ada tetes air di udara. Karena itu, kita melihat pelangi dengan posisi matahari berada di belakang kita.',
      },
    ],
    funFact:
      'Pelangi sebenarnya berbentuk lingkaran penuh. Dari tanah, kita biasanya hanya melihat setengahnya karena tanah menghalangi.',
    activity:
      'Dengan bantuan orang dewasa, berdirilah membelakangi matahari lalu semprotkan air halus dari botol semprot. Perhatikan pelangi kecil yang muncul.',
    keywords: ['cahaya', 'warna', 'pelangi', 'hujan', 'matahari'],
  },

  // -------------------------------------------------------- TATA SURYA
  {
    id: 'delapan-planet',
    category: 'tata-surya',
    featured: true,
    title: 'Mengenal Delapan Planet',
    summary: 'Berkeliling Tata Surya: dari Merkurius yang dekat Matahari sampai Neptunus yang jauh.',
    intro:
      'Tata Surya adalah keluarga besar Matahari. Ada delapan planet yang berputar mengelilingi Matahari, dan masing-masing punya ciri khas.',
    sections: [
      {
        heading: 'Empat planet berbatu',
        text: 'Merkurius, Venus, Bumi, dan Mars dekat dengan Matahari dan permukaannya berbatu. Merkurius paling dekat dengan Matahari, Venus adalah planet terpanas, dan Mars tampak kemerahan. Bumi adalah satu-satunya planet yang kita tahu punya kehidupan.',
      },
      {
        heading: 'Empat planet raksasa',
        text: 'Jupiter, Saturnus, Uranus, dan Neptunus jauh lebih besar dan tidak berbatu seperti Bumi. Jupiter adalah planet terbesar, dan Saturnus terkenal dengan cincinnya yang indah.',
      },
      {
        heading: 'Cara mengingat urutannya',
        text: 'Dari yang terdekat dengan Matahari, urutannya adalah Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus. Coba buat kalimat lucu dari huruf depannya supaya mudah diingat.',
      },
    ],
    funFact:
      'Satu hari di Venus lebih lama daripada satu tahun di Venus! Venus berputar sangat lambat pada porosnya, tetapi mengelilingi Matahari lebih cepat.',
    activity:
      'Buat model Tata Surya dari bola kertas atau plastisin. Urutkan dari Matahari, lalu beri nama setiap planet.',
    keywords: ['planet', 'matahari', 'orbit', 'tata surya', 'bumi', 'jupiter', 'saturnus'],
  },
  {
    id: 'bulan-teman-bumi',
    category: 'tata-surya',
    title: 'Bulan, Teman Setia Bumi',
    summary: 'Kenapa bentuk Bulan berubah-ubah, dan apakah Bulan bersinar sendiri?',
    intro:
      'Saat malam hari, Bulan sering terlihat bersinar terang di langit. Tahukah kamu, Bulan tidak punya cahaya sendiri?',
    sections: [
      {
        heading: 'Bulan memantulkan cahaya',
        text: 'Bulan hanya memantulkan cahaya Matahari. Bagian Bulan yang terkena sinar Matahari tampak terang, sedangkan bagian lainnya gelap.',
      },
      {
        heading: 'Kenapa bentuk Bulan berubah-ubah?',
        text: 'Bulan mengelilingi Bumi, jadi dari Bumi kita melihat bagian terang Bulan dari sudut yang berbeda-beda. Itulah fase Bulan: dari sabit, setengah, purnama, lalu mengecil lagi. Satu putaran fase memakan waktu sekitar 29 hari.',
      },
      {
        heading: 'Pernah dikunjungi manusia',
        text: 'Pada tahun 1969, astronaut dari misi Apollo 11 menjadi manusia pertama yang menjejakkan kaki di Bulan.',
      },
    ],
    funFact:
      'Bulan perlahan menjauh dari Bumi, sekitar 3,8 sentimeter setiap tahun. Kira-kira secepat kuku jarimu tumbuh!',
    activity:
      'Selama beberapa malam, lihat Bulan dari jendela dan gambar bentuknya. Apakah bentuknya berubah dari hari ke hari?',
    keywords: ['bulan', 'fase bulan', 'purnama', 'astronaut', 'bumi'],
  },
  {
    id: 'matahari-bintang',
    category: 'tata-surya',
    title: 'Matahari, Bintang Terdekat Kita',
    summary: 'Matahari adalah bintang. Cahayanya sampai ke Bumi dalam sekitar 8 menit.',
    intro:
      'Matahari memberi kita cahaya dan kehangatan setiap hari. Matahari adalah sebuah bintang, bintang yang paling dekat dengan Bumi.',
    sections: [
      {
        heading: 'Bola gas yang sangat panas',
        text: 'Matahari adalah bola raksasa dari gas yang sangat panas. Ukurannya begitu besar sampai lebih dari satu juta Bumi bisa muat di dalamnya.',
      },
      {
        heading: 'Cahaya yang menempuh perjalanan jauh',
        text: 'Cahaya Matahari memerlukan sekitar 8 menit untuk sampai ke Bumi. Cahaya itu menerangi siang hari, menghangatkan Bumi, dan membantu tumbuhan membuat makanan.',
      },
      {
        heading: 'Hati-hati dengan sinar Matahari',
        text: 'Jangan pernah menatap Matahari langsung, walau hanya sebentar, karena bisa merusak mata. Pakai topi dan tabir surya saat bermain lama di bawah terik Matahari.',
      },
    ],
    funFact:
      'Bintang-bintang yang kamu lihat di malam hari juga matahari yang sangat jauh. Mereka tampak kecil karena jaraknya luar biasa jauh.',
    activity:
      'Berdirilah di halaman pagi dan siang hari, lalu minta temanmu menandai bayanganmu dengan kapur. Bagaimana panjang bayangan berubah?',
    keywords: ['matahari', 'bintang', 'cahaya', 'energi', 'tata surya'],
  },

  // ------------------------------------------------------------ HEWAN
  {
    id: 'penyu-kembali-ke-pantai',
    category: 'hewan',
    featured: true,
    title: 'Kenapa Penyu Kembali ke Pantai?',
    summary: 'Penyu hidup di laut, tetapi induk penyu harus datang ke pantai untuk bertelur.',
    intro:
      'Penyu hidup di laut, tetapi induk penyu betina harus datang ke pantai untuk bertelur.',
    sections: [
      {
        heading: 'Bertelur di pantai',
        text: 'Penyu betina naik ke pantai pada malam hari, menggali lubang di pasir, lalu bertelur. Satu sarang bisa berisi puluhan sampai lebih dari seratus telur. Setelah itu lubang ditutup dan sang induk kembali ke laut.',
      },
      {
        heading: 'Menemukan jalan pulang',
        text: 'Banyak penyu betina kembali ke pantai tempat mereka menetas, meski sudah berenang jauh selama bertahun-tahun. Para ilmuwan menduga penyu mengenali medan magnet Bumi sebagai penunjuk arah.',
      },
      {
        heading: 'Perjalanan tukik',
        text: 'Sekitar dua bulan kemudian, tukik (anak penyu) menetas dan berlari menuju laut. Perjalanan ini berbahaya, sehingga hanya sedikit tukik yang tumbuh dewasa.',
      },
      {
        heading: 'Cara kita membantu',
        text: 'Buang sampah pada tempatnya, kurangi sampah plastik, dan jangan mengganggu sarang penyu. Cahaya terang di pantai pada malam hari juga bisa membingungkan tukik, jadi matikan lampu yang tidak diperlukan.',
      },
    ],
    funFact:
      'Jenis kelamin tukik dipengaruhi suhu pasir sarang. Pasir yang lebih hangat menghasilkan lebih banyak penyu betina.',
    keywords: ['penyu', 'tukik', 'pantai', 'laut', 'telur'],
  },
  {
    id: 'lebah-bisa-terbang',
    category: 'hewan',
    title: 'Kenapa Lebah Bisa Terbang?',
    summary: 'Tubuhnya kecil dan gemuk, tetapi sayapnya bergerak sangat cepat.',
    intro:
      'Lebah bertubuh kecil dan gemuk, tetapi bisa terbang lincah dari bunga ke bunga.',
    sections: [
      {
        heading: 'Empat sayap yang bekerja sama',
        text: 'Lebah punya dua pasang sayap. Saat terbang, sayap depan dan sayap belakang saling mengait sehingga bekerja seperti satu sayap yang lebih lebar.',
      },
      {
        heading: 'Mengepak sangat cepat',
        text: 'Lebah madu mengepakkan sayapnya sekitar 200 kali dalam satu detik. Kepakan cepat inilah yang menghasilkan bunyi dengung yang sering kamu dengar.',
      },
      {
        heading: 'Penolong bunga dan buah',
        text: 'Lebah mengumpulkan nektar dan serbuk sari dari bunga. Saat berpindah-pindah, serbuk sari menempel di tubuhnya dan terbawa ke bunga lain. Ini disebut penyerbukan, dan membantu tumbuhan menghasilkan buah serta biji.',
      },
    ],
    funFact:
      'Lebah pekerja bisa memberi tahu teman-temannya letak bunga lewat gerakan yang disebut tarian goyang.',
    activity:
      'Amati bunga di taman dari jarak aman. Lihat apakah ada lebah atau kupu-kupu yang hinggap. Jangan mengganggu atau menangkapnya, ya.',
    keywords: ['lebah', 'sayap', 'nektar', 'penyerbukan', 'serangga'],
  },
  {
    id: 'metamorfosis-kupu-kupu',
    category: 'hewan',
    title: 'Dari Ulat Menjadi Kupu-kupu',
    summary: 'Ikuti empat tahap perubahan kupu-kupu: telur, ulat, kepompong, lalu bersayap.',
    intro:
      'Kupu-kupu yang cantik dulunya adalah ulat kecil. Perubahan bentuk ini disebut metamorfosis.',
    sections: [
      {
        heading: 'Empat tahap kehidupan',
        text: 'Kupu-kupu bermula dari telur. Telur menetas menjadi ulat, ulat tumbuh lalu berubah menjadi kepompong, dan dari kepompong keluarlah kupu-kupu dewasa.',
      },
      {
        heading: 'Ulat yang lapar',
        text: 'Ulat makan banyak daun supaya tubuhnya tumbuh besar. Di dalam kepompong, tubuhnya berubah sedikit demi sedikit sampai siap bersayap.',
      },
      {
        heading: 'Kupu-kupu dewasa',
        text: 'Setelah keluar dari kepompong, sayap kupu-kupu masih basah dan terlipat. Ia perlu menunggu beberapa saat sampai sayapnya kering sebelum bisa terbang. Kupu-kupu minum nektar dari bunga dan ikut membantu penyerbukan.',
      },
    ],
    funFact:
      'Kupu-kupu bisa mencicipi rasa lewat kakinya! Saat hinggap di daun, ia bisa tahu apakah daun itu cocok untuk tempat bertelur.',
    activity:
      'Gambar empat tahap hidup kupu-kupu secara berurutan di selembar kertas, lalu beri nama setiap tahapnya.',
    keywords: ['kupu-kupu', 'ulat', 'kepompong', 'metamorfosis', 'serangga'],
  },

  // ------------------------------------------------------------- ALAM
  {
    id: 'dari-mana-hujan',
    category: 'alam',
    featured: true,
    title: 'Dari Mana Hujan Berasal?',
    summary: 'Air di Bumi berputar terus: naik jadi uap, berkumpul jadi awan, lalu turun sebagai hujan.',
    intro:
      'Hujan membuat tanaman tumbuh dan sungai terisi. Tapi dari mana sebenarnya air hujan berasal?',
    sections: [
      {
        heading: 'Air naik ke langit',
        text: 'Panas Matahari membuat air di laut, sungai, dan danau menguap menjadi uap air yang naik ke udara. Tumbuhan juga melepaskan uap air dari daunnya.',
      },
      {
        heading: 'Uap menjadi awan',
        text: 'Di udara yang tinggi, suhunya lebih dingin. Uap air mengembun menjadi titik-titik air yang sangat kecil, lalu berkumpul membentuk awan.',
      },
      {
        heading: 'Awan menurunkan hujan',
        text: 'Ketika titik-titik air di awan makin banyak dan berat, mereka jatuh sebagai hujan. Air hujan mengalir ke sungai, meresap ke tanah, dan akhirnya kembali ke laut. Lalu perjalanannya dimulai lagi. Perputaran ini disebut siklus air.',
      },
    ],
    funFact:
      'Air di Bumi terus berputar sejak jutaan tahun lalu. Air yang kamu minum hari ini mungkin sudah pernah menjadi hujan, sungai, dan awan berkali-kali!',
    activity:
      'Dengan bantuan orang dewasa, isi gelas bening dengan sedikit air hangat, tutup dengan piring, lalu letakkan es batu di atas piring. Perhatikan tetesan air yang muncul di bawah piring. Seperti itulah awan terbentuk.',
    keywords: ['hujan', 'awan', 'penguapan', 'siklus air', 'air'],
  },
  {
    id: 'pohon-penting',
    category: 'alam',
    title: 'Kenapa Pohon Itu Penting?',
    summary: 'Pohon memberi oksigen, rumah bagi hewan, dan menjaga tanah. Yuk kenali sahabat besar kita.',
    intro:
      'Pohon bukan sekadar hiasan. Pohon adalah sahabat besar bagi manusia dan makhluk hidup lain.',
    sections: [
      {
        heading: 'Pabrik makanan dan oksigen',
        text: 'Daun pohon menangkap cahaya Matahari untuk membuat makanan. Proses ini disebut fotosintesis. Saat melakukannya, pohon menyerap karbon dioksida dan menghasilkan oksigen yang kita hirup.',
      },
      {
        heading: 'Rumah dan makanan',
        text: 'Pohon menjadi tempat tinggal burung, tupai, dan serangga. Banyak pohon juga menghasilkan buah, daun, dan biji sebagai makanan.',
      },
      {
        heading: 'Penjaga tanah',
        text: 'Akar pohon menahan tanah agar tidak mudah longsor dan membantu menyerap air hujan. Pohon yang rindang juga membuat udara terasa teduh dan sejuk.',
      },
    ],
    funFact:
      'Pada banyak pohon, cincin di batang yang ditebang bisa dihitung untuk menebak umurnya. Satu cincin biasanya berarti satu tahun.',
    activity:
      'Tanam satu biji atau bibit di pot bersama orang dewasa. Siram secara rutin dan catat tingginya setiap minggu.',
    keywords: ['pohon', 'fotosintesis', 'oksigen', 'akar', 'tumbuhan'],
  },
  {
    id: 'gunung-berapi-meletus',
    category: 'alam',
    title: 'Bagaimana Gunung Berapi Meletus?',
    summary: 'Magma dari dalam Bumi bisa menyembur keluar. Kenali prosesnya dan cara tetap aman.',
    intro:
      'Gunung berapi adalah gunung yang punya lubang tempat keluarnya batuan panas dari dalam Bumi. Indonesia punya banyak gunung berapi.',
    sections: [
      {
        heading: 'Apa yang ada di dalam?',
        text: 'Jauh di bawah tanah, batuan bisa meleleh menjadi cairan panas yang disebut magma. Magma tersimpan di ruang yang disebut dapur magma.',
      },
      {
        heading: 'Kenapa meletus?',
        text: 'Magma mengandung gas. Saat tekanan di dalam makin besar, magma naik dan menyembur keluar lewat lubang di puncak gunung yang disebut kawah. Magma yang sudah keluar ke permukaan disebut lava.',
      },
      {
        heading: 'Kenapa di Indonesia banyak?',
        text: 'Indonesia berada di kawasan yang disebut Cincin Api Pasifik, tempat banyak lempeng bumi saling bertemu. Karena itu, di sini banyak gunung berapi.',
      },
      {
        heading: 'Tetap aman',
        text: 'Jika gunung berapi di dekat tempat tinggalmu mulai aktif, ikuti arahan orang tua dan petugas. Jangan mendekati gunung, dan tetap tenang saat mengungsi.',
      },
    ],
    funFact:
      'Abu gunung berapi bisa membuat tanah di sekitarnya sangat subur, sehingga banyak petani menanam di lereng gunung.',
    activity:
      'Dengan bantuan orang dewasa, tuang cuka ke wadah berisi sedikit soda kue. Busa yang muncul meniru lava yang keluar, walau lava sungguhan terbuat dari batuan panas, bukan dari cuka.',
    keywords: ['gunung berapi', 'magma', 'lava', 'kawah', 'letusan'],
  },

  // ---------------------------------------------------- TUBUH MANUSIA
  {
    id: 'jantung-pompa-tubuh',
    category: 'tubuh-manusia',
    title: 'Jantung, Pompa Ajaib Tubuh',
    summary: 'Rasakan detak di dadamu. Kenali tugas jantung dan cara merawatnya.',
    intro: 'Letakkan tanganmu di dada. Terasa ada yang berdetak? Itulah jantungmu.',
    sections: [
      {
        heading: 'Pompa untuk darah',
        text: 'Jantung adalah otot yang memompa darah ke seluruh tubuh lewat pembuluh darah. Darah membawa oksigen dan zat gizi ke setiap bagian tubuh.',
      },
      {
        heading: 'Sebesar apa jantung?',
        text: 'Ukuran jantung kira-kira sebesar kepalan tanganmu sendiri. Walau kecil, jantung bekerja siang dan malam tanpa berhenti, bahkan saat kamu tidur.',
      },
      {
        heading: 'Detak jantung',
        text: 'Saat anak beristirahat, jantung berdetak kira-kira 70 sampai 100 kali dalam satu menit. Setelah berlari, detaknya lebih cepat karena tubuh butuh lebih banyak oksigen.',
      },
      {
        heading: 'Merawat jantung',
        text: 'Bergeraklah setiap hari, makan buah dan sayur, minum air putih, dan tidur cukup supaya jantungmu tetap sehat.',
      },
    ],
    funFact: 'Jantung manusia berdetak sekitar 100 ribu kali dalam sehari!',
    activity:
      'Hitung denyut nadi di pergelangan tangan selama 15 detik saat duduk santai, lalu kalikan empat. Ulangi setelah melompat di tempat selama satu menit. Apa yang berubah?',
    keywords: ['jantung', 'darah', 'detak', 'pembuluh darah', 'olahraga'],
  },
  {
    id: 'otak-bekerja',
    category: 'tubuh-manusia',
    title: 'Bagaimana Otak Bekerja?',
    summary: 'Otak adalah pusat kendali tubuh. Kenali bagian-bagiannya dan cara menjaganya.',
    intro:
      'Otak ada di dalam kepalamu dan membantu kamu berpikir, merasa, bergerak, dan mengingat.',
    sections: [
      {
        heading: 'Pusat kendali tubuh',
        text: 'Otak mengirim dan menerima pesan lewat saraf ke seluruh tubuh. Karena itu kamu bisa merasakan hangatnya sinar matahari, menggerakkan tangan, dan cepat menarik tangan saat menyentuh benda panas.',
      },
      {
        heading: 'Tiga bagian utama',
        text: 'Otak besar membantu kita berpikir, belajar, dan mengingat. Otak kecil menjaga keseimbangan saat berjalan atau naik sepeda. Batang otak mengatur hal-hal penting seperti napas dan detak jantung.',
      },
      {
        heading: 'Sel saraf',
        text: 'Di dalam otak ada sekitar 86 miliar sel saraf yang saling mengirim sinyal. Makin sering kamu berlatih, hubungan antar-sel itu makin kuat, sehingga kamu makin mahir.',
      },
      {
        heading: 'Menjaga otak',
        text: 'Tidur cukup, makan makanan bergizi, bermain, dan memakai helm saat bersepeda membantu menjaga otakmu.',
      },
    ],
    funFact:
      'Otak hanya sekitar 2 persen dari berat tubuh, tetapi memakai sekitar seperlima energi tubuh.',
    activity:
      'Pelajari satu lagu atau pantun baru dan ulangi selama tiga hari berturut-turut. Apakah kamu makin mudah mengingatnya?',
    keywords: ['otak', 'saraf', 'berpikir', 'ingatan', 'kepala'],
  },
  {
    id: 'kenapa-perlu-tidur',
    category: 'tubuh-manusia',
    title: 'Kenapa Kita Perlu Tidur?',
    summary: 'Saat kamu tidur, tubuh dan otak tetap bekerja. Ini alasan tidur nyenyak itu penting.',
    intro:
      'Setelah seharian bermain dan belajar, tubuhmu butuh tidur. Tidur bukan sekadar diam, lho.',
    sections: [
      {
        heading: 'Tubuh beristirahat dan tumbuh',
        text: 'Saat tidur, otot dan badan beristirahat. Tubuh juga memperbaiki diri dan membantu anak-anak tumbuh.',
      },
      {
        heading: 'Otak merapikan ingatan',
        text: 'Ketika tidur, otak membantu menyimpan hal-hal yang kamu pelajari hari itu. Itu sebabnya setelah tidur nyenyak, kita lebih mudah berkonsentrasi dan mengingat.',
      },
      {
        heading: 'Berapa lama tidur?',
        text: 'Anak usia sekolah umumnya butuh sekitar 9 sampai 12 jam tidur setiap malam.',
      },
      {
        heading: 'Tips tidur nyenyak',
        text: 'Tidur dan bangun di jam yang sama, matikan layar sebelum tidur, lalu dengarkan cerita pengantar tidur bersama keluarga.',
      },
    ],
    funFact: 'Kita bermimpi beberapa kali setiap malam, walau tidak selalu ingat mimpinya.',
    activity:
      'Catat jam tidur dan jam bangunmu selama seminggu. Beri bintang setiap kali kamu tidur tepat waktu.',
    keywords: ['tidur', 'istirahat', 'mimpi', 'otak', 'malam'],
  },
]

// Perkiraan waktu baca (200 kata per menit, minimal 2 menit).
const wordCount = (m) =>
  [m.intro, ...m.sections.map((s) => `${s.heading} ${s.text}`), m.funFact, m.activity ?? '']
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

export const ilmuMaterials = materials.map((m) => ({
  ...m,
  image: m.image ?? getCategory(m.category)?.image,
  readMinutes: Math.max(2, Math.round(wordCount(m) / 200)),
}))

export const featuredMaterials = ilmuMaterials.filter((m) => m.featured)

export const getMaterial = (id) => ilmuMaterials.find((m) => m.id === id) ?? null

// Pencarian: semua kata yang diketik harus ada di judul, ringkasan, kategori,
// atau kata kunci materi (tidak peka huruf besar/kecil).
export function filterMaterials(list, { query, category }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  return list.filter((m) => {
    if (category !== ALL_CATEGORY && m.category !== category) return false
    if (tokens.length === 0) return true
    const haystack = [m.title, m.summary, getCategory(m.category)?.label, ...m.keywords]
      .join(' ')
      .toLowerCase()
    return tokens.every((t) => haystack.includes(t))
  })
}

// Materi terkait untuk bagian bawah halaman detail: satu kategori dulu, lalu sisanya.
export function getRelated(material, limit = 3) {
  const others = ilmuMaterials.filter((m) => m.id !== material.id)
  const same = others.filter((m) => m.category === material.category)
  const rest = others.filter((m) => m.category !== material.category)
  return [...same, ...rest].slice(0, limit)
}
