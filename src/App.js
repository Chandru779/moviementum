import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import MovieDetailPage from "./components/movie/MovieDetailPage";
import SearchPage from "./components/search/SearchPage";
import BrowsePage from "./components/browse/BrowsePage";
import Footer from "./components/layout/Footer";

const LegacyAnimeRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/movie/${id}`} replace />;
};

const AppShell = () => {
  const location = useLocation();
  const showFooter = !location.pathname.startsWith("/movie/");

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/browse/:genre" element={<BrowsePage />} />
        <Route path="/mainpage" element={<Navigate to="/" replace />} />
        <Route path="/anime/:id" element={<LegacyAnimeRedirect />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stream-bg">
        <AppShell />
      </div>
    </Router>
  );
}

export default App;
