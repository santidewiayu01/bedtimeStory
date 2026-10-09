// Video covers are the design team's original thumbnails
// (public/assets/video/thumbs). Titles follow what each cover says.
// `ayo-jelajah-sains.jpg` (robot) is delivered but not placed yet — the
// layout has five slots.
const thumb = (name) => `/assets/video/thumbs/${name}.jpg`

export const videos = [
  {
    id: 'tata-surya',
    title: 'Menjelajahi Tata Surya',
    duration: '06:24',
    category: 'Luar Angkasa',
    thumbnail: thumb('tata-surya'),
  },
  {
    id: 'tubuh-kita',
    title: 'Ayo Mengenal Tubuh Kita!',
    duration: '07:15',
    category: 'Tubuh Manusia',
    thumbnail: thumb('tubuh-kita'),
  },
  {
    id: 'penyu',
    title: 'Penyu, Sahabat Laut Kita',
    duration: '05:40',
    category: 'Hewan',
    thumbnail: thumb('penyu'),
  },
  {
    id: 'sains-eksperimen',
    title: 'Yuk, Mengenal Sains!',
    duration: '06:02',
    category: 'Eksperimen',
    thumbnail: thumb('sains-eksperimen'),
  },
  {
    id: 'sains-untuk-anak',
    title: 'Sains untuk Anak',
    duration: '05:18',
    category: 'Bumi',
    thumbnail: thumb('sains-untuk-anak'),
  },
]

// ---------------------------------------------------------------------
// Halaman /video
//
// `videos` di atas dipakai Beranda (VideoSection) dan TIDAK diubah.
// `videoLibrary` adalah daftar untuk halaman Video. Datanya hanya contoh
// untuk mengisi tampilan: belum ada file video asli.
//
// Cara menambahkan video asli nanti: isi `sources` dengan URL file per
// kualitas, misalnya
//   sources: { '360p': '/assets/video/files/tata-surya-360p.mp4',
//              '720p': '/assets/video/files/tata-surya-720p.mp4' }
// Kualitas yang tidak diisi otomatis tampil nonaktif di pemutar.
// Video tanpa satu pun sumber otomatis berstatus "Video belum tersedia".
// ---------------------------------------------------------------------
export const VIDEO_QUALITIES = ['144p', '240p', '360p', '480p', '720p', '1080p']

// Urutan kualitas yang dipilih otomatis saat video dibuka.
export const DEFAULT_QUALITY_ORDER = ['480p', '720p', '360p', '1080p', '240p', '144p']

// Kualitas yang punya sumber (URL tidak kosong), berurutan dari terendah.
export const getAvailableQualities = (video) =>
  VIDEO_QUALITIES.filter((q) => Boolean(video?.sources?.[q]))

export const isVideoAvailable = (video) => getAvailableQualities(video).length > 0

export const videoLibrary = [
  ...videos.map((video) => ({ ...video, sources: {} })),
  {
    id: 'ayo-jelajah-sains',
    title: 'Ayo Jelajah Sains Bersama Robot',
    duration: '04:50',
    category: 'Teknologi',
    thumbnail: thumb('ayo-jelajah-sains'),
    sources: {},
  },
]
