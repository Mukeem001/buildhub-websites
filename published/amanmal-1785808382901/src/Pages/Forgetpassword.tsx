import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

export default function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(16,185,129,0.15)]"
      >
        {/* Heading */}
        <div className="text-center">
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            Account Recovery
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Forgot
            <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
              Password?
            </span>
          </h1>

          <p className="text-gray-400 mt-5 leading-8">
            Enter your registered email and we’ll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-5 top-5 text-gray-400" />

            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold hover:scale-[1.02] transition shadow-[0_0_35px_rgba(16,185,129,0.35)]"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-3"
        >
          <FaArrowLeft />
          Back To Login
        </button>
      </motion.div>
    </div>
  );
}