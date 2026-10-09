import { ArrowLeft, Clock, Lightbulb, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { getCategory, getRelated } from '../../data/ilmu'
import Container from '../ui/Container'
import IlmuMaterialCard from './IlmuMaterialCard'

/** Halaman detail satu materi: penjelasan lengkap, tahukah kamu, coba sendiri, materi lain. */
function IlmuDetail({ material, onBack, onOpen }) {
  const titleRef = useRef(null)
  const cat = getCategory(material.category)
  const related = getRelated(material)

  // Pindahkan fokus ke judul saat materi dibuka (membantu keyboard & pembaca layar).
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
  }, [material.id])

  return (
    <article>
      <header
        className="relative overflow-hidden bg-[#1b2690] bg-cover bg-center py-8 text-white sm:py-12"
        style={{ backgroundImage: 'url("/assets/backgrounds/ilmu-cosmic.jpg")' }}
      >
        <div className="absolute inset-0 bg-navy-950/55" />
        <Container className="relative">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/15 px-4 py-2 font-heading text-sm font-semibold transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke Ilmu
          </button>

          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-10">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-[var(--radius-pill)] px-3 py-1 text-xs font-semibold ${cat?.pill}`}
                >
                  {cat?.label}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/85">
                  <Clock size={13} aria-hidden="true" />
                  {material.readMinutes} menit baca
                </span>
              </div>
              <h1
                ref={titleRef}
                tabIndex={-1}
                className="font-heading text-3xl font-semibold leading-tight outline-none sm:text-4xl"
              >
                {material.title}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {material.summary}
              </p>
            </div>
            <img
              src={material.image}
              alt=""
              width={1254}
              height={1254}
              decoding="async"
              draggable="false"
              className="mx-auto aspect-square w-full max-w-[14rem] select-none rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-soft)] md:max-w-none"
            />
          </div>
        </Container>
      </header>

      <section className="bg-cream-50 py-10 sm:py-14">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <p className="font-heading text-lg font-medium leading-relaxed text-ink-900 sm:text-xl">
              {material.intro}
            </p>

            {material.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-2">
                <h2 className="font-heading text-xl font-semibold text-navy-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed text-ink-600">{section.text}</p>
              </section>
            ))}

            <aside className="flex gap-4 rounded-[var(--radius-card)] border-2 border-yellow-400 bg-yellow-300/30 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-navy-950">
                <Lightbulb size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy-900">Tahukah kamu?</h2>
                <p className="mt-1 text-base leading-relaxed text-ink-900">{material.funFact}</p>
              </div>
            </aside>

            {material.activity ? (
              <aside className="flex gap-4 rounded-[var(--radius-card)] bg-lavender-100 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-400 text-navy-950">
                  <Sparkles size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-navy-900">Coba sendiri</h2>
                  <p className="mt-1 text-base leading-relaxed text-ink-900">{material.activity}</p>
                </div>
              </aside>
            ) : null}

            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-semibold text-navy-900">Kata kunci</h2>
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {material.keywords.map((word) => (
                  <li
                    key={word}
                    className="rounded-[var(--radius-pill)] bg-lavender-100 px-3 py-1 text-sm font-semibold text-navy-900"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="mb-5 font-heading text-2xl font-semibold text-ink-900">
              Materi lainnya
            </h2>
            <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="m-0">
                  <IlmuMaterialCard material={item} onOpen={onOpen} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </article>
  )
}

export default IlmuDetail
