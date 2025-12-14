import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout'
import { MoviePage } from '@/layout/movie'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/movies" element={<MoviePage />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
