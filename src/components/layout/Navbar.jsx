import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, User, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/navLinks'
import Button from '../ui/Button'

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      {/* Lemon mascot mark — placeholder until final logo art arrives */}
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-navy-950">
        M
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-wide text-yellow-400 [text-shadow:0_1px_3px_rgba(10,15,43,0.6)]">
          MINILEMON
        </span>
        <span className="text-[10px] font-semibold tracking-[0.14em] text-white/60">
          ILMU PENGETAHUAN
        </span>
      </span>
    </NavLink>
  )
}

function NavItem({ path, label, icon: Icon }) {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      className={({ isActive }) =>
        // `!text-white` (important) on the inactive state so this is
        // guaranteed visible regardless of any other color rule that
        // might otherwise be winning the cascade — reported as
        // invisible/unreadable against the Hero background.
        `flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3.5 py-2 text-sm font-semibold transition-colors [text-shadow:0_1px_2px_rgba(10,15,43,0.5)] ${
          isActive
            ? 'bg-white/10 text-yellow-400'
            : '!text-white hover:bg-white/10'
        }`
      }
    >
      <Icon size={16} strokeWidth={2.25} />
      {label}
    </NavLink>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    // FINAL contrast pass (2nd round): the Hero behind this bar ranges
    // from a very light "arrival" sky to near-black "video" framing as
    // the camera journey plays, so the navbar can't lean on the 3D
    // background for any of its contrast — it needs to read as a
    // solid, opaque-feeling surface at EVERY frame of that journey.
    // bg-navy-950/97 + backdrop-blur-lg pushes opacity/blur high enough
    // that the busiest Hero frame (bright sky, light clouds) still
    // can't wash out the white text; a small text-shadow on every menu
    // label/logo (see Logo/NavItem above) is the last line of defense
    // for the handful of pixels where a bright 3D highlight could still
    // peek through the translucent surface.
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/97 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.85)] backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Cari"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Search size={18} />
          </button>
          <Button variant="primary" className="px-5 py-2.5 text-sm">
            Login
          </Button>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-400 text-white">
            <User size={18} />
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <NavItem key={link.path} {...link} />
              ))}
              <div className="mt-3 flex items-center gap-3">
                <Button
                  variant="primary"
                  className="flex-1 justify-center text-sm"
                >
                  Login
                </Button>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-400 text-white">
                  <User size={18} />
                </span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
