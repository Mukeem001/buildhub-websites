import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";

interface NavbarProps {
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl flex items-center justify-center shadow-lg">
            F
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Foodie<span className="text-orange-500">Hub</span>
            </h1>
            <p className="text-xs text-gray-500">
              Premium Food Delivery mukeem
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-3 w-[320px] shadow-inner">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search food..."
            className="bg-transparent ml-3 w-full outline-none"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-full hover:bg-orange-50 hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="px-4 py-2 rounded-full hover:bg-orange-50 hover:text-orange-500 transition"
          >
            Menu
          </Link>

          <Link
            to="/wishlist"
            className="px-4 py-2 rounded-full hover:bg-orange-50 hover:text-orange-500 transition"
          >
            Wishlist
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative bg-orange-500 text-white p-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <FaShoppingCart size={20} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="bg-gray-100 p-3 rounded-2xl hover:bg-orange-100 transition"
          >
            <FaUser size={20} />
          </Link>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-5 py-5 border-t">
          <div className="flex flex-col gap-4">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>

            <button
              onClick={() => navigate("/login")}
              className="border border-orange-500 py-3 rounded-xl text-orange-500"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 py-3 rounded-xl text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;