// Article thumbnails use the design team's original 1254x1254 category
// art (public/assets/asset asli/icon sains). Artwork exists per CATEGORY
// (not per article), so each article takes its category's image unless it
// sets its own `image` — drop a dedicated file path there when one arrives.
const ICON_ROOT = '/assets/asset asli/icon sains'
const icon = (file) => encodeURI(`${ICON_ROOT}/${file}`)

export const SCIENCE_THUMBS = {
  'alam-semesta': icon('Icon 1.png'),
  'tubuh-manusia': icon('Icon 2.png'),
  hewan: icon('icon 3.png'),
  teknologi: icon('Icon 4.png'),
  bumi: icon('Icon 5.png'),
  lingkungan: icon('Icon 5.png'),
  eksperimen: icon('Icon 6.png'),
}

export const scienceCategories = [
  { id: 'semua', label: 'Semua', icon: 'Sparkles' },
  { id: 'alam-semesta', label: 'Alam Semesta', icon: 'Globe' },
  { id: 'hewan', label: 'Hewan', icon: 'PawPrint' },
  { id: 'tubuh-manusia', label: 'Tubuh Manusia', icon: 'HeartPulse' },
  { id: 'bumi', label: 'Bumi', icon: 'Earth' },
  { id: 'teknologi', label: 'Teknologi', icon: 'Cpu' },
  { id: 'lingkungan', label: 'Lingkungan', icon: 'Leaf' },
]

const articles = [
  {
    id: 'lebah-terbang',
    title: 'Kenapa Lebah Bisa Terbang?',
    category: 'hewan',
    badge: 'Baru',
  },
  {
    id: 'gunung-meletus',
    title: 'Bagaimana Gunung Meletus?',
    category: 'bumi',
  },
  {
    id: 'otak-bekerja',
    title: 'Bagaimana Otak Bekerja?',
    category: 'tubuh-manusia',
  },
  {
    id: 'penyu-pantai',
    title: 'Kenapa Penyu Kembali ke Pantai?',
    category: 'hewan',
  },
  {
    id: 'es-kutub-mencair',
    title: 'Es di Kutub Mencair, Kenapa Bisa Terjadi?',
    category: 'lingkungan',
  },
]

export const scienceArticles = articles.map((article) => ({
  ...article,
  image: article.image ?? SCIENCE_THUMBS[article.category],
}))

// Six category cards — sliced from the design team's original
// "Icon Sains - Website" strip (one card per category, art + label + arrow
// baked in). One image per category, so no artwork repeats.
export const SCIENCE_CATEGORY_CARDS = [
  { id: 'alam-semesta', label: 'Mengenal Alam Semesta', src: '/assets/ilmu/alam-semesta.png' },
  { id: 'tubuh-manusia', label: 'Tubuh Manusia dan Kesehatan', src: '/assets/ilmu/tubuh-manusia.png' },
  { id: 'hewan', label: 'Dunia Hewan dan Tumbuhan', src: '/assets/ilmu/hewan.png' },
  { id: 'teknologi', label: 'Teknologi dan Penemuan', src: '/assets/ilmu/teknologi.png' },
  { id: 'bumi', label: 'Bumi dan Lingkungannya', src: '/assets/ilmu/bumi.png' },
  { id: 'eksperimen', label: 'Eksperimen dan Sains', src: '/assets/ilmu/eksperimen.png' },
].map((c) => ({ ...c, width: 360, height: 533 }))
