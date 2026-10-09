import { Sparkles } from 'lucide-react'

// Posisi bintang kecil dekoratif (persen dari sisi kotak sampul).
const DOTS = [
  { left: '12%', top: '16%', size: 6, opacity: 0.8 },
  { left: '78%', top: '12%', size: 8, opacity: 0.65 },
  { left: '88%', top: '46%', size: 5, opacity: 0.7 },
  { left: '18%', top: '72%', size: 7, opacity: 0.6 },
  { left: '64%', top: '84%', size: 5, opacity: 0.8 },
]

/**
 * Sampul cerita. Mengisi seluruh induknya (atur rasio lewat wrapper).
 * - Jika cerita punya `image`, gambar itu dipakai.
 * - Jika belum, tampil sampul ilustratif: gradien warna Minilemon + ikon tema cerita.
 * Dekoratif saja (judul cerita selalu ada di teks di sampingnya), jadi aria-hidden.
 */
function StoryCover({ story, className = '' }) {
  if (story.image) {
    return (
      <img
        src={story.image}
        alt=""
        decoding="async"
        draggable="false"
        className={`h-full w-full select-none object-cover ${className}`}
      />
    )
  }

  const { icon: Icon, from, to } = story.cover

  return (
    <div
      aria-hidden="true"
      className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      <span className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
      <span className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/10" />

      {DOTS.map((d) => (
        <span
          key={`${d.left}-${d.top}`}
          className="absolute rounded-full bg-white"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, opacity: d.opacity }}
        />
      ))}
      <Sparkles
        className="absolute right-[14%] top-[26%] h-[11%] w-[11%] text-white/80"
        strokeWidth={2}
      />

      <span className="flex aspect-square w-[46%] items-center justify-center rounded-full bg-white/20 ring-4 ring-white/30">
        <Icon className="h-[55%] w-[55%] text-white drop-shadow-md" strokeWidth={1.75} />
      </span>
    </div>
  )
}

export default StoryCover
