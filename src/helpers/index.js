import axios from "axios";
import appConfig from "../configs";
import {
  getPopularMovies,
  searchMovies,
  getMovieByImdbId,
  getMovieVideos,
  getHomePageData,
  getMoviesByGenre,
  getFeaturedMovies,
} from "../services/cinemeta";

export {
  getHomePageData,
  getMoviesByGenre,
  getFeaturedMovies,
  getPopularMovies,
  searchMovies,
};

const tmdbClient = axios.create({
  baseURL: appConfig.tmdb_api_baseurl,
  params: { api_key: appConfig.tmdb_api_key },
  headers: { accept: "application/json" },
});

const hasTmdbKey = () => Boolean(appConfig.tmdb_api_key);

export const getMovies = async (searchTerm) => {
  if (searchTerm) return searchMovies(searchTerm);
  return getPopularMovies();
};

export const getMovieById = async (id) => {
  try {
    return await getMovieByImdbId(String(id));
  } catch (primaryError) {
    if (!hasTmdbKey()) throw primaryError;
    const { data } = await tmdbClient.get(`/movie/${id}`, {
      params: { language: "en-US", append_to_response: "credits" },
    });
    return data;
  }
};

export const getMovieVideosById = async (id, normalizedMovie = null) => {
  if (normalizedMovie?._videos) return getMovieVideos(normalizedMovie);
  const movie = normalizedMovie || (await getMovieByImdbId(String(id)));
  return getMovieVideos(movie);
};
