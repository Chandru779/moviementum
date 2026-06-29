import appConfig from "../configs";

const PLACEHOLDER_POSTER = "/projects/no-poster.svg";
const PLACEHOLDER_BACKDROP = "/projects/no-backdrop.svg";
const PLACEHOLDER_PROFILE = "/projects/no-profile.svg";

export const getImageUrl = (pathOrUrl, type = "poster") => {
  if (!pathOrUrl) {
    if (type === "backdrop") return PLACEHOLDER_BACKDROP;
    if (type === "profile") return PLACEHOLDER_PROFILE;
    return PLACEHOLDER_POSTER;
  }

  if (pathOrUrl.startsWith("http")) {
    if (type === "poster" && pathOrUrl.includes("metahub.space/poster/small")) {
      return pathOrUrl.replace("/poster/small/", "/poster/medium/");
    }
    if (type === "backdrop" && pathOrUrl.includes("metahub.space/background/medium")) {
      return pathOrUrl.replace("/background/medium/", "/background/large/");
    }
    if (type === "backdrop" && pathOrUrl.includes("metahub.space/background/small")) {
      return pathOrUrl.replace("/background/small/", "/background/large/");
    }
    return pathOrUrl;
  }

  const size = appConfig.img_sizes[type] || appConfig.img_sizes.poster;
  return `${appConfig.img_path}/${size}${pathOrUrl}`;
};

export const formatRuntime = (minutes) => {
  if (!minutes) return "—";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};

export const formatCurrency = (amount) => {
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRating = (voteAverage) => {
  if (voteAverage == null) return "—";
  return Number(voteAverage).toFixed(1);
};

export const getTrailerVideo = (videos = []) => {
  if (!videos?.length) return null;
  return (
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find((v) => v.site === "YouTube") ||
    null
  );
};

export const getYoutubeVideos = (videos = []) =>
  videos.filter((v) => v.site === "YouTube");
