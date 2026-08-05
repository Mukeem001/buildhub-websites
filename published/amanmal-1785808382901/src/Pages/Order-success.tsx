import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Main */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <FaCheckCircle className="text-green-400 text-8xl mx-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]" />

          <p className="uppercase tracking-[6px] text-green-400 text-sm mt-8">
            Payment Successful
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mt-5 leading-tight">
            Order
            <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
              Confirmed
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
            Thank you for shopping with PureGlow. Your skincare essentials
            are now being prepared for shipment.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Order Summary
          </h2>

          <div className="space-y-5 text-gray-300">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Order ID</span>
              <span className="text-green-400 font-semibold">
                #PG2026001
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Payment Status</span>
              <span className="text-green-400 font-semibold">
                Paid Successfully
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Estimated Delivery</span>
              <span>3 - 5 Days</span>
            </div>

            <div className="flex justify-between pt-2 text-2xl font-bold text-white">
              <span>Total Paid</span>
              <span>₹1146</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <button
              onClick={() => navigate("/track-order")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>



        {/* Closing */}
        <div className="py-8 mt-14 text-center text-gray-500 border-t border-white/10">
          Order Confirmed • Fast Delivery • PureGlow 💚
        </div>
      </div>
    </div>
  );
}