import { AnimatePresence, motion } from 'framer-motion'
import {
  Cpu,
  Earth,
  FlaskConical,
  Globe,
  HeartPulse,
  Leaf,
  PawPrint,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { scienceArticles, scienceCategories } from '../../data/science'
import Button from '../ui/Button'
import Container from '../ui/Container'
import ScienceCard from '../ui/ScienceCard'

const CATEGORY_ICONS = {
  Sparkles,
  Globe,
  PawPrint,
  HeartPulse,
  Earth,
  Cpu,
  Leaf,
}

function CategoryPill({ category, active, onClick }) {
  const Icon = CATEGORY_ICONS[category.icon]

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'bg-mint-400 text-white'
          : 'bg-ink-900/5 text-ink-600 hover:bg-ink-900/10'
      }`}
    >
      <Icon size={14} />
      {category.label}
    </button>
  )
}

function ScienceSection() {
  const [activeCategory, setActiveCategory] = useState('semua')

  const filteredArticles =
    activeCategory === 'semua'
      ? scienceArticles
      : scienceArticles.filter((article) => article.category === activeCategory)

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // Solid background — the immersive 3D world is confined to the
      // Hero now, so there's nothing behind this section to reveal.
      className="bg-cream-50 py-14 sm:py-16"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Left: section intro */}
          <div className="text-center lg:text-left">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint-400/15 text-mint-400 lg:mx-0">
              <FlaskConical size={22} />
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              Ilmu Pengetahuan
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink-600 sm:text-base lg:mx-0">
              Artikel seru untuk menambah pengetahuanmu setiap hari.
            </p>
            <Button
              variant="mint"
              className="mt-6 px-5 py-2.5 text-sm"
            >
              Jelajahi Semua
            </Button>
          </div>

          {/* Right: category filter + article carousel */}
          <div>
            <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
              {scienceCategories.map((category) => (
                <CategoryPill
                  key={category.id}
                  category={category}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="scrollbar-none -mx-5 mt-5 flex items-stretch gap-5 overflow-x-auto px-5 pb-2 snap-x snap-mandatory sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:px-0"
              >
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <ScienceCard key={article.id} article={article} />
                  ))
                ) : (
                  <p className="py-6 text-sm text-ink-600">
                    Belum ada artikel untuk kategori ini.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </motion.section>
  )
}

export default ScienceSection
