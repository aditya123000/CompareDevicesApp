import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          DeviceCompare
        </h1>

        <ul className="flex gap-8 text-gray-600 font-medium">
          <li className="cursor-pointer hover:text-black">Home</li>
          <li className="cursor-pointer hover:text-black">Devices</li>
          <li className="cursor-pointer hover:text-black">Compare</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
