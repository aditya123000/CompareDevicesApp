import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Global-components/Navbar";
import Footer from "../components/Global-components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
