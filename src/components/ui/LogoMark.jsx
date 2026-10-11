import { LOGO } from '../../data/heroAssets'

/**
 * The MiniLemon logo, cropped to its artwork box (the source PNG is a 1600x800
 * canvas with transparent padding) — same technique the Navbar uses, sized by
 * the parent via `className` (set a height, width follows the aspect ratio).
 */
function LogoMark({ className = 'h-24', priority = false }) {
  const { src, width, height, bbox } = LOGO
  return (
    <span className={`relative block overflow-hidden ${className}`} style={{ aspectRatio: `${bbox.w} / ${bbox.h}` }}>
      <img
        src={src}
        alt="MiniLemon — Ilmu Pengetahuan"
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        draggable="false"
        className="absolute max-w-none select-none [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.8))]"
        style={{
          width: `${(width / bbox.w) * 100}%`,
          height: `${(height / bbox.h) * 100}%`,
          left: `${(-bbox.x / bbox.w) * 100}%`,
          top: `${(-bbox.y / bbox.h) * 100}%`,
        }}
      />
    </span>
  )
}

export default LogoMark
