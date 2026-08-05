import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const wishlistItems = [
  {
    id: 1,
    name: "Neem Face Wash",
    price: "₹299",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
  },
  {
    id: 2,
    name: "Vitamin C Cleanser",
    price: "₹399",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
  },
  {
    id: 3,
    name: "Glow Serum",
    price: "₹699",
    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800",
  },
];

export default function Wishlist() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-14 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[6px] text-green-400 text-sm"
        >
          Saved Products
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mt-5"
        >
          Your
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Wishlist
          </span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-9">
          Keep track of your favorite skincare products and shop anytime.
        </p>
      </section>

            {/* Wishlist Items */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group rounded-[35px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-all"
            >
              {/* Image */}
              <div className="overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />

                <button className="absolute top-4 right-4 p-3 rounded-full bg-red-500/80 hover:bg-red-500 transition">
                  <FaTrash />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-pink-400 mb-3">
                  <FaHeart />
                  <span>Saved Item</span>
                </div>

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-green-400 text-2xl font-semibold mt-3">
                  {item.price}
                </p>

                <button className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition">
                  <FaShoppingCart />
                  Add To Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


            {/* Empty Wishlist State */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl p-10 md:p-16 text-center"
        >
          <div className="text-6xl mb-6">💚</div>

          <h2 className="text-3xl md:text-5xl font-bold">
            Love More Products
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-8 max-w-2xl mx-auto">
            Add your favorite skincare essentials to wishlist and purchase them later anytime.
          </p>

         <a href="/products">
            <button className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:scale-105 transition">
              Explore Products
            </button>
          </a>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/[0.03] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          
          <div>
            <h3 className="text-5xl font-bold text-green-400">25K+</h3>
            <p className="text-gray-400 mt-3">Wishlist Saves</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">10K+</h3>
            <p className="text-gray-400 mt-3">Orders Delivered</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">4.9</h3>
            <p className="text-gray-400 mt-3">Customer Rating</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">24/7</h3>
            <p className="text-gray-400 mt-3">Support</p>
          </div>
        </div>
      </section>

            {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[45px] bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-700/20 border border-white/10 backdrop-blur-xl p-10 md:p-20 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Ready To Shop <br /> Your Favorites?
          </h2>

          <p className="text-gray-300 mt-8 text-lg max-w-3xl mx-auto leading-9">
            Your wishlist is waiting. Grab your favorite skincare essentials
            and start your glow journey today.
          </p>

          <button className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 transition">
            Shop Now
          </button>
        </motion.div>
      </section>

      {/* Closing */}
      <div className="py-8 text-center text-gray-500 border-t border-white/10">
        Crafted with 💚 by PureGlow
      </div> 
      </div>
  );
}

