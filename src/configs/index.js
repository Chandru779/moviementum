const appConfig = {
  provider: process.env.REACT_APP_MOVIE_PROVIDER || "cinemeta",

  cinemeta_baseurl: "https://v3-cinemeta.strem.io",

  tmdb_api_baseurl: "https://api.themoviedb.org/3",
  tmdb_api_key: process.env.REACT_APP_TMDB_API_KEY || "",

  img_path: "https://image.tmdb.org/t/p",
  img_sizes: {
    poster: "w500",
    backdrop: "w1280",
    profile: "w185",
    logo: "w92",
  },
  video_path: "https://www.youtube.com/watch?v=",
};

export default appConfig;
