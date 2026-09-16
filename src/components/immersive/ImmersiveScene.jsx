import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import HeroCamera from './HeroCamera'
import { usePrefersReducedMotion } from './HeroScrollController'
import WorldPlaceholder from './WorldPlaceholder'

/**
 * Tracks a simple two-tier "quality" level from viewport width:
 * - "high" on desktop/tablet — full object count, antialiasing on.
 * - "low" on small/mobile screens — fewer objects, no antialiasing,
 *   capped pixel ratio. Keeps mobile scrolling smooth per the
 *   "mobile harus tetap ringan" requirement.
 */
function useSceneQuality() {
  const [quality, setQuality] = useState('high')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const update = () => setQuality(mediaQuery.matches ? 'low' : 'high')
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return quality
}

/**
 * The 3D canvas. Fills its parent EXACTLY — the sticky, 100vh box
 * rendered by ImmersiveHero.jsx — via `absolute inset-0`, not `fixed`.
 * That's a deliberate change from the old architecture: this scene no
 * longer spans the whole document, so it should never escape its
 * sticky container. It's purely decorative (aria-hidden,
 * pointer-events disabled) — all real navigation/interaction stays in
 * the HTML/React UI.
 *
 * Rendered once from ImmersiveHero.jsx, which supplies `progressRef`
 * (Hero-local scroll progress — see HeroScrollController.jsx).
 */
function ImmersiveScene({ progressRef }) {
  const quality = useSceneQuality()
  const isLow = quality === 'low'
  const dpr = isLow ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  const reducedMotion = usePrefersReducedMotion()

  // How much of the full camera journey actually plays: full on
  // desktop/tablet, shortened on small screens ("camera movement lebih
  // pendek" per the mobile requirements), and cut way down — but not
  // to zero, so the world doesn't feel frozen — when the user has
  // asked for reduced motion.
  const motionScale = reducedMotion ? 0.15 : isLow ? 0.65 : 1

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={dpr}
        gl={{ antialias: !isLow, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 3.6, 11], fov: 55, near: 0.1, far: 90 }}
      >
        <color attach="background" args={['#0a0f2b']} />
        <fog attach="fog" args={['#0a0f2b', 12, 40]} />

        <ambientLight intensity={0.55} color="#8b7cf6" />
        <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffe27a" />
        <pointLight position={[-6, 3, -6]} intensity={0.6} color="#34c78e" />

        <Suspense fallback={null}>
          <WorldPlaceholder quality={quality} />
        </Suspense>

        <HeroCamera progressRef={progressRef} motionScale={motionScale} />
      </Canvas>
    </div>
  )
}

export default ImmersiveScene
