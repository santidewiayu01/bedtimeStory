import { Video } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import VideoPlayerModal from '../components/video/VideoPlayerModal'
import Badge from '../components/ui/Badge'
import Container from '../components/ui/Container'
import VideoCard from '../components/ui/VideoCard'
import { isVideoAvailable, videoLibrary } from '../data/videos'

const ALL = 'Semua'

function VideoPage() {
  const [category, setCategory] = useState(ALL)
  const [selected, setSelected] = useState(null)

  const categories = useMemo(
    () => [ALL, ...new Set(videoLibrary.map((v) => v.category))],
    [],
  )
  const visible = useMemo(
    () => (category === ALL ? videoLibrary : videoLibrary.filter((v) => v.category === category)),
    [category],
  )

  const closePlayer = useCallback(() => setSelected(null), [])

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#1b2690] bg-cover bg-center py-12 text-white sm:py-16"
        style={{ backgroundImage: 'url("/assets/backgrounds/video-cosmic.jpg")' }}
      >
        <Container className="flex flex-col items-center gap-4 text-center">
          <Badge>
            <Video size={16} />
            Video Pengetahuan
          </Badge>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            Belajar sains lewat video seru
          </h1>
          <p className="max-w-xl text-sm text-white/80 sm:text-base">
            Pilih video, lalu tonton bersama si kecil.
          </p>
        </Container>
      </section>

      <section className="bg-cream-50 py-10 sm:py-14">
        <Container>
          <div
            role="group"
            aria-label="Filter kategori video"
            className="scrollbar-none -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            {categories.map((name) => {
              const active = name === category
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(name)}
                  className={`shrink-0 rounded-[var(--radius-pill)] px-4 py-2 font-heading text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400 ${
                    active
                      ? 'bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)]'
                      : 'bg-lavender-100 text-navy-900 hover:bg-lavender-400/30'
                  }`}
                >
                  {name}
                </button>
              )
            })}
          </div>

          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((video) => (
              <li key={video.id} className="m-0">
                <VideoCard
                  video={video}
                  variant="grid"
                  unavailable={!isVideoAvailable(video)}
                  onSelect={setSelected}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <VideoPlayerModal video={selected} onClose={closePlayer} />
    </>
  )
}

export default VideoPage
