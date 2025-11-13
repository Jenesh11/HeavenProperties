import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100]
        flex items-center justify-between w-[90%] md:w-[80%]
        px-8 py-4 rounded-full
        bg-white/15 backdrop-blur-lg border border-white/30 shadow-lg
        transition-all duration-300"
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          Heaven <span className="text-blue-400">Properties</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black font-medium">
          <Link
            to="/"
            className={`transition ${
              location.pathname === "/"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            Home
          </Link>

          <Link
            to="/properties"
            className={`transition ${
              location.pathname === "/properties"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            Properties
          </Link>

          <Link to="/contact">
            <button className="bg-blue-400 hover:bg-blue-400 text-white px-5 py-2 rounded-full font-semibold shadow-md transition">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          className="md:hidden fixed top-[90px] left-1/2 transform -translate-x-1/2 
          w-[90%] bg-white/20 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl py-6 flex flex-col items-center gap-6 text-black 
          font-medium z-[99] animate-fadeIn"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`text-lg ${
              location.pathname === "/"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            Home
          </Link>

          <Link
            to="/properties"
            onClick={() => setOpen(false)}
            className={`text-lg ${
              location.pathname === "/properties"
                ? "text-blue-400"
                : "hover:text-blue-400"
            }`}
          >
            Properties
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-full font-semibold shadow-md transition">
              Contact Us
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
