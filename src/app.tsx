import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { MoviesListPage, MovieDetailPage, SearchResultsPage } from "@/pages";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MoviesListPage />} />
          <Route path="/movies" element={<MoviesListPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
