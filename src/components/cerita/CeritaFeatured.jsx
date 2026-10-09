import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategory } from '../../data/cerita'
import StoryCover from './StoryCover'

const GALAXY = '/assets/backgrounds/cerita-galaxy.jpg'

/**
 * Bagian "Cerita Unggulan": satu kartu besar (galaksi) + kartu kecil di sebelahnya.
 * Cerita pertama pada `items` menjadi kartu besar. Judul = tautan yang diperluas
 * sehingga seluruh kartu bisa diklik.
 */
function CeritaFeatured({ items, listSearch = '' }) {
  if (items.length === 0) return null
  const [main, ...side] = items
  const mainCat = getCategory(main.category)

  return (
    <section aria-labelledby="cerita-featured-title" className="mb-12">
      <h2
        id="cerita-featured-title"
        className="mb-5 font-heading text-2xl font-semibold text-ink-900"
      >
        Cerita Unggulan
      </h2>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <motion.article
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="group relative isolate overflow-hidden rounded-[var(--radius-card)] bg-purple-950 bg-cover bg-center text-white shadow-[var(--shadow-soft)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral-400"
          style={{ backgroundImage: `url("${GALAXY}")` }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-950/90 via-purple-950/65 to-purple-950/15" />
          <div className="grid items-center gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] sm:p-8">
            <div className="flex flex-col items-start gap-3">
              <span
                className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${mainCat?.pill}`}
              >
                {mainCat?.label}
              </span>
              <h3 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                <Link
                  to={`/cerita/${main.id}`}
                  state={{ listSearch }}
                  className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                  {main.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">{main.summary}</p>
              <ul className="flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0 text-xs font-semibold text-white/85">
                <li className="inline-flex items-center gap-1">
                  <Users size={13} aria-hidden="true" />
                  <span className="sr-only">Usia: </span>
                  {main.ageRange}
                </li>
                <li className="inline-flex items-center gap-1">
                  <Clock size={13} aria-hidden="true" />
                  <span className="sr-only">Durasi baca: </span>
                  {main.duration}
                </li>
                <li className="inline-flex items-center gap-1">
                  <Sparkles size={13} aria-hidden="true" />
                  Nilai: {main.value}
                </li>
              </ul>
              <span
                aria-hidden="true"
                className="mt-1 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-yellow-400 px-6 py-3 font-heading text-base font-semibold text-navy-950 shadow-[var(--shadow-button)] transition-colors group-hover:bg-yellow-300"
              >
                Baca Cerita
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </div>
            <div className="mx-auto aspect-square w-full max-w-[16rem] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] sm:max-w-none">
              <StoryCover story={main} />
            </div>
          </div>
        </motion.article>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {side.map((item) => {
            const cat = getCategory(item.category)
            return (
              <motion.article
                key={item.id}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative flex items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral-400"
              >
                <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-2xl sm:w-28">
                  <StoryCover story={item} />
                </div>
                <div className="flex min-w-0 flex-col items-start gap-1.5">
                  <span
                    className={`rounded-[var(--radius-pill)] px-2 py-0.5 text-[11px] font-semibold ${cat?.pill}`}
                  >
                    {cat?.label}
                  </span>
                  <h3 className="font-heading text-base font-semibold leading-snug text-ink-900">
                    <Link
                      to={`/cerita/${item.id}`}
                      state={{ listSearch }}
                      className="outline-none after:absolute after:inset-0 after:content-['']"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="inline-flex items-center gap-3 text-xs font-medium text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      <span className="sr-only">Durasi baca: </span>
                      {item.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Sparkles size={12} aria-hidden="true" />
                      {item.value}
                    </span>
                  </p>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-coral-400"
                  >
                    Baca
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CeritaFeatured
