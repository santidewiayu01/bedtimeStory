import { ArrowDown, Rocket, Sparkles } from 'lucide-react'
import { HERO_BACKGROUND } from '../../data/heroAssets'
import { mascot, icon, badge, QUIZ_POSTER } from '../../data/quizAssets'
import { quizCategories, totalQuestions } from '../../data/quiz'
import { Sprite } from '../immersive/HeroLayers'
import Button from '../ui/Button'
import Container from '../ui/Container'
import TiltCard from '../scroll/TiltCard'

function scrollToId(id) {
  return (event) => {
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }
}

/**
 * Hero — "Selamat datang di Petualangan Pengetahuan".
 * Layers (back → front): the original galaxy illustration, drifting sprites from the
 * shared decoration sheet, the KUIS key-art in a tilting frame, and floating rewards.
 */
function QuizHero() {
  return (
    <section
      data-px-scope
      data-px-start="top"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden bg-navy-950 pb-24 pt-10 text-white sm:pt-14"
    >
      {/* L0 — background, slowest */}
      <div data-parallax="0.35" className="absolute inset-x-0 -inset-y-[12%] -z-20">
        <img
          src={HERO_BACKGROUND.src}
          alt=""
          width={HERO_BACKGROUND.width}
          height={HERO_BACKGROUND.height}
          fetchPriority="high"
          className="h-full w-full object-cover object-[68%_50%] opacity-55"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,15,43,0.94)_8%,rgba(10,15,43,0.62)_48%,rgba(10,15,43,0.2)_100%),linear-gradient(to_bottom,transparent_70%,var(--color-navy-950))]"
      />

      {/* L1 — drifting planets & stars (decor only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.5" className="absolute right-[5%] top-[7%] w-14 sm:w-24">
          <Sprite name="ringedSm" className="bob" style={{ '--bob-rot': '4deg', '--bob-dur': '9s' }} />
        </div>
        <div data-parallax="0.2" className="absolute left-[46%] top-[12%] w-5 sm:w-7">
          <Sprite name="star1" className="hero-twinkle" />
        </div>
        <div data-parallax="0.8" className="absolute bottom-[20%] left-[3%] hidden w-14 md:block">
          <Sprite name="moon" className="bob" style={{ '--bob-rot': '-5deg', '--bob-dur': '11s' }} />
        </div>
        <div data-parallax="-0.3" className="absolute bottom-[-2%] left-[-6%] w-[58%] opacity-90 md:w-[34%]">
          <Sprite name="cloudMid" />
        </div>
        <div data-parallax="-0.5" className="absolute bottom-[-4%] right-[-8%] w-[70%] opacity-90 md:w-[38%]">
          <Sprite name="cloudBig" />
        </div>
      </div>

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-6">
        <div className="max-w-xl">
          <span
            data-reveal="up"
            className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-1.5 font-heading text-sm font-semibold text-yellow-300"
          >
            <Sparkles size={15} aria-hidden="true" />
            Kuis MiniLemon
          </span>

          <h1
            data-reveal="up"
            data-delay="0.08"
            className="mt-5 font-heading text-[2.6rem] font-bold leading-[1.05] sm:text-6xl"
          >
            Selamat datang di{' '}
            <span className="relative inline-block text-yellow-400">
              Petualangan
              <svg
                aria-hidden="true"
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-coral-400"
                preserveAspectRatio="none"
              >
                <path d="M3 9 C 40 1, 80 15, 120 7 S 190 3, 217 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{' '}
            Pengetahuan!
          </h1>

          <p data-reveal="up" data-delay="0.16" className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Pilih planet tujuanmu, jawab pertanyaan seru tentang sains, hewan, dan antariksa, lalu kumpulkan
            bintang di setiap perhentian. Tanpa buru-buru, belajar tetap menyenangkan.
          </p>

          <div data-reveal="up" data-delay="0.24" className="mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="#kategori" onClick={scrollToId('kategori')} icon={Rocket}>
              Mulai Petualangan
            </Button>
            <Button as="a" href="#misi" variant="ghost" onClick={scrollToId('misi')}>
              Lihat Misi Penjelajah
            </Button>
          </div>

          {/* Real counts from the local question bank — they follow the data. */}
          <ul data-reveal="up" data-delay="0.32" className="mt-8 flex flex-wrap gap-2.5 text-sm font-semibold">
            <li className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur">
              {quizCategories.length} planet tujuan
            </li>
            <li className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur">{totalQuestions} pertanyaan</li>
            <li className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur">Tanpa batas waktu</li>
          </ul>
        </div>

        {/* Key-art poster + floating rewards */}
        <div className="relative mx-auto w-full max-w-[620px]" data-reveal="pop" data-delay="0.1">
          <TiltCard max={6} className="relative">
            <div className="overflow-hidden rounded-[2rem] border-4 border-white/25 bg-navy-800 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              <img
                src={QUIZ_POSTER.src}
                alt="Poster Kuis MiniLemon: dua karakter MiniLemon melayang di antara bintang, koin, dan roket"
                width={QUIZ_POSTER.width}
                height={QUIZ_POSTER.height}
                fetchPriority="high"
                className="block h-auto w-full"
              />
            </div>
          </TiltCard>

          <div aria-hidden="true">
            <img
              data-parallax="-0.6"
              src={badge('juara')}
              alt=""
              width="120"
              height="120"
              className="absolute -right-3 -top-8 w-16 drop-shadow-xl sm:-right-8 sm:w-24"
            />
            <img
              data-parallax="-0.9"
              src={badge('koin-tumpuk')}
              alt=""
              width="100"
              height="100"
              className="absolute -bottom-6 left-[6%] w-14 drop-shadow-xl sm:w-20"
            />
            <img
              data-parallax="-0.4"
              src={mascot('coklat-2')}
              alt=""
              width="180"
              height="180"
              className="absolute -bottom-10 -left-3 hidden w-24 drop-shadow-2xl sm:block lg:-left-10 lg:w-32"
            />
            <img
              src={mascot('benar')}
              alt=""
              width="90"
              height="90"
              className="bob absolute -left-2 top-[18%] hidden w-12 drop-shadow-lg sm:block lg:-left-8"
              style={{ '--bob-dur': '7s' }}
            />
            <img
              src={icon('bintang-senyum')}
              alt=""
              width="90"
              height="90"
              className="bob absolute -right-2 bottom-[14%] w-12 drop-shadow-lg sm:-right-9 sm:w-16"
              style={{ '--bob-dur': '8s', '--bob-delay': '-2s' }}
            />
          </div>
        </div>
      </Container>

      <a
        href="#kategori"
        onClick={scrollToId('kategori')}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold tracking-widest text-white/70 uppercase transition-colors hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
      >
        Gulir
        <ArrowDown size={18} className="bob" style={{ '--bob-y': '6px', '--bob-dur': '1.8s' }} />
      </a>
    </section>
  )
}

export default QuizHero
