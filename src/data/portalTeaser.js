/**
 * The three-worlds teaser artwork (one original horizontal image, used as-is —
 * never redrawn). Coordinates below are in the artwork's own pixels and are
 * used for two things only:
 *  - desktop: invisible link hit-areas laid over each card;
 *  - mobile: cropping each card out of the SAME file (no second asset).
 */
export const PORTAL_TEASER = {
  src: '/assets/teaser/portal-three-worlds.jpg',
  width: 1600,
  height: 533,
}

export const PORTAL_WORLDS = [
  { id: 'cerita', to: '/cerita', label: 'Bedtime Stories — cerita sebelum tidur', crop: { x: 14, y: 52, w: 538, h: 440 } },
  { id: 'ilmu', to: '/ilmu', label: 'Ilmu Pengetahuan — fakta menarik dan eksperimen seru', crop: { x: 534, y: 52, w: 528, h: 440 } },
  { id: 'video', to: '/video', label: 'Video Pengetahuan — video edukasi', crop: { x: 1044, y: 44, w: 542, h: 448 } },
]
