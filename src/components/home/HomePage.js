import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import HeroBanner from "./HeroBanner";
import MovieRow from "./MovieRow";
import { getHomePageData } from "../../helpers";

const HomePage = () => {
  const [data, setData] = useState({ hero: null, rows: [] });
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const homeData = await getHomePageData();
      setData(homeData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-stream-bg">
      <Navbar />

      {status === "loading" && (
        <div className="pt-16">
          <div className="h-[75vh] skeleton" />
          <div className="px-[5%] mt-8 space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 skeleton rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="pt-32 flex flex-col items-center gap-4 px-4 text-center">
          <p className="text-xl font-semibold">Couldn&apos;t load movies</p>
          <p className="text-stream-muted">Please check your connection and try again.</p>
          <button
            type="button"
            onClick={load}
            className="px-6 py-2.5 bg-stream-accent hover:bg-stream-accent-hover rounded-md font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {status === "success" && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pt-0">
            <HeroBanner movie={data.hero} />
          </div>

          <div className="relative z-10 pb-16">
            {data.rows.map((row, i) => (
              <MovieRow
                key={row.id}
                id={row.id}
                title={row.title}
                movies={row.movies}
                genre={row.genre}
                overlapCards={i === 0}
              />
            ))}
          </div>
        </motion.main>
      )}
    </div>
  );
};

export default HomePage;
