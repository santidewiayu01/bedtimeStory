import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import AssetPlaceholder from './AssetPlaceholder'

/**
 * Compact square-thumbnail card for the Science ("Ilmu Pengetahuan")
 * grid. Thumbnail is a placeholder — swap <AssetPlaceholder> for a
 * real <img> once final article covers are delivered; the badge,
 * action button, and text layout stay as-is.
 *
 * Layout is a plain flex column (thumbnail -> content -> title ->
 * action row) so the action button sits in normal flow below the
 * title instead of being absolutely positioned over it. `h-full` +
 * `justify-between` on the content area keeps every card in a row
 * the same height and the button pinned to the same spot regardless
 * of whether the title wraps to one or two lines.
 */
function ScienceCard({ article }) {
  const { title, badge } = article

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex h-full w-[150px] shrink-0 snap-start flex-col sm:w-[170px]"
    >
      <div className="relative">
        <AssetPlaceholder
          label="Thumbnail"
          ratio="1 / 1"
          tone="light"
          className="w-full"
        />

        {badge ? (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-mint-400 px-2 py-0.5 text-[11px] font-semibold text-white">
            <Sparkles size={10} />
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 pt-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink-900">
          {title}
        </h3>

        <div className="flex justify-end">
          <button
            type="button"
            aria-label={`Baca artikel ${title}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-400 text-white shadow-sm transition-transform hover:scale-105"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ScienceCard
