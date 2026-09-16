import { motion } from 'framer-motion'
import { Clock, Play } from 'lucide-react'
import AssetPlaceholder from './AssetPlaceholder'

/**
 * Thumbnail is a placeholder — swap <AssetPlaceholder> for a real
 * <img>/<video poster> once final frames are delivered; the badges,
 * play button, and text layout stay as-is.
 *
 * `variant="featured"` renders the larger hero video card (bigger
 * play button, category pill, title + CTA row). `variant="default"`
 * (the default) renders the compact card — sized for a horizontal
 * scroll strip on mobile/tablet and a fluid 2-column grid on desktop
 * (`lg:w-full` lets the parent grid cell control its width there).
 */
function VideoCard({ video, variant = 'default' }) {
  const { title, duration, category } = video
  const isFeatured = variant === 'featured'

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={
        isFeatured
          ? 'group w-full overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)]'
          : 'group w-[150px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-white shadow-sm sm:w-[170px] lg:w-full lg:shrink'
      }
    >
      <div className="relative">
        <AssetPlaceholder
          label={isFeatured ? 'Thumbnail video utama' : 'Thumbnail video'}
          ratio="16 / 9"
          tone="light"
          rounded="rounded-none"
          className="w-full border-x-0 border-t-0"
        />

        {isFeatured && category ? (
          <span className="absolute left-2.5 top-2.5 rounded-[var(--radius-pill)] bg-coral-400 px-2.5 py-1 text-xs font-semibold text-white">
            {category}
          </span>
        ) : null}

        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-navy-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          <Clock size={10} />
          {duration}
        </span>

        {/* Play indicator overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <span
            className={`flex items-center justify-center rounded-full bg-white/90 text-coral-400 shadow-md ${
              isFeatured ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-8 w-8'
            }`}
          >
            <Play
              size={isFeatured ? 18 : 13}
              fill="currentColor"
              className="ml-0.5"
            />
          </span>
        </div>
      </div>

      {isFeatured ? (
        <div className="flex items-center justify-between gap-3 p-3.5">
          <h3 className="line-clamp-1 font-heading text-sm font-semibold leading-snug text-ink-900 sm:text-base">
            {title}
          </h3>
          <span className="shrink-0 text-xs font-semibold text-coral-400 sm:text-sm">
            Tonton
          </span>
        </div>
      ) : (
        <h3 className="line-clamp-2 min-h-[2.1rem] p-2.5 text-xs font-semibold leading-snug text-ink-900 sm:text-sm">
          {title}
        </h3>
      )}
    </motion.article>
  )
}

export default VideoCard
