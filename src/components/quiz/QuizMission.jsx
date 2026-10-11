import { Rocket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ILMU_ART, badge, icon, mascot } from '../../data/quizAssets'
import { MIXED_ID, quizCategories } from '../../data/quiz'
import Button from '../ui/Button'
import Container from '../ui/Container'

// Three beats of the mission. Everything described here is what the quiz really does.
const STEPS = [
  {
    title: 'Pilih tujuanmu',
    text: 'Misi Campuran membawamu mengunjungi semua planet sekaligus, dengan dua pertanyaan dari tiap planet. Urutan soal dan jawabannya selalu diacak.',
  },
  {
    title: 'Jawab, lalu belajar',
    text: 'Setiap jawaban langsung dapat tanggapan, benar atau salah. Selalu ada penjelasan singkat supaya kamu tahu kenapa jawabannya begitu.',
  },
  {
    title: 'Kumpulkan bintangmu',
    text: 'Di akhir misi, kamu mendapat 1 sampai 3 bintang sesuai jawaban yang benar. Kalau belum puas, main lagi dengan urutan soal yang baru.',
  },
]

// Pinned artwork for each step (md+). Crossfaded by `active`.
function StageArt({ step }) {
  if (step === 0) {
    return (
      <div className="relative h-full w-full">
        {quizCategories.slice(0, 6).map((c, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
          return (
            <img
              key={c.id}
              src={c.art}
              alt=""
              width="140"
              height="140"
              loading="lazy"
              className="bob absolute h-[27%] w-[27%] rounded-full border-[3px] object-cover shadow-xl"
              style={{
                left: `${50 + Math.cos(angle) * 34 - 13.5}%`,
                top: `${50 + Math.sin(angle) * 34 - 13.5}%`,
                borderColor: c.accent,
                '--bob-dur': `${6 + i}s`,
                '--bob-delay': `${-i}s`,
              }}
            />
          )
        })}
        <img
          src={mascot('biru-1')}
          alt=""
          width="240"
          height="240"
          className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
        />
      </div>
    )
  }
  if (step === 1) {
    return (
      <div className="relative h-full w-full">
        <img src={mascot('benar')} alt="" width="200" height="200" className="bob absolute left-[8%] top-[14%] w-[34%] drop-shadow-2xl" />
        <img
          src={mascot('salah')}
          alt=""
          width="200"
          height="200"
          className="bob absolute right-[8%] top-[22%] w-[30%] drop-shadow-2xl"
          style={{ '--bob-delay': '-2s', '--bob-dur': '7s' }}
        />
        <img src={mascot('merah-2')} alt="" width="260" height="260" className="absolute bottom-[2%] left-1/2 w-[42%] -translate-x-1/2 drop-shadow-2xl" />
        <img src={icon('balon-bintang')} alt="" width="120" height="120" className="bob absolute right-[22%] top-[2%] w-[20%]" style={{ '--bob-dur': '8s' }} />
      </div>
    )
  }
  return (
    <div className="relative h-full w-full">
      {[
        ['left-[6%] top-[34%] w-[26%]', 'bintang-emas-besar', '-6s'],
        ['left-[37%] top-[16%] w-[30%]', 'bintang-emas-besar', '0s'],
        ['right-[6%] top-[34%] w-[26%]', 'bintang-emas-besar', '-3s'],
      ].map(([pos, name, delay], i) => (
        <img key={i} src={mascot(name)} alt="" width="200" height="200" className={`bob absolute drop-shadow-2xl ${pos}`} style={{ '--bob-delay': delay, '--bob-dur': '6s' }} />
      ))}
      <img src={badge('juara')} alt="" width="240" height="240" className="absolute bottom-[4%] left-1/2 w-[38%] -translate-x-1/2 drop-shadow-2xl" />
      <img src={badge('koin-tumpukan-besar')} alt="" width="160" height="160" className="absolute bottom-[6%] left-[6%] w-[20%] drop-shadow-xl" />
      <img src={icon('peti-harta')} alt="" width="160" height="160" className="absolute bottom-[6%] right-[6%] w-[20%] drop-shadow-xl" />
    </div>
  )
}

/**
 * "Misi Penjelajah" — the featured challenge. On desktop the artwork is pinned (CSS
 * sticky, no scroll hijacking) while three steps scroll past and swap what it shows.
 * On phones each step carries its own picture and nothing is pinned.
 */
function QuizMission() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean)
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.step))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="misi"
      data-px-scope
      className="relative -mt-10 scroll-mt-[var(--nav-h)] rounded-t-[3rem] bg-gradient-to-b from-purple-950 via-purple-900 to-navy-950 pt-20 text-white sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[3rem] bg-[radial-gradient(circle_at_75%_30%,rgba(255,201,60,0.2),transparent_45%),radial-gradient(circle_at_10%_80%,rgba(139,124,246,0.25),transparent_50%)]"
      />

      <Container className="relative">
        <header className="max-w-2xl">
          <p data-reveal="up" className="font-heading text-sm font-semibold tracking-[0.2em] text-yellow-300 uppercase">
            Misi Penjelajah
          </p>
          <h2 data-reveal="up" data-delay="0.06" className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
            Satu misi, semua planet
          </h2>
        </header>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          {/* pinned stage (md+) */}
          <div className="hidden md:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] h-[calc(100svh-var(--nav-h)-4rem)] max-h-[34rem] min-h-[24rem]">
              <div className="relative h-full overflow-hidden rounded-[2.5rem] border-4 border-white/20 bg-gradient-to-br from-navy-700 via-purple-800 to-navy-900 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)]">
                <img
                  src={ILMU_ART('Icon 1.png')}
                  alt=""
                  width="600"
                  height="600"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                />
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    aria-hidden={active !== i}
                    className={`absolute inset-6 transition-all duration-700 ease-out ${
                      active === i ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
                    }`}
                  >
                    <StageArt step={i} />
                  </div>
                ))}
                <ol aria-hidden="true" className="absolute bottom-4 left-0 right-0 m-0 flex list-none justify-center gap-2 p-0">
                  {STEPS.map((_, i) => (
                    <li
                      key={i}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        active === i ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40'
                      }`}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* steps */}
          <ol className="m-0 list-none p-0">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                ref={(node) => {
                  stepRefs.current[i] = node
                }}
                data-step={i}
                className="flex flex-col justify-center gap-4 py-8 md:min-h-[78svh]"
              >
                {/* phone-only picture for this step */}
                <div className="relative mx-auto aspect-square w-full max-w-[18rem] rounded-[2rem] border-4 border-white/20 bg-gradient-to-br from-navy-700 to-purple-800 md:hidden">
                  <div className="absolute inset-3">
                    <StageArt step={i} />
                  </div>
                </div>

                <span className="font-heading text-6xl font-bold text-yellow-400/90">{`0${i + 1}`}</span>
                <h3 className="font-heading text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                <p className="max-w-md text-base leading-relaxed text-white/85 sm:text-lg">{step.text}</p>

                {i === STEPS.length - 1 ? (
                  <div className="mt-2 flex flex-col items-start gap-3">
                    <Button to={`/quiz/${MIXED_ID}`} icon={Rocket}>
                      Mulai Misi Campuran
                    </Button>
                    <p className="max-w-sm text-sm text-white/65">
                      Skor hanya tampil di layar saat kamu bermain dan belum disimpan ke akun atau papan peringkat.
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
      <div aria-hidden="true" className="h-16" />
    </section>
  )
}

export default QuizMission
