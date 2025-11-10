import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import usePropertiesFromSheet from "../hooks/usePropertiesFromSheet";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

Modal.setAppElement("#root");

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, loading, error } = usePropertiesFromSheet();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading property details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading property: {error}
      </div>
    );

  const property = properties.find((p) => String(p.id) === String(id));
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-semibold mb-3">Property not found 🏡</h1>
        <Link to="/properties" className="text-green-400 hover:underline">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  // ✅ Enhanced Video Renderer (Fixes YouTube Shorts / Watch / Embed)
  const renderVideo = (url) => {
    if (!url) return <p className="text-gray-500">No video available.</p>;

    try {
      let embedUrl = "";

      if (url.includes("youtu")) {
        // Handle various YouTube formats
        let videoId = "";
        if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("watch?v=")) {
          videoId = url.split("watch?v=")[1].split("&")[0];
        } else if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1].split("?")[0];
        } else if (url.includes("embed/")) {
          videoId = url.split("embed/")[1].split("?")[0];
        }

        embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      } else if (url.includes("vimeo.com")) {
        const vimeoId = url.split("/").pop();
        embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=0`;
      } else if (url.includes("drive.google.com")) {
        const fileIdMatch = url.match(/[-\w]{25,}/);
        const fileId = fileIdMatch ? fileIdMatch[0] : null;
        embedUrl = fileId
          ? `https://drive.google.com/file/d/${fileId}/preview`
          : url;
      } else if (url.includes("streamable.com")) {
        const streamId = url.split("/").pop();
        embedUrl = `https://streamable.com/e/${streamId}`;
      } else if (url.endsWith(".mp4")) {
        return (
          <video controls autoPlay loop muted className="w-full rounded-lg">
            <source src={url} type="video/mp4" />
          </video>
        );
      }

      if (!embedUrl)
        return <p className="text-gray-500">Unsupported video format.</p>;

      return (
        <iframe
          src={embedUrl}
          title="Property Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        ></iframe>
      );
    } catch (err) {
      console.error("Video parsing error:", err);
      return <p className="text-gray-500">Error loading video.</p>;
    }
  };

  // ✅ Smart Map Renderer
  const renderMap = () => {
    const lat = parseFloat(property.lat);
    const lng = parseFloat(property.lng);

    if (!isNaN(lat) && !isNaN(lng)) {
      const bbox = `${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}`;
      return (
        <>
          <iframe
            title="Property Location"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
            className="w-full h-80 rounded-lg border-none shadow-md"
            loading="lazy"
            allowFullScreen
          ></iframe>
          <div className="text-center mt-4">
            <a
              href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-green-600 hover:text-green-700 font-medium"
            >
              🗺️ Open in OpenStreetMap
            </a>
          </div>
        </>
      );
    }

    if (property.location) {
      return (
        <>
          <iframe
            title="Property Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.location + ", India"
            )}&z=14&output=embed`}
            className="w-full h-80 rounded-lg border-none shadow-md"
            loading="lazy"
            allowFullScreen
          ></iframe>
          <div className="text-center mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                property.location + ", India"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-green-600 hover:text-green-700 font-medium"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </>
      );
    }

    return <p className="text-gray-500">Map location not available.</p>;
  };

  // ✅ Image Modal Controls
  const openModal = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <Navbar />

      {/* 🏞️ Image Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {Array.isArray(property.images) && property.images.length > 0 ? (
            property.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={property.name}
                className="rounded-xl w-full h-72 object-cover shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => openModal(i)}
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/600x400?text=No+Image+Available"
              alt="No Image"
              className="rounded-xl w-full h-72 object-cover shadow-sm"
            />
          )}
        </div>

        {/* 🖼️ Fullscreen Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-sm"
          overlayClassName="fixed inset-0 bg-black/80 z-40"
        >
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-white text-2xl font-bold z-50 hover:text-green-400"
            >
              ✕
            </button>

            <Swiper
              modules={[Navigation]}
              navigation
              initialSlide={selectedIndex}
              spaceBetween={20}
              slidesPerView={1}
              className="w-full rounded-lg overflow-hidden"
            >
              {property.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-[80vh] object-contain rounded-lg"
                  />
                  <p className="text-center text-white mt-3 text-sm opacity-75">
                    Image {index + 1} of {property.images.length}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Modal>
      </section>

      {/* 🏡 Property Info + Video + Map + Contact */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-20">
        {/* Left: Info */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {property.name}
          </h1>

          <ul className="text-gray-700 mb-6 space-y-2">
            <li>
              🏡 <strong>Type:</strong> {property.type}{" "}
              {property.purpose ? (
                <span className="text-gray-500">• {property.purpose}</span>
              ) : null}
            </li>
            <li>🛏️ <strong>Beds:</strong> {property.beds}</li>
            <li>🛁 <strong>Baths:</strong> {property.baths}</li>
            <li>
              🍳 <strong>Kitchen:</strong>{" "}
              {property.kitchen || property.Kitchen || "N/A"}
            </li>
            <li>
              🏖️ <strong>Balcony:</strong>{" "}
              {property.balcony || property.Balcony || "N/A"}
            </li>
            <li>📐 <strong>Size:</strong> {property.size}</li>
            <li>📍 <strong>Location:</strong> {property.location}</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            {property.description}
          </p>

          {/* 🎥 Video */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              🎥 Video Tour
            </h2>
            <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-md">
              {renderVideo(property.videoUrl)}
            </div>
          </div>

          {/* 🗺️ Map */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">📍 Map</h2>
            {renderMap()}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            Interested in this property? Get in touch with us for more details
            or to schedule a visit.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <textarea
              rows="3"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
