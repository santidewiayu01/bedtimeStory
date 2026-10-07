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
