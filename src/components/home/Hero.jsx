import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ChevronDown, Compass } from 'lucide-react'
import { useEffect, useRef } from 'react'
import HeroWaypointOverlay from '../immersive/HeroWaypointOverlay'
import { usePrefersReducedMotion } from '../immersive/HeroScrollController'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Container from '../ui/Container'

// Where, in the Hero's 0..1 local scroll progress, the intro text
// panel (badge/heading/description/CTA/scroll-hint — "Waypoint 1",
// wording unchanged per the brief) fades away — kept tight to the
// very start of the journey on purpose: the panel should be FULLY
// gone (opacity 0, not just dimmed) as soon as the cinematic scene
// starts moving, well before it reaches even the first landmark.
const FADE_START = 0.02
const FADE_END = 0.16

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

/**
 * Hero's UI content — Layer 5 of the 2.5D stack (badge, heading,
 * description, CTA, scroll hint) plus the three cinematic waypoint
 * messages (Layer 5 too, but owned/animated by HeroWaypointOverlay).
 * No section wrapper, no background of its own: it's rendered as an
 * overlay inside ImmersiveHero's pinned 100vh viewport, on top of
 * HeroParallaxScene's layered illustration. `h-full` + `items-center`
 * center it within whatever height that parent provides.
 *
 * The text column stays on the left (as in the original design) so it
 * never sits on top of the focal illustration — see HeroLayers.jsx,
 * whose focal layer is positioned on the right two-thirds of the
 * frame on large screens.
 *
 * `progressRef` — the same Hero-local 0..1 scroll progress
 * HeroParallaxScene reads (see HeroScrollController.jsx). Used ONLY
 * to gently fade/translate this intro panel as the scene moves
 * deeper into the world — the panel itself never becomes part of the
 * illustration and stays plain HTML/React. Read via GSAP's ticker and
 * applied with `gsap.set` directly to the DOM node so this never
 * triggers a React re-render on scroll.
 */
function Hero({ progressRef }) {
  const panelRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !progressRef) return undefined

    const introEase = gsap.parseEase('power1.out')

    const tick = () => {
      const progress = progressRef.current ?? 0
      const introLocal = gsap.utils.clamp(0, 1, (progress - FADE_START) / (FADE_END - FADE_START))
      const introEased = introEase(introLocal)

      gsap.set(panel, {
        opacity: 1 - introEased,
        // Skip the translate/scale for prefers-reduced-motion —
        // opacity alone still communicates the panel stepping back
        // without adding motion.
        y: reducedMotion ? 0 : introEased * -24,
        scale: reducedMotion ? 1 : 1 - introEased * 0.04,
        // Stop intercepting clicks/taps/keyboard focus well before
        // full transparency so it can't sit invisibly on top of the
        // illustration's focal point — accessibility stays intact.
        pointerEvents: introEased > 0.4 ? 'none' : 'auto',
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef, reducedMotion])

  return (
    <div className="relative z-10 flex h-full items-end pb-6 sm:pb-12 lg:items-center lg:pb-0 bg-gradient-to-b from-navy-950/25 via-transparent to-navy-950/55 text-white">
      {/* Readability scrim: darkens only the left of the frame (where
          the headline and every waypoint message sit) and the bottom
          on phones, so the illustration stays bright where the
          characters are while text always has contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/55 via-45% to-transparent lg:bg-gradient-to-r lg:from-navy-950/80 lg:via-navy-950/35 lg:via-45% lg:to-transparent lg:to-70%"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Text column */}
        <div ref={panelRef} className="text-center lg:max-w-[34rem] lg:text-left">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <Badge>Halo Explorer!</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-3 text-[1.7rem] font-bold leading-[1.12] sm:mt-5 sm:text-5xl lg:text-[3.25rem]"
          >
            Jelajahi Dunia Pengetahuan{' '}
            <span className="text-yellow-400">Bersama Minilemon!</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mx-auto mt-3 max-w-[18rem] text-sm text-white/75 sm:mt-5 sm:max-w-md sm:text-lg lg:mx-0"
          >
            Cerita seru, ilmu menarik, dan video pengetahuan menantimu setiap
            hari.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-5 flex justify-center sm:mt-8 lg:justify-start"
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

        {/* Visual column intentionally left empty — the layered 2.5D
            illustration behind this overlay (HeroParallaxScene) is
            the hero visual. Kept as a grid cell so the text column
            keeps the same width/position as the original design. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </Container>

      {/* Cinematic waypoint messages (Story/Science/Video) — rendered
          outside Container so their bottom/side anchoring is relative
          to the full Hero viewport, not the text column's grid cell. */}
      <HeroWaypointOverlay progressRef={progressRef} />
    </div>
  )
}

export default Hero
