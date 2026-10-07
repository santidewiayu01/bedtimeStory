import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TEASER_VIDEO } from '../../data/stories'
import { videos } from '../../data/videos'
import Container from '../ui/Container'
import VideoCard from '../ui/VideoCard'

function VideoSection() {
  const [featuredVideo, ...otherVideos] = videos

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // Solid background — the immersive 3D world is confined to the
      // Hero now, so there's nothing behind this section to reveal.
      className="relative -mt-6 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100 py-10 sm:py-12"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(190px,1fr)_minmax(280px,1.7fr)_minmax(280px,1.8fr)] lg:items-center lg:gap-6">
          {/* Left: original teaser card (title, blurb and arrow are part of the artwork) */}
          <div className="text-center lg:text-left">
            <h2 className="sr-only">Video Pengetahuan</h2>
            <Link
              to="/video"
              aria-label="Lihat semua video — Video Pengetahuan"
              className="mx-auto block w-full max-w-[15rem] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-400 lg:mx-0"
            >
              <img
                src={TEASER_VIDEO.src}
                width={TEASER_VIDEO.width}
                height={TEASER_VIDEO.height}
                alt=""
                decoding="async"
                draggable="false"
                className="block h-auto w-full select-none drop-shadow-[0_16px_24px_rgba(10,15,43,0.22)]"
              />
            </Link>
          </div>

          {/* Middle: featured video */}
          <VideoCard video={featuredVideo} variant="featured" />

          {/* Right: small video cards — horizontal scroll on mobile/tablet, 2x2 grid on desktop */}
          <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {otherVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  )
}

export default VideoSection
