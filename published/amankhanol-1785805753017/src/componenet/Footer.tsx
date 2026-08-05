import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-b from-orange-50 to-white border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-2xl flex items-center justify-center shadow-lg">
                F
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Foodie
                  <span className="text-orange-500">Hub</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Premium Food Delivery
                </p>
              </div>
            </div>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Bringing delicious meals to your doorstep with
              lightning-fast delivery and premium service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link className="hover:text-orange-500 transition" to="/">
                Home
              </Link>
              <Link className="hover:text-orange-500 transition" to="/menu">
                Menu
              </Link>
              <Link className="hover:text-orange-500 transition" to="/cart">
                Cart
              </Link>
              <Link className="hover:text-orange-500 transition" to="/wishlist">
                Wishlist
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-600">
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-500" />
                +91 9876543210
              </p>

              <p className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500" />
                support@foodiehub.com
              </p>

              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500" />
                New Delhi, India
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-600 mb-4">
              Subscribe for offers & discounts
            </p>

            <div className="bg-white rounded-2xl p-2 shadow-md flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 outline-none rounded-2xl"
              />

              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-orange-100"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500 text-center">
            © 2026 FoodieHub. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;