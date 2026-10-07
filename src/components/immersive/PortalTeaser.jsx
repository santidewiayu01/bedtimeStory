import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PORTAL_TEASER, PORTAL_WORLDS } from '../../data/portalTeaser'
import { Sprite } from './HeroLayers'

gsap.registerPlugin(ScrollTrigger)

const navPx = () => {
  const root = document.documentElement
  return parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) * parseFloat(getComputedStyle(root).fontSize) || 72
}

// Hit-areas over the three cards of the wide artwork (% of the image box).
const HIT = [
  { left: 2.2, width: 31.4 },
  { left: 34.4, width: 31.2 },
  { left: 66.2, width: 31.8 },
]

/**
 * Portal layer between the Hero and Bedtime Stories — NOT a content section.
 *
 *   <section track>            tall: one pinned viewport + --portal-run of scroll
 *     bg                       navy -> purple wash (fades in as the Hero leaves)
 *     <sticky stage>           pinned under the Navbar while the track scrolls
 *       glow + rim ring        the "portal" itself (CSS only)
 *       frame                  the original artwork (desktop: whole; phone: 3 crops)
 *       depth sprites          a few sheet sprites at different speeds
 *     marker [data-scene]      rest point so the page snap lets the teaser be seen
 *
 * Motion = scrubbed transform/opacity only (3 phases): ENTER (arrives from
 * depth while the Hero scrolls off), PRESENT (tiny drift), EXIT (opens up —
 * scales toward the camera and fades — while Bedtime Stories rises in).
 * Phones: half the travel, no tilt. prefers-reduced-motion: no pin, no motion.
 */
function PortalTeaser() {
  const trackRef = useRef(null)
  const bgRef = useRef(null)
  const frameRef = useRef(null)
  const glowRef = useRef(null)
  const rimRef = useRef(null)
  const frontRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const mm = gsap.matchMedia()
    mm.add({ ok: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 768px)' }, (ctx) => {
      const { ok, phone } = ctx.conditions
      if (!ok) return
      const amp = phone ? 0.5 : 1
      const overlap = () => Math.abs(parseFloat(getComputedStyle(track).marginTop)) || 0
      const sprites = frontRef.current.querySelectorAll('[data-portal-depth]')

      // ENTER — from the moment the Hero's bottom edge is reached until the stage is pinned.
      const enter = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: () => `top bottom-=${overlap()}`,
          end: () => `top top+=${navPx()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
      enter
        .fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
        .fromTo(
          frameRef.current,
          { y: 90 * amp, scale: phone ? 0.86 : 0.78, rotateX: phone ? 0 : 9, opacity: 0 },
          { y: 0, scale: 1, rotateX: 0, opacity: 1, ease: 'power2.out', transformPerspective: 900, transformOrigin: '50% 100%' },
          0,
        )
        .fromTo(glowRef.current, { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo(rimRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 0.55, ease: 'power2.out' }, 0)
        .fromTo(sprites, { y: (i) => (60 + i * 26) * amp, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)

      // PRESENT -> EXIT — the pinned stretch, carrying on a little past the unpin
      // so the artwork is still leaving while Bedtime Stories rises.
      const leave = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: () => `top top+=${navPx()}`,
          end: () => `bottom ${phone ? 75 : 70}%`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
      leave
        // present: a barely-there drift so the pinned moment still feels alive
        .to(frameRef.current, { scale: 1.025, y: -6 * amp, duration: 0.45 }, 0)
        .to(rimRef.current, { scale: 1.08, duration: 0.45 }, 0)
        .to(sprites, { y: (i) => (i % 2 ? 1 : -1) * 14 * amp, duration: 0.45 }, 0)
        // exit: the portal opens toward the camera and dissolves
        .to(frameRef.current, { scale: phone ? 1.12 : 1.22, y: -30 * amp, opacity: 0, ease: 'power2.in', duration: 0.55 }, 0.45)
        .to(glowRef.current, { scale: 1.5, opacity: 0, ease: 'power1.in', duration: 0.55 }, 0.45)
        .to(rimRef.current, { scale: 1.35, opacity: 0, ease: 'power1.in', duration: 0.55 }, 0.45)
        .to(sprites, { y: (i) => -(120 + i * 40) * amp, opacity: 0, ease: 'power1.in', duration: 0.55 }, 0.45)
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={trackRef}
      aria-labelledby="portal-heading"
      className="relative -mt-8 h-[calc(100svh-var(--nav-h)+var(--portal-run))] [--portal-run:95svh] motion-reduce:[--portal-run:0px] min-[900px]:[--portal-run:120svh]"
    >
      <h2 id="portal-heading" className="sr-only">Tiga dunia Minilemon: cerita, ilmu pengetahuan, dan video</h2>

      {/* Wash that continues into Bedtime Stories' purple (its rounded top overlaps this). */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-t-[2.5rem] bg-gradient-to-b from-navy-950 via-navy-900 to-purple-900"
      />

      <div className="sticky top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] overflow-hidden">
        {/* starfield, same recipe as the Bedtime Stories band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(1.5px 1.5px at 12% 22%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 78% 14%, rgba(255,255,255,0.45), transparent), radial-gradient(1.5px 1.5px at 33% 84%, rgba(255,255,255,0.4), transparent), radial-gradient(2px 2px at 90% 76%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 55% 8%, rgba(255,255,255,0.4), transparent)',
          }}
        />

        {/* portal glow + rim */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            ref={glowRef}
            className="h-[70%] w-[min(92vw,1500px)] rounded-[50%] bg-[radial-gradient(closest-side,rgba(139,124,246,0.42),rgba(52,120,246,0.18)_55%,transparent)] blur-2xl"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            ref={rimRef}
            className="h-[62%] w-[min(86vw,1380px)] rounded-[50%] border border-lavender-400/35 shadow-[0_0_60px_rgba(139,124,246,0.25),inset_0_0_60px_rgba(139,124,246,0.12)] min-[900px]:h-[78%]"
          />
        </div>

        {/* the artwork */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={frameRef} className="w-full will-change-transform">
            {/* Tablet/desktop: the whole original image, edges feathered into the wash */}
            <div className="relative mx-auto hidden w-full max-w-[1680px] min-[900px]:block">
              <img
                src={PORTAL_TEASER.src}
                width={PORTAL_TEASER.width}
                height={PORTAL_TEASER.height}
                alt=""
                decoding="async"
                draggable="false"
                className="portal-feather block h-auto w-full select-none"
              />
              {PORTAL_WORLDS.map((w, i) => (
                <Link
                  key={w.id}
                  to={w.to}
                  aria-label={w.label}
                  className="absolute top-[11%] h-[80%] rounded-[2.2rem] transition-[background-color,box-shadow] duration-300 hover:bg-white/5 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                  style={{ left: `${HIT[i].left}%`, width: `${HIT[i].width}%` }}
                />
              ))}
            </div>

            {/* Phone: same file, one card per slide (cropped, not shrunk) */}
            <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc((100vw-min(78vw,22rem))/2)] py-4 min-[900px]:hidden">
              {PORTAL_WORLDS.map((w) => (
                <Link
                  key={w.id}
                  to={w.to}
                  aria-label={w.label}
                  className="relative block w-[min(78vw,22rem)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] shadow-[0_18px_36px_-12px_rgba(10,15,43,0.8)] ring-1 ring-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                  style={{ aspectRatio: `${w.crop.w} / ${w.crop.h}` }}
                >
                  <img
                    src={PORTAL_TEASER.src}
                    alt=""
                    decoding="async"
                    draggable="false"
                    className="absolute max-w-none select-none"
                    style={{
                      width: `${(PORTAL_TEASER.width / w.crop.w) * 100}%`,
                      left: `${-(w.crop.x / w.crop.w) * 100}%`,
                      top: `${-(w.crop.y / w.crop.h) * 100}%`,
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* depth sprites (existing sheet), in front of the artwork's edges only */}
        <div ref={frontRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div data-portal-depth className="absolute left-[4%] top-[8%] w-12 sm:w-20">
            <Sprite name="ringedSm" className="hero-float" style={{ '--float-dur': '9s' }} />
          </div>
          <div data-portal-depth className="absolute right-[6%] top-[12%] w-5 sm:w-6">
            <Sprite name="star2" className="hero-twinkle" />
          </div>
          <div data-portal-depth className="absolute bottom-[7%] right-[5%] hidden w-10 min-[900px]:block">
            <Sprite name="moon" className="hero-float" style={{ '--float-delay': '-3s', '--float-dur': '10s' }} />
          </div>
          <div data-portal-depth className="absolute bottom-[10%] left-[8%] w-6 sm:w-8">
            <Sprite name="blueSm" className="hero-float" style={{ '--float-delay': '-5s' }} />
          </div>
        </div>
      </div>

      {/* Rest point for the page snap: the teaser fully presented (sticky stage pinned). */}
      <span
        data-scene
        data-scene-reach="far"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 h-px w-px"
        style={{ top: 'calc(var(--portal-run) * 0.3)' }}
      />
    </section>
  )
}

export default PortalTeaser
