import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'
import { ILMU_ART, NEBULA, badge, icon, mascot } from '../../data/quizAssets'
import Container from '../ui/Container'
import { navHeight } from '../scroll/useScrollStory'

gsap.registerPlugin(ScrollTrigger)

// Three chapters. Copy is limited to the site's own purpose (cerita, sains, video, kuis,
// rasa ingin tahu) — no company history, founders, numbers or awards.
const CHAPTERS = [
  {
    id: 'ingin-tahu',
    kicker: 'Bab 1',
    title: 'Semua berawal dari rasa ingin tahu',
    text: 'Kenapa langit gelap di malam hari? Kenapa es bisa mencair? Pertanyaan kecil adalah pintu pertama menuju penemuan, dan MiniLemon hadir untuk menyambut setiap pertanyaan itu.',
    art: ILMU_ART('Icon 1.png'),
    tilt: '-3deg',
    bg: 'bg-navy-950',
    image: NEBULA.video,
    dark: true,
  },
  {
    id: 'petualangan',
    kicker: 'Bab 2',
    title: 'Belajar itu seperti petualangan',
    text: 'Di sini ada tempat untuk mendengarkan cerita, mengamati fakta sains, dan menjelajah lewat video. Setiap halaman disusun seperti sebuah perjalanan, bukan daftar pelajaran.',
    art: ILMU_ART('Icon 5.png'),
    tilt: '2.5deg',
    bg: 'bg-purple-900',
    image: NEBULA.cerita,
    dark: true,
  },
  {
    id: 'seru',
    kicker: 'Bab 3',
    title: 'Pengetahuan makin seru kalau dijelajahi',
    text: 'Bukan sekadar dibaca. Pengetahuan terasa lebih menyenangkan saat ditebak lewat kuis, dicoba di rumah, dan dibicarakan bersama keluarga.',
    art: ILMU_ART('Icon 6.png'),
    tilt: '-2deg',
    bg: 'bg-yellow-300',
    image: '/assets/backgrounds/bab3-yellow-galaxy.webp',
    imageOpacity: 'opacity-100',
    dark: false,
  },
]

// Cut-outs orbiting each chapter's picture: [src, className, bob duration]
const EXTRAS = [
  [
    ['coklat-2', 'w-[30%] -bottom-[6%] -left-[10%]'],
    ['bintang-emas-besar', 'w-[18%] -top-[6%] right-[2%]'],
    ['bintang-emas', 'w-[11%] top-[40%] -left-[7%]'],
  ].map(([n, c]) => [mascot(n), c]),
  [
    ['biru-7', 'w-[28%] -bottom-[8%] -right-[8%]'],
    ['merah-7', 'w-[27%] -bottom-[6%] -left-[10%]'],
    ['roket', 'w-[20%] -top-[8%] right-[6%]'],
  ].map(([n, c]) => [n === 'roket' ? icon(n) : mascot(n), c]),
  [
    ['biru-1', 'w-[30%] -bottom-[6%] -left-[8%]'],
    ['peti-harta', 'w-[22%] -bottom-[4%] -right-[6%]'],
    ['si-penasaran', 'w-[24%] -top-[10%] -right-[4%]'],
  ].map(([n, c]) => [n === 'peti-harta' ? icon(n) : n === 'si-penasaran' ? badge(n) : mascot(n), c]),
]

function ChapterArt({ chapter, extras }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(30rem,62svh)]">
      <img
        src={chapter.art}
        alt=""
        width="480"
        height="480"
        loading="lazy"
        decoding="async"
        className="h-full w-full rounded-[2.5rem] border-4 border-white/70 object-cover shadow-[0_30px_60px_-18px_rgba(0,0,0,0.55)]"
        style={{ transform: `rotate(${chapter.tilt})` }}
      />
      {extras.map(([src, pos], i) => (
        <img
          key={src}
          src={src}
          alt=""
          width="160"
          height="160"
          loading="lazy"
          className={`bob absolute drop-shadow-2xl ${pos}`}
          style={{ '--bob-dur': `${6 + i * 1.3}s`, '--bob-delay': `${-i * 1.7}s`, '--bob-y': '-8px' }}
        />
      ))}
    </div>
  )
}

function ChapterText({ chapter, index }) {
  const tone = chapter.dark ? 'text-white' : 'text-navy-950'
  return (
    <div className={`max-w-lg ${tone}`}>
      <p className={`font-heading text-sm font-semibold tracking-[0.2em] uppercase ${chapter.dark ? 'text-yellow-300' : 'text-navy-700'}`}>
        {chapter.kicker} <span aria-hidden="true">/ 3</span>
      </p>
      <h3 className="mt-3 font-heading text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{chapter.title}</h3>
      <p className={`mt-5 text-base leading-relaxed sm:text-lg ${chapter.dark ? 'text-white/85' : 'text-navy-900/85'}`}>
        {chapter.text}
      </p>
      <span className="sr-only">Bab {index + 1} dari {CHAPTERS.length}</span>
    </div>
  )
}

/**
 * "Kenapa MiniLemon hadir?" — three chapters told while the stage stays pinned (md+).
 * Scrolling advances the chapter: the sky colour shifts from night → dusk → a warm
 * lemon day, the picture and its little cast swap, the text cross-fades. On phones the
 * chapters simply stack, each on its own coloured band.
 */
function TentangStory() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: () => `top top+=${navHeight()}`,
        end: () => `bottom bottom`,
        onUpdate: (self) => {
          const next = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length))
          setActive((prev) => (prev === next ? prev : next))
          track.style.setProperty('--p', self.progress.toFixed(3))
        },
      })
      return () => trigger.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="cerita-kami" aria-labelledby="kenapa-judul" className="relative scroll-mt-[var(--nav-h)]">
      <h2 id="kenapa-judul" className="sr-only">
        Kenapa MiniLemon hadir?
      </h2>

      {/* pinned (md+) */}
      <div ref={trackRef} className="relative hidden h-[330svh] md:block">
        <div className="sticky top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] overflow-hidden">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.id}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${c.bg} ${active === i ? 'opacity-100' : 'opacity-0'}`}
            >
              {c.image && (
                <div
                  className={`absolute inset-0 bg-cover bg-center ${c.imageOpacity ?? 'opacity-60'}`}
                  style={{ backgroundImage: `url("${c.image}")` }}
                />
              )}
              {!c.dark && !c.image && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,#fff6c9,transparent_55%),radial-gradient(circle_at_10%_90%,#ffc93c,transparent_50%)]" />
              )}
            </div>
          ))}

          <Container className="relative grid h-full grid-cols-2 items-center gap-10">
            <div className="relative h-72">
              {CHAPTERS.map((c, i) => (
                <div
                  key={c.id}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
                    active === i ? 'translate-y-0 opacity-100' : active > i ? '-translate-y-8 opacity-0' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <ChapterText chapter={c} index={i} />
                </div>
              ))}
            </div>

            <div className="relative" style={{ transform: 'translateY(calc((var(--p, 0) - 0.5) * -36px))' }}>
              {CHAPTERS.map((c, i) => (
                <div
                  key={c.id}
                  className={`${i === 0 ? 'relative' : 'absolute inset-0'} transition-all duration-700 ease-out ${
                    active === i ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
                  }`}
                >
                  <ChapterArt chapter={c} extras={EXTRAS[i]} />
                </div>
              ))}
            </div>
          </Container>

          {/* chapter dots */}
          <ol aria-hidden="true" className="absolute right-5 top-1/2 m-0 flex -translate-y-1/2 list-none flex-col gap-3 p-0 lg:right-8">
            {CHAPTERS.map((c, i) => (
              <li
                key={c.id}
                className={`w-2.5 rounded-full transition-all duration-500 ${
                  active === i ? 'h-9 bg-yellow-400' : `h-2.5 ${active >= 2 ? 'bg-navy-950/40' : 'bg-white/45'}`
                }`}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* stacked (phones) */}
      <div className="md:hidden">
        {CHAPTERS.map((c, i) => (
          <article key={c.id} className={`relative overflow-hidden px-5 py-14 ${c.bg}`}>
            {c.image && (
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-cover bg-center ${c.imageOpacity ?? 'opacity-55'}`}
                style={{ backgroundImage: `url("${c.image}")` }}
              />
            )}
            <div className="relative flex flex-col gap-8">
              <div data-reveal="up">
                <ChapterArt chapter={c} extras={EXTRAS[i]} />
              </div>
              <div data-reveal="up">
                <ChapterText chapter={c} index={i} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TentangStory
