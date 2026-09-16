import { Video } from 'lucide-react'
import Container from '../ui/Container'

// Lightweight stand-in for the sections that still come after Ilmu
// Pengetahuan (Video Pengetahuan, ...).
// Intentionally NOT fully built out yet — this only shows the page
// flow so the layout reads as a real homepage. Replace this card
// with the real section component when that stage is scoped.
const upcoming = [
  {
    icon: Video,
    title: 'Video Pengetahuan',
    desc: 'Tonton video menarik dan belajar dengan cara seru.',
  },
]

function UpcomingSections() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl">
            Segera hadir
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-600 sm:text-base">
            Section berikut sedang dalam tahap pengembangan berikutnya.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-xs gap-5">
          {upcoming.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-[var(--radius-card)] border border-ink-900/5 bg-white p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 text-navy-900">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-ink-900">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-600">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default UpcomingSections
