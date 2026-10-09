import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategory } from '../../data/cerita'
import StoryCover from './StoryCover'

/**
 * Kartu cerita: sampul, kategori, judul, usia, durasi baca, dan nilai moral.
 * Judul adalah <Link> yang diperluas (after:inset-0) sehingga seluruh kartu bisa
 * diklik, tetapi hanya ada satu tautan untuk keyboard dan pembaca layar.
 * `listSearch` (query string daftar) dikirim lewat state agar tombol "Kembali"
 * di halaman detail mengembalikan pencarian/filter yang sedang aktif.
 */
function CeritaStoryCard({ story, listSearch = '' }) {
  const { id, title, summary, ageRange, duration, value, category, badge } = story
  const cat = getCategory(category)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral-400"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-lavender-100">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
          <StoryCover story={story} />
        </div>
        <span
          className={`absolute left-3 top-3 rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${cat?.pill}`}
        >
          {cat?.label}
        </span>
        {badge ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-mint-400 px-2.5 py-1 text-xs font-semibold text-white">
            <Sparkles size={12} aria-hidden="true" />
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-ink-900">
          <Link
            to={`/cerita/${id}`}
            state={{ listSearch }}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-600">{summary}</p>

        <div className="mt-auto flex flex-col gap-3 pt-3">
          <ul className="flex list-none flex-wrap items-center gap-x-3 gap-y-1.5 p-0 text-xs font-medium text-ink-600">
            <li className="inline-flex items-center gap-1">
              <Users size={13} aria-hidden="true" />
              <span className="sr-only">Usia: </span>
              {ageRange}
            </li>
            <li className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              <span className="sr-only">Durasi baca: </span>
              {duration}
            </li>
            <li className="inline-flex items-center gap-1">
              <Sparkles size={13} aria-hidden="true" />
              Nilai: {value}
            </li>
          </ul>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 self-start rounded-[var(--radius-pill)] bg-mint-400 px-4 py-2 font-heading text-sm font-semibold text-navy-950 shadow-sm transition-shadow group-hover:shadow-md"
          >
            Baca Cerita
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default CeritaStoryCard
