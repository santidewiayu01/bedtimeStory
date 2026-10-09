import { FlaskConical, SearchX } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import IlmuCategoryFilter from '../components/ilmu/IlmuCategoryFilter'
import IlmuDetail from '../components/ilmu/IlmuDetail'
import IlmuFeatured from '../components/ilmu/IlmuFeatured'
import IlmuMaterialCard from '../components/ilmu/IlmuMaterialCard'
import IlmuSearchBar from '../components/ilmu/IlmuSearchBar'
import {
  ALL_CATEGORY,
  featuredMaterials,
  filterMaterials,
  getCategory,
  getMaterial,
  ilmuMaterials,
} from '../data/ilmu'

/**
 * Pusat belajar /ilmu.
 * - Pencarian & kategori disimpan di state React.
 * - Materi yang dibuka disimpan di URL (?materi=id) supaya tombol Back browser
 *   bekerja dan tautan detail bisa dibagikan; route lain tidak tersentuh.
 */
function IlmuPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORY)

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const selected = getMaterial(searchParams.get('materi'))

  const openMaterial = useCallback(
    (id) => setSearchParams({ materi: id }),
    [setSearchParams],
  )
  const closeMaterial = useCallback(() => {
    // 'default' = halaman dibuka langsung (tanpa riwayat di dalam aplikasi).
    if (location.key !== 'default') navigate(-1)
    else setSearchParams({}, { replace: true })
  }, [location.key, navigate, setSearchParams])

  // Mulai dari atas setiap kali berpindah antara daftar dan detail.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selected?.id])

  const results = useMemo(
    () => filterMaterials(ilmuMaterials, { query, category }),
    [query, category],
  )

  const isFiltering = query.trim() !== '' || category !== ALL_CATEGORY
  const resetFilters = () => {
    setQuery('')
    setCategory(ALL_CATEGORY)
  }

  if (selected) {
    return <IlmuDetail material={selected} onBack={closeMaterial} onOpen={openMaterial} />
  }

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#1b2690] bg-cover bg-center py-12 text-white sm:py-16"
        style={{ backgroundImage: 'url("/assets/backgrounds/ilmu-cosmic.jpg")' }}
      >
        <Container className="flex flex-col items-center gap-4 text-center">
          <Badge>
            <FlaskConical size={16} aria-hidden="true" />
            Ilmu Pengetahuan
          </Badge>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            Pusat belajar si kecil
          </h1>
          <p className="max-w-xl text-sm text-white/80 sm:text-base">
            Cari tahu tentang planet, hewan, alam, dan tubuhmu lewat bacaan singkat yang seru.
          </p>
          <div className="mt-2 flex w-full justify-center">
            <IlmuSearchBar value={query} onChange={setQuery} />
          </div>
        </Container>
      </section>

      <section className="bg-cream-50 py-10 sm:py-14">
        <Container>
          {!isFiltering ? <IlmuFeatured items={featuredMaterials} onOpen={openMaterial} /> : null}

          <div className="mb-6 flex flex-col gap-4">
            <h2 className="font-heading text-2xl font-semibold text-ink-900">
              {isFiltering ? 'Hasil pencarian' : 'Semua Materi'}
            </h2>
            <IlmuCategoryFilter value={category} onChange={setCategory} />
            <p role="status" aria-live="polite" className="text-sm font-medium text-ink-600">
              {results.length > 0
                ? `Menampilkan ${results.length} materi${
                    category !== ALL_CATEGORY ? ` kategori ${getCategory(category)?.label}` : ''
                  }`
                : 'Tidak ada materi yang cocok'}
            </p>
          </div>

          {results.length > 0 ? (
            <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((material) => (
                <li key={material.id} className="m-0">
                  <IlmuMaterialCard material={material} onOpen={openMaterial} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-lavender-100 px-6 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy-900">
                <SearchX size={26} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-navy-900">
                Materi belum ditemukan
              </h3>
              <p className="max-w-sm text-sm text-ink-600">
                Coba kata lain, misalnya &quot;planet&quot;, &quot;penyu&quot;, atau &quot;hujan&quot;.
              </p>
              <Button onClick={resetFilters} className="mt-2">
                Tampilkan semua materi
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default IlmuPage
