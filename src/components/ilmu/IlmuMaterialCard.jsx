import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { getCategory } from '../../data/ilmu'

/**
 * Kartu materi: gambar, kategori, judul, ringkasan, dan tombol "Pelajari".
 * Tombol Pelajari diperluas (after:inset-0) sehingga seluruh kartu bisa diklik,
 * tetapi hanya ada satu tombol untuk keyboard dan pembaca layar.
 * Jangan beri transform/filter pada tombol itu: elemen ter-transform menjadi acuan
 * posisi after:inset-0 dan area klik akan menyusut.
 */
function IlmuMaterialCard({ material, onOpen }) {
  const { title, summary, image, readMinutes, category } = material
  const cat = getCategory(category)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral-400"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-lavender-100">
        <img
          src={image}
          alt=""
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold ${cat?.pill}`}
        >
          {cat?.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-ink-900">{title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-600">{summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-600">
            <Clock size={13} aria-hidden="true" />
            {readMinutes} menit baca
          </span>
          <button
            type="button"
            onClick={() => onOpen(material.id)}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-mint-400 px-4 py-2 font-heading text-sm font-semibold text-navy-950 shadow-sm outline-none transition-shadow after:absolute after:inset-0 after:content-[''] group-hover:shadow-md"
          >
            Pelajari
            <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only">: {title}</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default IlmuMaterialCard
