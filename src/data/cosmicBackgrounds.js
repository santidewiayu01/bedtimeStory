/**
 * Cosmic backdrops for "Ilmu Pengetahuan" and "Video Pengetahuan".
 * Two different original images, same nebula style. To read as ONE sky,
 * the two edges that meet (Ilmu's bottom / Video's top) fade into exactly the
 * same haze colour at the junction, so there is no visible seam. Ilmu's top
 * fades gently too so it doesn't cut hard against the Bedtime Stories band.
 */
export const COSMIC_BASE = '#1b2690' // fallback + haze colour (sampled from the artwork's mid-tone)
const HAZE = '27, 38, 144'
const a = (alpha) => `rgba(${HAZE}, ${alpha})`

// Solid at the very edge (covers the 24px overlap between the two sections),
// then eases out so the artwork's stars and clouds come back gradually.
const seamFade = (toward) =>
  `linear-gradient(to ${toward}, ${a(1)} 0%, ${a(1)} 5%, ${a(0.55)} 14%, ${a(0.18)} 26%, ${a(0)} 38%)`

const softTop = `linear-gradient(to bottom, ${a(0.7)} 0%, ${a(0)} 10%)`

export const ILMU_BACKGROUND_STYLE = {
  backgroundImage: `${seamFade('top')}, ${softTop}, url("/assets/backgrounds/ilmu-cosmic.jpg")`,
}

export const VIDEO_BACKGROUND_STYLE = {
  backgroundImage: `${seamFade('bottom')}, url("/assets/backgrounds/video-cosmic.jpg")`,
}
