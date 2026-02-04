import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DeviceCompare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
