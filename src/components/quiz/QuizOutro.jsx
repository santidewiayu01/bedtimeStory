import { ArrowRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TEASERS, mascot } from '../../data/quizAssets'
import { Sprite } from '../immersive/HeroLayers'
import Container from '../ui/Container'
import TiltCard from '../scroll/TiltCard'

const DESTINATIONS = [
  { to: '/cerita', label: 'Cerita', hint: 'Dongeng dan cerita moral sebelum tidur', art: TEASERS.cerita, glow: '#8b7cf6' },
  { to: '/ilmu', label: 'Ilmu Pengetahuan', hint: 'Baca materi sebelum menantang kuis', art: TEASERS.ilmu, glow: '#34c78e' },
  { to: '/video', label: 'Video Pengetahuan', hint: 'Belajar lewat gambar yang bergerak', art: TEASERS.video, glow: '#ff7a59' },
]

/**
 * Closing band. The three links lead to routes that already exist. At the bottom a
 * planet horizon with the mascots standing on it melts into the (navy) footer.
 */
function QuizOutro() {
  return (
    <section
      data-px-scope
      className="relative -mt-10 overflow-hidden rounded-t-[3rem] bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pt-20 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,124,246,0.28),transparent_55%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.5" className="absolute left-[7%] top-[10%] w-12 sm:w-20">
          <Sprite name="ringedPink" className="bob" style={{ '--bob-rot': '5deg', '--bob-dur': '10s' }} />
        </div>
        <div data-parallax="0.3" className="absolute right-[10%] top-[16%] w-6">
          <Sprite name="star1" className="hero-twinkle" />
        </div>
      </div>

      <Container className="relative">
        <header className="mx-auto max-w-2xl text-center">
          <h2 data-reveal="up" className="font-heading text-3xl font-bold sm:text-5xl">
            Masih penasaran? <span className="text-yellow-400">Jelajahi yang lain!</span>
          </h2>
          <p data-reveal="up" data-delay="0.08" className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Baca materinya dulu, tonton videonya, atau dengarkan cerita, lalu kembali menantang kuis.
          </p>
        </header>

        <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <li key={d.to} data-reveal="up" data-delay={i * 0.1}>
              <TiltCard max={9} className="h-full">
                <Link
                  to={d.to}
                  className="group relative flex h-full flex-col items-center rounded-[2rem] border-2 border-white/15 bg-white/5 px-5 pb-6 pt-5 text-center backdrop-blur-sm transition-colors hover:border-yellow-300/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                    style={{ background: d.glow }}
                  />
                  <img
                    src={d.art}
                    alt=""
                    width="494"
                    height="494"
                    loading="lazy"
                    className="relative w-full max-w-[15rem] drop-shadow-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                  />
                  <span className="relative mt-2 font-heading text-xl font-semibold">{d.label}</span>
                  <span className="relative mt-1 text-sm text-white/75">{d.hint}</span>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-yellow-300">
                    Buka <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </li>
          ))}
        </ul>

        <p data-reveal="up" className="mt-10 text-center text-sm text-white/75">
          <Link
            to="/tentang"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            <Info size={16} aria-hidden="true" /> Kenalan dengan dunia MiniLemon
          </Link>
        </p>
      </Container>

      {/* horizon */}
      <div aria-hidden="true" className="relative mt-14 h-48 sm:h-60">
        <div
          className="absolute left-1/2 top-[40%] aspect-square w-[160%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,#7e5ee0_0%,#5a3bb0_14%,#352369_40%,#101a3f_75%)] shadow-[0_-10px_50px_rgba(139,124,246,0.6)] sm:top-[36%] sm:w-[125%]"
        />
        <img src={mascot('coklat-1')} alt="" width="150" height="150" loading="lazy" className="absolute bottom-[4%] left-[16%] w-20 drop-shadow-2xl sm:w-28" />
        <img src={mascot('merah-1')} alt="" width="170" height="170" loading="lazy" className="absolute bottom-[2%] left-1/2 w-24 -translate-x-1/2 drop-shadow-2xl sm:w-32" />
        <img src={mascot('biru-5')} alt="" width="150" height="150" loading="lazy" className="absolute bottom-[4%] right-[16%] w-20 drop-shadow-2xl sm:w-28" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-navy-950" />
      </div>
    </section>
  )
}

export default QuizOutro
