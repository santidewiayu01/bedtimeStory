import { ceritaCategories } from '../../data/cerita'

/** Chip kategori: Semua, Dongeng, Kisah Nabi, Fabel, Cerita Moral. */
function CeritaCategoryFilter({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter kategori cerita"
      className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
    >
      {ceritaCategories.map(({ id, label, icon: Icon }) => {
        const active = id === value
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2 font-heading text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400 ${
              active
                ? 'bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)]'
                : 'bg-lavender-100 text-navy-900 hover:bg-lavender-400/30'
            }`}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CeritaCategoryFilter
