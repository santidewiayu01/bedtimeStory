import { ImageIcon } from 'lucide-react'

// Color/opacity combo for each background the placeholder can sit on.
const TONES = {
  dark: 'border-white/25 bg-white/5 text-white/60',
  light: 'border-ink-900/15 bg-lavender-100/60 text-ink-600',
}

/**
 * Stand-in for final art from the Modeling & Animation team.
 *
 * Keep the wrapper's size/position exactly where the final asset
 * should live — when the real illustration is ready, swap the
 * contents of this component (or the <img> that replaces it) without
 * touching any layout code around it.
 *
 * `tone` picks readable placeholder colors for a dark (navy/purple)
 * or light (white card) background. `rounded` lets a caller round
 * only some corners (e.g. a card thumbnail rounded on top only)
 * instead of fighting the default via className overrides.
 */
function AssetPlaceholder({
  label,
  ratio = '1 / 1',
  tone = 'dark',
  rounded = 'rounded-[var(--radius-card)]',
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed text-center ${TONES[tone]} ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      {label ? <span className="px-4 text-xs font-medium">{label}</span> : null}
    </div>
  )
}

export default AssetPlaceholder
