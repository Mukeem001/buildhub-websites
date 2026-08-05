import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaLocationArrow,
} from "react-icons/fa";

export default function Address() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04110c] via-[#071712] to-[#020303] text-white overflow-hidden">

      {/* Background */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center relative z-10">
        <p className="uppercase tracking-[6px] text-green-400 text-sm">
          Delivery Address
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mt-5">
          Saved
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Addresses
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Manage your delivery locations with premium fast checkout experience.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 pb-20">

        {/* LEFT */}
        <div className="space-y-8">
          {/* Home Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[35px] p-[1px] bg-gradient-to-r from-green-400 to-emerald-600"
          >
            <div className="rounded-[35px] bg-[#081814] p-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <FaHome className="text-green-400 text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">Home</h3>
                    <p className="text-green-400 text-sm">Default Address</p>
                  </div>
                </div>

                <FaCheckCircle className="text-green-400 text-2xl" />
              </div>

              <p className="text-gray-300 mt-6 leading-8">
                Ahmad Sheikh <br />
                Street 21, Andheri West <br />
                Mumbai, Maharashtra - 400058
              </p>
            </div>
          </motion.div>

          {/* Office Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <FaBuilding className="text-green-400 text-2xl" />
              </div>

              <h3 className="text-2xl font-bold">Office</h3>
            </div>

            <p className="text-gray-300 mt-6 leading-8">
              BKC Business Park <br />
              Bandra East <br />
              Mumbai - 400051
            </p>
          </motion.div>
        </div>
        {/* RIGHT : Premium Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
        >
          <h2 className="text-3xl font-bold mb-8">
            Add New Address
          </h2>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
            />

            <textarea
              rows={4}
              placeholder="Street Address"
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none resize-none focus:border-green-400"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="City"
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <input
                type="text"
                placeholder="Pincode"
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />
            </div>

          

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
            >
              Save Address
            </button>
          </form>

          {/* Mini Map */}
        
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[45px] bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-700/20 border border-white/10 backdrop-blur-xl p-10 md:p-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold">
            Fast & Secure Delivery
          </h2>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg leading-8">
            Your skincare essentials delivered safely and quickly to your doorstep.
          </p>

          <button
            onClick={() => navigate("/payment")}
            className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:scale-105 transition"
          >
            Continue Checkout
          </button>
        </div>
      </section>
    </div>
  );
}