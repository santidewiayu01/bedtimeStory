import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { Sprite } from './HeroLayers'

gsap.registerPlugin(ScrollTrigger)

/**
 * Carries the Hero's 2.5D camera feel into a normal page section WITHOUT
 * touching that section's own markup or its framer-motion animation:
 *
 *  - the section rises out of the depth as the "camera" arrives — a scrubbed
 *    translate + scale + slight tilt (perspective) + fade, finished by the
 *    time the scene's top reaches the snap point;
 *  - `decor` sprites (sceneDecor.js) drift at different speeds across the
 *    scene (parallax = depth); `fly` sprites (the rocket) cross the screen.
 *
 * All motion is scrubbed transform/opacity on a few nodes (no blur on
 * content, no React state). Phones get ~half the travel and no tilt;
 * prefers-reduced-motion gets none. Also tags the root as a scene rest
 * point for sceneSnap.js (`data-scene`).
 */
function ScrollScene({ children, decor = [], far = false }) {
  const rootRef = useRef(null)
  const bodyRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const mm = gsap.matchMedia()
    mm.add({ ok: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 768px)' }, (ctx) => {
      const { ok, phone } = ctx.conditions
      if (!ok) return
      const amp = phone ? 0.5 : 1

      gsap.fromTo(
        bodyRef.current,
        { y: 64 * amp, scale: phone ? 0.97 : 0.955, rotateX: phone ? 0 : 5, opacity: 0.25 },
        {
          y: 0, scale: 1, rotateX: 0, opacity: 1, ease: 'power2.out',
          transformPerspective: 900, transformOrigin: '50% 0%',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 25%', scrub: 0.4 },
        },
      )

      root.querySelectorAll('[data-depth]').forEach((el) => {
        const d = parseFloat(el.dataset.depth)
        const rot = parseFloat(el.dataset.rot || 0)
        gsap.fromTo(
          el,
          { y: 48 * d * amp, rotate: -rot },
          {
            y: -48 * d * amp, rotate: rot, ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      root.querySelectorAll('[data-fly]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: '25vw', y: 10, rotate: -12 },
          {
            x: '-112vw', y: -14, rotate: -22, ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 15%', scrub: 0.6 },
          },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      data-scene
      data-scene-reach={far ? 'far' : undefined}
      className="relative overflow-x-clip"
    >
      <div ref={bodyRef}>{children}</div>

      {/* Depth decoration — in front of the section edge, never on content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
        {decor.map((item, i) => (
          <div
            key={`${item.sprite}-${i}`}
            data-depth={item.fly ? undefined : item.depth}
            data-rot={item.rot}
            data-fly={item.fly ? '1' : undefined}
            className={`absolute ${item.pos} ${item.desktop ? 'hidden md:block' : ''}`}
          >
            <Sprite
              name={item.sprite}
              className={item.twinkle ? 'hero-twinkle' : item.float ? 'hero-float' : ''}
              style={{ '--float-delay': `${-i * 1.7}s`, '--float-dur': `${8 + i}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollScene
