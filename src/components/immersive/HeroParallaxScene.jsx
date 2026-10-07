import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { DEPTH_FACTORS, HERO_KEYFRAMES } from '../../data/heroKeyframes'
import HeroLayers from './HeroLayers'
import { usePrefersReducedMotion } from './HeroScrollController'

/**
 * Three-tier "quality" level from viewport width:
 * - "high" (> 1024px) — desktop: every layer, full parallax.
 * - "mid"  (769–1024px) — tablet: every layer, parallax reduced.
 * - "low"  (<= 768px) — phone: fewer decorations (see HeroLayers),
 *   shorter camera travel. Keeps mobile scrolling smooth and the
 *   text readable.
 */
function useSceneQuality() {
  const [quality, setQuality] = useState('high')

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 768px)')
    const tablet = window.matchMedia('(max-width: 1024px)')
    const update = () => {
      if (phone.matches) setQuality('low')
      else if (tablet.matches) setQuality('mid')
      else setQuality('high')
    }
    update()
    phone.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => {
      phone.removeEventListener('change', update)
      tablet.removeEventListener('change', update)
    }
  }, [])

  return quality
}

// Finds the pair of HERO_KEYFRAMES bracketing `progress` (via their
// `at` values), the local t between them, and the GSAP ease that
// segment should use — each phase gets its own cinematic curve (see
// heroKeyframes.js) instead of one uniform easing for the whole
// journey. Same shape as the old HeroCamera.jsx helper, just without
// any THREE.js involved.
function getSegment(progress) {
  const n = HERO_KEYFRAMES.length
  for (let i = 0; i < n - 1; i += 1) {
    const from = HERO_KEYFRAMES[i]
    const to = HERO_KEYFRAMES[i + 1]
    if (progress <= to.at || i === n - 2) {
      const span = Math.max(to.at - from.at, 0.0001)
      const t = gsap.utils.clamp(0, 1, (progress - from.at) / span)
      return { from, to, t }
    }
  }
  return { from: HERO_KEYFRAMES[0], to: HERO_KEYFRAMES[1], t: 0 }
}

const easeCache = new Map()
function getEase(name) {
  if (!easeCache.has(name)) {
    easeCache.set(name, gsap.parseEase(name || 'power1.inOut'))
  }
  return easeCache.get(name)
}

const LAYER_NAMES = ['background', 'distant', 'midground', 'foreground', 'focal', 'rocket']

/**
 * The 2.5D scene. Fills its parent EXACTLY (the pinned/sticky 100vh
 * box rendered by ImmersiveHero.jsx) via `absolute inset-0`. Purely
 * decorative (aria-hidden, pointer-events disabled) — all real
 * navigation/interaction stays in the HTML/React UI on top of it.
 *
 * Rendered once from ImmersiveHero.jsx, which supplies `progressRef`
 * (Hero-local scroll progress — see HeroScrollController.jsx). Every
 * frame, this reads `progressRef.current`, interpolates the shared 2D
 * "camera" state between the bracketing HERO_KEYFRAMES, multiplies it
 * by each layer's DEPTH_FACTORS, and applies the result directly to
 * each layer's DOM node with `gsap.set` — no React state, no
 * per-frame re-render (per the brief's "Jangan gunakan React state
 * update setiap frame" requirement).
 */
function HeroParallaxScene({ progressRef }) {
  const quality = useSceneQuality()
  const reducedMotion = usePrefersReducedMotion()

  // How much of the full camera journey actually plays: full on
  // desktop, reduced on tablet, shorter again on phones, and cut way
  // down — but not to zero, so the world doesn't feel frozen — when
  // the user has asked for reduced motion.
  const motionScale = reducedMotion ? 0.15 : { high: 1, mid: 0.75, low: 0.55 }[quality]

  // Plain object keyed by layer name, populated by HeroLayers' ref
  // callbacks as each layer's DOM node mounts — not a React ref
  // itself, just a stable box to stash DOM nodes in between renders,
  // so the ticker below always sees the current nodes.
  const nodesRef = useRef({})
  const stageRef = useRef(null)
  const rocketRef = useRef(null)
  const sizeRef = useRef({ w: 1, h: 1 })
  const setLayerRef = (name, node) => {
    nodesRef.current[name] = node
  }

  // Cache the stage size (no layout reads inside the per-frame tick).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const measure = () => {
      sizeRef.current = { w: stage.clientWidth || 1, h: stage.clientHeight || 1 }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (rocketRef.current) gsap.set(rocketRef.current, { xPercent: -50, yPercent: -50 })
    const tick = () => {
      const progress = progressRef?.current ?? 0
      const { from, to, t } = getSegment(progress)
      const et = getEase(from.ease)(t)

      const camera = {
        x: gsap.utils.interpolate(from.camera.x, to.camera.x, et),
        y: gsap.utils.interpolate(from.camera.y, to.camera.y, et),
        scale: gsap.utils.interpolate(from.camera.scale, to.camera.scale, et),
        rotate: gsap.utils.interpolate(from.camera.rotate, to.camera.rotate, et),
      }

      LAYER_NAMES.forEach((name) => {
        const node = nodesRef.current[name]
        if (!node) return // e.g. `focal` while no character cut-out exists
        const depth = DEPTH_FACTORS[name]

        gsap.set(node, {
          x: camera.x * depth.x * motionScale,
          y: camera.y * depth.y * motionScale,
          scale: 1 + (camera.scale - 1) * depth.scale * motionScale,
          rotate: reducedMotion ? 0 : camera.rotate * depth.rotate * motionScale,
        })
      })

      // Rocket: same segment + eased t as the camera, so it is locked to
      // the scroll/step progress (forward AND reverse).
      const rocket = rocketRef.current
      if (rocket) {
        const a = from.rocket
        const b = to.rocket
        const mix = (key) => gsap.utils.interpolate(a[key], b[key], et)
        const { w, h } = sizeRef.current
        gsap.set(rocket, {
          x: (mix('x') / 100) * w,
          y: (mix('y') / 100) * h,
          rotate: mix('rotate'),
          scale: mix('scale'),
          opacity: mix('opacity'),
        })
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef, motionScale, reducedMotion])

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden bg-gradient-to-b from-navy-950 to-purple-950">
      <HeroLayers onLayerRef={setLayerRef} onRocketRef={(node) => { rocketRef.current = node }} quality={quality} />
    </div>
  )
}

export default HeroParallaxScene
