import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
    {/* 🏞️ Property Image */}
    <img
      src={property.image}
      alt={property.name}
      className="w-full h-52 object-cover"
    />

    {/* 📋 Info Section */}
    <div className="p-4">
      <h3 className="text-gray-900 font-semibold">{property.name}</h3>
      <p className="text-gray-500 text-sm">{property.location}</p>

      {/* 🏷️ Price — handles both string & number */}
      <p className="text-gray-700 font-bold mt-2">
        {typeof property.price === "number"
          ? `$${property.price.toLocaleString()}`
          : property.price}
      </p>

      {/* 🔗 View Property Link */}
      <Link
        to={`/property/${property.id}`}
        className="inline-block mt-3 text-sm text-blue-600 font-medium hover:text-blue-500"
      >
        View Property →
      </Link>
    </div>
  </div>
);

export default PropertyCard;
