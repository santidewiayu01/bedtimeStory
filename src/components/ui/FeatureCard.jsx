import { motion } from 'framer-motion'

/**
 * Tone -> class map. Kept as static, fully-written class strings (not
 * built with string interpolation) so Tailwind's JIT scanner picks
 * them up — dynamic `bg-${tone}-400` template strings would be
 * invisible to it and get purged from the build.
 */
const TONE_STYLES = {
  lavender: {
    card: 'bg-lavender-400/90',
    icon: 'bg-white/20 text-white',
  },
  yellow: {
    card: 'bg-yellow-500/90',
    icon: 'bg-white/25 text-white',
  },
  mint: {
    card: 'bg-mint-400/90',
    icon: 'bg-white/20 text-white',
  },
  coral: {
    card: 'bg-coral-400/90',
    icon: 'bg-white/20 text-white',
  },
}

/**
 * Single benefit/value card for FeaturesSection. Purely
 * presentational — icon, title, description — with a subtle hover
 * lift. Colors come from the `tone` field on each feature entry so
 * the four cards read as harmonious variations rather than
 * hardcoded one-offs.
 */
function FeatureCard({ icon: Icon, title, desc, tone = 'lavender' }) {
  const styles = TONE_STYLES[tone] ?? TONE_STYLES.lavender

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-5 shadow-lg shadow-navy-950/20 ${styles.card}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles.icon}`}
      >
        <Icon size={22} strokeWidth={2.25} />
      </span>

      <h3 className="font-heading text-base font-bold leading-snug text-white sm:text-lg">
        {title}
      </h3>

      <p className="text-sm leading-snug text-white/85">{desc}</p>
    </motion.div>
  )
}

export default FeatureCard
