import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-transparent">
              PureGlow mukeem
            </h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 text-gray-300 font-medium">
            <Link to="/">
              <li className="hover:text-green-300">Home</li>
            </Link>
            <Link to="/products">
              <li className="hover:text-green-300">Products</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-green-300">About</li>
            </Link>
            <Link to="/contact">
              <li className="hover:text-green-300">Contact</li>
            </Link>
          </ul>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/wishlist">
              <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaHeart />
              </button>
            </Link>

            <Link to="/cart">
              <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaShoppingCart />
              </button>
            </Link>

            <Link to="/profile">
              <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaUser />
              </button>
            </Link>

            <Link to="/login">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
