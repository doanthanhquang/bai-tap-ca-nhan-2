import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import {
  MoviesListPage,
  MovieDetailPage,
  SearchResultsPage,
  PersonDetailPage,
  LoginPage,
} from "@/pages";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route (without MainLayout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Routes (with MainLayout) */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<MoviesListPage />} />
                <Route path="/movies" element={<MoviesListPage />} />
                <Route path="/movies/:id" element={<MovieDetailPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/persons/:id" element={<PersonDetailPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
