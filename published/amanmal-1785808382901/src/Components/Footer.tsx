import React from "react";

const Footer = () => {
  return (
<footer className="relative mt-20 border-t border-white/10 bg-gradient-to-b from-[#081814] to-black">
      <div className="absolute left-20 top-10 w-72 h-72 bg-green-500/10 blur-[150px] rounded-full" />
      <div className="absolute right-20 bottom-10 w-72 h-72 bg-emerald-400/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            PureGlow
          </h2>

          <p className="text-gray-400 mt-6 leading-8">
            Premium skincare designed to elevate your everyday glow.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Shop</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-green-400 cursor-pointer transition">Face Wash</li>
            <li className="hover:text-green-400 cursor-pointer transition">Cleanser</li>
            <li className="hover:text-green-400 cursor-pointer transition">Moisturizer</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Company</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-green-400 cursor-pointer transition">About</li>
            <li className="hover:text-green-400 cursor-pointer transition">Contact</li>
            <li className="hover:text-green-400 cursor-pointer transition">Support</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Newsletter</h3>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-2xl px-4 py-4 bg-white/10 border border-white/10 outline-none focus:border-green-400"
          />

          <button className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2026 PureGlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

