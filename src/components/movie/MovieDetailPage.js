import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import YouTube from "react-youtube";
import { FaPlay, FaStar, FaArrowLeft } from "react-icons/fa";
import { CiCalendarDate, CiTimer } from "react-icons/ci";
import Navbar from "../layout/Navbar";
import LoadingSpinner from "../ui/LoadingSpinner";
import CastAvatar from "./CastAvatar";
import { getMovieById } from "../../helpers";
import {
  getImageUrl,
  formatRuntime,
  formatRating,
  getTrailerVideo,
  getYoutubeVideos,
} from "../../helpers/utils";
import appConfig from "../../configs";

const youtubeOpts = {
  width: "100%",
  playerVars: { autoplay: 0, controls: 1, rel: 0, modestbranding: 1 },
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("loading");
  const [showTrailer, setShowTrailer] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setStatus("loading");
    setShowTrailer(false);
    try {
      const data = await getMovieById(id);
      setMovie(data);
      setVideos(getYoutubeVideos(data._videos || []));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
  }, [load]);

  const trailer = getTrailerVideo(videos);
  const year = movie?.release_date?.toString().slice(0, 4);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-stream-bg">
        <Navbar />
        <LoadingSpinner fullScreen />
      </div>
    );
  }

  if (status === "error" || !movie) {
    return (
      <div className="min-h-screen bg-stream-bg">
        <Navbar />
        <div className="pt-32 flex flex-col items-center gap-4 text-center px-4">
          <p className="text-xl font-semibold">Movie not found</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-stream-accent rounded-md font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stream-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[65vh] min-h-[420px] max-h-[700px]">
        {showTrailer && trailer ? (
          <div className="absolute inset-0 bg-black">
            <YouTube
              videoId={trailer.key}
              opts={{ ...youtubeOpts, height: "100%" }}
              className="w-full h-full"
            />
            <button
              type="button"
              onClick={() => setShowTrailer(false)}
              className="absolute top-20 right-4 z-10 px-4 py-2 bg-black/70 rounded-md text-sm hover:bg-black/90 transition-colors"
            >
              Close Trailer
            </button>
          </div>
        ) : (
          <>
            <img
              src={getImageUrl(movie.backdrop_path, "backdrop")}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-hero-fade" />
            <div className="absolute inset-0 bg-hero-fade-side" />
          </>
        )}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-20 left-[4%] z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          Back
        </button>

        {!showTrailer && (
          <div className="absolute bottom-0 left-0 right-0 px-[4%] md:px-[5%] pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6 md:gap-10 items-end md:items-end"
            >
              <img
                src={getImageUrl(movie.poster_path, "poster")}
                alt={movie.title}
                className="hidden md:block w-44 lg:w-52 rounded-lg shadow-2xl shadow-black/60 ring-1 ring-white/10 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-white text-shadow-hero leading-none mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 mb-5">
                  {movie.vote_average && (
                    <span className="flex items-center gap-1.5 font-bold text-stream-gold bg-black/40 px-2.5 py-1 rounded">
                      <FaStar className="text-xs" />
                      {formatRating(movie.vote_average)} IMDb
                    </span>
                  )}
                  {year && (
                    <span className="flex items-center gap-1">
                      <CiCalendarDate /> {year}
                    </span>
                  )}
                  {movie.runtime && (
                    <span className="flex items-center gap-1">
                      <CiTimer /> {formatRuntime(movie.runtime)}
                    </span>
                  )}
                  <span className="px-2 py-0.5 border border-white/30 rounded text-xs">
                    {movie.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {movie.genres?.map((g) => (
                    <span
                      key={g.id}
                      className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <button
                      type="button"
                      onClick={() => setShowTrailer(true)}
                      className="inline-flex items-center gap-2.5 px-7 py-2.5 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-all hover:scale-105"
                    >
                      <FaPlay className="text-sm" />
                      Play Trailer
                    </button>
                  )}
                  {trailer && (
                    <a
                      href={appConfig.video_path + trailer.key}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-md font-semibold hover:bg-white/25 transition-colors"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Content */}
      <main className="px-[4%] md:px-[5%] py-10 md:py-14 max-w-6xl">
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-3">Synopsis</h2>
          <p className="text-stream-muted leading-relaxed text-base md:text-lg max-w-3xl">
            {movie.overview || "No synopsis available."}
          </p>
        </section>

        <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {movie.spoken_languages?.length > 0 && (
            <div>
              <p className="text-xs text-stream-muted uppercase tracking-wider mb-1">Country</p>
              <p className="text-white font-medium">
                {movie.spoken_languages.map((l) => l.english_name).join(", ")}
              </p>
            </div>
          )}
          {movie.vote_count > 0 && (
            <div>
              <p className="text-xs text-stream-muted uppercase tracking-wider mb-1">Popularity</p>
              <p className="text-white font-medium">{movie.vote_count.toLocaleString()}</p>
            </div>
          )}
          {movie.production_companies?.length > 0 && (
            <div className="col-span-2">
              <p className="text-xs text-stream-muted uppercase tracking-wider mb-1">Credits</p>
              <p className="text-white font-medium">
                {movie.production_companies.map((c) => c.name).join(" · ")}
              </p>
            </div>
          )}
        </section>

        {movie.credits?.cast?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-5">Cast</h2>
            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
              {movie.credits.cast.slice(0, 20).map((person) => (
                <div
                  key={`${person.id}-${person.name}`}
                  className="shrink-0 w-28 md:w-32 text-center group"
                >
                  <CastAvatar person={person} />
                  <p className="text-sm font-medium text-white truncate px-1">
                    {person.name}
                  </p>
                  {person.character && (
                    <p className="text-xs text-stream-muted truncate px-1 mt-0.5">
                      {person.character}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {videos.length > 1 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-5">More Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.slice(0, 4).map((video) => (
                <div key={video.id} className="rounded-lg overflow-hidden bg-stream-card border border-stream-border">
                  <p className="px-4 py-2 text-sm text-stream-muted truncate">{video.name}</p>
                  <YouTube videoId={video.key} opts={youtubeOpts} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MovieDetailPage;
