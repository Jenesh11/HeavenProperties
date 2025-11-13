import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import useFeaturedPropertiesFromSanity from "../hooks/useFeaturedPropertiesFromSanity";
import useAllPropertiesFromSanity from "../hooks/useAllPropertiesFromSanity";



export default function PropertiesPage() {
  const { properties, loading, error } = useAllPropertiesFromSanity();
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState([]);

  // 🎯 Filter logic (always from original properties, never cumulative)
  useEffect(() => {
    if (!Array.isArray(properties) || properties.length === 0) return;

    const normalize = (val) => (val || "").trim().toLowerCase();

    if (filter === "All") {
      setFiltered(properties);
    } else if (filter === "For Sale") {
      setFiltered(
        properties.filter(
          (p) =>
            normalize(p.purpose) === "for sale" ||
            normalize(p.type) === "for sale"
        )
      );
    } else if (filter === "For Rent") {
      setFiltered(
        properties.filter(
          (p) =>
            normalize(p.purpose) === "for rent" ||
            normalize(p.type) === "for rent"
        )
      );
    }
  }, [filter, properties]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading properties...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading data: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      {/* ✅ Floating Glass Navbar */}
      <Navbar />

      {/* ✅ Added top padding so navbar doesn’t overlap */}
      <div className="pt-28">
        {/* 🏡 Header Section */}
        <section className="max-w-7xl mx-auto px-10 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Explore <span className="text-blue-600">Properties</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Find your dream home — from cozy rentals to luxurious villas.
          </p>

          {/* 🟢 Filter Buttons */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {["All", "For Sale", "For Rent"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-5 py-2 rounded-lg font-medium border transition ${
                  filter === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 🏠 Property Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {filtered.map((property) => (
                <Link
                  key={property._id}
                  to={`/property/${property._id}`}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={property.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-5 text-left">
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-medium ${
                        (property.purpose || property.type || "")
                          .toLowerCase()
                          .includes("sale")
                          ? "bg-blue-100 text-blue-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {property.purpose || property.type || "Property"}
                    </span>

                    <h2 className="text-lg font-semibold mt-2 text-gray-800 truncate">
                      {property.name || "Unnamed Property"}
                    </h2>

                    <p className="text-sm text-gray-500 truncate">
                      {property.location || "Location not specified"}
                    </p>

                    <p className="text-blue-600 font-bold mt-2">
                      {property.price || "Price on request"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No properties found for this category.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
