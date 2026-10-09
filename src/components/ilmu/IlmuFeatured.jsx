import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { getCategory } from '../../data/ilmu'
import Button from '../ui/Button'

/**
 * Bagian "Materi Unggulan": satu kartu besar (cosmic) + kartu kecil di sebelahnya.
 * Menerima daftar materi; yang pertama menjadi kartu besar.
 */
function IlmuFeatured({ items, onOpen }) {
  if (items.length === 0) return null
  const [main, ...side] = items
  const mainCat = getCategory(main.category)

  return (
    <section aria-labelledby="ilmu-featured-title" className="mb-12">
      <h2 id="ilmu-featured-title" className="mb-5 font-heading text-2xl font-semibold text-ink-900">
        Materi Unggulan
      </h2>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <motion.article
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-[#1b2690] bg-cover bg-center text-white shadow-[var(--shadow-soft)]"
          style={{ backgroundImage: 'url("/assets/backgrounds/ilmu-cosmic.jpg")' }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-navy-950/10" />
          <div className="grid items-center gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] sm:p-8">
            <div className="flex flex-col items-start gap-3">
              <span
                className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${mainCat?.pill}`}
              >
                {mainCat?.label}
              </span>
              <h3 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                {main.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">{main.summary}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80">
                <Clock size={13} aria-hidden="true" />
                {main.readMinutes} menit baca
              </span>
              <Button
                icon={ArrowRight}
                onClick={() => onOpen(main.id)}
                aria-label={`Pelajari: ${main.title}`}
                className="mt-1"
              >
                Pelajari
              </Button>
            </div>
            <img
              src={main.image}
              alt=""
              width={1254}
              height={1254}
              decoding="async"
              draggable="false"
              className="mx-auto aspect-square w-full max-w-[16rem] select-none rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-soft)] sm:max-w-none"
            />
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
                <img
                  src={item.image}
                  alt=""
                  width={1254}
                  height={1254}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="aspect-square w-24 shrink-0 select-none rounded-2xl object-cover sm:w-28"
                />
                <div className="flex min-w-0 flex-col items-start gap-1.5">
                  <span
                    className={`rounded-[var(--radius-pill)] px-2 py-0.5 text-[11px] font-semibold ${cat?.pill}`}
                  >
                    {cat?.label}
                  </span>
                  <h3 className="font-heading text-base font-semibold leading-snug text-ink-900">
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onOpen(item.id)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-coral-400 outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    Pelajari
                    <ArrowRight size={14} aria-hidden="true" />
                    <span className="sr-only">: {item.title}</span>
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default IlmuFeatured
