import { Search, X } from 'lucide-react'

/** Kotak pencarian cerita. Terkontrol dari luar (value + onChange). */
function CeritaSearchBar({ value, onChange }) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full max-w-xl"
    >
      <label htmlFor="cerita-search" className="sr-only">
        Cari cerita
      </label>
      <Search
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-600"
      />
      <input
        id="cerita-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari cerita, misalnya semut atau Nabi"
        autoComplete="off"
        className="h-12 w-full rounded-[var(--radius-pill)] border-2 border-transparent bg-white pl-12 pr-12 text-sm font-medium text-ink-900 shadow-[var(--shadow-soft)] outline-none transition-colors placeholder:text-ink-600/70 focus:border-yellow-400 sm:text-base [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Hapus pencarian"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-lavender-100 text-navy-900 transition-colors hover:bg-lavender-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400"
        >
          <X size={16} />
        </button>
      ) : null}
    </form>
  )
}

export default CeritaSearchBar
