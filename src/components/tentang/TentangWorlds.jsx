import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ceritaCategories } from '../../data/cerita'
import { ilmuCategories } from '../../data/ilmu'
import { quizCategories } from '../../data/quiz'
import { NEBULA, QUIZ_POSTER, TEASERS } from '../../data/quizAssets'
import { videoLibrary } from '../../data/videos'
import Container from '../ui/Container'
import TiltCard from '../scroll/TiltCard'
import { navHeight } from '../scroll/useScrollStory'

gsap.registerPlugin(ScrollTrigger)

// Chips are generated from the real data files, so this page can't drift from the site.
const labels = (list) => list.filter((c) => c.id !== 'semua').map((c) => c.label)

const WORLDS = [
  {
    id: 'cerita',
    to: '/cerita',
    no: '01',
    title: 'Cerita',
    lead: 'Dongeng sebelum tidur',
    text: 'Cerita bergambar yang dibaca halaman demi halaman, ditutup dengan pesan moral untuk dibicarakan bersama keluarga.',
    chips: labels(ceritaCategories),
    cta: 'Baca Cerita',
    art: TEASERS.cerita,
    panel: 'bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 text-white',
    image: NEBULA.cerita,
    dark: true,
  },
  {
    id: 'ilmu',
    to: '/ilmu',
    no: '02',
    title: 'Ilmu Pengetahuan',
    lead: 'Materi sains yang ramah anak',
    text: 'Materi yang bisa dibaca santai, lengkap dengan fakta seru dan kegiatan sederhana yang bisa dicoba di rumah.',
    chips: labels(ilmuCategories),
    cta: 'Buka Ilmu',
    art: TEASERS.ilmu,
    panel: 'bg-gradient-to-br from-navy-600 via-[#1b2690] to-navy-800 text-white',
    image: NEBULA.ilmu,
    dark: true,
  },
  {
    id: 'video',
    to: '/video',
    no: '03',
    title: 'Video Pengetahuan',
    lead: 'Belajar lewat gambar bergerak',
    text: 'Pustaka video edukasi dengan sampul yang ceria, untuk ditonton bersama si kecil sambil bertanya-tanya.',
    chips: [...new Set(videoLibrary.map((v) => v.category))],
    cta: 'Lihat Video',
    art: TEASERS.video,
    panel: 'bg-gradient-to-br from-[#2a1560] via-navy-900 to-navy-950 text-white',
    image: NEBULA.video,
    dark: true,
  },
  {
    id: 'quiz',
    to: '/quiz',
    no: '04',
    title: 'Quiz',
    lead: 'Petualangan menjawab pertanyaan',
    text: `Pilih salah satu dari ${quizCategories.length} planet tujuan, jawab pertanyaannya, lalu kumpulkan bintang. Setiap jawaban punya penjelasan singkat.`,
    chips: quizCategories.map((c) => c.short),
    cta: 'Main Kuis',
    art: QUIZ_POSTER.src,
    wide: true,
    panel: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-navy-950',
    image: '/assets/backgrounds/dreamy-bedtime-galaxy.webp',
    dark: false,
  },
]

function WorldPanel({ world, index }) {
  const flip = index % 2 === 1
  return (
    <article
      data-world
      className={`stack-panel relative -mt-10 overflow-hidden rounded-t-[3rem] first:mt-0 md:sticky md:top-[var(--nav-h)] md:mt-0 md:h-[calc(100svh-var(--nav-h))] ${world.panel}`}
      style={{ zIndex: index + 1 }}
    >
      {world.image && world.dark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url("${world.image}")` }}
        />
      )}
      {world.image && !world.dark && (
        <>
          {/* md+: the whole illustration. Phones: only the two decorated corners, so the
              artwork isn't cropped down to plain yellow; the middle stays clear for text. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-cover bg-center md:block"
            style={{ backgroundImage: `url("${world.image}")` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-44 bg-[length:300%_auto] bg-left-top bg-no-repeat [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] md:hidden"
            style={{ backgroundImage: `url("${world.image}")` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-44 bg-[length:300%_auto] bg-right-bottom bg-no-repeat [mask-image:linear-gradient(to_top,#000_55%,transparent)] md:hidden"
            style={{ backgroundImage: `url("${world.image}")` }}
          />
        </>
      )}

      <div data-world-inner className={`relative flex h-full origin-top items-center md:py-8 ${world.dark ? 'py-14' : 'pb-44 pt-36'}`}>
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className={flip ? 'md:order-2' : ''}>
            <p className="flex items-center gap-3 font-heading text-sm font-semibold tracking-[0.2em] uppercase">
              <span className={`text-5xl font-bold tracking-normal ${world.dark ? 'text-yellow-400' : 'text-navy-700'}`}>
                {world.no}
              </span>
              {world.lead}
            </p>
            <h3 data-reveal="up" className="mt-3 font-heading text-4xl leading-tight font-bold sm:text-5xl">
              {world.title}
            </h3>
            <p className={`mt-4 max-w-md text-base leading-relaxed sm:text-lg ${world.dark ? 'text-white/85' : 'text-navy-900/85'}`}>
              {world.text}
            </p>
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
              {world.chips.map((chip) => (
                <li
                  key={chip}
                  className={`rounded-full px-3 py-1 text-xs font-bold sm:text-sm ${
                    world.dark ? 'bg-white/15 text-white' : 'bg-navy-950/10 text-navy-900'
                  }`}
                >
                  {chip}
                </li>
              ))}
            </ul>
            <Link
              to={world.to}
              className={`group mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-heading text-base font-semibold transition-transform hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-lavender-400 ${
                world.dark ? 'bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)]' : 'bg-navy-950 text-white shadow-lg'
              }`}
            >
              {world.cta}
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className={`relative ${flip ? 'md:order-1' : ''}`}>
            <TiltCard max={8} className="mx-auto w-full max-w-[26rem] md:max-w-[min(30rem,60svh)]" >
              {world.wide ? (
                <img
                  src={world.art}
                  alt={`Ilustrasi ${world.title}`}
                  width={QUIZ_POSTER.width}
                  height={QUIZ_POSTER.height}
                  loading="lazy"
                  className="w-full rounded-[2rem] border-4 border-navy-950/80 shadow-[0_30px_60px_-20px_rgba(10,15,43,0.6)]"
                />
              ) : (
                <img
                  src={world.art}
                  alt={`Ilustrasi ${world.title}`}
                  width="494"
                  height="494"
                  loading="lazy"
                  className="w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
                />
              )}
            </TiltCard>
          </div>
        </Container>
      </div>
    </article>
  )
}

/**
 * "Jelajahi dunia MiniLemon" — four features as full-height panels that stack like
 * pages of a book: each one slides over the previous (CSS sticky), which recedes
 * slightly as it gets covered. Colour changes panel to panel (purple → blue → midnight
 * → lemon) so the shift itself tells you you've entered a new world. On phones the
 * panels just overlap with rounded tops.
 */
function TentangWorlds() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = [...root.querySelectorAll('[data-world]')]
      panels.slice(0, -1).forEach((panel, i) => {
        const inner = panel.querySelector('[data-world-inner]')
        gsap.to(inner, {
          scale: 0.92,
          opacity: 0.55,
          ease: 'none',
          transformOrigin: '50% 100%',
          scrollTrigger: {
            trigger: panels[i + 1],
            start: 'top bottom',
            end: () => `top top+=${navHeight()}`,
            scrub: true,
          },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={rootRef} aria-labelledby="dunia-judul" className="relative bg-navy-950">
      <div className="bg-navy-950 px-5 pb-14 pt-20 text-center text-white sm:pt-24">
        <p data-reveal="up" className="font-heading text-sm font-semibold tracking-[0.2em] text-yellow-300 uppercase">
          Jelajahi
        </p>
        <h2 id="dunia-judul" data-reveal="up" data-delay="0.06" className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
          Empat dunia untuk dikunjungi
        </h2>
        <p data-reveal="up" data-delay="0.12" className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
          Gulir pelan-pelan. Setiap dunia punya warna, suasana, dan cara belajarnya sendiri.
        </p>
      </div>
      {WORLDS.map((world, i) => (
        <WorldPanel key={world.id} world={world} index={i} />
      ))}
    </section>
  )
}

export default TentangWorlds
