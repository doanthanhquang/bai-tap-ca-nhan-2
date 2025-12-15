import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import {
  MoviesListPage,
  MovieDetailPage,
  SearchResultsPage,
  PersonDetailPage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  FavoritesPage,
} from "@/pages";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes (without MainLayout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

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
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
