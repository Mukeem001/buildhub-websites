import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-14 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[6px] text-green-400 text-sm"
        >
          Order Tracking
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mt-5"
        >
          Track Your
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Order
          </span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Stay updated with your skincare delivery in real time.
        </p>
      </section>

      {/* Search Box */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Enter Tracking ID
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g. PG458921"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
            />

            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold flex items-center justify-center gap-3 hover:scale-105 transition">
              <FaSearch />
              Track
            </button>
          </div>
        </div>
      </section>


            {/* Order Status */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side - Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-gray-400">Tracking ID</p>
                <h2 className="text-3xl font-bold">PG458921</h2>
              </div>

              <span className="px-5 py-2 rounded-full bg-green-500/20 border border-green-400 text-green-400 font-semibold">
                In Transit
              </span>
            </div>

            {/* Product */}
            <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800"
                alt="Product"
                className="w-full md:w-36 h-36 rounded-3xl object-cover"
              />

              <div className="flex-1">
                <p className="text-green-400">Premium Skincare Kit</p>
                <h3 className="text-2xl font-bold mt-2">
                  PureGlow Essentials Pack
                </h3>

                <p className="text-gray-400 mt-3">
                  Estimated Delivery: 26 June, 2026
                </p>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-8">Delivery Progress</h3>

              <div className="space-y-8">
                {[
                  "Order Confirmed",
                  "Packed Successfully",
                  "Shipped",
                  "Out For Delivery",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-6 h-6 rounded-full bg-green-400 shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
                    <p className="text-lg">{step}</p>
                  </div>
                ))}

                <div className="flex items-center gap-5 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                  <p className="text-lg">Delivered</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Courier Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 h-fit"
          >
            <h2 className="text-3xl font-bold mb-8">Courier Info</h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <p className="text-gray-500">Courier Partner</p>
                <h3 className="text-xl font-semibold mt-1">BlueDart Express</h3>
              </div>

              <div>
                <p className="text-gray-500">Current Location</p>
                <h3 className="text-xl font-semibold mt-1">Mumbai Hub</h3>
              </div>

              <div>
                <p className="text-gray-500">Expected Time</p>
                <h3 className="text-xl font-semibold mt-1">Tomorrow 4 PM</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    
      {/* Footer Closing */}
      <div className="py-8 text-center text-gray-500 border-t border-white/10">
        Fast Shipping • Live Tracking • PureGlow 💚
      </div>
    </div>
  );
}