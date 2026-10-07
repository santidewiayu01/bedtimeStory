import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { bedtimeStories, CERITA_BACKGROUND, TEASER_BEDTIME } from '../../data/stories'
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
    <section
      className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-purple-950 bg-cover bg-center py-14 sm:py-16"
      style={{ backgroundImage: `url("${CERITA_BACKGROUND}")` }}
    >
      <Container className="relative">
        {/* minmax(0,1fr) on mobile: without it the single grid column grows to the
            carousel's full scroll width and centred content ends up off-screen. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center lg:gap-8">
          {/* Left: section intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Original "Bedtime Stories" teaser card (title, blurb and arrow are
                part of the artwork). Whole card is the link to all stories. */}
            <h2 className="sr-only">Cerita Bedtime Stories</h2>
            <Link
              to="/cerita"
              aria-label="Lihat semua cerita — Bedtime Stories"
              className="mx-auto block w-full max-w-[17.5rem] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 lg:mx-0"
            >
              <img
                src={TEASER_BEDTIME.src}
                width={TEASER_BEDTIME.width}
                height={TEASER_BEDTIME.height}
                alt=""
                decoding="async"
                draggable="false"
                className="block h-auto w-full select-none drop-shadow-[0_18px_28px_rgba(10,15,43,0.45)]"
              />
            </Link>
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
