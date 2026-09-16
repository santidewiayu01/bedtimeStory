import gsap from 'gsap'
import { motion } from 'framer-motion'
import { ChevronDown, Compass, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HERO_KEYFRAMES } from '../../data/heroKeyframes'
import { usePrefersReducedMotion } from '../immersive/HeroScrollController'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Container from '../ui/Container'

// Where, in the Hero's 0..1 local scroll progress, the intro text
// panel (badge/heading/description/CTA/scroll-hint) fades away — kept
// tight to the very start of the journey on purpose: per the "Hero
// intro hilang saat journey" requirement, the panel should be FULLY
// gone (opacity 0, not just dimmed) as soon as the cinematic camera
// starts moving, well before it reaches even the first landmark.
const FADE_START = 0.02
const FADE_END = 0.16

// Small helper — looks up a keyframe's `at` value by id so the
// waypoint messages below always line up with wherever the camera
// journey (see heroKeyframes.js) actually places that landmark,
// instead of hard-coding a second copy of those numbers that could
// drift out of sync.
function keyframeAt(id) {
  return HERO_KEYFRAMES.find((frame) => frame.id === id)?.at ?? 0
}

// One cinematic text overlay per landmark stop. `side` only matters at
// `lg` and up (see WaypointMessage) — on narrower screens every
// message centers itself so it never risks clipping off an edge.
const WAYPOINT_MESSAGES = [
  {
    id: 'story',
    at: keyframeAt('story'),
    side: 'right',
    title: 'Saatnya Mendengar Cerita',
    subtitle: 'Kisah kecil, pesan yang berarti.',
    cta: 'Yuk, lihat ceritanya',
    to: '/cerita',
  },
  {
    id: 'science',
    at: keyframeAt('science'),
    side: 'left',
    title: 'Temukan Hal Baru',
    subtitle: 'Belajar dari dunia di sekitarmu.',
    cta: 'Jelajahi ilmu',
    to: '/ilmu',
  },
  {
    id: 'video',
    at: keyframeAt('video'),
    side: 'right',
    title: 'Tonton. Temukan. Pelajari.',
    subtitle: 'Pengetahuan seru menunggumu.',
    cta: 'Yuk, nonton',
    to: '/video',
  },
]

// How wide (in Hero-local 0..1 progress) each waypoint message's
// fade-in/hold/fade-out window is, relative to its own `at` value —
// asymmetric on purpose: fading in a little before the camera visually
// settles on the landmark ("beberapa saat sebelum/ketika camera
// berhenti") and fading out quickly once it starts moving on, well
// before the NEXT waypoint's window opens (see the spacing check in
// the comment above WAYPOINT_MESSAGES' `at` values — story/science/
// video sit 0.20 apart, this window is ~0.19 wide, so they never
// overlap).
const WAYPOINT_FADE_IN_START = 0.09
const WAYPOINT_FADE_IN_END = 0.02
const WAYPOINT_FADE_OUT_START = 0.03
const WAYPOINT_FADE_OUT_END = 0.1

// Returns 0..1 — how "shown" a waypoint message should be for the
// current Hero progress. Pure function of `progress`, so it works
// identically whether the journey is currently playing forward or in
// reverse (see section 9/11 of the brief — reverse must replay the
// same beats, not just skip them).
function waypointVisibility(progress, at) {
  const fadeInFrom = at - WAYPOINT_FADE_IN_START
  const fadeInTo = at - WAYPOINT_FADE_IN_END
  const fadeOutFrom = at + WAYPOINT_FADE_OUT_START
  const fadeOutTo = at + WAYPOINT_FADE_OUT_END

  if (progress <= fadeInFrom || progress >= fadeOutTo) return 0
  if (progress < fadeInTo) {
    return gsap.utils.clamp(0, 1, (progress - fadeInFrom) / (fadeInTo - fadeInFrom))
  }
  if (progress > fadeOutFrom) {
    return 1 - gsap.utils.clamp(0, 1, (progress - fadeOutFrom) / (fadeOutTo - fadeOutFrom))
  }
  return 1
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

const SIDE_CLASSES = {
  right: 'lg:left-auto lg:right-10 xl:right-16 lg:text-right lg:items-end',
  left: 'lg:left-10 xl:left-16 lg:right-auto lg:text-left lg:items-start',
}

/**
 * One cinematic waypoint text overlay (title + subtitle + small text
 * link). Purely presentational — WaypointMessage never reads
 * `progressRef` itself; Hero's single ticker (below) computes each
 * message's opacity/translate per frame and applies it directly via
 * `gsap.set`, the same pattern used for the intro panel, so adding
 * three more of these costs one more `gsap.set` call per frame, not
 * three more ticker subscriptions.
 */
function WaypointMessage({ innerRef, title, subtitle, cta, to, side }) {
  return (
    <div
      ref={innerRef}
      className={`pointer-events-none absolute inset-x-6 bottom-28 flex flex-col items-center text-center opacity-0 sm:bottom-32 lg:inset-x-auto lg:bottom-24 lg:max-w-sm ${SIDE_CLASSES[side]}`}
    >
      <h2 className="text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(10,15,43,0.65)] sm:text-3xl lg:text-[2.25rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-xs text-sm text-white/80 drop-shadow-[0_2px_8px_rgba(10,15,43,0.6)] sm:text-base">
        {subtitle}
      </p>
      {cta ? (
        <Link
          to={to}
          className="pointer-events-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
        >
          <Sparkles size={15} strokeWidth={2.5} />
          {cta}
        </Link>
      ) : null}
    </div>
  )
}

/**
 * Hero's UI content only — badge, heading, description, CTA, scroll
 * hint. No section wrapper, no background, no min-height of its own:
 * it's rendered as an overlay inside ImmersiveHero's pinned 100vh
 * viewport, on top of the 3D canvas. `h-full` + `items-center` center
 * it within whatever height that parent provides.
 *
 * The text column stays on the left (as in the original design) so
 * it never sits on top of the 3D world's focal point — the island/
 * mascot/landmarks stay clear on the right two-thirds of the frame.
 *
 * `progressRef` — the same Hero-local 0..1 scroll progress HeroCamera
 * reads (see HeroScrollController.jsx). Used ONLY to gently fade/
 * translate the text panel as the camera dollies into the world — the
 * UI itself never becomes 3D and stays plain HTML/React (per the
 * "UI Integration" requirement). Read via GSAP's ticker and applied
 * with `gsap.set` directly to the DOM node so this never triggers a
 * React re-render on scroll, matching how HeroCamera avoids
 * re-rendering the 3D tree.
 */
function Hero({ progressRef }) {
  const panelRef = useRef(null)
  const waypointRefs = useRef([])
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !progressRef) return undefined

    const introEase = gsap.parseEase('power1.out')
    const waypointEase = gsap.parseEase('power2.out')

    const tick = () => {
      const progress = progressRef.current ?? 0

      // Intro panel — badge/heading/description/CTA/scroll-hint. Fully
      // gone (opacity 0, not just dimmed) the moment the journey gets
      // underway; see FADE_START/FADE_END above.
      const introLocal = gsap.utils.clamp(0, 1, (progress - FADE_START) / (FADE_END - FADE_START))
      const introEased = introEase(introLocal)

      gsap.set(panel, {
        opacity: 1 - introEased,
        // Skip the translate/scale for prefers-reduced-motion — opacity
        // alone still communicates the panel stepping back without
        // adding motion.
        y: reducedMotion ? 0 : introEased * -24,
        scale: reducedMotion ? 1 : 1 - introEased * 0.04,
        // Stop intercepting clicks/taps/keyboard focus well before
        // full transparency so it can't sit invisibly on top of the 3D
        // world's focal point — accessibility stays intact.
        pointerEvents: introEased > 0.4 ? 'none' : 'auto',
      })

      // Cinematic waypoint messages — one per landmark stop, each a
      // pure function of `progress` (see waypointVisibility above), so
      // forward and reverse playback naturally show the same beats.
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
    <div className="relative z-10 flex h-full items-center bg-gradient-to-b from-navy-950/25 via-transparent to-navy-950/55 pt-16 text-white sm:pt-0">
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Text column */}
        <div ref={panelRef} className="text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <Badge>Halo Explorer!</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]"
          >
            Jelajahi Dunia Pengetahuan{' '}
            <span className="text-yellow-400">Bersama Minilemon!</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mx-auto mt-5 max-w-md text-base text-white/70 sm:text-lg lg:mx-0"
          >
            Cerita seru, ilmu menarik, dan video pengetahuan menantimu setiap
            hari.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <Button variant="primary" icon={Compass}>
              Mulai Petualangan
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-12 hidden items-center gap-2 text-sm text-white/50 lg:flex"
          >
            <ChevronDown size={16} className="animate-bounce" />
            Scroll untuk menjelajah
          </motion.div>
        </div>

        {/* Visual column intentionally left empty — the immersive 3D
            world behind this overlay (island, story house, science
            lab, video building, mascot placeholder) is the hero
            visual. Kept as a grid cell so the text column keeps the
            same width/position as the original design. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </Container>

      {/* Cinematic waypoint messages — start at opacity 0 in markup;
          the ticker above takes over every frame. Rendered outside
          Container so their bottom/side anchoring is relative to the
          full Hero viewport, not the text column's grid cell. */}
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
          side={waypoint.side}
        />
      ))}
    </div>
  )
}

export default Hero
