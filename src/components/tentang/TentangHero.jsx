import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Gamepad2, Sparkles } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { HERO_BACKGROUND } from '../../data/heroAssets'
import Button from '../ui/Button'
import Container from '../ui/Container'
import LogoMark from '../ui/LogoMark'
import { Sprite } from '../immersive/HeroLayers'
import { navHeight } from '../scroll/useScrollStory'

gsap.registerPlugin(ScrollTrigger)

function scrollToId(id) {
  return (event) => {
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }
}

/**
 * Hero — "Meet the MiniLemon Universe".
 * A pinned "camera pull-back": the galaxy illustration (the whole MiniLemon family is
 * painted into it) starts zoomed in; as you scroll it eases out to reveal the full
 * scene while the headline lifts away and a caption arrives. Pinning is CSS sticky,
 * the motion is one scrubbed timeline. With reduced motion there is no extra scroll
 * length and nothing moves.
 */
function TentangHero() {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const mm = gsap.matchMedia()
    mm.add({ ok: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 767px)' }, (ctx) => {
      const { ok, phone } = ctx.conditions
      if (!ok) return undefined
      const q = gsap.utils.selector(track)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: () => `top top+=${navHeight()}`,
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      tl.fromTo(q('[data-hero-bg]'), { scale: phone ? 1.18 : 1.3 }, { scale: 1 }, 0)
        .to(q('[data-hero-copy]'), { y: -70, autoAlpha: 0, ease: 'power1.in', duration: 0.45 }, 0.45)
        .fromTo(q('[data-hero-caption]'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.35 }, 0.62)
        .to(q('[data-hero-cloud-a]'), { y: -90, duration: 1 }, 0)
        .to(q('[data-hero-cloud-b]'), { y: -140, duration: 1 }, 0)
        .fromTo(q('[data-hero-rocket]'), { x: '20vw', y: 20 }, { x: '-125vw', y: -60, duration: 1 }, 0)
      return () => tl.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={trackRef}
      aria-labelledby="tentang-judul"
      className="relative h-[185svh] motion-reduce:h-auto"
    >
      <div className="sticky top-[var(--nav-h)] isolate h-[calc(100svh-var(--nav-h))] overflow-hidden bg-navy-950 text-white motion-reduce:static">
        {/* L0 — galaxy illustration */}
        <img
          data-hero-bg
          src={HERO_BACKGROUND.src}
          alt="Keluarga MiniLemon berkumpul di sebuah bulan, dikelilingi planet, galaksi, dan roket"
          width={HERO_BACKGROUND.width}
          height={HERO_BACKGROUND.height}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full origin-[72%_62%] object-cover object-[72%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,15,43,0.9)_0%,rgba(10,15,43,0.78)_60%,rgba(10,15,43,0.45)_100%)] md:bg-[linear-gradient(95deg,rgba(10,15,43,0.93)_0%,rgba(10,15,43,0.6)_38%,transparent_70%)]"
        />

        {/* L1 — sprites that drift at their own speed */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div data-hero-cloud-a className="absolute -left-[8%] -bottom-[6%] w-[62%] opacity-90 md:w-[32%]">
            <Sprite name="cloudMid" />
          </div>
          <div data-hero-cloud-b className="absolute -right-[10%] -bottom-[10%] w-[72%] opacity-95 md:w-[36%]">
            <Sprite name="cloudBig" />
          </div>
          <div data-hero-rocket className="absolute right-0 top-[10%] w-20 sm:w-28">
            <Sprite name="rocket" className="-rotate-12" />
          </div>
          <div className="absolute left-[44%] top-[14%] w-5 sm:w-7">
            <Sprite name="star1" className="hero-twinkle" />
          </div>
        </div>

        <Container className="relative flex h-full flex-col justify-center">
          <div data-hero-copy className="max-w-xl">
            <LogoMark priority className="h-20 sm:h-28 lg:h-36" />
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-1.5 font-heading text-sm font-semibold text-yellow-300">
              <Sparkles size={15} aria-hidden="true" /> Tentang MiniLemon
            </p>
            <h1 id="tentang-judul" className="mt-4 font-heading text-4xl font-bold leading-[1.05] sm:text-6xl">
              Selamat datang di <span className="text-yellow-400">Semesta MiniLemon</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              MiniLemon adalah tempat anak-anak menjelajahi ilmu pengetahuan lewat cerita, sains, dan video yang
              dikemas ceria, supaya rasa ingin tahu mereka terus tumbuh.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button as="a" href="#cerita-kami" onClick={scrollToId('cerita-kami')} icon={ArrowDown}>
                Mulai dari Cerita Kami
              </Button>
              <Button to="/quiz" variant="ghost" icon={Gamepad2}>
                Main Kuis
              </Button>
            </div>
          </div>

          <p
            data-hero-caption
            className="absolute inset-x-0 bottom-8 mx-auto w-fit max-w-[88%] rounded-full bg-navy-950/70 px-5 py-2.5 text-center font-heading text-sm font-semibold text-yellow-300 opacity-0 backdrop-blur motion-reduce:opacity-100 sm:text-base"
          >
            Dunia kecil dengan rasa ingin tahu yang besar
          </p>
        </Container>
      </div>
    </section>
  )
}

export default TentangHero
