import { FaRocket } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const HERO_IMAGE =
  "https://images.metahub.space/background/medium/tt0111161/img";

const LandingPage = () => {
  return (
    <section className="h-screen bg-dark bg-[url('https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg')] bg-cover bg-no-repeat flex flex-col">
      <Header searchTab={true} />
      <main className="h-full flex flex-col-reverse overflow-y-auto md:flex-row px-4 md:px-[6%] py-2">
        <motion.div
          className="h-full w-full py-2 lg:w-1/2 text-light pt-2 md:pt-20 flex flex-col gap-4 md:gap-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-inter font-extrabold tracking-wide text-lg sm:text-2xl md:text-6xl bg-gradient-to-br from-grey to-light bg-clip-text text-transparent">
            Every click unveils a world of endless stories
          </h1>
          <p className="font-inter font-medium text-sm sm:text-lg tracking-wider text-grey">
            Unlock the tales of time, where every click opens a portal to a
            world of endless stories where past, present, and future converge in
            the digital tapestry of our streaming dreams
          </p>
          <NavLink
            to="/mainpage"
            className="text-light w-fit font-inter font-medium bg-gradient-to-r from-grey via-bright to-grey rounded-full border border-b-2 border-grey bg-clip-border border-b-transparent transition duration-200 hover:scale-95"
          >
            <button className="flex items-center gap-2 py-2 sm:py-4 px-8 bg-black rounded-full">
              <FaRocket />
              Explore movies
            </button>
          </NavLink>
        </motion.div>

        <motion.div
          className="md:hidden block lg:block h-full w-full lg:w-1/2 self-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LazyLoadImage
            alt="Featured movie"
            width="auto"
            height="auto"
            effect="blur"
            className="h-full w-full object-contain hover:scale-[1.02] transition-transform duration-300 ease-out"
            src={HERO_IMAGE}
          />
        </motion.div>
      </main>
    </section>
  );
};

export default LandingPage;
