import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Neem Face Wash",
    price: "₹299",
    rating: "4.8",
    category: "Acne Care",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
  },
  {
    id: 2,
    name: "Vitamin C Cleanser",
    price: "₹399",
    rating: "4.9",
    category: "Glow",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
  },
  {
    id: 3,
    name: "Aloe Vera Wash",
    price: "₹349",
    rating: "4.7",
    category: "Hydration",
    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800",
  },
  {
    id: 4,
    name: "Charcoal Cleanser",
    price: "₹449",
    rating: "4.9",
    category: "Deep Clean",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
  },
  {
    id: 5,
    name: "Tea Tree Face Wash",
    price: "₹379",
    rating: "4.8",
    category: "Oily Skin",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
  },
  {
    id: 6,
    name: "Gold Glow Cleanser",
    price: "₹599",
    rating: "5.0",
    category: "Luxury",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800",
  },
];

export default function Products() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-20 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[150px] rounded-full" />
      <div className="fixed bottom-20 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[150px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-14 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-center"
        >
          Our Premium
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Products
          </span>
        </motion.h1>

        <p className="text-center text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
          Luxury skincare products crafted with botanical science for healthy radiant skin.
        </p>
      </section>

      {/* Search */}
      <section className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="relative">
          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search Products..."
            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl outline-none focus:border-green-400"
          />
        </div>
      </section>
            {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex gap-4 flex-wrap justify-center">
          {["All", "Glow", "Hydration", "Acne", "Luxury"].map((item) => (
            <button
              key={item}
              onClick={() => navigate("/products")}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-green-500 hover:border-green-500 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -12 }}
              className="group rounded-[35px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-all"
            >
              <div className="overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    {product.rating}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-4">
                  {product.name}
                </h2>

                <p className="text-green-400 text-2xl mt-3 font-semibold">
                  {product.price}
                </p>

                <Link to="/cart">
                  <button className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center gap-3">
                    <FaShoppingCart />
                    Add To Cart
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    

      {/* Stats */}
      <section className="py-20 bg-white/[0.03] border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-bold text-green-400">50K+</h3>
            <p className="text-gray-400 mt-3">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">4.9</h3>
            <p className="text-gray-400 mt-3">Average Rating</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">100+</h3>
            <p className="text-gray-400 mt-3">Cities Served</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">24/7</h3>
            <p className="text-gray-400 mt-3">Support</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Loved By Customers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Best face wash I’ve ever used. My skin feels super fresh.",
            "Premium quality and amazing fragrance. Worth every rupee.",
            "My acne reduced a lot after using PureGlow regularly.",
          ].map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="rounded-[35px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
            >
              <p className="text-green-400 text-xl mb-4">★★★★★</p>
              <p className="text-gray-300 leading-8">{review}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="rounded-[40px] p-10 md:p-20 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-white/10 backdrop-blur-xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold">
            Get Exclusive Offers
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Subscribe for discounts, skincare tips & new launches.
          </p>

          <div className="max-w-2xl mx-auto mt-10 flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
            />

            <button
              onClick={() => alert("Subscribed Successfully!")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition font-semibold"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}