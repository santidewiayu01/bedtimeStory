import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, RotateCcw, RotateCw, VideoOff, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_QUALITY_ORDER,
  VIDEO_QUALITIES,
  getAvailableQualities,
} from '../../data/videos'

const SKIP_SECONDS = 10

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = String(total % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`
}

const pickDefaultQuality = (available) =>
  DEFAULT_QUALITY_ORDER.find((q) => available.includes(q)) ?? null

const controlBtn =
  'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] font-heading font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 disabled:cursor-not-allowed disabled:opacity-40'

/**
 * Modal pemutar video. Dipasang hanya saat `video` ada.
 * - Tanpa sumber video: tampil pesan "Video belum tersedia", semua kontrol nonaktif.
 * - Dengan sumber: kontrol aktif dan pilihan resolusi terhubung ke video.sources.
 */
function VideoPlayerModal({ video, onClose }) {
  return (
    <AnimatePresence>
      {video ? <PlayerDialog key={video.id} video={video} onClose={onClose} /> : null}
    </AnimatePresence>
  )
}

function PlayerDialog({ video, onClose }) {
  const available = getAvailableQualities(video)
  const hasVideo = available.length > 0

  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  // Posisi & status putar yang harus dipulihkan setelah ganti resolusi.
  const resumeRef = useRef(null)

  const [quality, setQuality] = useState(() => pickDefaultQuality(available))
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const src = hasVideo && quality ? video.sources[quality] : null
  const controlsOn = hasVideo && ready && !failed

  // Kunci scroll halaman, fokus ke tombol tutup, dan kembalikan fokus saat ditutup.
  useEffect(() => {
    const trigger = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      if (trigger instanceof HTMLElement) trigger.focus()
    }
  }, [])

  // Esc menutup; Tab dijaga tetap di dalam dialog.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el || !controlsOn) return
    if (el.paused) {
      el.play().catch(() => setPlaying(false))
    } else {
      el.pause()
    }
  }, [controlsOn])

  const skip = (delta) => {
    const el = videoRef.current
    if (!el || !controlsOn) return
    const max = Number.isFinite(el.duration) ? el.duration : duration
    el.currentTime = Math.min(Math.max(el.currentTime + delta, 0), max)
    setCurrent(el.currentTime)
  }

  const seek = (e) => {
    const el = videoRef.current
    if (!el || !controlsOn) return
    const value = Number(e.target.value)
    el.currentTime = value
    setCurrent(value)
  }

  const changeQuality = (next) => {
    if (next === quality || !available.includes(next)) return
    const el = videoRef.current
    resumeRef.current = el ? { time: el.currentTime, wasPlaying: !el.paused } : null
    setReady(false)
    setFailed(false)
    setQuality(next)
  }

  // Dipanggil saat sumber baru (awal atau setelah ganti resolusi) selesai dimuat.
  const handleLoadedMetadata = (e) => {
    const el = e.currentTarget
    setDuration(Number.isFinite(el.duration) ? el.duration : 0)
    const resume = resumeRef.current
    resumeRef.current = null
    if (resume) {
      el.currentTime = Math.min(resume.time, el.duration || resume.time)
      setCurrent(el.currentTime)
      if (resume.wasPlaying) el.play().catch(() => setPlaying(false))
    }
    setReady(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-navy-950/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="mt-auto w-full max-w-3xl sm:my-auto overflow-hidden rounded-t-[var(--radius-card)] bg-navy-900 text-white shadow-[var(--shadow-soft)] sm:rounded-[var(--radius-card)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <span className="inline-block rounded-[var(--radius-pill)] bg-coral-400 px-2.5 py-0.5 text-xs font-semibold text-white">
              {video.category}
            </span>
            <h2
              id="video-modal-title"
              className="mt-2 font-heading text-lg font-semibold leading-snug sm:text-xl"
            >
              {video.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup pemutar video"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Layar video */}
        <div className="relative aspect-video w-full bg-navy-950">
          {hasVideo && src ? (
            <video
              ref={videoRef}
              src={src}
              poster={video.thumbnail}
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setFailed(true)
                setReady(false)
                setPlaying(false)
              }}
              className="h-full w-full bg-black object-contain"
            >
              Browser kamu belum mendukung pemutar video.
            </video>
          ) : (
            <div className="absolute inset-0">
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt=""
                  draggable="false"
                  className="h-full w-full select-none object-cover opacity-15"
                />
              ) : null}
              <div
                role="status"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender-100 text-navy-900">
                  <VideoOff size={26} />
                </span>
                <p className="font-heading text-xl font-semibold">Video belum tersedia</p>
                <p className="max-w-xs text-sm text-white/70">
                  Video ini sedang disiapkan. Yuk tonton video lain dulu!
                </p>
              </div>
            </div>
          )}

          {hasVideo && failed ? (
            <div
              role="alert"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-950/90 px-6 text-center"
            >
              <VideoOff size={26} />
              <p className="font-heading text-lg font-semibold">Video tidak bisa dimuat</p>
              <p className="max-w-xs text-sm text-white/70">
                Coba pilih resolusi lain atau tutup lalu buka lagi.
              </p>
            </div>
          ) : null}

          {hasVideo && !failed && !ready ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-950/40 text-sm font-semibold">
              Memuat video...
            </div>
          ) : null}
        </div>

        {/* Kontrol */}
        <div className="flex flex-col gap-4 px-4 pb-5 pt-4 sm:px-6">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <span className="w-12 shrink-0 text-xs tabular-nums text-white/80">
              {controlsOn ? formatTime(current) : '0:00'}
            </span>
            <input
              type="range"
              min={0}
              max={controlsOn && duration > 0 ? duration : 1}
              step={0.1}
              value={controlsOn ? Math.min(current, duration) : 0}
              onChange={seek}
              disabled={!controlsOn}
              aria-label="Progress video"
              aria-valuetext={
                controlsOn
                  ? `${formatTime(current)} dari ${formatTime(duration)}`
                  : 'Video belum tersedia'
              }
              className="h-2 min-w-0 flex-1 cursor-pointer accent-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
            />
            <span className="w-12 shrink-0 text-right text-xs tabular-nums text-white/80">
              {controlsOn ? formatTime(duration) : '--:--'}
            </span>
          </div>

          {/* Play / Pause + maju mundur */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => skip(-SKIP_SECONDS)}
              disabled={!controlsOn}
              aria-label="Mundur 10 detik"
              className={`${controlBtn} h-11 bg-white/10 px-4 text-sm enabled:hover:bg-white/20`}
            >
              <RotateCcw size={18} />
              10 dtk
            </button>
            <button
              type="button"
              onClick={togglePlay}
              disabled={!controlsOn}
              aria-label={playing ? 'Pause' : 'Play'}
              className={`${controlBtn} h-14 w-14 bg-yellow-400 text-navy-950 shadow-[var(--shadow-button)] enabled:hover:bg-yellow-300`}
            >
              {playing ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => skip(SKIP_SECONDS)}
              disabled={!controlsOn}
              aria-label="Maju 10 detik"
              className={`${controlBtn} h-11 bg-white/10 px-4 text-sm enabled:hover:bg-white/20`}
            >
              10 dtk
              <RotateCw size={18} />
            </button>
          </div>

          {/* Resolusi */}
          <div role="radiogroup" aria-label="Resolusi video" className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-white/70">Resolusi</span>
            <div className="flex flex-wrap gap-2">
              {VIDEO_QUALITIES.map((q) => {
                const exists = available.includes(q)
                const active = q === quality && hasVideo
                return (
                  <button
                    key={q}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    disabled={!exists}
                    onClick={() => changeQuality(q)}
                    title={exists ? `Putar dalam ${q}` : `${q} belum tersedia`}
                    className={`${controlBtn} px-3.5 py-1.5 text-sm ${
                      active
                        ? 'bg-yellow-400 text-navy-950'
                        : 'bg-white/10 text-white enabled:hover:bg-white/20'
                    }`}
                  >
                    {q}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VideoPlayerModal
