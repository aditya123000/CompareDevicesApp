import React from "react";
import { NavLink } from "react-router-dom";


const linkClass=({isActive}) =>
  isActive
    ? "text-sky-400 font-semibold"
    : "text-slate-300 hover:text-sky-300";

const Navbar = () => {

  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left side: Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            className="size-11"
            src="/src/assets/logo.png"
            alt="SpecMine logo"
          />
          <h1 className="text-2xl font-bold text-sky-400">
            SpecMine
          </h1>
        </div>

        {/* Right side: Nav links */}
        <ul className="flex gap-8 text-gray-400 font-semibold">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/devices" end className={linkClass}>Devices</NavLink>
          <NavLink to="/compare" end className={linkClass}>Compare</NavLink>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
