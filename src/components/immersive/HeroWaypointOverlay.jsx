import gsap from 'gsap'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HERO_KEYFRAMES } from '../../data/heroKeyframes'
import { usePrefersReducedMotion } from './HeroScrollController'

// Small helper — looks up a keyframe's `at` value by id so the
// waypoint messages below always line up with wherever the Hero
// journey (see heroKeyframes.js) actually settles on that landmark,
// instead of hard-coding a second copy of those numbers that could
// drift out of sync.
function keyframeAt(id) {
  return HERO_KEYFRAMES.find((frame) => frame.id === id)?.at ?? 0
}

// One cinematic text overlay per landmark stop. All three sit on the
// left on desktop (the characters in the background art own the
// right); on narrower screens each centers at the bottom. Wording
// matches what's already approved (section 6 of the brief) —
// Waypoint 1 is the Hero intro panel itself (see Hero.jsx) and is
// deliberately not part of this list.
const WAYPOINT_MESSAGES = [
  {
    id: 'story',
    at: keyframeAt('story'),
    title: 'Saatnya Mendengar Cerita',
    subtitle: 'Kisah kecil, pesan yang berarti.',
    cta: 'Yuk, lihat ceritanya',
    to: '/cerita',
  },
  {
    id: 'science',
    at: keyframeAt('science'),
    title: 'Temukan Hal Baru',
    subtitle: 'Belajar dari dunia di sekitarmu.',
    cta: 'Jelajahi ilmu',
    to: '/ilmu',
  },
  {
    id: 'video',
    at: keyframeAt('video'),
    title: 'Tonton. Temukan. Pelajari.',
    subtitle: 'Pengetahuan seru menunggumu.',
    cta: 'Yuk, nonton',
    to: '/video',
  },
]

// How wide (in Hero-local 0..1 progress) each waypoint message's
// fade-in/hold/fade-out window is, relative to its own `at` value —
// asymmetric on purpose: fading in a little before the scene visually
// settles on the landmark and fading out quickly once it starts
// moving on, well before the NEXT waypoint's window opens (story/
// science/video sit 0.20 apart, this window is ~0.19 wide, so they
// never overlap).
const FADE_IN_START = 0.09
const FADE_IN_END = 0.02
const FADE_OUT_START = 0.03
const FADE_OUT_END = 0.1

// Returns 0..1 — how "shown" a waypoint message should be for the
// current Hero progress. Pure function of `progress`, so it works
// identically whether the journey is currently playing forward or in
// reverse (dwell/reverse behavior lives in HeroScrollController.jsx —
// this just reacts to whatever progress value it's handed).
function waypointVisibility(progress, at) {
  const fadeInFrom = at - FADE_IN_START
  const fadeInTo = at - FADE_IN_END
  const fadeOutFrom = at + FADE_OUT_START
  const fadeOutTo = at + FADE_OUT_END

  if (progress <= fadeInFrom || progress >= fadeOutTo) return 0
  if (progress < fadeInTo) {
    return gsap.utils.clamp(0, 1, (progress - fadeInFrom) / (fadeInTo - fadeInFrom))
  }
  if (progress > fadeOutFrom) {
    return 1 - gsap.utils.clamp(0, 1, (progress - fadeOutFrom) / (fadeOutTo - fadeOutFrom))
  }
  return 1
}

/**
 * One cinematic waypoint text overlay (title + subtitle + small text
 * link). Purely presentational — never reads `progressRef` itself;
 * HeroWaypointOverlay's single ticker computes each message's
 * opacity/translate per frame and applies it directly via `gsap.set`,
 * so adding more waypoints costs one more `gsap.set` call per frame,
 * not one more ticker subscription.
 */
function WaypointMessage({ innerRef, title, subtitle, cta, to }) {
  return (
    // Outer box = static position only (never animated). On desktop it
    // is a full-height flex row whose left edge lines up with the
    // Hero intro headline (same 1280px container + 2.5rem gutter), so
    // every message appears in the calm nebula area on the left and
    // never covers the characters. On smaller screens it sits at the
    // bottom, over the bottom scrim.
    <div className="pointer-events-none absolute inset-x-6 bottom-20 sm:bottom-24 lg:inset-y-0 lg:left-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:right-auto lg:flex lg:items-center">
      {/* Inner box = the node GSAP fades/translates. */}
      <div
        ref={innerRef}
        className="flex flex-col items-center text-center opacity-0 lg:max-w-md lg:items-start lg:text-left"
      >
        <h2 className="text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(10,15,43,0.75)] sm:text-3xl lg:text-[2.5rem]">
          {title}
        </h2>
        <p className="mt-3 max-w-xs text-sm text-white/90 drop-shadow-[0_2px_8px_rgba(10,15,43,0.7)] sm:text-base lg:text-lg">
          {subtitle}
        </p>
        {cta ? (
          <Link
            to={to}
            className="pointer-events-auto mt-2 inline-flex min-h-11 items-center px-3 sm:mt-4 items-center gap-1.5 text-sm font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
          >
            <Sparkles size={15} strokeWidth={2.5} />
            {cta}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Renders + drives all cinematic waypoint messages for the Hero
 * journey. Self-contained: owns its own refs and its own GSAP ticker
 * subscription, keyed only off the `progressRef` it's handed — Hero.jsx
 * just mounts this once and doesn't need to know anything about
 * waypoint text, timing windows, or fade curves.
 */
function HeroWaypointOverlay({ progressRef }) {
  const waypointRefs = useRef([])
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!progressRef) return undefined

    const waypointEase = gsap.parseEase('power2.out')

    const tick = () => {
      const progress = progressRef.current ?? 0

      WAYPOINT_MESSAGES.forEach((waypoint, index) => {
        const node = waypointRefs.current[index]
        if (!node) return
        const visible = waypointVisibility(progress, waypoint.at)
        const eased = waypointEase(visible)

        gsap.set(node, {
          opacity: eased,
          y: reducedMotion ? 0 : (1 - eased) * 18,
          scale: reducedMotion ? 1 : 0.97 + eased * 0.03,
          pointerEvents: eased > 0.5 ? 'auto' : 'none',
        })
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef, reducedMotion])

  return (
    <>
      {WAYPOINT_MESSAGES.map((waypoint, index) => (
        <WaypointMessage
          key={waypoint.id}
          innerRef={(node) => {
            waypointRefs.current[index] = node
          }}
          title={waypoint.title}
          subtitle={waypoint.subtitle}
          cta={waypoint.cta}
          to={waypoint.to}
        />
      ))}
    </>
  )
}

export default HeroWaypointOverlay
