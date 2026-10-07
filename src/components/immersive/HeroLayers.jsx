import { useEffect, useState } from 'react'
import {
  DECORATION_SHEET,
  HERO_BACKGROUND,
  HERO_FOCAL,
  SPRITES,
} from '../../data/heroAssets'

/**
 * The 2.5D illustration stack, back to front. Every pixel comes from
 * the design team's original files (see data/heroAssets.js) — there
 * are no placeholders, generated images or remote images here.
 *
 *   LAYER 0  background  the composited galaxy illustration (one file,
 *                        so it is the base; it moves the least)
 *   LAYER 1  distant     small far-away planets / space rocks
 *   LAYER 2  midground   mid-distance rocks and clouds
 *   LAYER 3  foreground  big soft clouds, stars, rocket framing the
 *                        corners (moves the most, sells the depth)
 *   LAYER 4  focal       reserved for a separate character cut-out.
 *                        The original assets contain none — the
 *                        MiniLemon family is painted into layer 0 — so
 *                        it renders only when HERO_FOCAL is set.
 *   (LAYER 5 — UI — is Hero.jsx, rendered on top of this component.)
 *
 * `onLayerRef(name, node)` hands each layer's DOM node to
 * HeroParallaxScene, which moves them with gsap.set on every tick.
 * This component only renders: no state per frame, no animation code.
 * The only motion here is CSS (`hero-float` / `hero-twinkle` in
 * index.css) on the INNER sprite nodes, so it never fights the GSAP
 * transforms applied to the layer wrappers.
 *
 * `quality` — "high" (desktop), "mid" (tablet) or "low" (phone).
 * Items flagged `hideOn: 'low'` are dropped on phones so the frame
 * stays light and the background + text stay readable.
 */

// Sprite on the shared decoration sheet, drawn with CSS background so
// the sheet is fetched/decoded exactly once for the whole scene.
export function Sprite({ name, className = '', style }) {
  const sprite = SPRITES[name]
  const { width: sheetW, height: sheetH, src } = DECORATION_SHEET

  return (
    <span
      className={`block bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: `${(sheetW / sprite.w) * 100}% ${(sheetH / sprite.h) * 100}%`,
        backgroundPosition: `${(sprite.x / (sheetW - sprite.w)) * 100}% ${(sprite.y / (sheetH - sprite.h)) * 100}%`,
        aspectRatio: `${sprite.w} / ${sprite.h}`,
        ...style,
      }}
    />
  )
}

// Position (% of the Hero box), width (% of Hero width), plus how the
// sprite idles. `float`/`twinkle` are CSS-only; `delay`/`dur` are just
// de-synchronisation so nothing bobs in unison.
const DISTANT = [
  { sprite: 'purpleSm', pos: 'left-[31%] top-[7%] w-[8%] md:w-[4.2%]', float: true, delay: '0s', dur: '9s' },
  { sprite: 'blueSm', pos: 'left-[42%] top-[4%] w-[6%] md:w-[3%]', float: true, delay: '-3s', dur: '11s' },
  { sprite: 'blueCrater', pos: 'left-[1.5%] top-[45%] w-[3.4%]', float: true, delay: '-2s', dur: '12s', hideOn: 'low' },
]

const MIDGROUND = [
  { sprite: 'asteroid', pos: 'left-[21%] top-[9%] w-[3.6%]', float: true, delay: '-1s', dur: '8s', hideOn: 'low' },
  { sprite: 'asteroidSm', pos: 'left-[25.5%] top-[14%] w-[2.2%]', float: true, delay: '-4s', dur: '9s', hideOn: 'low' },
  { sprite: 'cloudMid', pos: 'left-[-4%] bottom-[6%] w-[48%] md:w-[30%]' },
]

const FOREGROUND = [
  { sprite: 'cloudBig', pos: 'left-[-8%] bottom-[-5%] w-[46%] md:w-[30%]', flip: true },
  { sprite: 'cloudBig', pos: 'right-[-8%] bottom-[-6%] w-[40%] md:w-[24%]' },
  { sprite: 'star1', pos: 'left-[17%] top-[11%] w-[2.6%]', twinkle: true, delay: '-1s', dur: '4.5s', hideOn: 'low' },
  { sprite: 'star2', pos: 'left-[47%] top-[13%] w-[4.5%] md:w-[2.2%]', twinkle: true, delay: '-2.5s', dur: '5s' },
  { sprite: 'star3', pos: 'left-[38%] top-[26%] w-[3.2%] md:w-[1.6%]', twinkle: true, delay: '-0.5s', dur: '3.8s' },
  { sprite: 'star4', pos: 'left-[24%] top-[86%] w-[1.1%]', twinkle: true, delay: '-3s', dur: '4.2s', hideOn: 'low' },
]

// Fades the decoration in once the (2 MB) sprite sheet has actually
// arrived, instead of letting sprites pop in one by one. Runs once —
// this is the ONLY React state in the scene, and it never changes on
// scroll.
function useImageReady(src) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const image = new Image()
    const done = () => setReady(true)
    image.onload = done
    image.onerror = done
    image.src = src
    if (image.complete) done()
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [src])

  return ready
}

function DecorItems({ items, isLow }) {
  return items
    .filter((item) => !(isLow && item.hideOn === 'low'))
    .map((item, index) => {
      let idle = ''
      if (item.float) idle = 'hero-float'
      if (item.twinkle) idle = 'hero-twinkle'

      return (
        <div key={`${item.sprite}-${index}`} className={`absolute ${item.pos}`}>
          <Sprite
            name={item.sprite}
            className={idle}
            style={{
              '--float-delay': item.delay,
              '--float-dur': item.dur,
              transform: item.flip ? 'scaleX(-1)' : undefined,
            }}
          />
        </div>
      )
    })
}

function HeroLayers({ onLayerRef, onRocketRef, quality = 'high' }) {
  const isLow = quality === 'low'
  const decorationReady = useImageReady(DECORATION_SHEET.src)
  const fade = `transition-opacity duration-1000 ${decorationReady ? 'opacity-100' : 'opacity-0'}`

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* LAYER 0 — BACKGROUND. Inset a little past the frame so the
          small pan/scale from the camera never reveals an edge.
          objectPosition keeps the MiniLemon group on the right and
          leaves the nebula behind the headline on the left. */}
      <div ref={(node) => onLayerRef('background', node)} className="absolute inset-[-5%]">
        <img
          src={HERO_BACKGROUND.src}
          width={HERO_BACKGROUND.width}
          height={HERO_BACKGROUND.height}
          alt=""
          fetchPriority="high"
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover object-[70%_50%] md:object-[55%_50%] lg:object-[40%_50%]"
        />
      </div>

      {/* LAYER 1 — DISTANT */}
      <div ref={(node) => onLayerRef('distant', node)} className="absolute inset-0">
        <div className={`absolute inset-0 ${fade}`}>
          <DecorItems items={DISTANT} isLow={isLow} />
        </div>
      </div>

      {/* LAYER 2 — MIDGROUND */}
      <div ref={(node) => onLayerRef('midground', node)} className="absolute inset-0">
        <div className={`absolute inset-0 ${fade}`}>
          <DecorItems items={MIDGROUND} isLow={isLow} />
        </div>
      </div>

      {/* LAYER 4 — FOCAL (slot only; see HERO_FOCAL in heroAssets.js).
          Placed before the foreground in the DOM so foreground clouds
          and stars can still pass in front of the character. */}
      {HERO_FOCAL ? (
        <div
          ref={(node) => onLayerRef('focal', node)}
          className="absolute bottom-[8%] left-1/2 w-[38%] -translate-x-1/2 lg:left-[64%] lg:w-[30%]"
        >
          <img src={HERO_FOCAL.src} alt="" className="h-full w-full object-contain" />
        </div>
      ) : null}

      {/* LAYER 3 — FOREGROUND */}
      <div ref={(node) => onLayerRef('foreground', node)} className="absolute inset-0">
        <div className={`absolute inset-0 ${fade}`}>
          <DecorItems items={FOREGROUND} isLow={isLow} />
        </div>
      </div>

      {/* LAYER 3b — ROCKET. Flies its own path (see `rocket` in each
          HERO_KEYFRAME); HeroParallaxScene positions the inner node every
          tick. Sits in the sky strip above the characters, below the UI
          layer, so it can never cover the heading or a CTA. */}
      <div ref={(node) => onLayerRef('rocket', node)} className="absolute inset-0">
        <div ref={onRocketRef} className="absolute left-0 top-0 w-[30%] opacity-0 sm:w-[19%] lg:w-[11%]">
          <Sprite name="rocket" className="hero-float" style={{ '--float-delay': '-2s', '--float-dur': '6s' }} />
        </div>
      </div>
    </div>
  )
}

export default HeroLayers
