import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NEBULA, mascot } from '../../data/quizAssets'
import { quizCategories } from '../../data/quiz'
import { Sprite } from '../immersive/HeroLayers'
import Container from '../ui/Container'

// Where each planet sits on the (desktop) map, in % of the map box. The curved
// trail is generated from the same points, so path and planets never drift apart.
const POINTS = [
  [24, 7],
  [75, 22],
  [27, 37],
  [73, 52],
  [25, 67],
  [71, 82],
]

function buildTrail() {
  const pts = [[50, 0], ...POINTS, [50, 100]]
  return pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`
      const [px, py] = pts[i - 1]
      const mid = (py + y) / 2
      return `C ${px} ${mid}, ${x} ${mid}, ${x} ${y}`
    })
    .join(' ')
}
const TRAIL = buildTrail()

function PlanetNode({ category, index }) {
  const [x, y] = POINTS[index]
  const flip = index % 2 === 1
  return (
    <li
      className="relative md:absolute md:[left:var(--x)] md:[top:var(--y)] md:-translate-x-1/2 md:-translate-y-1/2"
      style={{ '--x': `${x}%`, '--y': `${y}%` }}
    >
      <Link
        to={`/quiz/${category.id}`}
        data-reveal={flip ? 'right' : 'left'}
        className={`group flex items-center gap-4 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-yellow-300 md:gap-6 ${
          flip ? 'md:flex-row-reverse md:text-right' : ''
        }`}
        style={{ '--accent': category.accent }}
      >
        {/* planet */}
        <span className="relative block h-28 w-28 shrink-0 transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 sm:h-36 sm:w-36 md:h-44 md:w-44">
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border-2 border-dashed opacity-60 transition-opacity duration-300 group-hover:animate-spin group-hover:opacity-100 [animation-duration:9s]"
            style={{ borderColor: 'var(--accent)' }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-125 rounded-full opacity-40 blur-2xl"
            style={{ background: 'var(--accent)' }}
          />
          <img
            src={category.art}
            alt=""
            width="352"
            height="352"
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full border-4 object-cover shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
            style={{ borderColor: 'var(--accent)' }}
          />
          <span
            aria-hidden="true"
            className="absolute -left-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-navy-950 font-heading text-base font-bold text-white"
          >
            {index + 1}
          </span>
          <img
            src={mascot(category.mascot)}
            alt=""
            width="90"
            height="90"
            loading="lazy"
            className={`pointer-events-none absolute -bottom-3 hidden w-16 translate-y-2 drop-shadow-xl transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:block lg:w-20 ${
              flip ? '-right-8' : '-left-8'
            }`}
          />
        </span>

        {/* label */}
        <span className="block max-w-[15rem] rounded-2xl bg-navy-950/55 px-4 py-3 backdrop-blur-sm md:max-w-[16rem]">
          <span className="block font-heading text-xl font-semibold leading-tight text-white md:text-2xl">
            {category.label}
          </span>
          <span className="mt-1 block text-sm leading-snug text-white/80">{category.tagline}</span>
          <span
            className={`mt-3 flex flex-wrap items-center gap-2 text-xs font-bold ${flip ? 'md:justify-end' : ''}`}
          >
            <span className="rounded-full px-2.5 py-1 text-navy-950" style={{ background: 'var(--accent)' }}>
              {category.questions.length} pertanyaan
            </span>
            <span className="inline-flex items-center gap-1 text-yellow-300 transition-transform group-hover:translate-x-1">
              Main <ArrowRight size={14} aria-hidden="true" />
            </span>
          </span>
        </span>
      </Link>
    </li>
  )
}

/**
 * "Peta Petualangan" — instead of a card grid, the six categories are planets along a
 * winding trail. The trail is "drawn" as you scroll (clip wipe), planets rise in from
 * alternating sides, and every planet is a real link to its own quiz route.
 */
function QuizMap() {
  return (
    <section
      id="kategori"
      data-px-scope
      className="relative scroll-mt-[var(--nav-h)] overflow-hidden bg-[#1b2690] py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url("${NEBULA.ilmu}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-navy-950)_0%,rgba(10,15,43,0.15)_16%,rgba(10,15,43,0.15)_84%,var(--color-purple-950)_100%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.6" className="absolute left-[4%] top-[26%] hidden w-16 md:block">
          <Sprite name="asteroid" className="bob" style={{ '--bob-rot': '8deg', '--bob-dur': '10s' }} />
        </div>
        <div data-parallax="0.3" className="absolute right-[8%] top-[44%] hidden w-7 md:block">
          <Sprite name="star2" className="hero-twinkle" />
        </div>
        <div data-parallax="0.7" className="absolute right-[3%] top-[68%] hidden w-14 md:block">
          <Sprite name="blueCrater" className="bob" style={{ '--bob-rot': '-6deg', '--bob-dur': '12s' }} />
        </div>
        <div data-parallax="0.4" className="absolute bottom-[8%] left-[6%] hidden w-5 md:block">
          <Sprite name="star1" className="hero-twinkle" />
        </div>
      </div>

      <Container className="relative">
        <header className="mx-auto max-w-2xl text-center">
          <p data-reveal="up" className="font-heading text-sm font-semibold tracking-[0.2em] text-yellow-300 uppercase">
            Peta Petualangan
          </p>
          <h2 data-reveal="up" data-delay="0.06" className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
            Pilih planet tujuanmu
          </h2>
          <p data-reveal="up" data-delay="0.12" className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Setiap planet menyimpan pertanyaan yang berbeda. Mulai dari mana saja, urutannya terserah kamu.
          </p>
        </header>

        <div className="relative mt-14 md:mt-20 md:h-[100rem]">
          {/* trail (desktop) */}
          <svg
            data-wipe
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <path
              d={TRAIL}
              fill="none"
              stroke="#ffe27a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 12"
              vectorEffect="non-scaling-stroke"
              opacity="0.85"
            />
          </svg>
          {/* trail (mobile) */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-14 top-0 w-0 border-l-4 border-dotted border-yellow-300/60 md:hidden"
          />

          <ol className="relative m-0 flex list-none flex-col gap-12 p-0 md:absolute md:inset-0 md:block md:gap-0">
            {quizCategories.map((category, index) => (
              <PlanetNode key={category.id} category={category} index={index} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

export default QuizMap
