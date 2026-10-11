import { Link } from 'react-router-dom'
import { HERO_BACKGROUND } from '../../data/heroAssets'
import { icon, mascot } from '../../data/quizAssets'
import Container from '../ui/Container'
import LogoMark from '../ui/LogoMark'
import { Sprite } from '../immersive/HeroLayers'

const DESTINATIONS = [
  { to: '/', label: 'Beranda', icon: 'rumah' },
  { to: '/cerita', label: 'Cerita', icon: 'ubin-cerita' },
  { to: '/ilmu', label: 'Ilmu', icon: 'ubin-planet' },
  { to: '/video', label: 'Video', icon: 'putar' },
  { to: '/quiz', label: 'Quiz', icon: 'bintang' },
]

/**
 * Closing — returns to the hero's galaxy illustration and logo so the page has a
 * beginning and an end, then offers every real route as a way to start exploring.
 * The bottom edge fades to navy to meet the footer.
 */
function TentangClosing() {
  return (
    <section
      data-px-scope
      aria-labelledby="penutup-judul"
      className="relative isolate overflow-hidden bg-navy-950 pt-24 text-white sm:pt-32"
    >
      <div data-parallax="0.3" className="absolute inset-x-0 -inset-y-[10%] -z-20">
        <img
          src={HERO_BACKGROUND.src}
          alt=""
          width={HERO_BACKGROUND.width}
          height={HERO_BACKGROUND.height}
          loading="lazy"
          className="h-full w-full object-cover object-[70%_55%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-navy-950)_0%,rgba(10,15,43,0.72)_30%,rgba(10,15,43,0.5)_65%,var(--color-navy-950)_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.6" className="absolute left-[6%] top-[22%] hidden w-16 md:block">
          <Sprite name="ringedSm" className="bob" style={{ '--bob-rot': '5deg', '--bob-dur': '10s' }} />
        </div>
        <div data-parallax="0.3" className="absolute right-[12%] top-[16%] w-6">
          <Sprite name="star1" className="hero-twinkle" />
        </div>
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <div data-reveal="pop">
          <LogoMark className="h-24 sm:h-32" />
        </div>
        <h2 id="penutup-judul" data-reveal="up" data-delay="0.08" className="mt-6 font-heading text-3xl font-bold sm:text-5xl">
          Siap menjelajah, <span className="text-yellow-400">penjelajah cilik?</span>
        </h2>
        <p data-reveal="up" data-delay="0.14" className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
          Dunia MiniLemon sudah menunggu. Pilih tempat pertamamu, dan biarkan rasa ingin tahu yang menuntun.
        </p>

        <ul className="m-0 mt-9 flex list-none flex-wrap justify-center gap-3 p-0">
          {DESTINATIONS.map((d, i) => (
            <li key={d.to} data-reveal="up" data-delay={0.2 + i * 0.06}>
              <Link
                to={d.to}
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-white/25 bg-navy-950/60 py-2 pl-2.5 pr-5 font-heading text-base font-semibold backdrop-blur transition-all hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-400 hover:text-navy-950 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-yellow-300"
              >
                <img src={icon(d.icon)} alt="" width="36" height="36" loading="lazy" className="h-9 w-9 object-contain" />
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* the cast, back where they started */}
      <div aria-hidden="true" className="relative mt-16 h-40 sm:h-56">
        <img data-parallax="-0.3" src={mascot('coklat-2')} alt="" width="200" height="200" loading="lazy" className="absolute bottom-0 left-[10%] w-24 drop-shadow-2xl sm:w-36" />
        <img data-parallax="-0.5" src={mascot('biru-5')} alt="" width="200" height="200" loading="lazy" className="absolute bottom-0 left-1/2 w-28 -translate-x-1/2 drop-shadow-2xl sm:w-44" />
        <img data-parallax="-0.3" src={mascot('merah-2')} alt="" width="200" height="200" loading="lazy" className="absolute bottom-0 right-[10%] w-24 drop-shadow-2xl sm:w-36" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-950" />
      </div>
    </section>
  )
}

export default TentangClosing
