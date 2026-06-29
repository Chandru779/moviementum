const parseRuntimeMinutes = (runtime) => {
  if (typeof runtime === "number") return runtime;
  if (!runtime) return null;
  const match = String(runtime).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const parseRating = (rating) => {
  if (rating == null || rating === "") return null;
  const value = parseFloat(rating);
  return Number.isNaN(value) ? null : value;
};

const toGenres = (genres = []) =>
  genres.map((name, index) => ({ id: index, name }));

const toCast = (cast = []) =>
  cast.map((name, index) => ({
    id: index,
    name,
    character: "",
    profile_path: null,
  }));

const toVideos = (meta) => {
  const streams = meta.trailerStreams || [];
  const trailers = meta.trailers || [];

  if (streams.length) {
    return streams.map((s, i) => ({
      id: s.ytId || `trailer-${i}`,
      key: s.ytId,
      name: s.title || meta.name,
      type: "Trailer",
      site: "YouTube",
    }));
  }

  return trailers.map((t, i) => ({
    id: t.source || `trailer-${i}`,
    key: t.source,
    name: meta.name,
    type: t.type || "Trailer",
    site: "YouTube",
  }));
};

export const normalizeListMovie = (meta) => ({
  id: meta.imdb_id || meta.id,
  title: meta.name,
  poster_path: meta.poster,
  backdrop_path: meta.background,
  overview: meta.description || "",
  genres: meta.genres || meta.genre || [],
  vote_average: parseRating(meta.imdbRating),
  vote_count: meta.popularities?.trakt || Math.round(meta.popularity || 0),
  release_date: meta.released || meta.releaseInfo || meta.year,
  runtime: parseRuntimeMinutes(meta.runtime),
});

export const normalizeDetailMovie = (meta) => ({
  id: meta.imdb_id || meta.id,
  moviedb_id: meta.moviedb_id || null,
  title: meta.name,
  poster_path: meta.poster,
  backdrop_path: meta.background,
  overview: meta.description,
  release_date: meta.released
    ? meta.released.split("T")[0]
    : meta.releaseInfo || meta.year,
  runtime: parseRuntimeMinutes(meta.runtime),
  status: meta.released ? "Released" : "Unknown",
  genres: toGenres(meta.genres || meta.genre || []),
  vote_average: parseRating(meta.imdbRating),
  vote_count: meta.popularities?.trakt || Math.round(meta.popularity || 0),
  budget: null,
  revenue: null,
  adult: false,
  spoken_languages: meta.country ? [{ english_name: meta.country }] : [],
  production_companies: meta.director?.length
    ? [{ id: 0, name: `Directed by ${meta.director.join(", ")}`, logo_path: null }]
    : [],
  credits: { cast: toCast(meta.cast || []) },
  _videos: toVideos(meta),
});
