import axios from "axios";
import appConfig from "../configs";
import { normalizeListMovie, normalizeDetailMovie } from "./normalize";
import { enrichCastWithImages } from "./castImages";

const cinemetaClient = axios.create({
  baseURL: appConfig.cinemeta_baseurl,
  headers: { accept: "application/json" },
  maxRedirects: 5,
});

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
];

const handleError = (error, context) => {
  const message =
    error.response?.data?.error ||
    error.message ||
    "Failed to fetch movie data from Cinemeta";
  console.error(`Cinemeta API error (${context}):`, message);
  throw new Error(message);
};

const fetchCatalog = async (path) => {
  const { data } = await cinemetaClient.get(path);
  return (data.metas || []).map(normalizeListMovie);
};

export const getPopularMovies = () => fetchCatalog("/catalog/movie/top.json");

export const getFeaturedMovies = () =>
  fetchCatalog("/catalog/movie/imdbRating.json");

export const getMoviesByGenre = (genre) =>
  fetchCatalog(
    `/catalog/movie/top/genre=${encodeURIComponent(genre)}.json`
  );

export const searchMovies = async (query) => {
  try {
    return await fetchCatalog(
      `/catalog/movie/top/search=${encodeURIComponent(query)}.json`
    );
  } catch (error) {
    handleError(error, `search/${query}`);
  }
};

export const getMovieByImdbId = async (imdbId) => {
  const id = imdbId.startsWith("tt") ? imdbId : `tt${imdbId}`;
  try {
    const { data } = await cinemetaClient.get(`/meta/movie/${id}.json`);
    if (!data?.meta) throw new Error("Movie not found");
    const movie = normalizeDetailMovie(data.meta);
    movie.credits.cast = await enrichCastWithImages(
      movie.credits.cast,
      data.meta.moviedb_id
    );
    return movie;
  } catch (error) {
    handleError(error, `meta/movie/${id}`);
  }
};

export const getMovieVideos = (normalizedMovie) =>
  normalizedMovie._videos || [];

export const getHomePageData = async () => {
  const [popular, featured, ...genreResults] = await Promise.all([
    getPopularMovies(),
    getFeaturedMovies(),
    ...GENRES.map((g) => getMoviesByGenre(g)),
  ]);

  const pickHero = (movies) => {
    const withBackdrop = movies.filter((m) => m.backdrop_path && m.vote_average);
    const pool = withBackdrop.length ? withBackdrop : movies.filter((m) => m.backdrop_path);
    return pool.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))[0] || movies[0];
  };

  const hero = pickHero(featured) || pickHero(popular);

  const rows = [
    { id: "trending", title: "Trending Now", movies: popular },
    { id: "top-rated", title: "Top Rated", movies: featured },
    ...GENRES.map((genre, i) => ({
      id: `genre-${genre.toLowerCase()}`,
      title: genre,
      movies: genreResults[i],
      genre,
    })),
  ].filter((row) => row.movies?.length);

  return { hero, rows };
};

export { GENRES };
