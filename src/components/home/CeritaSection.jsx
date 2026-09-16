import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { bedtimeStories } from '../../data/stories'
import Button from '../ui/Button'
import Container from '../ui/Container'
import StoryCard from '../ui/StoryCard'

function CeritaSection() {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 8)
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 8,
    )
  }

  useEffect(() => {
    updateScrollState()
    const track = trackRef.current
    if (!track) return undefined

    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('article')
    const step = card ? card.offsetWidth + 16 : 270
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-purple-900 via-purple-900 to-purple-950 py-14 sm:py-16">
      {/* Decorative starfield, consistent with the Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 15% 25%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 75% 10%, rgba(255,255,255,0.45), transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(255,255,255,0.4), transparent), radial-gradient(2px 2px at 92% 70%, rgba(255,255,255,0.4), transparent)',
        }}
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-8">
          {/* Left: section intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-yellow-400">
                <Moon size={20} />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Cerita
                </p>
                <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                  Bedtime Stories
                </h2>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-xs text-sm text-white/65 sm:text-base lg:mx-0">
              Cerita sebelum tidur yang seru, penuh nilai kebaikan dan
              inspirasi.
            </p>

            <Button
              variant="primary"
              className="mt-6 px-5 py-2.5 text-sm"
            >
              Lihat Semua Cerita
            </Button>
          </motion.div>

          {/* Right: horizontal story carousel */}
          <div className="relative">
            <div
              ref={trackRef}
              className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
            >
              {bedtimeStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {canScrollLeft && (
              <button
                type="button"
                aria-label="Cerita sebelumnya"
                onClick={() => scrollByCard(-1)}
                className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-md lg:flex"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {canScrollRight && (
              <button
                type="button"
                aria-label="Cerita berikutnya"
                onClick={() => scrollByCard(1)}
                className="absolute right-0 top-1/2 flex h-10 w-10 translate-x-1 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)] sm:translate-x-2 lg:-translate-x-4"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CeritaSection
