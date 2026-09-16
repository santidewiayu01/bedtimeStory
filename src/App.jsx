import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ComingSoonPage from './pages/ComingSoonPage'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cerita"
          element={<ComingSoonPage title="Cerita" />}
        />
        <Route path="/ilmu" element={<ComingSoonPage title="Ilmu" />} />
        <Route path="/video" element={<ComingSoonPage title="Video" />} />
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
