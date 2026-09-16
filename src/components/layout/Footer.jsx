import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  footerLegalLinks,
  footerNavLinks,
  footerSocialLinks,
  footerSupportLinks,
} from '../../data/footerLinks'
import Button from '../ui/Button'
import Container from '../ui/Container'

/**
 * Small helper for links that don't have a real destination yet
 * (social profiles, legal/support pages). Renders as a visibly-
 * disabled control — no fabricated URLs, no silent dead links — so
 * it's obvious to both users and future devs which links still need
 * wiring up once the real destination exists.
 */
function ComingSoonBadge() {
  return (
    <span className="ml-1.5 inline-flex shrink-0 items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
      Segera
    </span>
  )
}

function BrandColumn() {
  return (
    <div className="max-w-sm">
      <NavLink to="/" className="flex items-center gap-2.5">
        {/* Same placeholder mark used in the Navbar — swap both together
            once final logo art from Modeling & Animation is ready. */}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-navy-950">
          M
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-heading text-2xl font-bold tracking-wide text-yellow-400">
            MINILEMON
          </span>
          <span className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-white">
            ILMU PENGETAHUAN
          </span>
        </span>
      </NavLink>

      <p className="mt-3 font-heading text-sm font-semibold text-white">
        Teman belajar si kecil, setiap hari.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        Cerita, sains, dan video edukatif yang dikemas ceria supaya rasa
        ingin tahu mereka terus tumbuh.
      </p>
    </div>
  )
}

function FooterHeading({ children }) {
  return (
    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-yellow-400">
      {children}
    </h3>
  )
}

/** Data-driven link column — used for both "Jelajahi" and "Bantuan". */
function LinkColumn({ heading, links, useRouterLink = false }) {
  return (
    <div className="flex flex-col gap-4">
      <FooterHeading>{heading}</FooterHeading>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {useRouterLink ? (
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  // `!text-white` (important) — this link text was
                  // reported unreadable/near-black against the footer
                  // background despite plain `text-white` in the
                  // source, so it's forced here regardless of
                  // whatever else might be winning the cascade.
                  `!text-white text-base font-medium transition-colors hover:!text-yellow-400 focus-visible:!text-yellow-400 focus-visible:outline-none focus-visible:underline ${
                    isActive ? '!text-yellow-400' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <a
                href={link.path}
                aria-disabled={link.placeholder || undefined}
                title={link.placeholder ? 'Segera hadir' : undefined}
                onClick={(event) => {
                  if (link.placeholder) event.preventDefault()
                }}
                // Same forced !text-white here. Placeholder/"coming
                // soon" state is now conveyed only by the badge +
                // cursor-not-allowed, not by dimming the text — text
                // dimming is what kept coming back invisible.
                className={`!text-white inline-flex items-center text-base font-medium transition-colors focus-visible:outline-none focus-visible:underline ${
                  link.placeholder ? 'cursor-not-allowed' : 'hover:!text-yellow-400 focus-visible:!text-yellow-400'
                }`}
              >
                {link.label}
                {link.placeholder && <ComingSoonBadge />}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialColumn() {
  return (
    <div className="flex flex-col gap-4">
      <FooterHeading>Ikuti Kami</FooterHeading>
      <ul className="flex flex-col gap-3.5">
        {footerSocialLinks.map(({ label, href, icon: Icon, placeholder }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={placeholder ? `${label} (segera hadir)` : `Kunjungi ${label} MiniLemon`}
              aria-disabled={placeholder || undefined}
              title={placeholder ? 'Segera hadir' : undefined}
              onClick={(event) => {
                if (placeholder) event.preventDefault()
              }}
              className={`group !text-white inline-flex items-center gap-3 text-base font-medium transition-colors ${
                placeholder ? 'cursor-not-allowed' : 'hover:!text-yellow-400'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all ${
                  placeholder
                    ? ''
                    : 'group-hover:bg-yellow-400 group-hover:text-navy-950 group-hover:shadow-[0_0_0_6px_rgba(255,201,60,0.15)]'
                }`}
              >
                <Icon size={19} strokeWidth={2.25} />
              </span>
              {label}
              {placeholder && <ComingSoonBadge />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Compact, visual-only email capture strip — no real submit handler. */
function NewsletterStrip() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-8 text-center sm:flex-row sm:text-left">
      <div className="flex items-center gap-2.5">
        <Sparkles size={18} className="shrink-0 text-yellow-400" />
        <p className="font-heading text-base font-semibold text-white sm:text-lg">
          Jangan lewatkan petualangan baru!
        </p>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full max-w-sm items-center gap-2 sm:w-auto"
      >
        <label htmlFor="footer-email" className="sr-only">
          Alamat email
        </label>
        <input
          id="footer-email"
          type="email"
          placeholder="Masukkan email kamu"
          className="w-full min-w-0 flex-1 rounded-[var(--radius-pill)] border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none sm:w-56"
        />
        <Button
          type="submit"
          variant="primary"
          icon={ArrowRight}
          className="shrink-0 px-4 py-2.5 text-sm"
        >
          Kirim
        </Button>
      </form>
    </div>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // Same "-mt-6 + rounded-t" overlap trick every other section uses
      // so the seam with FeaturesSection stays invisible, plus the same
      // navy -> purple galaxy gradient so the footer reads as the last
      // beat of that background rather than a bolted-on component.
      className="relative -mt-6 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-navy-950 via-navy-950 to-purple-950 pt-10 pb-8 sm:pt-12"
    >
      {/* Decorative glow + a couple of tiny star accents — CSS/icon
          only, no image assets, kept sparse on purpose. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,201,60,0.1),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(139,124,246,0.16),transparent_50%)]"
      />
      <Star
        aria-hidden="true"
        size={14}
        className="pointer-events-none absolute left-[12%] top-10 hidden text-yellow-400/30 sm:block"
      />
      <Star
        aria-hidden="true"
        size={10}
        className="pointer-events-none absolute right-[18%] top-20 hidden text-white/25 sm:block"
      />

      <Container className="relative flex flex-col gap-8">
        <NewsletterStrip />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <BrandColumn />
          <LinkColumn heading="Jelajahi" links={footerNavLinks} useRouterLink />
          <LinkColumn heading="Bantuan" links={footerSupportLinks} />
          <SocialColumn />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-white/75">
            © {year} MiniLemon. Semua hak cipta dilindungi.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  aria-disabled={link.placeholder || undefined}
                  title={link.placeholder ? 'Segera hadir' : undefined}
                  onClick={(event) => {
                    if (link.placeholder) event.preventDefault()
                  }}
                  className={`text-sm font-medium transition-colors ${
                    link.placeholder
                      ? 'cursor-not-allowed text-white/60'
                      : 'text-white/80 hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </motion.footer>
  )
}

export default Footer
