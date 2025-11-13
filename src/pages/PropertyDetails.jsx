import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFeaturedPropertiesFromSanity from "../hooks/useFeaturedPropertiesFromSanity";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import emailjs from "@emailjs/browser";

Modal.setAppElement("#root");

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, loading, error } = useFeaturedPropertiesFromSanity();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // ✔️ ONLY ONE handleSubmit (duplicate removed)
  const handleSubmit = (e) => {
  e.preventDefault();

  const templateParams = {
    name: form.name,
    email: form.email,
    message: form.message,
  };

  emailjs
    .send(
      "service_xtpaerv",     // 🔹 Replace with your EmailJS Service ID
      "template_ng9yvws",    // 🔹 Replace with your Template ID
      templateParams,
      "rMecz2Ji6apXLw6As"       // 🔹 Replace with your Public Key
    )
    .then(
      () => {
        setSent(true);
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSent(false);
        }, 4000);
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Try again.");
      }
    );
    }

  // ⭐ Agent Information
  const agent = {
    name: "Nihal Tyagi",
    phone: "+919871991277",
    email: "agent@heavenproperties.com",
    photo: "/agent.png",
    whatsapp: "919871991277",
  };

  // 🔄 Still loading
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading property details...
      </div>
    );

  // ❌ Error while fetching
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading property: {error}
      </div>
    );

  // 🎯 Find property using _id
  const property = properties.find((p) => String(p._id) === String(id));

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-semibold mb-3">Property not found 🏡</h1>
        <Link to="/properties" className="text-blue-400 hover:underline">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  // 🎥 Video Renderer
  const renderVideo = (url) => {
  if (!url) return <p className="text-gray-500">No video available.</p>;

  try {
    let embedUrl = "";

    // ---- YOUTUBE FULL SUPPORT ----
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";

      // youtu.be short link
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
      }

      // standard watch?v=
      else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split(/[?&]/)[0];
      }

      // shorts
      else if (url.includes("shorts/")) {
        videoId = url.split("shorts/")[1].split(/[?&]/)[0];
      }

      // embed link
      else if (url.includes("/embed/")) {
        videoId = url.split("/embed/")[1].split(/[?&]/)[0];
      }

      // fallback if YouTube link without ID
      if (!videoId) return <p className="text-gray-500">Invalid YouTube link.</p>;

      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // ---- GOOGLE DRIVE ----
    else if (url.includes("drive.google.com")) {
      const match = url.match(/[-\w]{25,}/);
      if (match) embedUrl = `https://drive.google.com/file/d/${match[0]}/preview`;
    }

    // ---- VIMEO ----
    else if (url.includes("vimeo.com")) {
      const id = url.split("/").pop();
      embedUrl = `https://player.vimeo.com/video/${id}`;
    }

    // ---- STREAMABLE ----
    else if (url.includes("streamable.com")) {
      const id = url.split("/").pop();
      embedUrl = `https://streamable.com/e/${id}`;
    }

    // ---- MP4 ----
    else if (url.endsWith(".mp4")) {
      return (
        <video controls className="w-full rounded-lg">
          <source src={url} type="video/mp4" />
        </video>
      );
    }

    // If unsupported
    if (!embedUrl)
      return <p className="text-gray-500">Unsupported video format.</p>;

    // Final embed
    return (
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    );
  } catch {
    return <p className="text-gray-500">Error loading video.</p>;
  }
};


  // 🗺 Map
  const renderMap = () => {
    const lat = parseFloat(property.lat);
    const lng = parseFloat(property.lng);

    if (!isNaN(lat) && !isNaN(lng)) {
      const bbox = `${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}`;
      return (
        <iframe
          title="Property Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
          className="w-full h-80 rounded-lg"
        ></iframe>
      );
    }

    if (property.location) {
      return (
        <iframe
          title="Location Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            property.location
          )}&z=14&output=embed`}
          className="w-full h-80 rounded-lg"
        ></iframe>
      );
    }

    return <p>Map location not available.</p>;
  };

  const openModal = (i) => {
    setSelectedIndex(i);
    setIsOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the property "${property.name}".`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <Navbar />

      <div className="pt-28">
        
        {/* Images */}
<section className="max-w-6xl mx-auto px-6 py-10">

  {/* MOBILE SWIPE CAROUSEL */}
  <div className="md:hidden">
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={10}
      slidesPerView={1}
      className="rounded-xl"
    >
      {property.images?.length ? (
        property.images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={property.name}
              onClick={() => openModal(i)}
              className="rounded-xl w-full h-64 object-cover cursor-pointer shadow"
              loading="lazy"
            />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/600x400?text=No+Image"
            className="rounded-xl w-full h-64 object-cover"
            alt="No Image"
          />
        </SwiperSlide>
      )}
    </Swiper>
  </div>

  {/* DESKTOP 3-COLUMN GRID */}
  <div className="hidden md:grid md:grid-cols-3 gap-4">
    {property.images?.length ? (
      property.images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={property.name}
          onClick={() => openModal(i)}
          className="rounded-xl w-full h-48 sm:h-64 object-cover cursor-pointer shadow"
          loading="lazy"
        />
      ))
    ) : (
      <img
        src="https://via.placeholder.com/600x400?text=No+Image"
        className="rounded-xl w-full h-72 object-cover"
        alt="No Image"
      />
    )}
  </div>

  {/* FULLSCREEN MODAL */}
<Modal
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
  overlayClassName="fixed inset-0 bg-black/80 z-40"
  className="fixed inset-0 flex items-center justify-center z-50"
>
  <div className="relative w-full max-w-3xl mx-auto px-4">
    
    {/* Close Button */}
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-2 right-4 text-white text-3xl z-50"
    >
      ✕
    </button>

    {/* Fullscreen Slider */}
    <Swiper
      modules={[Navigation]}
      navigation
      initialSlide={selectedIndex}
      slidesPerView={1}
      spaceBetween={10}
      className="rounded-xl overflow-hidden"
    >
      {property.images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt=""
            className="w-full h-[80vh] object-contain rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>

  </div>
</Modal>


</section>


        {/* Details + Form */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-20">
          {/* LEFT */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow">
            <h1 className="text-3xl font-bold">{property.name}</h1>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>🏡 <b>Type:</b> {property.type}</li>
              <li>🛏 <b>Beds:</b> {property.beds}</li>
              <li>🛁 <b>Baths:</b> {property.baths}</li>
              <li>🍳 <b>Kitchen:</b> {property.kitchen}</li>
              <li>🏖 <b>Balcony:</b> {property.balcony}</li>
              <li>📐 <b>Size:</b> {property.size}</li>
              <li>📍 <b>Location:</b> {property.location}</li>
            </ul>

            {property.description && (
              <div className="bg-gray-50 p-5 rounded-xl mt-6">
                <h2 className="text-lg font-semibold mb-2">📝 Description</h2>
                <p>{property.description}</p>
              </div>
            )}

            {/* Video */}
            <div className="mt-8 bg-gray-50 p-5 rounded-xl">
              <h2 className="text-lg font-semibold mb-2">🎥 Video Tour</h2>
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
                {renderVideo(property.videoUrl)}
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 bg-gray-50 p-5 rounded-xl">
              <h2 className="text-lg font-semibold mb-2">📍 Map</h2>
              {renderMap()}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                rows="3"
                placeholder="Message"
                className="w-full p-3 border rounded-lg"
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                Send Message
              </button>

              {sent && <p className="text-blue-600 mt-2">Message sent! ✔</p>}
            </form>

            <a
              href={`https://wa.me/919871991277?text=${whatsappMessage}`}
              target="_blank"
              className="block text-center mt-6 bg-blue-600 text-white py-3 rounded-lg"
            >
              💬 Chat on WhatsApp
            </a>

            {/* AGENT SECTION */}
<div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Agent</h3>

  {/* Top Row: Image + Name + Phone */}
  <div className="flex items-center gap-4">
    <img
      src={agent.photo}
      alt={agent.name}
      className="w-20 h-20 rounded-full object-cover border shadow"
    />

    <div>
      <p className="text-lg font-semibold">{agent.name}</p>
      <p className="text-gray-700 font-medium">📞 {agent.phone}</p>
    </div>
  </div>

  {/* BUTTONS BELOW */}
  <div className="mt-6 flex flex-col gap-3">

    {/* Email Button */}
    <a
      href={`mailto:${agent.email}`}
      className="w-full bg-gray-700 text-white py-2 rounded-lg text-center hover:bg-gray-800 transition"
    >
      ✉️ Email Agent
    </a>

    {/* Call Button */}
    <a
      href={`tel:${agent.phone}`}
      className="w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition"
    >
      📞 Call Agent
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${agent.whatsapp}?text=Hi! I'm interested in ${property.name}`}
      target="_blank"
      className="w-full bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
    >
      💬 WhatsApp Agent
    </a>
  </div>
</div>


          </div>
        </section>
      </div>
    </div>
  );
}
