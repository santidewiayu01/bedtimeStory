import CeritaSection from '../components/home/CeritaSection'
import FeaturesSection from '../components/home/FeaturesSection'
import ImmersiveHero from '../components/immersive/ImmersiveHero'
import PortalTeaser from '../components/immersive/PortalTeaser'
import ScienceSection from '../components/home/ScienceSection'
import ScrollScene from '../components/immersive/ScrollScene'
import VideoSection from '../components/home/VideoSection'
import { usePageSceneSnap } from '../components/immersive/sceneSnap'
import { CERITA_DECOR, FEATURES_DECOR, SCIENCE_DECOR, VIDEO_DECOR } from '../data/sceneDecor'

/**
 * One continuous 2.5D journey: the Hero (its own camera, see
 * ImmersiveHero) hands over to the sections below, each wrapped in a
 * ScrollScene that gives it the same depth language (rise-from-depth +
 * parallax sprites + the rocket's flight). The sections themselves are
 * unchanged. usePageSceneSnap() glides between scene rest points in 0.7s.
 */
function Home() {
  usePageSceneSnap()

  return (
    <>
      {/* isolate: keeps the Hero's z-10 overlay inside its own stacking context so the
          portal (and later Bedtime Stories' rounded top) can overlap its bottom edge. */}
      <div className="relative isolate">
        <ImmersiveHero />
      </div>

      <PortalTeaser />

      <ScrollScene far decor={CERITA_DECOR}>
        <CeritaSection />
      </ScrollScene>
      <ScrollScene decor={SCIENCE_DECOR}>
        <ScienceSection />
      </ScrollScene>
      <ScrollScene decor={VIDEO_DECOR}>
        <VideoSection />
      </ScrollScene>
      <ScrollScene decor={FEATURES_DECOR}>
        <FeaturesSection />
      </ScrollScene>
    </>
  )
}

export default Home
