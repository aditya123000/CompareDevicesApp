import React from "react";
import SearchBar from "../components/Global-components/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* HERO SECTION */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="max-w-2xl flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Compare smartphones the smart way
          </h1>

          <p className="text-gray-600 text-lg">
            Find, compare, and choose the best device for your needs — all in one place.
          </p>

          <SearchBar />
        </div>
      </section>

      {/* GUIDANCE SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold text-gray-800">
            Search Devices
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Quickly find phones by brand or model.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold text-gray-800">
            Compare Specs
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Compare key features side by side.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold text-gray-800">
            Choose Confidently
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Make better decisions with clear data.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
