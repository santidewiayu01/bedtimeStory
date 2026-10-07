import { useRef } from 'react'
import Hero from '../home/Hero'
import HeroParallaxScene from './HeroParallaxScene'
import {
  useCinematicWheelJack,
  useHeroProgress,
  useHeroSequence,
} from './HeroScrollController'

/**
 * The entire 2.5D journey lives HERE and ONLY here — nowhere else on
 * the page reads scroll/wheel input or moves the scene.
 *
 * Two interaction modes, chosen once via useCinematicWheelJack():
 *
 * 1) CINEMATIC (desktop mouse/trackpad) — `useHeroSequence`
 *    A plain section exactly one viewport tall MINUS the sticky
 *    Navbar (`--nav-h`, index.css), so the whole illustration is
 *    visible under the bar instead of its bottom being pushed below
 *    the fold. No CSS pin/sticky trick is needed:
 *    while the journey is playing, every wheel event is
 *    preventDefault()'d, so the document simply never scrolls — the
 *    Hero stays in view "for free". Once the journey reaches its end
 *    and releases, this section just scrolls away like any normal
 *    block, and Story/Science/Video appear via ordinary document flow.
 *
 * 2) FALLBACK (touch / prefers-reduced-motion) — `useHeroProgress`
 *    The original "pinned scrollytelling" pattern:
 *
 *      <section h-[460vh]>               <- tall "track": scrolling
 *        <div sticky top-[--nav-h]>      <- through this pins the inner
 *          <HeroParallaxScene />         <- box via native `position:
 *          <Hero />                      <- sticky`, no JS pin logic
 *        </div>
 *      </section>
 *
 *    Progress through the track's height maps directly to camera
 *    progress. Never blocks touch scrolling, and needs no wheel
 *    listener at all. Track height bumped from 380vh to 460vh in the
 *    "slow the camera down" pass so this mode gets a proportionally
 *    more deliberate pace too, matching the cinematic mode's slowdown,
 *    without touching the keyframe composition itself.
 *
 * Either way, HeroParallaxScene and Hero.jsx only ever see a plain
 * `progressRef` (`{ current: number }` in 0..1) — neither of them
 * knows or cares which mode produced it.
 */
function ImmersiveHero() {
  const cinematic = useCinematicWheelJack()

  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  // Both hooks are called unconditionally (rules of hooks) but each is
  // only actually active — attaching listeners / ScrollTriggers — when
  // its own ref has a mounted DOM node, which happens for exactly one
  // of the two branches below.
  const scrubProgressRef = useHeroProgress(trackRef)
  const sequenceProgressRef = useHeroSequence(sectionRef, cinematic)

  if (cinematic) {
    return (
      <section
        ref={sectionRef}
        data-scene
        data-scene-reach="far"
        className="relative h-[calc(100svh-var(--nav-h))] overflow-hidden"
      >
        <HeroParallaxScene progressRef={sequenceProgressRef} />
        <Hero progressRef={sequenceProgressRef} />
      </section>
    )
  }

  return (
    <section ref={trackRef} data-scene-track className="relative h-[460svh]">
      <div className="sticky top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] overflow-hidden">
        <HeroParallaxScene progressRef={scrubProgressRef} />
        <Hero progressRef={scrubProgressRef} />
      </div>
    </section>
  )
}

export default ImmersiveHero
