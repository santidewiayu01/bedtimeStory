// Section teaser card (original art, 494x494 transparent PNG) shown in the
// left block of the Cerita section.
export const TEASER_BEDTIME = {
  src: encodeURI('/assets/asset asli/visual teaser card/bedtime - website.png'),
  width: 494,
  height: 494,
}

// Story metadata only — the three story COVERS have not been delivered yet,
// so StoryCard still shows its placeholder (add `cover: '<path>'` per story
// and it will switch to the image automatically).
export const bedtimeStories = [
  {
    id: 'tetangga-yang-lapar',
    title: 'Tetangga yang Lapar',
    badge: 'Baru',
    ageRange: '6-10 thn',
    duration: '6 menit',
    value: 'Peduli',
  },
  {
    id: 'kisah-nabi-yunus-as',
    title: 'Kisah Nabi Yunus AS',
    ageRange: '6-10 thn',
    duration: '7 menit',
    value: 'Sabar',
  },
  {
    id: 'semut-dan-belalang',
    title: 'Semut dan Belalang',
    ageRange: '5-9 thn',
    duration: '5 menit',
    value: 'Rajin',
  },
]

// Same kind of teaser card for the other two sections (original art, 494x494).
export const TEASER_ILMU = {
  src: encodeURI('/assets/asset asli/visual teaser card/ilmu pengetahuan - website.png'),
  width: 494,
  height: 494,
}
export const TEASER_VIDEO = {
  src: encodeURI('/assets/asset asli/visual teaser card/vidio pengetahuan - website.png'),
  width: 494,
  height: 494,
}
export const CERITA_BACKGROUND = '/assets/backgrounds/cerita-galaxy.jpg'
