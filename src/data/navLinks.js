import { BookOpenCheck, FlaskConical, Home, Info, Trophy, Video } from 'lucide-react'

// Central source of truth for primary navigation.
// Used by both the Navbar and the router, so adding a page only
// requires an update here (plus the route + page component).
export const navLinks = [
  { label: 'Beranda', path: '/', icon: Home },
  { label: 'Cerita', path: '/cerita', icon: BookOpenCheck },
  { label: 'Ilmu', path: '/ilmu', icon: FlaskConical },
  { label: 'Video', path: '/video', icon: Video },
  { label: 'Quiz', path: '/quiz', icon: Trophy },
  { label: 'Tentang', path: '/tentang', icon: Info },
]
