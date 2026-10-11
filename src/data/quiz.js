// Bank soal LOKAL untuk halaman /quiz. Belum ada backend soal/skor di project ini,
// jadi seluruh data ada di file ini dan skor hanya hidup di layar (tidak disimpan).
// Untuk menambah soal: tambahkan objek { q, options (4), answer (index), explain }
// ke kategori yang sesuai. Jawaban dikocok otomatis saat kuis dimulai.
import { ILMU_ART } from './quizAssets'

export const MIXED_ID = 'campuran'

// accent = warna identitas planet; mascot = ekspresi karakter yang mengintip di peta.
export const quizCategories = [
  {
    id: 'tata-surya',
    label: 'Antariksa & Planet',
    short: 'Tata Surya',
    tagline: 'Terbang melewati planet, bulan, dan bintang.',
    art: ILMU_ART('Icon 1.png'),
    accent: '#7aa2ff',
    mascot: 'biru-5',
    questions: [
      {
        q: 'Planet manakah yang paling dekat dengan Matahari?',
        options: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
        answer: 0,
        explain: 'Merkurius paling dekat dengan Matahari, dan juga planet terkecil di tata surya kita.',
      },
      {
        q: 'Planet mana yang terkenal dengan cincinnya yang indah?',
        options: ['Mars', 'Saturnus', 'Merkurius', 'Venus'],
        answer: 1,
        explain: 'Cincin Saturnus tersusun dari serpihan es dan batu yang sangat banyak.',
      },
      {
        q: 'Ada berapa planet di tata surya kita?',
        options: ['7', '8', '9', '10'],
        answer: 1,
        explain: 'Tata surya punya 8 planet, dimulai dari Merkurius sampai Neptunus.',
      },
      {
        q: 'Benda langit apa yang mengelilingi Bumi dan terlihat di malam hari?',
        options: ['Komet', 'Mars', 'Bulan', 'Matahari'],
        answer: 2,
        explain: 'Bulan mengelilingi Bumi. Cahayanya berasal dari sinar Matahari yang dipantulkan.',
      },
      {
        q: 'Planet mana yang dijuluki Planet Merah?',
        options: ['Jupiter', 'Neptunus', 'Venus', 'Mars'],
        answer: 3,
        explain: 'Permukaan Mars berwarna kemerahan karena tanahnya mengandung zat besi yang berkarat.',
      },
      {
        q: 'Bintang yang paling dekat dengan Bumi adalah...',
        options: ['Matahari', 'Bulan', 'Bintang Utara', 'Sirius'],
        answer: 0,
        explain: 'Matahari adalah bintang, dan ia yang memberi kita cahaya serta kehangatan setiap hari.',
      },
    ],
  },
  {
    id: 'sains',
    label: 'Sains & Eksperimen',
    short: 'Sains',
    tagline: 'Campur, amati, dan tebak hasil percobaannya.',
    art: ILMU_ART('Icon 6.png'),
    accent: '#ffc93c',
    mascot: 'coklat-2',
    questions: [
      {
        q: 'Es batu mulai mencair pada suhu sekitar...',
        options: ['0 derajat Celsius', '25 derajat Celsius', '50 derajat Celsius', '100 derajat Celsius'],
        answer: 0,
        explain: 'Es mulai mencair di 0 derajat Celsius. Saat itu partikel-partikel air melepaskan diri satu sama lain.',
      },
      {
        q: 'Uap air yang naik dari air panas berwujud...',
        options: ['Padat', 'Cair', 'Gas', 'Cahaya'],
        answer: 2,
        explain: 'Air punya tiga wujud: padat (es), cair (air), dan gas (uap air).',
      },
      {
        q: 'Kalau warna biru dicampur dengan kuning, kita mendapat warna...',
        options: ['Ungu', 'Hijau', 'Merah', 'Hitam'],
        answer: 1,
        explain: 'Biru dan kuning jika dicampur menghasilkan hijau.',
      },
      {
        q: 'Benda mana yang paling mungkin mengapung di air?',
        options: ['Batu', 'Kunci besi', 'Koin logam', 'Gabus'],
        answer: 3,
        explain: 'Gabus sangat ringan untuk ukurannya, sehingga ia mengapung di atas air.',
      },
      {
        q: 'Apa yang membuat pelangi bisa muncul?',
        options: [
          'Cahaya Matahari yang terurai oleh tetes air',
          'Awan yang diberi warna',
          'Angin yang bertiup kencang',
          'Cahaya dari Bulan',
        ],
        answer: 0,
        explain: 'Tetes air membelokkan dan menguraikan cahaya Matahari menjadi warna-warna pelangi.',
      },
      {
        q: 'Gaya apa yang menarik benda jatuh ke bawah?',
        options: ['Magnet', 'Gravitasi', 'Angin', 'Listrik'],
        answer: 1,
        explain: 'Gravitasi Bumi menarik benda ke arah tanah. Itu sebabnya bola yang kamu lepas akan jatuh.',
      },
    ],
  },
  {
    id: 'hewan',
    label: 'Hewan & Makhluk Hidup',
    short: 'Hewan',
    tagline: 'Kenali penghuni laut, hutan, dan halaman rumah.',
    art: ILMU_ART('icon 3.png'),
    accent: '#ff7a59',
    mascot: 'coklat-5',
    questions: [
      {
        q: 'Hewan apa yang paling besar di dunia?',
        options: ['Gajah', 'Paus biru', 'Jerapah', 'Hiu paus'],
        answer: 1,
        explain: 'Paus biru adalah hewan terbesar di dunia, bahkan lebih besar daripada gajah.',
      },
      {
        q: 'Anak katak yang masih hidup di air disebut...',
        options: ['Kecebong', 'Ulat', 'Telur', 'Jentik'],
        answer: 0,
        explain: 'Kecebong tumbuh perlahan sampai kakinya muncul dan ia menjadi katak dewasa.',
      },
      {
        q: 'Hewan mana yang menyusui anaknya?',
        options: ['Ayam', 'Ikan mas', 'Kucing', 'Penyu'],
        answer: 2,
        explain: 'Kucing termasuk mamalia. Mamalia menyusui anaknya dengan susu.',
      },
      {
        q: 'Penyu laut bertelur di...',
        options: ['Dasar laut', 'Pohon kelapa', 'Sarang di karang', 'Pasir pantai'],
        answer: 3,
        explain: 'Penyu betina naik ke pantai, menggali lubang di pasir, lalu bertelur di sana.',
      },
      {
        q: 'Sebelum menjadi kupu-kupu, hewan ini berwujud...',
        options: ['Ulat', 'Lebah', 'Semut', 'Capung'],
        answer: 0,
        explain: 'Kupu-kupu berubah dari ulat, lalu kepompong, hingga akhirnya bersayap.',
      },
      {
        q: 'Makanan utama panda adalah...',
        options: ['Ikan', 'Bambu', 'Daging', 'Rumput laut'],
        answer: 1,
        explain: 'Panda menghabiskan banyak waktunya untuk makan bambu.',
      },
    ],
  },
  {
    id: 'tubuh-manusia',
    label: 'Tubuh Manusia',
    short: 'Tubuh',
    tagline: 'Jelajahi jantung, paru-paru, dan panca indra.',
    art: ILMU_ART('Icon 2.png'),
    accent: '#8b7cf6',
    mascot: 'coklat-1',
    questions: [
      {
        q: 'Organ apa yang memompa darah ke seluruh tubuh?',
        options: ['Paru-paru', 'Jantung', 'Lambung', 'Otak'],
        answer: 1,
        explain: 'Jantung bekerja tanpa henti memompa darah ke seluruh tubuh.',
      },
      {
        q: 'Ada berapa panca indra yang kita miliki?',
        options: ['3', '4', '5', '6'],
        answer: 2,
        explain: 'Lima panca indra: penglihatan, pendengaran, penciuman, pengecapan, dan peraba.',
      },
      {
        q: 'Organ apa yang kita pakai untuk bernapas?',
        options: ['Ginjal', 'Hati', 'Lambung', 'Paru-paru'],
        answer: 3,
        explain: 'Paru-paru menghirup oksigen dari udara dan mengeluarkan karbon dioksida.',
      },
      {
        q: 'Tulang apa yang melindungi otak kita?',
        options: ['Tengkorak', 'Tulang rusuk', 'Tulang paha', 'Tulang belakang'],
        answer: 0,
        explain: 'Tengkorak bekerja seperti helm alami yang melindungi otak.',
      },
      {
        q: 'Anak usia sekolah umumnya butuh tidur sekitar...',
        options: ['2 sampai 3 jam', '5 sampai 6 jam', '9 sampai 12 jam', '15 sampai 16 jam'],
        answer: 2,
        explain: 'Tidur 9 sampai 12 jam setiap malam membantu tubuh tumbuh dan otak mengingat pelajaran.',
      },
      {
        q: 'Makanan yang kita telan dicerna di organ bernama...',
        options: ['Lambung', 'Jantung', 'Paru-paru', 'Tulang'],
        answer: 0,
        explain: 'Lambung dan usus membantu mengolah makanan menjadi sari makanan untuk tubuh.',
      },
    ],
  },
  {
    id: 'teknologi',
    label: 'Teknologi & Penemuan',
    short: 'Teknologi',
    tagline: 'Kenali alat canggih dan cara kerjanya.',
    art: ILMU_ART('Icon 4.png'),
    accent: '#4cc9f0',
    mascot: 'merah-2',
    questions: [
      {
        q: 'Alat apa yang dipakai untuk melihat bintang yang jauh?',
        options: ['Teleskop', 'Mikroskop', 'Kompas', 'Termometer'],
        answer: 0,
        explain: 'Teleskop mengumpulkan cahaya sehingga benda yang sangat jauh tampak lebih jelas.',
      },
      {
        q: 'Alat apa yang dipakai untuk melihat benda yang sangat kecil?',
        options: ['Teleskop', 'Mikroskop', 'Pengaris', 'Timbangan'],
        answer: 1,
        explain: 'Mikroskop memperbesar benda kecil, misalnya sel tumbuhan, sampai bisa kita amati.',
      },
      {
        q: 'Panel surya mengubah cahaya Matahari menjadi...',
        options: ['Makanan', 'Air', 'Listrik', 'Angin'],
        answer: 2,
        explain: 'Panel surya menangkap sinar Matahari dan mengubahnya menjadi energi listrik.',
      },
      {
        q: 'Alat apa yang menunjukkan arah mata angin?',
        options: ['Jam', 'Penggaris', 'Timbangan', 'Kompas'],
        answer: 3,
        explain: 'Jarum kompas selalu menunjuk ke arah utara-selatan karena pengaruh medan magnet Bumi.',
      },
      {
        q: 'Perintah yang kita tuliskan agar komputer bekerja disebut...',
        options: ['Program', 'Resep', 'Dongeng', 'Lagu'],
        answer: 0,
        explain: 'Program adalah kumpulan perintah. Komputer mengikutinya langkah demi langkah.',
      },
      {
        q: 'Jaringan yang menghubungkan komputer di seluruh dunia disebut...',
        options: ['Radio', 'Internet', 'Listrik', 'Televisi'],
        answer: 1,
        explain: 'Internet menghubungkan jutaan komputer sehingga informasi bisa dikirim ke mana saja.',
      },
    ],
  },
  {
    id: 'alam',
    label: 'Alam & Lingkungan',
    short: 'Alam',
    tagline: 'Dari hutan, gunung, sampai samudra luas.',
    art: ILMU_ART('Icon 5.png'),
    accent: '#34c78e',
    mascot: 'biru-6',
    questions: [
      {
        q: 'Tumbuhan membuat makanannya sendiri lewat proses...',
        options: ['Fotosintesis', 'Penguapan', 'Pembekuan', 'Pelapukan'],
        answer: 0,
        explain: 'Dengan fotosintesis, daun memakai cahaya Matahari, air, dan udara untuk membuat makanan.',
      },
      {
        q: 'Zat hijau pada daun disebut...',
        options: ['Klorofil', 'Garam', 'Minyak', 'Getah'],
        answer: 0,
        explain: 'Klorofil menangkap cahaya Matahari dan memberi warna hijau pada daun.',
      },
      {
        q: 'Air yang menguap lalu naik ke langit akan membentuk...',
        options: ['Batu', 'Awan', 'Pasir', 'Api'],
        answer: 1,
        explain: 'Uap air yang naik mendingin dan berkumpul menjadi awan, lalu turun lagi sebagai hujan.',
      },
      {
        q: 'Cairan panas yang mengalir dari gunung berapi disebut...',
        options: ['Embun', 'Salju', 'Lava', 'Santan'],
        answer: 2,
        explain: 'Lava adalah batuan cair yang sangat panas dan keluar dari gunung berapi.',
      },
      {
        q: 'Tumbuhan hijau melepaskan gas yang kita hirup, yaitu...',
        options: ['Asap', 'Debu', 'Api', 'Oksigen'],
        answer: 3,
        explain: 'Tumbuhan melepaskan oksigen. Itu sebabnya menanam pohon baik untuk kita semua.',
      },
      {
        q: 'Samudra terbesar di Bumi adalah...',
        options: ['Atlantik', 'Hindia', 'Pasifik', 'Arktik'],
        answer: 2,
        explain: 'Samudra Pasifik adalah samudra terluas dan terdalam di Bumi.',
      },
    ],
  },
]

export const getQuizCategory = (id) => quizCategories.find((c) => c.id === id) ?? null

// Misi campuran: kategori khusus yang dibangun dari bank soal di atas.
export const mixedCategory = {
  id: MIXED_ID,
  label: 'Misi Campuran',
  short: 'Campuran',
  tagline: 'Dua pertanyaan dari setiap planet.',
  accent: '#ffc93c',
  mascot: 'biru-1',
}

export const totalQuestions = quizCategories.reduce((sum, c) => sum + c.questions.length, 0)

function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Mengocok urutan jawaban sambil melacak index jawaban benar.
function prepare(question, categoryId) {
  const tagged = question.options.map((text, index) => ({ text, correct: index === question.answer }))
  const options = shuffle(tagged)
  return {
    id: `${categoryId}-${question.q}`,
    categoryId,
    q: question.q,
    explain: question.explain,
    options: options.map((o) => o.text),
    answer: options.findIndex((o) => o.correct),
  }
}

/** Satu putaran kuis: soal & jawaban dikocok setiap kali dimainkan. */
export function buildRound(categoryId) {
  if (categoryId === MIXED_ID) {
    const picked = quizCategories.flatMap((c) =>
      shuffle(c.questions)
        .slice(0, 2)
        .map((q) => prepare(q, c.id)),
    )
    return { category: mixedCategory, questions: shuffle(picked) }
  }
  const category = getQuizCategory(categoryId)
  if (!category) return null
  return { category, questions: shuffle(category.questions).map((q) => prepare(q, category.id)) }
}

// 0-3 bintang. Selalu ada kalimat penyemangat, tidak ada skor yang disimpan.
export function starsFor(score, total) {
  const ratio = total ? score / total : 0
  if (ratio >= 0.85) return 3
  if (ratio >= 0.6) return 2
  if (score > 0) return 1
  return 0
}
