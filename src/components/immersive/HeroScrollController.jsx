import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_KEYFRAMES } from '../../data/heroKeyframes'

gsap.registerPlugin(ScrollTrigger)

/**
 * Small helper used by HeroCamera/ImmersiveScene to dampen the journey
 * for people who've asked their OS/browser for reduced motion — the
 * camera still moves (so the world doesn't feel broken/frozen) but the
 * amplitude of that movement is cut way down (see `motionScale` usage
 * in HeroCamera.jsx).
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return reduced
}

/**
 * Decides ONCE (at mount, no live-toggling) whether this session gets
 * the full "cinematic video" wheel-jack interaction or the lighter
 * scroll-scrub fallback (see useHeroProgress below).
 *
 * Deliberately a one-time snapshot rather than a reactive media-query
 * listener: the cinematic mode attaches/detaches a global wheel
 * listener and swaps which DOM node ImmersiveHero renders, and doing
 * that mid-session (e.g. because a media query flipped) is a lot of
 * extra complexity for an edge case (someone plugging in a mouse
 * mid-scroll) that isn't worth chasing here.
 *
 * Gate:
 *  - `(hover: hover) and (pointer: fine)` — a real mouse or trackpad is
 *    driving input. Touch devices (phones/most tablets) don't match
 *    this and don't fire `wheel` events for touch scrolling anyway, so
 *    they naturally fall back to plain scroll-scrub — satisfies "jangan
 *    memblokir touch scroll secara agresif" without any extra checks.
 *  - `!prefers-reduced-motion` — reduced-motion asks for "minimal
 *    movement dan normal scrolling", i.e. the fallback, not a hijacked
 *    wheel experience.
 */
export function useCinematicWheelJack() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const pointerFine = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    return pointerFine && !reduced
  })

  return enabled
}

/**
 * FALLBACK — touch devices and prefers-reduced-motion.
 *
 * Tracks scroll progress through ONE pinned "track" element — the tall
 * wrapper around ImmersiveHero's sticky viewport — and nothing else on
 * the page. This is scoped entirely to the Hero: it creates exactly
 * one ScrollTrigger, bound to `trackRef`, and never pins anything
 * itself (the sticky CSS box in ImmersiveHero.jsx already handles the
 * pin) and never reads any other section's DOM position. Story,
 * Science and Video are ordinary siblings further down the document —
 * they don't register as triggers and can't fight this one for scroll
 * control.
 *
 * Returns a mutable ref `{ current: number }` in [0, 1]. Only used
 * when useCinematicWheelJack() is false — see ImmersiveHero.jsx.
 */
export function useHeroProgress(trackRef) {
  const progressRef = useRef(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
      onRefresh: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [trackRef])

  return progressRef
}

// Tuning constants for the wheel-driven state machine below. Numbers,
// not magic — see the comment above `tick()` for what each one does.
//
// FINAL REFINEMENT — slowed down proportionally across the board (was
// CRUISE_SPEED 0.34 / MAX_SPEED 1.5 / KICK_MAX 0.5 / DAMPING 3.2, a
// ~2.9s unattended journey). Keyframe composition/positions in
// heroKeyframes.js are untouched — only the RATE progress advances at
// changes, so every phase still gets proportionally the same share of
// a now-longer, more deliberate journey (~6.7s unattended at cruise),
// giving each landmark noticeably more time to read. DAMPING is eased
// down too so acceleration/deceleration itself feels more gradual
// ("anticipation" building up) instead of snapping to speed.
const CRUISE_SPEED = 0.15 // progress/sec the journey settles into once moving, unattended
const MAX_SPEED = 0.72 // hard clamp so mashing the wheel can't teleport progress
const DAMPING = 2.2 // how fast velocity chases its target speed each second
const KICK_MAX = 0.22 // strongest single-wheel-tick velocity nudge
const WHEEL_MAGNITUDE_CLAMP = 100 // normalizes a mouse notch (~100-120) vs a trackpad tick
const DEAD_ZONE = 0.3 // ignores near-zero wheel noise without eating slow trackpad drags
const RECAPTURE_EDGE_PX = 4 // how close the Hero's top edge must be to 0 to re-capture

// DWELL — "camera stop, hold, then continue" at each landmark.
//
// DWELL_DURATION is how long (real seconds) the journey holds
// completely still once it arrives at a landmark, giving the
// WAYPOINT_MESSAGE text in Hero.jsx enough time to be read in full —
// this is unattended time only (no wheel input); see kick() below for
// how continued wheel input skips a hold early instead of forcing the
// full wait.
//
// DWELL_POINTS is derived straight from HERO_KEYFRAMES rather than
// hard-coded, so it can never drift out of sync with the camera path
// (or with the `at` values WAYPOINT_MESSAGES in Hero.jsx already reads
// the same way).
const DWELL_DURATION = 2.5 // seconds to hold at each landmark
const DWELL_POINTS = HERO_KEYFRAMES.filter((frame) =>
  ['story', 'science', 'video'].includes(frame.id),
).map((frame) => frame.at)
const DWELL_RETRIGGER_DISTANCE = 0.03 // how far progress must move away from a point before it can dwell there again

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

// Returns the index of a DWELL_POINTS entry that `prev -> next` just
// crossed (in either direction) or landed on this frame, or -1 if none.
function findCrossedDwellPoint(prev, next) {
  for (let i = 0; i < DWELL_POINTS.length; i += 1) {
    const point = DWELL_POINTS[i]
    const crossedForward = prev < point && next >= point
    const crossedBackward = prev > point && next <= point
    if (crossedForward || crossedBackward) return i
  }
  return -1
}

/**
 * PRIMARY — desktop mouse/trackpad "cinematic video" interaction.
 *
 * Implements the HERO_START / HERO_PLAYING_FORWARD / HERO_END /
 * HERO_PLAYING_REVERSE state machine: one wheel gesture triggers a
 * full, self-playing journey (a single signed `velocity` that a
 * per-frame loop continuously eases toward a steady "cruise" speed in
 * whichever direction was last triggered, so the journey keeps playing
 * to completion even if the user stops scrolling), repeated wheel
 * input in the same direction accelerates it, and wheel input in the
 * opposite direction smoothly decelerates/reverses it — never a
 * teleport, never one-notch-one-frame.
 *
 * Capture/release ("Hero release", section 10):
 *  - While the journey hasn't reached an end, every wheel event is
 *    preventDefault()'d — the page itself never scrolls, all input
 *    drives the camera instead.
 *  - The ONE moment a wheel event is deliberately let through
 *    (no preventDefault) is a wheel-DOWN at HERO_END or a wheel-UP at
 *    HERO_START — that's the release: normal document scroll takes
 *    over from there (into StorySection, or above the Hero).
 *  - Re-capture only happens right back at the boundary: scrolling up
 *    from StorySection is normal page scroll the whole way, UNTIL the
 *    Hero's top edge is basically flush with the viewport top again —
 *    only then does the next wheel-up get grabbed to replay the
 *    journey in reverse, exactly where it left off.
 *
 * Dwell ("camera stop, hold, then continue"):
 *  - Whenever progress crosses one of DWELL_POINTS (Story/Science/
 *    Video), it's clamped exactly to that point, velocity is zeroed,
 *    and tick() holds it there for DWELL_DURATION seconds before
 *    resuming normal velocity-based motion in the same direction.
 *  - Any wheel input received during a hold cancels it immediately
 *    (see kick()) — DWELL_DURATION is only how long an UNATTENDED
 *    hold lasts; a user who keeps scrolling can push straight through.
 *  - This works identically forward and reverse, since it's just a
 *    condition on `progressRef.current` crossing a point — replaying
 *    the journey backward dwells at Video, then Science, then Story
 *    the same way.
 *
 * Returns the same shape as useHeroProgress — a ref `{ current: number
 * }` in [0, 1] — so HeroCamera and Hero.jsx need no changes at all.
 */
export function useHeroSequence(sectionRef, enabled) {
  const progressRef = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined
    const section = sectionRef.current
    if (!section) return undefined

    const phaseRef = { current: 'START' } // START | FORWARD | END | REVERSE
    const releasedRef = { current: false }
    const activeDirectionRef = { current: 0 } // -1, 0, or 1
    const velocityRef = { current: 0 } // signed progress/sec
    const dwellRef = { current: null } // { elapsed: number } | null — non-null while holding
    const lastDwellPointRef = { current: -1 } // index into DWELL_POINTS most recently held at
    let rafId = null
    let lastTs = null

    function kick(deltaY) {
      const magnitude = Math.min(Math.abs(deltaY), WHEEL_MAGNITUDE_CLAMP)
      const normalized = magnitude / WHEEL_MAGNITUDE_CLAMP
      const dir = deltaY > 0 ? 1 : -1
      activeDirectionRef.current = dir
      velocityRef.current = clamp(
        velocityRef.current + dir * normalized * KICK_MAX,
        -MAX_SPEED,
        MAX_SPEED,
      )
      // Any wheel input breaks a hold in progress — DWELL_DURATION is
      // only the unattended wait; a user actively scrolling can always
      // push straight through instead of being forced to wait it out.
      dwellRef.current = null
    }

    function handleWheel(event) {
      const dy = event.deltaY
      if (Math.abs(dy) < DEAD_ZONE) return

      if (releasedRef.current) {
        // Released: normal page scroll owns this event UNLESS we're
        // scrolling up and right back at the Hero's own edge — that's
        // the one moment we grab the wheel again to replay in reverse.
        if (dy < 0 && phaseRef.current === 'END') {
          const rectTop = section.getBoundingClientRect().top
          if (rectTop >= -RECAPTURE_EDGE_PX) {
            event.preventDefault()
            releasedRef.current = false
            kick(dy)
          }
        }
        return
      }

      // Still capturing. The two release triggers, checked first:
      if (phaseRef.current === 'END' && dy > 0) {
        releasedRef.current = true // let this + following events scroll normally
        return
      }
      if (phaseRef.current === 'START' && dy < 0) {
        releasedRef.current = true // nothing above the Hero; harmless no-op
        return
      }

      event.preventDefault()
      kick(dy)
    }

    // Runs every animation frame while this hook is enabled. Velocity
    // is never eased toward zero — it's eased toward a signed "cruise"
    // speed in whatever direction is currently active, which is what
    // makes a single wheel gesture keep playing on its own instead of
    // needing continuous input (section 9, "single-trigger feel").
    // Extra wheel ticks add on top via kick() above and decay back
    // down to that same cruise pace once the user stops, rather than
    // decaying to a dead stop.
    //
    // Dwell is checked BEFORE the velocity/position update: while
    // dwellRef.current is set, progress simply doesn't move (velocity
    // is irrelevant, held implicitly at 0) and the elapsed hold timer
    // counts up instead — HeroCamera's own position smoothing is what
    // makes the arrival at that frozen progress value still read as a
    // gentle deceleration rather than a snap (see HeroCamera.jsx).
    function tick(ts) {
      if (lastTs == null) lastTs = ts
      const dt = Math.min((ts - lastTs) / 1000, 0.05)
      lastTs = ts

      if (!releasedRef.current) {
        if (dwellRef.current) {
          dwellRef.current.elapsed += dt
          if (dwellRef.current.elapsed >= DWELL_DURATION) {
            dwellRef.current = null
          }
        } else {
          const dir = activeDirectionRef.current
          const target = dir * CRUISE_SPEED
          velocityRef.current += (target - velocityRef.current) * Math.min(dt * DAMPING, 1)

          let next = progressRef.current + velocityRef.current * dt

          // Once we've moved clearly away from the point we last held
          // at, it becomes eligible to trigger a hold again (matters
          // for reverse: Video -> hold -> Science -> hold -> Story).
          if (
            lastDwellPointRef.current !== -1 &&
            Math.abs(next - DWELL_POINTS[lastDwellPointRef.current]) > DWELL_RETRIGGER_DISTANCE
          ) {
            lastDwellPointRef.current = -1
          }

          if (dir !== 0) {
            const hitIndex = findCrossedDwellPoint(progressRef.current, next)
            if (hitIndex !== -1 && hitIndex !== lastDwellPointRef.current) {
              next = DWELL_POINTS[hitIndex]
              velocityRef.current = 0
              dwellRef.current = { elapsed: 0 }
              lastDwellPointRef.current = hitIndex
            }
          }

          if (next <= 0) {
            next = 0
            velocityRef.current = 0
            activeDirectionRef.current = 0
            phaseRef.current = 'START'
          } else if (next >= 1) {
            next = 1
            velocityRef.current = 0
            activeDirectionRef.current = 0
            phaseRef.current = 'END'
          } else if (dir !== 0) {
            phaseRef.current = dir > 0 ? 'FORWARD' : 'REVERSE'
          }
          progressRef.current = next
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [enabled, sectionRef])

  return progressRef
}
