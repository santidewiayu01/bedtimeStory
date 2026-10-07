import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_STOPS, SCENE_DURATION, SCENE_EASE } from '../../data/heroKeyframes'

gsap.registerPlugin(ScrollTrigger)

const navPx = () => {
  const root = document.documentElement
  return parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) * parseFloat(getComputedStyle(root).fontSize) || 72
}

/**
 * Every scene "rest point" on the page, as document scroll positions:
 *  - [data-scene]        a section top (sits just under the sticky Navbar)
 *  - [data-scene-track]  the touch Hero's pinned track — one rest point per
 *                        HERO_STOPS entry, using the same progress maths as
 *                        the scrub ScrollTrigger (top top -> bottom bottom).
 * `reach` = how far (px) ahead a scene may be and still be snapped to.
 */
function collectTargets() {
  const vh = window.innerHeight
  const nav = navPx()
  const targets = []
  document.querySelectorAll('[data-scene], [data-scene-track]').forEach((el) => {
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY
    if (el.hasAttribute('data-scene-track')) {
      HERO_STOPS.forEach((p) => {
        targets.push({ y: p === 0 ? 0 : top + p * Math.max(rect.height - vh, 1), reach: Infinity })
      })
    } else {
      const far = el.dataset.sceneReach === 'far'
      targets.push({ y: Math.max(0, top - nav), reach: far ? Infinity : vh * 0.6 })
    }
  })
  return targets.sort((a, b) => a.y - b.y)
}

/**
 * Page-wide automatic scene snapping. When a scroll ends, glide (0.7s,
 * SCENE_EASE) to the next scene rest point IN THE DIRECTION OF TRAVEL —
 * never back toward the one just left, so reading a tall section is never
 * undone. Skipped for prefers-reduced-motion. Mount once (Home.jsx).
 */
export function usePageSceneSnap() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      snap: {
        duration: SCENE_DURATION,
        ease: SCENE_EASE,
        delay: 0.12,
        inertia: false,
        snapTo: (value, self) => {
          const max = ScrollTrigger.maxScroll(window)
          if (!max) return value
          const cur = value * max
          const list = collectTargets()
          const pick =
            self.direction > 0
              ? list.find((t) => t.y > cur + 2)
              : [...list].reverse().find((t) => t.y < cur - 2)
          return pick && Math.abs(pick.y - cur) <= pick.reach ? Math.min(pick.y, max) / max : value
        },
      },
    })
    return () => trigger.kill()
  }, [])
}
