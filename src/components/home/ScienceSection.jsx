import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ILMU_BACKGROUND_STYLE } from '../../data/cosmicBackgrounds'
import { SCIENCE_CATEGORY_CARDS } from '../../data/science'
import { TEASER_ILMU } from '../../data/stories'
import Container from '../ui/Container'

function ScienceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // Cosmic backdrop (continues into Video Pengetahuan — see cosmicBackgrounds.js)
      className="bg-[#1b2690] bg-cover bg-center py-14 sm:py-16"
      style={ILMU_BACKGROUND_STYLE}
    >
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-8">
          {/* Left: original teaser card (title, blurb and arrow are part of the artwork) */}
          <div className="text-center lg:text-left">
            <h2 className="sr-only">Ilmu Pengetahuan</h2>
            <Link
              to="/ilmu"
              aria-label="Jelajahi semua — Ilmu Pengetahuan"
              className="mx-auto block w-full max-w-[17.5rem] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-400 lg:mx-0"
            >
              <img
                src={TEASER_ILMU.src}
                width={TEASER_ILMU.width}
                height={TEASER_ILMU.height}
                alt=""
                decoding="async"
                draggable="false"
                className="block h-auto w-full select-none drop-shadow-[0_16px_24px_rgba(10,15,43,0.25)]"
              />
            </Link>
          </div>

          {/* Right: the six category cards (original art) — one row on desktop,
              swipeable strip on tablet/phone */}
          <ul className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {SCIENCE_CATEGORY_CARDS.map((card) => (
              <li key={card.id} className="w-[10.5rem] shrink-0 snap-start sm:w-[12rem] lg:w-auto lg:shrink">
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  <Link
                    to="/ilmu"
                    aria-label={card.label}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-400"
                  >
                    <img
                      src={card.src}
                      width={card.width}
                      height={card.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="block h-auto w-full select-none"
                    />
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </motion.section>
  )
}

export default ScienceSection
