import { BookX } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CeritaReader from '../components/cerita/CeritaReader'
import Container from '../components/ui/Container'
import { getStory } from '../data/cerita'

/**
 * Route /cerita/:id. Cerita yang tidak ada ditangani dengan pesan ramah
 * (bukan layar kosong) dan tombol kembali ke perpustakaan.
 */
function CeritaDetailPage() {
  const { id } = useParams()
  const story = getStory(id)

  if (!story) {
    return (
      <section className="flex min-h-[60vh] items-center bg-cream-50 py-20">
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender-100 text-navy-900">
            <BookX size={26} aria-hidden="true" />
          </span>
          <h1 className="font-heading text-2xl font-semibold text-ink-900 sm:text-3xl">
            Cerita tidak ditemukan
          </h1>
          <p className="max-w-sm text-sm text-ink-600 sm:text-base">
            Sepertinya cerita ini sudah pindah atau alamatnya keliru. Yuk pilih cerita lain!
          </p>
          <Link
            to="/cerita"
            className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-yellow-400 px-6 py-3 font-heading text-base font-semibold text-navy-950 shadow-[var(--shadow-button)] transition-colors hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400"
          >
            Lihat semua cerita
          </Link>
        </Container>
      </section>
    )
  }

  // key = id: pembaca dibuat ulang tiap ganti cerita, jadi posisi baca kembali ke awal.
  return <CeritaReader key={story.id} story={story} />
}

export default CeritaDetailPage
