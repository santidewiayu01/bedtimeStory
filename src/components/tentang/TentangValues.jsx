import { NEBULA, badge } from '../../data/quizAssets'
import { Sprite } from '../immersive/HeroLayers'
import Container from '../ui/Container'

// Four values, each shown with one of the design team's achievement medals as its
// emblem. The medals are used as illustrations here, not as earned rewards.
const VALUES = [
  {
    title: 'Rasa Ingin Tahu',
    text: 'Bertanya adalah langkah pertama. Tidak ada pertanyaan yang terlalu kecil di sini.',
    medal: 'si-penasaran',
    glow: '#8b7cf6',
    pos: 'md:left-[14%] md:top-[52%]',
  },
  {
    title: 'Kreativitas',
    text: 'Lewat cerita, gambar, dan percobaan, ide-ide baru tumbuh dan boleh berbeda-beda.',
    medal: 'kreatif',
    glow: '#ff7a59',
    pos: 'md:left-[38%] md:top-[14%]',
  },
  {
    title: 'Eksplorasi',
    text: 'Mencoba hal baru itu seru, bahkan saat kita belum tahu jawabannya.',
    medal: 'berani-mencoba',
    glow: '#4cc9f0',
    pos: 'md:left-[62%] md:top-[56%]',
  },
  {
    title: 'Belajar yang Menyenangkan',
    text: 'Belajar terasa ringan kalau dikemas dengan warna, cerita, dan permainan.',
    medal: 'pembaca-hebat',
    glow: '#34c78e',
    pos: 'md:left-[86%] md:top-[18%]',
  },
]

// Constellation line through the four medals (same % coordinates as `pos`).
const LINE = 'M 14 52 C 22 20, 30 14, 38 14 S 52 56, 62 56 S 78 18, 86 18'

/**
 * Nilai-nilai MiniLemon as a constellation: medals sit at staggered heights, a line
 * connects them left→right as you scroll (clip wipe), and each medal wobbles on
 * hover/focus. Phones get a plain 2×2 grid.
 */
function TentangValues() {
  return (
    <section
      data-px-scope
      aria-labelledby="nilai-judul"
      className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url("${NEBULA.ilmu}")` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-navy-950),transparent_20%,transparent_80%,var(--color-navy-950))]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.4" className="absolute left-[6%] top-[8%] w-6">
          <Sprite name="star2" className="hero-twinkle" />
        </div>
        <div data-parallax="0.7" className="absolute right-[7%] top-[70%] hidden w-14 md:block">
          <Sprite name="purpleSm" className="bob" style={{ '--bob-rot': '6deg', '--bob-dur': '10s' }} />
        </div>
      </div>

      <Container className="relative">
        <header className="mx-auto max-w-2xl text-center">
          <p data-reveal="up" className="font-heading text-sm font-semibold tracking-[0.2em] text-yellow-300 uppercase">
            Yang kami pegang
          </p>
          <h2 id="nilai-judul" data-reveal="up" data-delay="0.06" className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
            Empat bintang penuntun
          </h2>
          <p data-reveal="up" data-delay="0.12" className="mt-4 text-base text-white/80 sm:text-lg">
            Setiap cerita, materi, video, dan kuis di MiniLemon dibuat dengan arah yang sama.
          </p>
        </header>

        <div className="relative mt-14 md:h-[34rem]">
          <svg
            data-wipe="x"
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <path
              d={LINE}
              fill="none"
              stroke="#ffe27a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 11"
              vectorEffect="non-scaling-stroke"
              opacity="0.9"
            />
          </svg>

          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-10 p-0 md:block">
            {VALUES.map((v, i) => (
              <li
                key={v.title}
                data-reveal="pop"
                data-delay={i * 0.12}
                className={`group relative flex flex-col items-center text-center md:absolute md:w-56 md:-translate-x-1/2 md:-translate-y-1/2 lg:w-60 ${v.pos}`}
              >
                <span
                  tabIndex={0}
                  className="relative block rounded-full outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 scale-110 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-80 group-focus-within:opacity-80"
                    style={{ background: v.glow }}
                  />
                  <img
                    src={badge(v.medal)}
                    alt=""
                    width="160"
                    height="160"
                    loading="lazy"
                    className="relative w-28 drop-shadow-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-focus-within:-rotate-6 group-focus-within:scale-110 sm:w-32 md:w-36"
                  />
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold sm:text-xl">{v.title}</h3>
                <p className="mt-1 max-w-[16rem] rounded-xl text-sm leading-snug text-white/80 md:bg-navy-950/55 md:px-3 md:py-2 md:backdrop-blur-sm">
                  {v.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default TentangValues
