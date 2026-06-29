import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaStar } from "react-icons/fa";
import { getImageUrl, formatRating } from "../../helpers/utils";

const MovieCard = ({ movie, index = 0 }) => {
  const year = movie.release_date?.toString().slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="relative shrink-0 w-[140px] sm:w-[160px] md:w-[185px] group/card"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <motion.div
          whileHover={{ scale: 1.08, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-[2/3] rounded-lg overflow-hidden bg-stream-card shadow-lg group-hover/card:shadow-2xl group-hover/card:shadow-black/60 group-hover/card:ring-1 group-hover/card:ring-white/20 group-hover/card:z-20"
        >
          <img
            src={getImageUrl(movie.poster_path, "poster")}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
            <p className="font-semibold text-sm text-white truncate">{movie.title}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
              {movie.vote_average && (
                <span className="flex items-center gap-1 text-stream-gold font-medium">
                  <FaStar className="text-[9px]" />
                  {formatRating(movie.vote_average)}
                </span>
              )}
              {year && <span>{year}</span>}
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-black shadow-lg">
              <FaPlay className="text-sm ml-0.5" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
