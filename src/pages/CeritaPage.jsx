import { BookOpen, SearchX } from 'lucide-react'
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import CeritaCategoryFilter from '../components/cerita/CeritaCategoryFilter'
import CeritaFeatured from '../components/cerita/CeritaFeatured'
import CeritaSearchBar from '../components/cerita/CeritaSearchBar'
import CeritaStoryCard from '../components/cerita/CeritaStoryCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import {
  ALL_CATEGORY,
  ceritaList,
  featuredStories,
  filterStories,
  getCategory,
} from '../data/cerita'

/**
 * Perpustakaan cerita /cerita.
 * Pencarian (?q=) dan kategori (?kategori=) disimpan di URL, sehingga saat
 * pembaca masuk ke detail cerita lalu menekan "Kembali", filternya tetap sama.
 * Detail cerita ada di route sendiri: /cerita/:id (lihat CeritaDetailPage).
 */
function CeritaPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const query = searchParams.get('q') ?? ''
  const rawCategory = searchParams.get('kategori') ?? ALL_CATEGORY
  const category = getCategory(rawCategory) ? rawCategory : ALL_CATEGORY

  const update = (next) => {
    const merged = { q: query, kategori: category, ...next }
    const params = {}
    if (merged.q) params.q = merged.q
    if (merged.kategori !== ALL_CATEGORY) params.kategori = merged.kategori
    setSearchParams(params, { replace: true })
  }

  const results = useMemo(
    () => filterStories(ceritaList, { query, category }),
    [query, category],
  )

  const isFiltering = query.trim() !== '' || category !== ALL_CATEGORY
  const resetFilters = () => setSearchParams({}, { replace: true })

  return (
    <>
      <section
        className="relative overflow-hidden bg-purple-950 bg-cover bg-center py-12 text-white sm:py-16"
        style={{ backgroundImage: 'url("/assets/backgrounds/cerita-galaxy.jpg")' }}
      >
        <div className="absolute inset-0 bg-purple-950/40" />
        <Container className="relative flex flex-col items-center gap-4 text-center">
          <Badge>
            <BookOpen size={16} aria-hidden="true" />
            Bedtime Stories
          </Badge>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            Perpustakaan cerita si kecil
          </h1>
          <p className="max-w-xl text-sm text-white/80 sm:text-base">
            Pilih cerita favoritmu: dongeng, kisah nabi, fabel, dan cerita penuh pesan baik.
          </p>
          <div className="mt-2 flex w-full justify-center">
            <CeritaSearchBar value={query} onChange={(q) => update({ q })} />
          </div>
        </Container>
      </section>

      <section className="bg-cream-50 py-10 sm:py-14">
        <Container>
          {!isFiltering ? (
            <CeritaFeatured items={featuredStories} listSearch={location.search} />
          ) : null}

          <div className="mb-6 flex flex-col gap-4">
            <h2 className="font-heading text-2xl font-semibold text-ink-900">
              {isFiltering ? 'Hasil pencarian' : 'Semua Cerita'}
            </h2>
            <CeritaCategoryFilter value={category} onChange={(kategori) => update({ kategori })} />
            <p role="status" aria-live="polite" className="text-sm font-medium text-ink-600">
              {results.length > 0
                ? `Menampilkan ${results.length} cerita${
                    category !== ALL_CATEGORY ? ` kategori ${getCategory(category)?.label}` : ''
                  }`
                : 'Tidak ada cerita yang cocok'}
            </p>
          </div>

          {results.length > 0 ? (
            <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((story) => (
                <li key={story.id} className="m-0">
                  <CeritaStoryCard story={story} listSearch={location.search} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-lavender-100 px-6 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy-900">
                <SearchX size={26} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-navy-900">
                Cerita belum ditemukan
              </h3>
              <p className="max-w-sm text-sm text-ink-600">
                Coba kata lain, misalnya &quot;semut&quot;, &quot;Nabi&quot;, atau &quot;jujur&quot;.
              </p>
              <Button onClick={resetFilters} className="mt-2">
                Tampilkan semua cerita
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default CeritaPage
