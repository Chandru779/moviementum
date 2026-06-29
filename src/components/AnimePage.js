import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovieById } from "../helpers";
import {
  getImageUrl,
  formatRuntime,
  formatCurrency,
  formatRating,
  getTrailerVideo,
  getYoutubeVideos,
} from "../helpers/utils";
import { Header } from "./Header";
import YouTube from "react-youtube";
import appConfig from "../configs";
import { CiCalendarDate, CiTimer } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingSpinner from "./LoadingSpinner";

const youtubeOpts = {
  playerVars: {
    autoplay: 0,
    controls: 1,
    rel: 0,
  },
};

const AnimePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    status: "loading",
    result: null,
  });
  const [videos, setVideos] = useState([]);

  const fetchMovie = useCallback(async () => {
    if (!id) return;
    setMovieData({ status: "loading", result: null });
    setVideos([]);
    try {
      const movie = await getMovieById(id);
      setMovieData({ status: "success", result: movie });
      setVideos(getYoutubeVideos(movie._videos || []));
    } catch {
      setMovieData({ status: "error", result: null });
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const movie = movieData.result;
  const trailer = getTrailerVideo(videos);

  if (movieData.status === "loading") {
    return (
      <div className="h-screen flex flex-col bg-dark">
        <Header searchTab={false} />
        <LoadingSpinner />
      </div>
    );
  }

  if (movieData.status === "error" || !movie) {
    return (
      <div className="h-screen flex flex-col bg-dark">
        <Header searchTab={false} />
        <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
          <p className="text-primary text-2xl font-semibold">
            Could not load movie details
          </p>
          <button
            className="px-6 py-2 bg-primary text-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
            onClick={fetchMovie}
          >
            Try Again
          </button>
          <button
            className="px-6 py-2 border border-grey text-light rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => navigate("/mainpage")}
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-dark">
      <Header searchTab={false} />
      <motion.div
        className="h-full w-full overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <LazyLoadImage
          alt={`${movie.title} backdrop`}
          src={getImageUrl(movie.backdrop_path, "backdrop")}
          effect="blur"
          className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover"
        />

        <div className="flex gap-10">
          <div className="-mt-20 ml-[5%] hidden md:block z-50 shrink-0">
            <LazyLoadImage
              alt={movie.title}
              src={getImageUrl(movie.poster_path, "poster")}
              effect="blur"
              width="250"
              className="rounded-md shadow-[-2px_2px_6px_0px] shadow-grey/70 h-[400px] object-cover"
            />
          </div>

          <div className="flex flex-col px-2 md:px-0 gap-2 pb-6">
            <h2 className="text-primary text-3xl sm:text-4xl md:text-6xl font-inter font-bold py-2 bg-gradient-to-b from-light to-grey bg-clip-text text-transparent">
              {movie.title}
            </h2>

            <div className="flex gap-4 font-inter text-light text-sm flex-wrap items-center">
              {movie.adult && (
                <span className="border border-grey px-2 py-0.5 rounded">18+</span>
              )}

              <div className="flex items-center gap-1">
                <CiCalendarDate className="h-5 w-5" />
                <p>{movie.release_date || "—"}</p>
              </div>

              <div className="flex items-center gap-1">
                <CiTimer className="h-5 w-5" />
                <p>{formatRuntime(movie.runtime)}</p>
              </div>

              <div className="flex items-center bg-secondary/50 px-4 py-1 rounded-lg">
                {movie.status}
              </div>

              {trailer && (
                <a
                  href={appConfig.video_path + trailer.key}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter bg-primary px-4 py-1 font-medium tracking-wide rounded-lg hover:opacity-90 transition-opacity"
                >
                  Watch Trailer
                </a>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="my-2 px-2 py-1 text-sm bg-secondary text-light rounded-lg font-inter"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-light text-base font-inter leading-relaxed max-w-3xl">
              {movie.overview || "No overview available."}
            </p>

            {movie.production_companies?.length > 0 && (
              <div className="py-4 flex flex-col font-inter text-light">
                <p className="font-medium text-lg md:text-2xl">
                  Production Companies
                </p>
                <div className="flex gap-4 p-4 flex-wrap">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex w-max gap-3 items-center py-1 px-2 bg-gradient-to-tr from-grey/30 to-secondary rounded-md"
                    >
                      {company.logo_path ? (
                        <img
                          src={getImageUrl(company.logo_path, "logo")}
                          alt={company.name}
                          className="h-[30px] w-[30px] rounded-full object-contain bg-white/10"
                        />
                      ) : null}
                      <p className="text-sm">{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col font-inter text-light">
              <p className="font-medium text-lg md:text-2xl">Brief Introduction</p>
              <div className="grid grid-cols-2 md:grid-cols-3 p-4 gap-6">
                <div className="flex flex-col">
                  <p className="font-medium text-md md:text-lg">
                    {movie.spoken_languages?.length
                      ? movie.spoken_languages
                          .map((lang) => lang.english_name)
                          .join(", ")
                      : "—"}
                  </p>
                  <p className="text-sm text-grey">Languages</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {formatCurrency(movie.budget)}
                  </p>
                  <p className="text-sm text-grey">Budget</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {formatCurrency(movie.revenue)}
                  </p>
                  <p className="text-sm text-grey">Revenue</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {formatRating(movie.vote_average)}
                  </p>
                  <p className="text-sm text-grey">Rating</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {movie.vote_count?.toLocaleString()}
                  </p>
                  <p className="text-sm text-grey">Votes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {movie.credits?.cast?.length > 0 && (
          <>
            <hr className="my-2 border border-grey/40" />
            <div className="w-full font-inter flex flex-col px-[5%] py-2 text-light">
              <p className="font-medium text-2xl">Top Billed Cast</p>
              <div className="flex gap-6 overflow-x-auto py-6 scroll-smooth">
                {movie.credits.cast.slice(0, 15).map((cast) => (
                  <div
                    key={cast.id}
                    className="flex flex-col bg-light text-secondary rounded-lg w-[200px] shrink-0 overflow-hidden hover:scale-[1.02] transition-transform duration-200"
                  >
                    <LazyLoadImage
                      alt={cast.name}
                      src={getImageUrl(cast.profile_path, "profile")}
                      effect="blur"
                      className="w-[200px] h-[200px] object-cover"
                    />
                    <div className="p-2">
                      <p className="text-lg font-semibold truncate">{cast.name}</p>
                      <p className="text-sm text-grey truncate">{cast.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {videos.length > 0 && (
          <>
            <hr className="my-2 border border-grey/40" />
            <div className="w-full font-inter flex flex-col px-[5%] py-2 pb-8 text-light">
              <p className="font-medium text-2xl">Trailers & Clips</p>
              <div className="flex gap-6 overflow-x-auto py-6 scroll-smooth">
                {videos.map((video) => (
                  <div key={video.id} className="shrink-0">
                    <p className="text-sm text-grey mb-2 truncate max-w-[480px]">
                      {video.name}
                    </p>
                    <YouTube videoId={video.key} opts={youtubeOpts} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AnimePage;
