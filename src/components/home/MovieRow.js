import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, genre, id, overlapCards = false }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction * (scrollRef.current.clientWidth * 0.75),
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 400);
  };

  if (!movies?.length) return null;

  const titleEl = genre ? (
    <Link
      to={`/browse/${encodeURIComponent(genre)}`}
      className="text-white text-lg md:text-xl font-semibold hover:text-stream-accent transition-colors"
    >
      {title}
    </Link>
  ) : (
    <h2 className="text-white text-lg md:text-xl font-semibold">{title}</h2>
  );

  return (
    <section className="mb-10 group/row" id={id}>
      <div
        className={`px-[4%] md:px-[5%] mb-3 flex items-center justify-between relative z-20 ${
          overlapCards ? "pt-4 md:pt-6" : ""
        }`}
      >
        {titleEl}
        {genre && (
          <Link
            to={`/browse/${encodeURIComponent(genre)}`}
            className="text-sm text-stream-muted hover:text-white transition-colors"
          >
            Explore All →
          </Link>
        )}
      </div>

      <div
        className={`relative ${overlapCards ? "-mt-2" : ""}`}
      >
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="absolute left-0 top-0 bottom-4 z-20 w-12 bg-gradient-to-r from-stream-bg to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <IoChevronBack className="text-3xl text-white drop-shadow-lg" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-[4%] md:px-[5%] pb-6 pt-2"
        >
          {movies.map((movie, index) => (
            <MovieCard key={`${id}-${movie.id}`} movie={movie} index={index} />
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute right-0 top-0 bottom-4 z-20 w-12 bg-gradient-to-l from-stream-bg to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <IoChevronForward className="text-3xl text-white drop-shadow-lg" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MovieRow;
