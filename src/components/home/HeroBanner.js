import { Link } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { getImageUrl, formatRating, formatRuntime } from "../../helpers/utils";

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const year = movie.release_date?.toString().slice(0, 4);
  const genres = (movie.genres || []).slice(0, 3).join(" · ");

  return (
    <section className="relative w-full h-[75vh] min-h-[520px] max-h-[820px] overflow-hidden">
      <motion.img
        key={movie.id}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={getImageUrl(movie.backdrop_path, "backdrop")}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div className="absolute inset-0 bg-hero-fade" />
      <div className="absolute inset-0 bg-hero-fade-side" />

      <div className="absolute bottom-0 left-0 right-0 px-[4%] md:px-[5%] pb-20 md:pb-28 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-white text-shadow-hero leading-none mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-white/90 mb-4">
            {movie.vote_average && (
              <span className="flex items-center gap-1.5 font-semibold text-stream-gold">
                ★ {formatRating(movie.vote_average)}
              </span>
            )}
            {year && <span>{year}</span>}
            {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
            {genres && (
              <span className="hidden sm:inline text-stream-muted">{genres}</span>
            )}
          </div>

          {movie.overview && (
            <p className="text-sm md:text-base text-white/80 line-clamp-3 md:line-clamp-4 max-w-xl mb-6 leading-relaxed">
              {movie.overview}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-105"
            >
              <FaPlay className="text-sm" />
              More Info
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/15 backdrop-blur-md text-white font-semibold rounded-md border border-white/20 hover:bg-white/25 transition-all duration-200"
            >
              <FaInfoCircle />
              Details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
