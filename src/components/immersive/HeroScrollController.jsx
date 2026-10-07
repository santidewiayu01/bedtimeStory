import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_HOLD, HERO_STOPS, SCENE_DURATION, SCENE_EASE } from '../../data/heroKeyframes'

gsap.registerPlugin(ScrollTrigger)

/**
 * Small helper used by HeroParallaxScene/Hero.jsx to dampen the
 * journey for people who've asked their OS/browser for reduced motion
 * — the scene still moves (so the world doesn't feel broken/frozen)
 * but the amplitude of that movement is cut way down (see
 * `motionScale` usage in HeroParallaxScene.jsx).
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

const DEAD_ZONE = 0.3 // ignores near-zero wheel noise
const RECAPTURE_EDGE_PX = 4 // how close the Hero's top edge must be to 0 to (re)capture
const WHEEL_COOLDOWN_MS = 220 // rolling gap that separates one wheel gesture from the next

/**
 * PRIMARY — desktop mouse/trackpad. The Hero plays like a video.
 *
 *  - ONE wheel gesture starts autoplay in that direction: the camera
 *    glides to the next stop (SCENE_DURATION, SCENE_EASE), rests HERO_HOLD
 *    seconds so the message can be read, then carries on by itself until
 *    the last stop (or the first, when playing in reverse).
 *  - A further wheel gesture in the SAME direction while it plays skips
 *    straight on to the next stop — that's how the user speeds it up.
 *  - A gesture in the OPPOSITE direction turns autoplay around.
 *  - Trackpad inertia is absorbed: events arriving within
 *    WHEEL_COOLDOWN_MS of the previous one belong to the same gesture.
 *
 * Capture/release: wheel events are preventDefault()'d until the journey
 * has finished and rests on the LAST stop; a wheel-down THERE releases to
 * normal page scroll (the Hero's exit pose plays as it scrolls away).
 * Scrolling back up to the Hero's top edge re-captures the next wheel-up
 * and plays back in reverse. If the Hero is scrolled out of view the wheel
 * is never captured, so the page can't get stuck.
 *
 * Returns a ref `{ current: number }` in [0, 1] like useHeroProgress.
 */
export function useHeroSequence(sectionRef, enabled) {
  const progressRef = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined
    const section = sectionRef.current
    if (!section) return undefined

    const last = HERO_STOPS.length - 1
    let index = 0
    let autoDir = 0 // 0 idle, 1 playing forward, -1 playing in reverse
    let released = false
    let lastWheelAt = 0
    let tween = null
    let hold = null

    const play = (target, ease = SCENE_EASE, onComplete) => {
      tween?.kill()
      tween = gsap.to(progressRef, {
        current: target,
        duration: SCENE_DURATION,
        ease,
        overwrite: true,
        onComplete,
      })
    }

    function goTo(nextIndex) {
      hold?.kill()
      index = nextIndex
      play(HERO_STOPS[nextIndex], SCENE_EASE, () => {
        const next = index + autoDir
        if (autoDir === 0 || next < 0 || next > last) {
          autoDir = 0
          return
        }
        hold = gsap.delayedCall(HERO_HOLD, () => goTo(next))
      })
    }

    function handleWheel(event) {
      const dy = event.deltaY
      if (Math.abs(dy) < DEAD_ZONE) return

      const top = section.getBoundingClientRect().top
      if (top < -RECAPTURE_EDGE_PX) return // Hero scrolled away: never capture

      const dir = dy > 0 ? 1 : -1
      const now = performance.now()
      const sameGesture = now - lastWheelAt < WHEEL_COOLDOWN_MS

      if (released) {
        if (dir < 0 && index === last) {
          event.preventDefault()
          released = false
          lastWheelAt = now
          autoDir = -1
          goTo(last - 1)
        }
        return
      }

      // Resting on the last stop and the user keeps going: leave the Hero.
      if (index === last && dir > 0 && autoDir === 0 && !sameGesture) {
        released = true // this + following events scroll the page normally
        play(1, 'power2.out')
        return
      }
      if (index === 0 && dir < 0 && autoDir === 0) return // nothing above the Hero

      event.preventDefault()
      lastWheelAt = now
      if (sameGesture) return // inertia tail / same flick

      // New gesture: start autoplay, speed it up, or turn it around.
      autoDir = dir
      const next = index + dir
      if (next >= 0 && next <= last) goTo(next)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      tween?.kill()
      hold?.kill()
    }
  }, [enabled, sectionRef])

  return progressRef
}
