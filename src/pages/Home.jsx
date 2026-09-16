import { lazy, Suspense } from 'react'
import CeritaSection from '../components/home/CeritaSection'
import FeaturesSection from '../components/home/FeaturesSection'
import ScienceSection from '../components/home/ScienceSection'
import VideoSection from '../components/home/VideoSection'

// Code-split: three.js + @react-three/fiber/drei are a heavy chunk,
// and they're now needed ONLY for the immersive Hero (not the whole
// page anymore) — loading them lazily keeps the initial bundle light.
const ImmersiveHero = lazy(
  () => import('../components/immersive/ImmersiveHero'),
)

/**
 * Solid-color placeholder shown for the brief moment the 3D chunk is
 * still loading. Sized to match ImmersiveHero's own pinned viewport
 * (100vh) so there's no layout jump once it's ready.
 */
function HeroFallback() {
  return (
    <div className="h-screen bg-gradient-to-b from-navy-950 to-purple-950" />
  )
}

/**
 * Homepage structure: the immersive 3D journey is fully contained
 * inside ImmersiveHero (a tall pinned section) — everything after it
 * is plain, ordinary document flow. Story/Science/Video no longer
 * register themselves with any scroll/camera system; they don't know
 * the 3D world exists.
 */
function Home() {
  return (
    <>
      <Suspense fallback={<HeroFallback />}>
        <ImmersiveHero />
      </Suspense>

      <CeritaSection />
      <ScienceSection />
      <VideoSection />
      <FeaturesSection />
    </>
  )
}

export default Home
