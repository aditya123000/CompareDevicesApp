import React from "react";
import Header from "../components/Global-components/Header";

const Home = () => {
  return (
    <>
      <Header/>

      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Device Comparison App
        </h1>

        <p className="mt-2 text-gray-600">
          Compare phones side by side
        </p>
      </div>
    </>
  );
};

export default Home;
