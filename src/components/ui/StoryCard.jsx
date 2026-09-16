import { Clock, Play, Sparkles, Users } from 'lucide-react'
import AssetPlaceholder from './AssetPlaceholder'

/**
 * Fixed-width card for the horizontal stories carousel.
 * Thumbnail is a placeholder — swap <AssetPlaceholder> for a real
 * <img> once final story covers are delivered, everything else
 * (badge, play button, metadata layout) stays as-is.
 */
function StoryCard({ story }) {
  const { title, badge, ageRange, duration, value } = story

  return (
    <article className="w-[250px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] sm:w-[270px]">
      <div className="relative">
        <AssetPlaceholder
          label="Cover cerita"
          ratio="4 / 3"
          tone="light"
          rounded="rounded-t-[var(--radius-card)]"
          className="border-x-0 border-t-0"
        />

        {badge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-mint-400 px-2.5 py-1 text-xs font-semibold text-white">
            <Sparkles size={12} />
            {badge}
          </span>
        ) : null}

        <button
          type="button"
          aria-label={`Putar cerita ${title}`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-md transition-transform hover:scale-105"
        >
          <Play size={16} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-ink-900">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-600">
          <span className="inline-flex items-center gap-1">
            <Users size={13} />
            {ageRange}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles size={13} />
            Nilai: {value}
          </span>
        </div>
      </div>
    </article>
  )
}

export default StoryCard
