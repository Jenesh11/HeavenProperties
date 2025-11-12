import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
  className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100]
  flex items-center justify-between w-[90%] md:w-[80%]
  px-8 py-4 rounded-full
  bg-white/15 backdrop-blur-lg border border-white/30 shadow-lg
  transition-all duration-300"
>
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">
        Heaven <span className="text-green-400">Properties</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-black font-medium">
        <Link
          to="/"
          className={`transition ${
            location.pathname === "/" ? "text-green-400" : "hover:text-green-400"
          }`}
        >
          Home
        </Link>

        <Link
          to="/properties"
          className={`transition ${
            location.pathname === "/properties"
              ? "text-green-400"
              : "hover:text-green-400"
          }`}
        >
          Properties
        </Link>

        <Link to="/contact">
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
          >
            Contact Us
          </button>
        </Link>
      </div>
    </nav>
  );
}
