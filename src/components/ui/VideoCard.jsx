import { motion } from 'framer-motion'
import { Clock, Play, VideoOff } from 'lucide-react'
import AssetPlaceholder from './AssetPlaceholder'

/**
 * Thumbnail is the video's original cover (`video.thumbnail`); the
 * placeholder only renders if a video has none. Badges, play button,
 * and text layout are unchanged.
 *
 * `variant="featured"` renders the larger hero video card (bigger
 * play button, category pill, title + CTA row). `variant="default"`
 * (the default) renders the compact card — sized for a horizontal
 * scroll strip on mobile/tablet and a fluid 2-column grid on desktop
 * (`lg:w-full` lets the parent grid cell control its width there).
 */
function VideoCard({ video, variant = 'default', onSelect, unavailable = false }) {
  const { title, duration, category, thumbnail } = video
  const isFeatured = variant === 'featured'

  // Halaman Video: kartu bisa diklik (seluruh kartu + judul) untuk membuka pemutar.
  // Beranda tidak memakai varian ini, jadi tampilannya tidak berubah.
  if (variant === 'grid') {
    return (
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral-400"
      >
        <div className="relative">
          {thumbnail ? (
            <div className="aspect-video w-full overflow-hidden bg-lavender-100">
              <img
                src={thumbnail}
                alt=""
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                draggable="false"
                className={`h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105 ${
                  unavailable ? 'saturate-75' : ''
                }`}
              />
            </div>
          ) : (
            <AssetPlaceholder
              label="Thumbnail video"
              ratio="16 / 9"
              tone="light"
              rounded="rounded-none"
              className="w-full border-x-0 border-t-0"
            />
          )}

          {category ? (
            <span className="absolute left-2.5 top-2.5 rounded-[var(--radius-pill)] bg-coral-400 px-2.5 py-1 text-xs font-semibold text-white">
              {category}
            </span>
          ) : null}

          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-navy-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            <Clock size={11} />
            {duration}
          </span>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-coral-400 shadow-md">
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start gap-2 p-4">
          <h3 className="font-heading text-base font-semibold leading-snug text-ink-900">
            <button
              type="button"
              onClick={() => onSelect?.(video)}
              className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:content-['']"
            >
              {title}
              <span className="sr-only">
                {unavailable ? ' (video belum tersedia)' : ' (buka pemutar video)'}
              </span>
            </button>
          </h3>
          {unavailable ? (
            <span className="mt-auto inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-lavender-100 px-3 py-1 text-xs font-semibold text-navy-900">
              <VideoOff size={13} />
              Video belum tersedia
            </span>
          ) : (
            <span className="mt-auto text-sm font-semibold text-coral-400">Tonton</span>
          )}
        </div>
      </motion.article>
    )
  }

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
        {thumbnail ? (
          <div className="aspect-video w-full overflow-hidden bg-lavender-100">
            <img
              src={thumbnail}
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              draggable="false"
              className="h-full w-full select-none object-cover"
            />
          </div>
        ) : (
          <AssetPlaceholder
            label={isFeatured ? 'Thumbnail video utama' : 'Thumbnail video'}
            ratio="16 / 9"
            tone="light"
            rounded="rounded-none"
            className="w-full border-x-0 border-t-0"
          />
        )}

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
