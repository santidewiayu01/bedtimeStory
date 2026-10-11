import { useEffect, useRef } from 'react'

/**
 * Light pointer tilt (mouse only — touch and keyboard users get a still card).
 * Writes two CSS variables in a rAF; no React state, so hovering never re-renders.
 */
function TiltCard({ as: Tag = 'div', max = 7, className = '', children, ...props }) {
  const ref = useRef(null)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const set = (rx, ry) => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty('--rx', `${rx}deg`)
      ref.current?.style.setProperty('--ry', `${ry}deg`)
    })
  }

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    set((-py * max).toFixed(2), (px * max).toFixed(2))
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => set(0, 0)}
      className={`transition-transform duration-200 ease-out will-change-transform [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default TiltCard
