import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useFeaturedPropertiesFromSanity from "../hooks/useFeaturedPropertiesFromSanity";
import emailjs from "@emailjs/browser";



export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  const templateParams = {
    name: form.name,
    email: form.email,
    message: form.message,
  };

  emailjs
    .send(
      "service_xtpaerv",
      "template_ng9yvws",
      templateParams,
      "rMecz2Ji6apXLw6As"
    )
    .then(() => {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Try again.");
    });
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      {/* ✅ Floating Glass Navbar */}
      <Navbar />

      {/* ✅ Prevent overlap with navbar */}
      <div className="pt-28">
        {/* Header Section */}
        <section className="max-w-6xl mx-auto text-center py-16 px-6">
          <h1 className="text-4xl font-bold mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions about buying, selling, or renting a property? Our team
            is here to help — contact us anytime and we’ll get back to you quickly.
          </p>
        </section>

        {/* Contact Form + Info */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-20">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message..."
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
              >
                Send Message
              </button>

              {sent && (
                <p className="text-blue-600 mt-3 font-medium">
                  ✅ Message sent successfully! 
                </p>
              )}
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="flex flex-col justify-between">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Contact Information
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  +91 9871991277
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  heavenproperties@gmail.com
                </li>
                <li>
                  <span className="font-semibold text-gray-800">Address:</span>{" "}
                  Chandigarh, India
                </li>
              </ul>
            </div>

            {/* Embedded Map */}
            <iframe
              title="Heaven Properties Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54872.0604247629!2d76.72951428512071!3d30.73234772146882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1762856871632!5m2!1sen!2sin"
              className="w-full h-72 rounded-2xl border-none shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Heaven <span className="text-blue-600">Properties</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Explore{" "}
              <span className="text-blue-600 font-semibold">
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
                  className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-500"
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
                  className="hover:text-blue-600 transition font-medium"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                📸{" "}
                <a
                  href="#"
                  className="hover:text-blue-600 transition font-medium"
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
