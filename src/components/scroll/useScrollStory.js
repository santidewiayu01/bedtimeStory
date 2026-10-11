import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Declarative scroll choreography for a whole page, driven by data attributes so
 * each section stays plain JSX:
 *
 *   data-px-scope            section that owns the scroll range for its children
 *   data-px-start="top"      scope range starts at the very top (use on heroes)
 *   data-parallax="0.3"      drifts relative to the page. + = far/slow, - = near/fast
 *   data-reveal="up|left|right|pop"   plays once when it enters (data-delay in s)
 *   data-wipe[="x"]          clips top→bottom (or left→right with "x") as the scope scrolls
 *                            — a robust way to "draw" a line without dash maths
 *
 * Everything is scrubbed transform/opacity. Phones get half the travel;
 * prefers-reduced-motion gets none (content is simply visible). One matchMedia
 * context is reverted on unmount, so no trigger or listener outlives the page.
 */
/** Height of the sticky Navbar in px (from the --nav-h token). */
export function navHeight() {
  const root = document.documentElement
  const rem = parseFloat(getComputedStyle(root).fontSize) || 16
  return (parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 4.5) * rem
}

export function useScrollStory(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const mm = gsap.matchMedia()
    mm.add({ ok: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 767px)' }, (ctx) => {
      const { ok, phone } = ctx.conditions
      if (!ok) return
      const amp = phone ? 0.5 : 1

      root.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0
        const scope = el.closest('[data-px-scope]') ?? el.parentElement
        const fromTop = scope.dataset.pxStart === 'top'
        gsap.fromTo(
          el,
          { y: (fromTop ? 0 : -140) * speed * amp },
          {
            y: (fromTop ? 260 : 140) * speed * amp,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: fromTop ? 'top top' : 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      root.querySelectorAll('[data-reveal]').forEach((el) => {
        const kind = el.dataset.reveal || 'up'
        const from = { autoAlpha: 0 }
        if (kind === 'up') from.y = 36 * amp
        if (kind === 'left') from.x = -56 * amp
        if (kind === 'right') from.x = 56 * amp
        if (kind === 'pop') from.scale = 0.7
        gsap.from(el, {
          ...from,
          duration: kind === 'pop' ? 0.7 : 0.9,
          delay: parseFloat(el.dataset.delay || 0),
          ease: kind === 'pop' ? 'back.out(1.7)' : 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      root.querySelectorAll('[data-wipe]').forEach((el) => {
        const scope = el.closest('[data-px-scope]') ?? el.parentElement
        const horizontal = el.dataset.wipe === 'x'
        gsap.fromTo(
          el,
          { clipPath: horizontal ? 'inset(0 100% 0 0)' : 'inset(0 0 100% 0)' },
          {
            clipPath: horizontal ? 'inset(0 0% 0 0)' : 'inset(0 0 0% 0)',
            ease: 'none',
            scrollTrigger: { trigger: scope, start: 'top 55%', end: 'bottom 75%', scrub: 0.4 },
          },
        )
      })
    })

    // Images/fonts change the page height after first paint (esp. on a hard refresh
    // of /quiz or /tentang), so re-measure once everything has settled.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [rootRef])
}
