import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const VARIANTS = {
  primary:
    'bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)] hover:bg-yellow-300',
  mint: 'bg-mint-400 text-white shadow-[0_10px_20px_-6px_rgba(52,199,142,0.55)] hover:brightness-105',
  coral:
    'bg-coral-400 text-white shadow-[0_10px_20px_-6px_rgba(255,122,89,0.55)] hover:brightness-105',
  outline:
    'bg-transparent text-white border border-white/25 hover:bg-white/10',
  ghost: 'bg-white/10 text-white hover:bg-white/20',
}

/**
 * Shared pill-shaped button used for every CTA across the site.
 * `as="a"` + `href` renders an anchor instead of a button element.
 * `to` renders a react-router <Link> (client-side navigation, no reload).
 */
function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  const Tag = props.to ? MotionLink : (motion[as] ?? motion.button)

  return (
    <Tag
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 font-heading text-base font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon ? <Icon size={18} strokeWidth={2.5} /> : null}
    </Tag>
  )
}

export default Button
