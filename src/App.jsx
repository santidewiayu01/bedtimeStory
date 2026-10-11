import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CeritaDetailPage from './pages/CeritaDetailPage'
import CeritaPage from './pages/CeritaPage'
import Home from './pages/Home'
import IlmuPage from './pages/IlmuPage'
import QuizPage from './pages/QuizPage'
import QuizPlayPage from './pages/QuizPlayPage'
import TentangPage from './pages/TentangPage'
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
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/:categoryId" element={<QuizPlayPage />} />
        <Route path="/tentang" element={<TentangPage />} />
      </Route>
    </Routes>
  )
}

export default App
