import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineHome, HiOutlineFilm } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
  }, [location.pathname]);

  const submitSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-stream-bg/95 backdrop-blur-xl shadow-lg shadow-black/30"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-[4%] md:px-[5%] h-16 md:h-[68px]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 group">
            <span className="font-display text-3xl md:text-4xl tracking-wider text-stream-accent group-hover:text-stream-accent-hover transition-colors">
              MOVIEMENTUM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`flex items-center gap-1.5 transition-colors ${
                isHome ? "text-white" : "text-stream-muted hover:text-white"
              }`}
            >
              <HiOutlineHome className="text-base" />
              Home
            </Link>
            <Link
              to="/browse/Action"
              className={`flex items-center gap-1.5 transition-colors ${
                location.pathname.startsWith("/browse")
                  ? "text-white"
                  : "text-stream-muted hover:text-white"
              }`}
            >
              <HiOutlineFilm className="text-base" />
              Browse
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="flex items-center gap-2 animate-fade-in">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titles, genres..."
                className="w-40 sm:w-56 md:w-72 bg-stream-bg/80 border border-stream-border rounded px-3 py-1.5 text-sm text-white placeholder:text-stream-muted outline-none focus:border-stream-accent transition-colors"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-stream-muted hover:text-white transition-colors"
              >
                <IoClose className="text-xl" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-stream-accent transition-colors p-1"
              aria-label="Search"
            >
              <IoSearch className="text-xl" />
            </button>
          )}

          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-stream-accent to-purple-600 flex items-center justify-center text-xs font-bold cursor-default">
            M
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
