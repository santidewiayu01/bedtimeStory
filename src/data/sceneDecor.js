/**
 * Depth decoration for the post-Hero scenes — sprites from the SAME
 * original sheet the Hero uses (no new assets). They hug the section
 * seams/padding bands so they never sit on cards or copy.
 *  depth — parallax strength (0.2 far … 0.6 near); rot — tilt (deg) over the scene
 *  fly   — crosses the whole screen right → left (the rocket continuing its flight)
 *  desktop — hidden on phones to keep them clean/light
 */
export const CERITA_DECOR = [
  { sprite: 'rocket', pos: 'right-0 top-2 w-24 sm:w-32', fly: true },
  { sprite: 'ringedSm', pos: 'left-[5%] top-[-1.1rem] w-14 sm:w-24', depth: 0.35, rot: 6, float: true },
  { sprite: 'star2', pos: 'left-[52%] top-3 w-4 sm:w-5', depth: 0.2, twinkle: true },
  { sprite: 'moon', pos: 'right-[4%] bottom-2 w-10 sm:w-12', depth: 0.45, rot: -8, float: true, desktop: true },
]
export const SCIENCE_DECOR = [
  { sprite: 'asteroid', pos: 'right-[6%] top-[-1rem] w-12 sm:w-16', depth: 0.4, rot: 10, float: true },
  { sprite: 'blueSm', pos: 'left-[8%] bottom-2 w-8 sm:w-10', depth: 0.25, rot: -6, float: true, desktop: true },
  { sprite: 'star1', pos: 'left-[44%] top-2 w-5 sm:w-7', depth: 0.2, twinkle: true },
]
export const VIDEO_DECOR = [
  { sprite: 'blueCrater', pos: 'left-[6%] top-[-0.9rem] w-10 sm:w-14', depth: 0.4, rot: 8, float: true },
  { sprite: 'star1', pos: 'right-[10%] top-1 w-5 sm:w-7', depth: 0.25, twinkle: true },
  { sprite: 'asteroidSm', pos: 'right-[4%] bottom-2 w-7 sm:w-9', depth: 0.5, rot: -10, float: true, desktop: true },
]
export const FEATURES_DECOR = [
  { sprite: 'ringedPink', pos: 'right-[6%] top-[-1rem] w-14 sm:w-24', depth: 0.35, rot: -5, float: true },
  { sprite: 'shootingStar', pos: 'left-0 top-4 w-16 sm:w-24', fly: true, desktop: true },
  { sprite: 'purpleSm', pos: 'left-[10%] bottom-3 w-8 sm:w-10', depth: 0.3, float: true, desktop: true },
]
