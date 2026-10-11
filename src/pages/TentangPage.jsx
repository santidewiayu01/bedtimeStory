import { useEffect, useRef } from 'react'
import ScrollProgress from '../components/scroll/ScrollProgress'
import { useScrollStory } from '../components/scroll/useScrollStory'
import TentangClosing from '../components/tentang/TentangClosing'
import TentangHero from '../components/tentang/TentangHero'
import TentangStory from '../components/tentang/TentangStory'
import TentangValues from '../components/tentang/TentangValues'
import TentangWorlds from '../components/tentang/TentangWorlds'

/** /tentang — MiniLemon told as a scroll journey: arrive → why → worlds → values → depart. */
function TentangPage() {
  const rootRef = useRef(null)
  useScrollStory(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={rootRef} className="fx-scope">
      <ScrollProgress />
      <TentangHero />
      <TentangStory />
      <TentangWorlds />
      <TentangValues />
      <TentangClosing />
    </div>
  )
}

export default TentangPage
