import React from "react";
import SearchBar from "../components/Global-components/SearchBar";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">
        Compare Devices Easily
      </h1>

      <p className="mt-2 text-gray-600 max-w-xl">
        Find and compare smartphones side by side.
      </p>

      <div className="mt-6">
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
