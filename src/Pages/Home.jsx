import React from "react";
import SearchBar from "../components/Global-components/SearchBar";

const Home = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Compare smartphones the smart way
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Find, compare, and choose the best device for your needs — all in one place.
        </p>
      </div>

      <SearchBar />
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">
            Search Devices
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Quickly find phones by brand or model.
          </p>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800">
            Compare Specs
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Compare key features side by side.
          </p>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800">
            Choose Confidently
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Make better decisions with clear data.
          </p>
        </div>
      </section>

    </section>
  );
};

export default Home;
