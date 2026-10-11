import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Star } from 'lucide-react'
import { useCallback, useEffect, useReducer, useRef } from 'react'
import { Link } from 'react-router-dom'
import { NEBULA, mascot } from '../../data/quizAssets'
import { buildRound, starsFor } from '../../data/quiz'
import { Sprite } from '../immersive/HeroLayers'
import Button from '../ui/Button'
import Container from '../ui/Container'

const LETTERS = ['A', 'B', 'C', 'D']

// ---- state ---------------------------------------------------------------
function init(categoryId) {
  return { round: buildRound(categoryId), index: 0, picked: null, answers: [], done: false, attempt: 0 }
}

function reducer(state, action) {
  switch (action.type) {
    case 'pick': {
      if (state.picked !== null) return state
      const q = state.round.questions[state.index]
      return {
        ...state,
        picked: action.choice,
        answers: [...state.answers, { question: q, choice: action.choice, correct: action.choice === q.answer }],
      }
    }
    case 'next': {
      if (state.picked === null) return state
      const last = state.index >= state.round.questions.length - 1
      return last ? { ...state, done: true } : { ...state, index: state.index + 1, picked: null }
    }
    case 'restart':
      return { ...init(state.round.category.id), attempt: state.attempt + 1 }
    default:
      return state
  }
}

// ---- pieces --------------------------------------------------------------
function ProgressRail({ index, total, answered, accent }) {
  // The rocket sits at the end of what has been completed so far.
  const done = answered ? index + 1 : index
  const pct = (done / total) * 100
  return (
    <div
      role="progressbar"
      aria-label="Progres kuis"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-valuetext={`${done} dari ${total} soal selesai`}
      className="relative h-4 w-full rounded-full bg-white/15"
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%`, background: accent }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-3 w-12 -translate-x-1/2 transition-[left] duration-700 ease-out"
        style={{ left: `${Math.max(pct, 4)}%` }}
      >
        <Sprite name="rocket" className="-rotate-12" />
      </div>
    </div>
  )
}

function OptionButton({ letter, text, state, onPick, disabled, refCb }) {
  const styles = {
    idle: 'border-navy-900/15 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-lg',
    correct: 'border-mint-400 bg-mint-400/15 text-ink-900 ring-4 ring-mint-400/40',
    wrong: 'border-coral-400 bg-coral-400/15 text-ink-900 ring-4 ring-coral-400/40 shake-no',
    dim: 'border-navy-900/10 bg-white/60 text-ink-600 opacity-70',
  }[state]
  return (
    <button
      ref={refCb}
      type="button"
      disabled={disabled}
      onClick={onPick}
      className={`group flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 px-3.5 py-3 text-left font-heading text-base font-semibold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lavender-400 sm:text-lg ${styles} disabled:cursor-default`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          state === 'correct'
            ? 'bg-mint-400 text-white'
            : state === 'wrong'
              ? 'bg-coral-400 text-white'
              : 'bg-lavender-100 text-navy-900 group-hover:bg-yellow-400'
        }`}
      >
        {state === 'correct' ? <Check size={18} strokeWidth={3} /> : LETTERS[letter]}
      </span>
      <span className="flex-1">{text}</span>
      {state === 'correct' && <img src={mascot('benar')} alt="Jawaban benar" width="36" height="36" className="h-9 w-9" />}
      {state === 'wrong' && <img src={mascot('salah')} alt="Jawaban kamu" width="36" height="36" className="h-9 w-9" />}
    </button>
  )
}

function Question({ state, dispatch, accent }) {
  const { round, index, picked } = state
  const total = round.questions.length
  const q = round.questions[index]
  const answered = picked !== null
  const correct = answered && picked === q.answer
  const nextRef = useRef(null)
  const optionRefs = useRef([])

  // After answering, move focus to "next" so keyboard users can just press Enter.
  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: false })
  }, [answered])
  // On a new question, focus the first option (no scroll jump).
  useEffect(() => {
    if (!answered) optionRefs.current[0]?.focus({ preventScroll: true })
  }, [index, answered])

  // Number / letter shortcuts, cleaned up on every change.
  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey || answered) return
      const key = event.key.toLowerCase()
      const choice = ['1', '2', '3', '4'].indexOf(key) !== -1 ? Number(key) - 1 : ['a', 'b', 'c', 'd'].indexOf(key)
      if (choice >= 0 && choice < q.options.length) {
        event.preventDefault()
        dispatch({ type: 'pick', choice })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, dispatch, q])

  const face = !answered ? 'biru-1' : correct ? 'merah-1' : 'coklat-4'

  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, y: 28, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative rounded-[2rem] border-4 border-white/30 bg-cream-50 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-8 -top-1.5 h-3 rounded-b-full"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-sm font-semibold tracking-widest text-ink-600 uppercase">
            Soal {index + 1} dari {total}
          </p>
          <h2 className="mt-2 font-heading text-2xl leading-snug font-semibold text-navy-900 sm:text-3xl">{q.q}</h2>
        </div>
        <img
          src={mascot(face)}
          alt=""
          width="110"
          height="110"
          className="-mt-14 hidden w-24 shrink-0 drop-shadow-xl transition-all duration-300 sm:block sm:-mr-2"
        />
      </div>

      <div role="group" aria-label="Pilihan jawaban" className="mt-6 grid gap-3 sm:grid-cols-2">
        {q.options.map((text, i) => {
          let s = 'idle'
          if (answered) s = i === q.answer ? 'correct' : i === picked ? 'wrong' : 'dim'
          return (
            <OptionButton
              key={text}
              letter={i}
              text={text}
              state={s}
              disabled={answered}
              refCb={(node) => {
                optionRefs.current[i] = node
              }}
              onPick={() => dispatch({ type: 'pick', choice: i })}
            />
          )
        })}
      </div>
      <p className="mt-4 hidden text-xs text-ink-600 sm:block">Tip: tekan 1 sampai 4 (atau A sampai D) di keyboard untuk menjawab.</p>

      {/* feedback — announced to screen readers */}
      <div role="status" aria-live="polite" className="mt-5 min-h-0">
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border-2 p-4 ${
              correct ? 'border-mint-400 bg-mint-400/10' : 'border-coral-400 bg-coral-400/10'
            }`}
          >
            <p className="font-heading text-lg font-bold text-navy-900">
              {correct ? 'Hore, jawabanmu benar!' : `Belum tepat. Jawaban yang benar: ${q.options[q.answer]}`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-600 sm:text-base">{q.explain}</p>
          </motion.div>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          ref={nextRef}
          type="button"
          disabled={!answered}
          onClick={() => dispatch({ type: 'next' })}
          icon={ArrowRight}
          className="disabled:cursor-not-allowed disabled:opacity-45"
        >
          {index === total - 1 ? 'Lihat Hasil' : 'Soal Berikutnya'}
        </Button>
      </div>
    </motion.div>
  )
}

const RESULT_COPY = [
  { title: 'Petualangan baru dimulai!', text: 'Tidak apa-apa belum ada yang benar. Coba lagi, pasti ada banyak hal seru untuk ditemukan.' },
  { title: 'Awal yang bagus!', text: 'Kamu sudah mengumpulkan satu bintang. Main lagi untuk mengumpulkan lebih banyak.' },
  { title: 'Keren, penjelajah!', text: 'Sebagian besar jawabanmu tepat. Sedikit lagi menuju tiga bintang.' },
  { title: 'Luar biasa, kamu hebat!', text: 'Hampir semua jawabanmu tepat. Kamu pantas mendapat bintang penuh.' },
]

function Result({ state, dispatch, accent }) {
  const { round, answers } = state
  const total = round.questions.length
  const score = answers.filter((a) => a.correct).length
  const stars = starsFor(score, total)
  const copy = RESULT_COPY[stars]
  const missed = answers.filter((a) => !a.correct)
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative rounded-[2rem] border-4 border-white/30 bg-cream-50 px-5 pb-8 pt-10 text-center shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:px-10"
    >
      <div aria-hidden="true" className="absolute inset-x-8 -top-1.5 h-3 rounded-b-full" style={{ background: accent }} />

      <div className="flex items-end justify-center gap-3" role="img" aria-label={`${stars} dari 3 bintang`}>
        {[0, 1, 2].map((i) => (
          <motion.img
            key={i}
            src={mascot('bintang-emas-besar')}
            alt=""
            width="120"
            height="120"
            initial={{ scale: 0, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.18, type: 'spring', stiffness: 260, damping: 14 }}
            className={`w-20 sm:w-28 ${i === 1 ? '-translate-y-3' : ''} ${i < stars ? 'drop-shadow-xl' : 'opacity-25 grayscale'}`}
          />
        ))}
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-heading text-3xl font-bold text-navy-900 outline-none sm:text-4xl">
        {copy.title}
      </h2>
      <p className="mt-2 font-heading text-6xl font-bold sm:text-7xl" style={{ color: '#101a3f' }}>
        {score}
        <span className="text-3xl text-ink-600 sm:text-4xl"> / {total}</span>
      </p>
      <p className="mx-auto mt-2 max-w-md text-ink-600">{copy.text}</p>

      <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button type="button" onClick={() => dispatch({ type: 'restart' })} icon={RotateCcw}>
          Main Lagi
        </Button>
        <Link
          to="/quiz"
          state={{ scrollTo: 'kategori' }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-navy-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lavender-400"
        >
          Pilih Planet Lain
        </Link>
        <Link
          to="/ilmu"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-lavender-100 px-6 py-3 font-heading text-base font-semibold text-navy-900 transition-colors hover:bg-lavender-400/40 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lavender-400"
        >
          Baca Materi Ilmu
        </Link>
      </div>

      {missed.length > 0 && (
        <div className="mt-9 rounded-2xl bg-lavender-100/70 p-4 text-left sm:p-5">
          <h3 className="font-heading text-lg font-semibold text-navy-900">Yuk, ulangi yang tadi belum tepat</h3>
          <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
            {missed.map(({ question }) => (
              <li key={question.id} className="text-sm leading-relaxed text-ink-900 sm:text-base">
                <span className="font-semibold">{question.q}</span>
                <br />
                <span className="text-ink-600">
                  Jawabannya: <strong className="text-navy-900">{question.options[question.answer]}</strong>. {question.explain}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-ink-600">Skor ini hanya tampil di layar dan tidak disimpan.</p>
    </motion.div>
  )
}

/**
 * The playable quiz for one category: question → feedback → next → result.
 * Local state only (useReducer). Nothing is persisted or sent anywhere.
 */
function QuizPlayer({ categoryId }) {
  const [state, dispatch] = useReducer(reducer, categoryId, init)
  const { round, index, picked, answers, done } = state
  const rootRef = useRef(null)
  const accent = round.category.accent
  const total = round.questions.length
  const score = answers.filter((a) => a.correct).length

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])
  useEffect(scrollTop, [scrollTop, state.attempt])

  return (
    <section
      ref={rootRef}
      className="fx-scope relative isolate min-h-[calc(100svh-var(--nav-h))] overflow-hidden bg-[#1b2690] pb-16 pt-6 text-white sm:pt-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${NEBULA.video}")` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/45" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[3%] top-[26%] w-12 sm:w-20">
          <Sprite name="ringedSm" className="bob" style={{ '--bob-rot': '5deg', '--bob-dur': '10s' }} />
        </div>
        <div className="absolute left-[5%] top-[40%] hidden w-14 md:block">
          <Sprite name="moon" className="bob" style={{ '--bob-rot': '-5deg', '--bob-dur': '12s' }} />
        </div>
        <div className="absolute bottom-[8%] right-[8%] hidden w-6 md:block">
          <Sprite name="star1" className="hero-twinkle" />
        </div>
      </div>

      <Container className="max-w-3xl!">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/quiz"
            state={{ scrollTo: 'kategori' }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Peta Petualangan
          </Link>
          <p className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading text-sm font-semibold text-navy-950" style={{ background: accent }}>
            {round.category.label}
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-sm font-bold" aria-label={`${score} jawaban benar`}>
            <Star size={16} className="fill-yellow-400 text-yellow-400" aria-hidden="true" /> {score}
          </p>
        </div>

        {!done && (
          <div className="mt-10">
            <ProgressRail index={index} total={total} answered={picked !== null} accent={accent} />
          </div>
        )}

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {done ? (
              <Result key={`result-${state.attempt}`} state={state} dispatch={dispatch} accent={accent} />
            ) : (
              <Question key={`${state.attempt}-${index}`} state={state} dispatch={dispatch} accent={accent} />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

export default QuizPlayer
