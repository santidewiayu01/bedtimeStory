import { Construction } from 'lucide-react'
import Container from '../components/ui/Container'

/**
 * Placeholder page for routes whose content hasn't been scoped yet.
 * Pass a page title; content implementation comes in a later stage.
 */
function ComingSoonPage({ title }) {
  return (
    <section className="flex min-h-[60vh] items-center bg-cream-50 py-20">
      <Container className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender-100 text-navy-900">
          <Construction size={26} />
        </span>
        <h1 className="font-heading text-2xl font-semibold text-ink-900 sm:text-3xl">
          Halaman {title} - Coming Soon
        </h1>
        <p className="max-w-sm text-sm text-ink-600 sm:text-base">
          Halaman ini masih dalam pengembangan. Yuk kembali lagi nanti!
        </p>
      </Container>
    </section>
  )
}

export default ComingSoonPage
