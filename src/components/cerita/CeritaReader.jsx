import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Library,
  RotateCcw,
  Sparkles,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getCategory, getNextStory, getRelatedStories } from '../../data/cerita'
import Container from '../ui/Container'
import CeritaStoryCard from './CeritaStoryCard'
import StoryCover from './StoryCover'

const GALAXY = '/assets/backgrounds/cerita-galaxy.jpg'

const navButtonBase =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-3 font-heading text-sm font-semibold sm:px-5 sm:text-base transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400'

/**
 * Halaman detail satu cerita.
 * Cerita dibagi menjadi beberapa halaman baca + satu layar akhir "Pesan Moral".
 * Dipasang dengan `key={story.id}` oleh induknya, jadi posisi baca otomatis
 * kembali ke awal setiap berpindah cerita.
 */
function CeritaReader({ story }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const listSearch = location.state?.listSearch ?? ''

  const [step, setStep] = useState(0)
  const titleRef = useRef(null)
  const readerRef = useRef(null)
  const prevStep = useRef(0)

  const cat = getCategory(story.category)
  const total = story.stepCount // halaman baca + layar pesan moral
  const lastStep = total - 1
  const isFirst = step === 0
  const isLast = step === lastStep
  const percent = Math.round(((step + 1) / total) * 100)
  const related = getRelatedStories(story)
  const nextStory = getNextStory(story)

  const goPrev = useCallback(() => setStep((s) => Math.max(0, s - 1)), [])
  const goNext = useCallback(() => setStep((s) => Math.min(lastStep, s + 1)), [lastStep])

  // Buka cerita: mulai dari atas, fokus ke judul (membantu keyboard & pembaca layar).
  useEffect(() => {
    window.scrollTo(0, 0)
    titleRef.current?.focus({ preventScroll: true })
  }, [story.id])

  // Saat pindah halaman baca, bawa kartu baca ke layar bila sebagian tertutup.
  useEffect(() => {
    if (prevStep.current === step) return
    prevStep.current = step
    const el = readerRef.current
    if (!el) return
    const { top } = el.getBoundingClientRect()
    const navHeight = 72
    if (top < navHeight || top > window.innerHeight * 0.6) {
      el.scrollIntoView({ block: 'start' })
    }
  }, [step])

  // Panah kiri/kanan di keyboard untuk berpindah halaman.
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const stepLabel = isLast ? 'Pesan moral' : `Halaman ${step + 1} dari ${story.pages.length}`

  return (
    <article>
      <header
        className="relative overflow-hidden bg-purple-950 bg-cover bg-center py-8 text-white sm:py-12"
        style={{ backgroundImage: `url("${GALAXY}")` }}
      >
        <div className="absolute inset-0 bg-purple-950/60" />
        <Container className="relative">
          <Link
            to={`/cerita${listSearch}`}
            className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/15 px-4 py-2 font-heading text-sm font-semibold transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke Cerita
          </Link>

          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-10">
            <div className="flex flex-col items-start gap-3">
              <span
                className={`rounded-[var(--radius-pill)] px-3 py-1 text-xs font-semibold ${cat?.pill}`}
              >
                {cat?.label}
              </span>
              <h1
                ref={titleRef}
                tabIndex={-1}
                className="font-heading text-3xl font-semibold leading-tight outline-none sm:text-4xl"
              >
                {story.title}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {story.summary}
              </p>
              <ul className="flex list-none flex-wrap items-center gap-2 p-0 text-xs font-semibold">
                <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-white/15 px-3 py-1.5">
                  <Users size={13} aria-hidden="true" />
                  <span className="sr-only">Usia: </span>
                  {story.ageRange}
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-white/15 px-3 py-1.5">
                  <Clock size={13} aria-hidden="true" />
                  <span className="sr-only">Durasi baca: </span>
                  {story.duration}
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-yellow-400 px-3 py-1.5 text-navy-950">
                  <Sparkles size={13} aria-hidden="true" />
                  Nilai: {story.value}
                </li>
              </ul>
            </div>
            <div className="mx-auto aspect-square w-full max-w-[14rem] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] md:max-w-none">
              <StoryCover story={story} />
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-cream-50 py-10 sm:py-14">
        <Container>
          <div
            ref={readerRef}
            className="mx-auto max-w-3xl scroll-mt-[calc(var(--nav-h)+1rem)] rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-8"
          >
            {/* Indikator progress membaca */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold">
                <span className="font-heading text-navy-900">{stepLabel}</span>
                <span className="text-ink-600">{percent}%</span>
              </div>
              <div
                role="progressbar"
                aria-label="Progress membaca"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-valuetext={`${stepLabel}, ${percent} persen selesai`}
                className="h-3 w-full overflow-hidden rounded-full bg-lavender-100"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-mint-400 transition-[width] duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div
                role="group"
                aria-label="Loncat ke halaman"
                className="mt-3 flex flex-wrap items-center justify-center gap-1"
              >
                {Array.from({ length: total }, (_, i) => {
                  const isMoral = i === lastStep
                  const active = i === step
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setStep(i)}
                      aria-label={isMoral ? 'Ke pesan moral' : `Ke halaman ${i + 1}`}
                      aria-current={active ? 'step' : undefined}
                      className="flex h-8 w-8 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-coral-400"
                    >
                      <span
                        className={`block rounded-full transition-all duration-200 ${
                          active
                            ? 'h-3.5 w-3.5 bg-yellow-400 ring-2 ring-yellow-400/40'
                            : i < step
                              ? 'h-2.5 w-2.5 bg-mint-400'
                              : 'h-2.5 w-2.5 bg-lavender-400/40'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Isi halaman */}
            <div className="min-h-[16rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLast ? (
                    <div className="flex flex-col gap-5">
                      <div className="flex gap-4 rounded-[var(--radius-card)] border-2 border-yellow-400 bg-yellow-300/30 p-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-navy-950">
                          <Sparkles size={20} aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="font-heading text-lg font-semibold text-navy-900">
                            Pesan Moral: {story.value}
                          </h2>
                          <p className="mt-1 text-base leading-relaxed text-ink-900 sm:text-lg">
                            {story.moral}
                          </p>
                        </div>
                      </div>
                      <p className="font-heading text-lg font-medium text-navy-900">
                        Hore, kamu sudah selesai membaca! 🎉
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className={`${navButtonBase} bg-lavender-100 text-navy-900 hover:bg-lavender-400/30`}
                        >
                          <RotateCcw size={18} aria-hidden="true" />
                          Baca lagi dari awal
                        </button>
                        <Link
                          to={`/cerita/${nextStory.id}`}
                          state={{ listSearch }}
                          className={`${navButtonBase} bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)] hover:bg-yellow-300`}
                        >
                          Cerita berikutnya
                          <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                        </Link>
                      </div>
                      <p className="text-sm text-ink-600">
                        Berikutnya: <span className="font-semibold">{nextStory.title}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <h2 className="sr-only">{stepLabel}</h2>
                      {story.pages[step].map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-lg leading-loose text-ink-900 sm:text-xl sm:leading-loose"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tombol navigasi */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-lavender-100 pt-6">
              <button
                type="button"
                onClick={goPrev}
                aria-disabled={isFirst}
                className={`${navButtonBase} ${
                  isFirst
                    ? 'cursor-not-allowed bg-lavender-100/60 text-ink-600/50'
                    : 'bg-lavender-100 text-navy-900 hover:bg-lavender-400/30'
                }`}
              >
                <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
                Sebelumnya
              </button>

              {isLast ? (
                <Link
                  to={`/cerita${listSearch}`}
                  className={`${navButtonBase} bg-mint-400 text-navy-950 hover:brightness-105`}
                >
                  <Library size={18} className="shrink-0" aria-hidden="true" />
                  Semua Cerita
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className={`${navButtonBase} bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)] hover:bg-yellow-300`}
                >
                  Selanjutnya
                  <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="mt-3 hidden text-center text-xs text-ink-600 sm:block">
              Tip: tekan tombol panah kiri atau kanan di keyboard untuk berpindah halaman.
            </p>
          </div>

          <div className="mt-14">
            <h2 className="mb-5 font-heading text-2xl font-semibold text-ink-900">
              Cerita lainnya
            </h2>
            <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="m-0">
                  <CeritaStoryCard story={item} listSearch={listSearch} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </article>
  )
}

export default CeritaReader
