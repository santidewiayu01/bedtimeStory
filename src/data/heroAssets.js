/**
 * Single source of truth for every ORIGINAL (design-team) asset the
 * Hero uses. Nothing here is copied, renamed or re-exported — every
 * path points straight into `public/assets/asset asli/`, exactly as
 * delivered.
 *
 * The folder names contain spaces, so URLs go through encodeURI().
 */
const ASSET_ROOT = '/assets/asset asli'

const url = (path) => encodeURI(`${ASSET_ROOT}/${path}`)

// LOGO — transparent 1600x800 PNG. The artwork only occupies the
// `bbox` rectangle (the rest is transparent padding), so the Navbar
// crops to it instead of shrinking the whole canvas.
export const LOGO = {
  src: url('logo/IMG-20260917-WA0013.png'),
  width: 1600,
  height: 800,
  bbox: { x: 111, y: 81, w: 1444, h: 662 },
}

// HERO BACKGROUND — one fully composited illustration (galaxy, planet,
// observatory and the whole MiniLemon family). Not layered, so it is
// the base layer; depth comes from the decoration sprites below.
export const HERO_BACKGROUND = {
  src: url('background ilustrasi/Background Galaxi - Website.png'),
  width: 1680,
  height: 936,
}

// HERO DECORATION — "Asset Bed Time Story.png" is a 1536x1024
// transparent SPRITE SHEET (planets, asteroids, rockets, stars,
// clouds). It is used in place, as a CSS sprite: every entry below is
// a rectangle (x, y, w, h — in source pixels) on that one file, so the
// browser downloads/decodes it once and no cropped copies exist.
// Rectangles were measured from the alpha channel and checked so that
// no neighbouring sprite bleeds into the box.
export const DECORATION_SHEET = {
  src: url('background ilustrasi/Asset Bed Time Story.png'),
  width: 1536,
  height: 1024,
}

export const SPRITES = {
  // planets & space rocks
  purpleSm: { x: 442, y: 338, w: 119, h: 121 },
  blueSm: { x: 1417, y: 130, w: 102, h: 108 },
  ringedSm: { x: 1203, y: 98, w: 205, h: 142 },
  ringedPink: { x: 20, y: 323, w: 214, h: 135 },
  blueCrater: { x: 265, y: 336, w: 126, h: 124 },
  moon: { x: 955, y: 63, w: 227, h: 220 },
  asteroid: { x: 1055, y: 310, w: 181, h: 168 },
  asteroidSm: { x: 1270, y: 336, w: 110, h: 94 },
  // rocket
  rocket: { x: 31, y: 493, w: 471, h: 209 },
  // stars
  star1: { x: 768, y: 541, w: 126, h: 125 },
  star2: { x: 940, y: 556, w: 89, h: 90 },
  star3: { x: 1085, y: 575, w: 54, h: 54 },
  star4: { x: 1181, y: 595, w: 32, h: 32 },
  shootingStar: { x: 1281, y: 539, w: 218, h: 126 },
  // clouds
  cloudBig: { x: 972, y: 697, w: 540, h: 217 },
  cloudMid: { x: 493, y: 739, w: 479, h: 125 },
}

// Optional: a separate cut-out of the main character. The original
// folder has NONE (the MiniLemon family is painted into the
// background composite), so this stays null and the focal slot in
// HeroLayers renders nothing. When the design team supplies a
// transparent PNG, set { src, aspect } here — no other code changes.
export const HERO_FOCAL = null
