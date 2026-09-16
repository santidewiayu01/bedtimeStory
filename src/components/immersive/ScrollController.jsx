import { createContext, useContext, useEffect, useRef } from 'react'

/**
 * Drives the immersive scene from native page scroll.
 *
 * Design notes:
 * - We deliberately do NOT hijack scroll (no preventDefault, no fixed
 *   "scroll sections", no snap-scrolling). The page scrolls exactly
 *   like a normal website; we only *read* scroll position.
 * - Progress is stored in a mutable ref instead of React state, so
 *   the 3D camera (which reads it every animation frame via
 *   useFrame) never causes a React re-render on scroll. Scroll
 *   listeners are rAF-throttled to stay cheap.
 * - `stops` are measured from the real DOM position of each section
 *   (via refs passed in from Home.jsx), so the camera arrives at the
 *   right keyframe exactly when that section reaches the viewport —
 *   this stays correct even if section heights change later.
 */

const ScrollContext = createContext(null)

const DEFAULT_STOPS = { hero: 0, story: 0.25, science: 0.55, video: 0.8, learning: 1 }

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function ScrollProvider({ trackRef, sectionRefs, children }) {
  const stateRef = useRef({ progress: 0, stops: { ...DEFAULT_STOPS } })

  useEffect(() => {
    let rafId = null

    const measureStops = () => {
      const track = trackRef.current
      if (!track) return

      const trackRect = track.getBoundingClientRect()
      const trackTop = trackRect.top + window.scrollY
      const scrollable = Math.max(trackRect.height - window.innerHeight, 1)

      const nextStops = { hero: 0, learning: 1 }
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        const el = ref.current
        if (!el) return
        const elTop = el.getBoundingClientRect().top + window.scrollY
        nextStops[key] = clamp((elTop - trackTop) / scrollable, 0, 1)
      })

      stateRef.current.stops = { ...stateRef.current.stops, ...nextStops }
    }

    const updateProgress = () => {
      rafId = null
      const track = trackRef.current
      if (!track) return

      const trackRect = track.getBoundingClientRect()
      const trackTop = trackRect.top + window.scrollY
      const scrollable = Math.max(trackRect.height - window.innerHeight, 1)
      const raw = (window.scrollY - trackTop) / scrollable

      stateRef.current.progress = clamp(raw, 0, 1)
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updateProgress)
    }

    const onResize = () => {
      measureStops()
      updateProgress()
    }

    measureStops()
    updateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ScrollContext.Provider value={stateRef}>
      {children}
    </ScrollContext.Provider>
  )
}

/**
 * Returns the mutable progress ref: { current: { progress, stops } }.
 * Read `.current` inside useFrame — do not destructure at render time,
 * that would defeat the point of avoiding re-renders.
 */
export function useScrollProgressRef() {
  const ctx = useContext(ScrollContext)
  if (!ctx) {
    throw new Error('useScrollProgressRef must be used within a ScrollProvider')
  }
  return ctx
}
