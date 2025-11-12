import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFeaturedPropertiesFromSanity from "../hooks/useFeaturedPropertiesFromSanity.js";

export default function HomePage() {
  const { properties, loading, error } = useFeaturedPropertiesFromSanity();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading featured properties...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading data: {error}
      </div>
    );

  const featured = properties.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* ✅ Floating Glass Navbar */}
      <Navbar />

      {/* 🏠 Hero Banner Section */}
      <header className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <img
          src="/Gemini_Generated_Image_64xunp64xunp64xu.png"
          alt="Heaven Properties Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ✅ Smooth bottom fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent"></div>

        <div className="relative z-10 text-white px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <p className="text-lg mt-60 mb-10 max-w-2xl mx-auto text-gray-100">
            We are recognized for connecting clients with their perfect tailored
            sanctuary, delivering exceptional results with transparency and
            dedication.
          </p>
          <Link to="/properties">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition">
              View Properties
            </button>
          </Link>
        </div>
      </header>

      {/* 🏘 Property Category Cards */}
      <section className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-10 py-16">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            🏠 Buy Properties
          </h3>
          <p className="text-gray-600">
            Explore premium properties for sale tailored to your lifestyle.
            From modern apartments to luxury villas — find your dream home today.
          </p>
          <Link
            to="/properties"
            className="text-green-600 font-medium mt-3 inline-block"
          >
            Explore →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            🏢 Rent Properties
          </h3>
          <p className="text-gray-600">
            Explore top rental properties in prime locations. Choose from
            furnished apartments, cozy studios, or family homes.
          </p>
          <Link
            to="/properties"
            className="text-green-600 font-medium mt-3 inline-block"
          >
            Explore →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            🔍 Search Properties
          </h3>
          <p className="text-gray-600">
            Start your property search with ease. Use advanced filters to find
            homes, rentals, or deals that match your exact needs.
          </p>
          <Link
            to="/properties"
            className="text-green-600 font-medium mt-3 inline-block"
          >
            Explore →
          </Link>
        </div>
      </section>

      {/* 🏡 Featured Properties */}
      <section className="max-w-7xl mx-auto px-10 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Featured <span className="text-green-600">Properties</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.length > 0 ? (
            featured.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    property.images?.[0] ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {property.beds} Beds • {property.baths} Baths • {property.size}
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    {property.price || "Price on request"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No featured properties available right now.
            </p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/properties">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition">
              Load More Listings
            </button>
          </Link>
        </div>
      </section>

      {/* 🌿 Footer */}
      <footer className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Heaven <span className="text-green-600">Properties</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Explore{" "}
              <span className="text-green-600 font-semibold">
                Heaven Properties
              </span>{" "}
              with expert help. Find your perfect home or investment property
              today.
            </p>
            <div className="flex gap-3 mt-4">
              {["facebook", "twitter", "linkedin", "instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-500"
                >
                  <i className={`fab fa-${s}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Our Services</h4>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>Buying Assistance</li>
              <li>Market Analysis</li>
              <li>Property Valuation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Connect With Us</h4>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>
                📱{" "}
                <a
                  href="#"
                  className="hover:text-green-600 transition font-medium"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                📸{" "}
                <a
                  href="#"
                  className="hover:text-green-600 transition font-medium"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Contact Us</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>📞 +91 9871991277</li>
              <li>✉️ heavenproperties@gmail.com</li>
              <li>📍 Chandigarh, India</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-200 pt-5">
          © 2025 Heaven Properties. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
