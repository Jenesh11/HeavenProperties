import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Heaven <span className="text-green-600">Properties</span>
      </h1>
      <div className="space-x-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-green-600 transition">
          Home
        </Link>
        <Link to="/properties" className="hover:text-green-600 transition">
          Properties
        </Link>
        <Link to="/contact" className="hover:text-green-600 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}
