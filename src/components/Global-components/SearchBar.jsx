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
          className="text-lg text-gray-800 placeholder-gray-600 w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;