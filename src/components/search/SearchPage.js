import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import MovieCard from "../home/MovieCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import { searchMovies } from "../../helpers";

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("loading");

  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    try {
      const movies = await searchMovies(query);
      setResults(movies);
      setStatus(movies.length ? "success" : "empty");
    } catch {
      setStatus("error");
    }
  }, [query]);

  useEffect(() => {
    search();
  }, [search]);

  return (
    <div className="min-h-screen bg-stream-bg">
      <Navbar />

      <main className="pt-24 px-[4%] md:px-[5%] pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl tracking-wide text-white mb-2">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          {status === "success" && (
            <p className="text-stream-muted">
              {results.length} title{results.length !== 1 ? "s" : ""} found
            </p>
          )}
        </motion.div>

        {status === "loading" && <LoadingSpinner />}

        {status === "empty" && (
          <div className="text-center py-20">
            <p className="text-xl text-white mb-2">No matches found</p>
            <p className="text-stream-muted">Try a different title or genre keyword.</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-20">
            <p className="text-stream-accent mb-4">Search failed</p>
            <button
              type="button"
              onClick={search}
              className="px-5 py-2 bg-stream-accent rounded-md font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((movie, i) => (
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

export default SearchPage;
