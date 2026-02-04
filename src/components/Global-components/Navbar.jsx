import React from "react";
import { NavLink } from "react-router-dom";



const linkClass=({isActive}) =>
  isActive
    ? "text-black font-semibold"
    : "text-gray-600 hover:text-black";

const Navbar = () => {

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          DeviceCompare
        </h1>

        <ul className="flex gap-8 text-gray-600 font-medium">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/devices" end className={linkClass}>Devices</NavLink>
          <NavLink to="/compare" end className={linkClass}>Compare</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
