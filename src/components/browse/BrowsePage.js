import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import MovieCard from "../home/MovieCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import { getMoviesByGenre } from "../../helpers";

const BrowsePage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const results = await getMoviesByGenre(decodeURIComponent(genre));
      setMovies(results);
      setStatus(results.length ? "success" : "empty");
    } catch {
      setStatus("error");
    }
  }, [genre]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-stream-bg">
      <Navbar />

      <main className="pt-24 px-[4%] md:px-[5%] pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-stream-accent text-sm font-semibold uppercase tracking-widest mb-1">
            Browse
          </p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-white">
            {decodeURIComponent(genre || "")}
          </h1>
          {status === "success" && (
            <p className="text-stream-muted mt-2">
              {movies.length} movies
            </p>
          )}
        </motion.div>

        {status === "loading" && <LoadingSpinner />}

        {status === "empty" && (
          <p className="text-stream-muted text-center py-20">No movies in this genre.</p>
        )}

        {status === "error" && (
          <div className="text-center py-20">
            <button
              type="button"
              onClick={load}
              className="px-5 py-2 bg-stream-accent rounded-md"
            >
              Retry
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie, i) => (
              <div key={movie.id} className="flex justify-center">
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;
