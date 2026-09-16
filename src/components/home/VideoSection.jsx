import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import { videos } from '../../data/videos'
import Button from '../ui/Button'
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
          {/* Left: section intro — compact */}
          <div className="text-center lg:text-left">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-coral-400/15 text-coral-400 lg:mx-0">
              <Film size={18} />
            </span>
            <h2 className="mt-3 font-heading text-xl font-bold text-ink-900 sm:text-2xl">
              Video Pengetahuan
            </h2>
            <p className="mx-auto mt-1.5 max-w-[15rem] text-sm text-ink-600 lg:mx-0">
              Tonton video menarik dan belajar dengan cara seru.
            </p>
            <Button
              as="a"
              href="/video"
              variant="coral"
              className="mt-4 px-4 py-2 text-sm"
            >
              Lihat Semua Video
            </Button>
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
