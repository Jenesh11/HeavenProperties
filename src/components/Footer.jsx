import React from "react";

const Footer = () => (
  <footer className="bg-[#071428] text-gray-300 mt-16 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white text-lg font-semibold mb-3">Heaven Properties</h3>
        <p className="text-sm">Your trusted partner in premium real estate. Connecting buyers and sellers with verified listings.</p>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li>About</li>
          <li>Agents</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">Contact</h3>
        <p>Email: info@heavenprops.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 py-4 border-t border-white/10">
      © {new Date().getFullYear()} Heaven Properties. All rights reserved.
    </div>
  </footer>
);

export default Footer;
