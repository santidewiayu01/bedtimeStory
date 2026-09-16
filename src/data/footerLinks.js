import { Camera, HelpCircle, Mail, Music2, ScrollText, ShieldCheck, Video } from 'lucide-react'

// NOTE: the installed lucide-react version doesn't ship brand/logo
// icons (Instagram, YouTube, TikTok, etc. aren't exported) — generic
// icons stand in instead, documented here so they're easy to swap for
// real brand marks (SVG asset or a different icon package) later:
//   Instagram -> Camera   YouTube -> Video   TikTok -> Music2

// "Jelajahi" column. Reuses the same routes already defined in
// navLinks/App.jsx so the footer never drifts out of sync with the
// real site map, but kept as its own list (not imported directly)
// so copy/order/subset can differ from the navbar without touching
// that file. "Tentang" is intentionally left out here — it stays
// reachable from the main navbar.
export const footerNavLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Cerita', path: '/cerita' },
  { label: 'Ilmu Pengetahuan', path: '/ilmu' },
  { label: 'Video', path: '/video' },
  { label: 'Quiz', path: '/quiz' },
]

// "Bantuan" column — none of these pages exist yet, so every entry
// is a clearly-marked placeholder (href="#", visibly disabled) rather
// than a guessed URL.
export const footerSupportLinks = [
  { label: 'FAQ', path: '#', icon: HelpCircle, placeholder: true },
  { label: 'Kebijakan Privasi', path: '#', icon: ShieldCheck, placeholder: true },
  { label: 'Syarat & Ketentuan', path: '#', icon: ScrollText, placeholder: true },
  { label: 'Kontak Kami', path: '#', icon: Mail, placeholder: true },
]

// "Ikuti Kami" — social/contact. No live handles or inboxes exist
// yet, so every entry is a clearly-labelled placeholder (href="#")
// rather than a fabricated profile URL or email. Swap `href` in for
// the real one once the team has it.
export const footerSocialLinks = [
  { label: 'Instagram', href: '#', icon: Camera, placeholder: true },
  { label: 'YouTube', href: '#', icon: Video, placeholder: true },
  { label: 'TikTok', href: '#', icon: Music2, placeholder: true },
  { label: 'Email', href: '#', icon: Mail, placeholder: true },
]

// Bottom bar legal links. Also placeholders until real pages exist.
export const footerLegalLinks = [
  { label: 'Privacy Policy', path: '#', placeholder: true },
  { label: 'Terms of Use', path: '#', placeholder: true },
]
