import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { getMovies } from "../helpers";
import { getImageUrl, formatRating } from "../helpers/utils";
import { FaStar, FaEye } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingSpinner from "./LoadingSpinner";

const MotionLink = motion(Link);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const MainPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get("search") || "";
  const [movieDetails, setMovieDetails] = useState({
    status: "loading",
    result: [],
  });

  const fetchMovies = useCallback(async () => {
    setMovieDetails({ status: "loading", result: [] });
    try {
      const endpoint = searchTerm ? "/search/movie" : "/movie/popular";
      const results = await getMovies(searchTerm, endpoint);
      if (searchTerm && !results.length) {
        setMovieDetails({ status: "nodata", result: [] });
      } else {
        setMovieDetails({ status: "success", result: results });
      }
    } catch {
      setMovieDetails({ status: "error", result: [] });
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="flex flex-col gap-2 bg-gradient-to-br from-dark to-secondary h-screen">
      <Header searchTab={true} />
      <div className="h-full w-full flex flex-col gap-2 grow overflow-y-auto">
        {movieDetails.status === "loading" && <LoadingSpinner />}

        {movieDetails.status === "error" && (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
            <p className="text-primary text-2xl font-semibold">
              Sorry, failed to fetch data
            </p>
            <p className="text-grey text-lg">
              Check your internet connection and try again
            </p>
            <button
              className="px-6 py-2 bg-primary text-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
              onClick={fetchMovies}
            >
              Try Again
            </button>
          </div>
        )}

        {movieDetails.status === "nodata" && (
          <div className="w-[90%] lg:w-1/4 h-[70%] m-auto text-dark bg-white rounded-3xl">
            <div className="h-full flex flex-col font-inter items-center justify-center gap-4 p-4 sm:p-12 text-center">
              <img
                src="/projects/EmptyState.png.svg"
                width="300"
                alt="No results"
                className="object-cover"
              />
              <p className="text-2xl font-semibold">
                Sorry, couldn&apos;t find &quot;{searchTerm}&quot;
              </p>
              <p className="text-lg font-medium text-grey">
                Try a different movie name or browse popular titles
              </p>
              <button
                className="w-1/2 p-2 bg-dark text-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
                onClick={() => navigate("/mainpage")}
              >
                Browse Popular
              </button>
            </div>
          </div>
        )}

        {movieDetails.status === "success" && (
          <>
            <p className="px-[5%] pt-2 text-grey font-inter text-sm">
              {searchTerm
                ? `Results for "${searchTerm}"`
                : "Popular movies this week"}
            </p>
            <div className="px-[5%] py-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {movieDetails.result.map((movie, index) => (
                <MotionLink
                  key={movie.id}
                  to={`/anime/${movie.id}?search=${encodeURIComponent(searchTerm)}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full overflow-hidden rounded-lg flex flex-col bg-white/10 text-light group">
                    <div className="w-full overflow-hidden aspect-[2/3]">
                      <LazyLoadImage
                        alt={movie.title}
                        src={getImageUrl(movie.poster_path, "poster")}
                        width="100%"
                        height="100%"
                        effect="blur"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                    </div>
                    <div className="px-2 pb-2 pt-3 shrink-0">
                      <h1 className="font-inter font-bold text-xl truncate pr-1 mb-2">
                        {movie.title}
                      </h1>
                      <div className="flex gap-2 items-center flex-wrap">
                        <div
                          title="Rating"
                          className="flex gap-2 items-center bg-secondary border border-grey px-3 py-1 w-fit rounded-full"
                        >
                          <p className="text-xs font-inter font-bold">
                            {formatRating(movie.vote_average)}
                          </p>
                          <FaStar className="h-3 w-3" />
                        </div>
                        <div
                          title="Vote count"
                          className="flex gap-2 items-center bg-secondary border border-grey px-3 py-1 w-fit rounded-full"
                        >
                          <p className="text-xs font-inter font-bold">
                            {movie.vote_count?.toLocaleString()}
                          </p>
                          <FaEye className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionLink>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
