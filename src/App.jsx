import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CeritaDetailPage from './pages/CeritaDetailPage'
import CeritaPage from './pages/CeritaPage'
import ComingSoonPage from './pages/ComingSoonPage'
import Home from './pages/Home'
import IlmuPage from './pages/IlmuPage'
import VideoPage from './pages/VideoPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cerita" element={<CeritaPage />} />
        <Route path="/cerita/:id" element={<CeritaDetailPage />} />
        <Route path="/ilmu" element={<IlmuPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/quiz" element={<ComingSoonPage title="Quiz" />} />
        <Route
          path="/tentang"
          element={<ComingSoonPage title="Tentang" />}
        />
      </Route>
    </Routes>
  )
}

export default App
