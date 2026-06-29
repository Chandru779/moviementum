import axios from "axios";
import appConfig from "../configs";

const wikiClient = axios.create({
  baseURL: "https://en.wikipedia.org/api/rest_v1/page/summary",
  timeout: 6000,
});

const tmdbClient = axios.create({
  baseURL: appConfig.tmdb_api_baseurl,
  params: { api_key: appConfig.tmdb_api_key },
  timeout: 8000,
});

const toWikiTitle = (name) => name.trim().replace(/\s+/g, "_");

const fetchWikipediaPhoto = async (name) => {
  try {
    const { data } = await wikiClient.get(`/${encodeURIComponent(toWikiTitle(name))}`);
    return data.thumbnail?.source || null;
  } catch {
    return null;
  }
};

const fetchTmdbCast = async (moviedbId) => {
  if (!moviedbId || !appConfig.tmdb_api_key) return null;
  try {
    const { data } = await tmdbClient.get(`/movie/${moviedbId}/credits`);
    if (!data?.cast?.length) return null;
    return data.cast.slice(0, 20).map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profile_path: member.profile_path || null,
    }));
  } catch {
    return null;
  }
};

const enrichWithWikipedia = async (cast) =>
  Promise.all(
    cast.map(async (person) => {
      if (person.profile_path) return person;
      const photo = await fetchWikipediaPhoto(person.name);
      return { ...person, profile_path: photo };
    })
  );

export const enrichCastWithImages = async (cast, moviedbId) => {
  if (!cast?.length) return [];

  const tmdbCast = await fetchTmdbCast(moviedbId);
  if (tmdbCast?.length) return tmdbCast;

  return enrichWithWikipedia(cast);
};
