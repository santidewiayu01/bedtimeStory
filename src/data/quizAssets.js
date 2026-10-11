/**
 * Asset helpers for the Quiz + Tentang pages.
 *
 * Everything points at the design team's originals. The transparent cut-outs in
 * public/assets/{mascots,badges,icons} were sliced from three of those sheets
 * ("icon benar salah", "icon exp, reward dll", "Icon - Website") — the original
 * files in `asset asli/` are untouched.
 */
const ORIGINALS = '/assets/asset asli'
const original = (path) => encodeURI(`${ORIGINALS}/${path}`)

export const mascot = (name) => `/assets/mascots/${name}.webp`
export const badge = (name) => `/assets/badges/${name}.webp`
export const icon = (name) => `/assets/icons/${name}.webp`

// Full "KUIS" key-art (1671x941).
export const QUIZ_POSTER = {
  src: original('asset section quiz/icon quiz.png'),
  width: 1671,
  height: 941,
}

// Teaser art with the three mascots in their rooms (494x494, transparent).
export const TEASERS = {
  cerita: original('visual teaser card/bedtime - website.png'),
  ilmu: original('visual teaser card/ilmu pengetahuan - website.png'),
  video: original('visual teaser card/vidio pengetahuan - website.png'),
}

// Square category illustrations (1254x1254) used by /ilmu — reused for quiz planets.
export const ILMU_ART = (file) => original(`icon sains/${file}`)

// Backgrounds
export const NEBULA = {
  ilmu: '/assets/backgrounds/ilmu-cosmic.jpg',
  video: '/assets/backgrounds/video-cosmic.jpg',
  cerita: '/assets/backgrounds/cerita-galaxy.jpg',
}
