import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import QuizHero from '../components/quiz/QuizHero'
import QuizMap from '../components/quiz/QuizMap'
import QuizMission from '../components/quiz/QuizMission'
import QuizOutro from '../components/quiz/QuizOutro'
import ScrollProgress from '../components/scroll/ScrollProgress'
import { useScrollStory } from '../components/scroll/useScrollStory'

/**
 * /quiz — the landing/explore page. Playing happens on /quiz/:categoryId so people
 * can browse the adventure first. `location.state.scrollTo` lets the result screen
 * send someone straight back to the planet map.
 */
function QuizPage() {
  const rootRef = useRef(null)
  const { state } = useLocation()
  useScrollStory(rootRef)

  useEffect(() => {
    const target = state?.scrollTo && document.getElementById(state.scrollTo)
    if (target) {
      // wait a frame so the layout (and ScrollTrigger measurements) are settled
      const id = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [state])

  return (
    <div ref={rootRef} className="fx-scope">
      <ScrollProgress />
      <QuizHero />
      <QuizMap />
      <QuizMission />
      <QuizOutro />
    </div>
  )
}

export default QuizPage
