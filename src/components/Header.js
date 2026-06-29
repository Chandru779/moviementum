import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";

export const Header = ({ searchTab }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchValue = searchParams.get("search") || "";

  const handleSearch = (e) => {
    setSearchParams(e.target.value ? { search: e.target.value } : {});
  };

  const submitSearch = () => {
    navigate({
      pathname: "/mainpage",
      search: searchParams.toString(),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitSearch();
  };

  return (
    <header className="text-light py-3 px-[2%] tracking-wider flex justify-between items-center shrink-0">
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <p className="hidden sm:block font-inter font-extrabold text-light sm:text-2xl px-3 py-1">
          MovieMentum
        </p>
        <div
          title="MovieMentum"
          className="sm:hidden w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center font-inter font-bold text-primary"
        >
          M
        </div>
      </Link>

      {searchTab ? (
        <div
          title="Search movies"
          className="sm:w-1/2 md:w-1/3 lg:w-1/4 flex gap-2 justify-between items-center rounded-md px-3 bg-white/10 border border-grey focus-within:border-bright/50 transition-colors"
        >
          <input
            className="flex-1 sm:px-2 py-2 bg-transparent outline-none border-r border-grey text-light placeholder:text-grey/70"
            placeholder="Search your favourite movies"
            value={searchValue}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <IoSearch
            onClick={submitSearch}
            className="h-5 w-5 cursor-pointer hover:text-bright transition-colors"
            role="button"
            aria-label="Search"
          />
        </div>
      ) : (
        <button
          type="button"
          className="font-inter cursor-pointer flex gap-2 items-center border border-secondary bg-secondary px-3 py-1.5 rounded-lg hover:bg-secondary/80 transition-colors"
          onClick={() => navigate(-1)}
        >
          <TiArrowBackOutline className="h-5 w-5" />
          Back
        </button>
      )}
    </header>
  );
};
