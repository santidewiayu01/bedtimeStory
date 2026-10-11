import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { icon } from '../../data/quizAssets'

gsap.registerPlugin(ScrollTrigger)

/**
 * Thin page-progress rail that sits right under the sticky Navbar, with a small
 * rocket riding its head. `tone` picks the fill colour. Purely visual
 * (aria-hidden); skipped entirely for prefers-reduced-motion.
 */
function ScrollProgress({ tone = '#ffc93c' }) {
  const fillRef = useRef(null)
  const rocketRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleX: self.progress })
          gsap.set(rocketRef.current, { left: `${self.progress * 100}%` })
        },
      })
      return () => trigger.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[var(--nav-h)] z-40 hidden h-1 motion-safe:block"
    >
      <div
        ref={fillRef}
        className="h-full origin-left scale-x-0 rounded-r-full"
        style={{ background: tone, boxShadow: `0 0 12px ${tone}` }}
      />
      <img
        ref={rocketRef}
        src={icon('roket')}
        alt=""
        width="26"
        height="26"
        className="absolute -top-2 left-0 h-6 w-6 -translate-x-1/2 rotate-90 select-none"
      />
    </div>
  )
}

export default ScrollProgress
