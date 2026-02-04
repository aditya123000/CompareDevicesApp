import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by brand or model"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-50 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;