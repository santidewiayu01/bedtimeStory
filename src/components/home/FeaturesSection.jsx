import { motion } from 'framer-motion'
import { features } from '../../data/features'
import Container from '../ui/Container'
import FeatureCard from '../ui/FeatureCard'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * "Kenapa MiniLemon?" benefits section — four value props on a dark
 * navy/galaxy backdrop, sitting between VideoSection and whatever
 * comes next. Follows the same -mt-6 + rounded-t overlap trick as
 * the sections above it so each section tucks under the previous
 * one instead of showing a hard seam.
 *
 * No final illustration assets exist yet for this section, so it's
 * built entirely from lucide-react icons + color tokens — nothing
 * here depends on Modeling & Animation deliverables.
 */
function FeaturesSection() {
  return (
    <section className="relative -mt-6 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-navy-900 via-navy-950 to-purple-950 py-12 sm:py-16">
      {/* subtle galaxy glow — decorative only, no image assets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,124,246,0.18),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(255,201,60,0.12),transparent_50%)]"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-[220px] shrink-0 snap-start sm:w-auto"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                tone={feature.tone}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default FeaturesSection
