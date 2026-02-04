import React from "react";
import SearchBar from "../components/Global-components/SearchBar";
import FeatureCard from "../components/Global-components/FeatureCard";

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* HERO SECTION */}
      <section className="bg-slate-800 rounded-xl p-8">
        <div className="max-w-2xl flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-slate-50 leading-tight">
            Compare smartphones the <span className="text-sky-400">smart</span> way
          </h1>

          <p className="text-slate-300 text-lg">
            Find, compare, and choose the best device for your needs — all in one place.
          </p>

          <SearchBar />
        </div>
      </section>

      {/* GUIDANCE SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <FeatureCard title="Search Devices" description="Quickly find phones by brand or model."/>
        <FeatureCard title="Compare Specs" description="Compare key features side by side."/>
        <FeatureCard title="Choose Confidently" description="Make better decisions with clear data."/>
      </section>
    </div>
  );
};

export default Home;
