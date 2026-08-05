import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaEye } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <p className="uppercase tracking-[6px] text-green-400 text-sm">
              Welcome Back
            </p>

            <h1 className="text-6xl font-bold mt-5 leading-tight">
              Login To
              <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
                PureGlow
              </span>
            </h1>

            <p className="text-gray-400 mt-8 text-lg leading-8 max-w-xl">
              Access your orders, wishlist and premium skincare journey.
              Continue glowing with PureGlow.
            </p>

            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000"
              alt="Skincare"
              className="mt-10 rounded-[35px] shadow-2xl"
            />
          </motion.div>
          {/* Right Side / Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
              <h2 className="text-4xl font-bold text-center">
                Sign In
              </h2>

              <p className="text-gray-400 text-center mt-3">
                Login to continue your skincare journey
              </p>

              <form className="mt-8 space-y-6">

                {/* Email */}
                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <FaLock className="absolute left-5 top-5 text-gray-400" />
                  <FaEye className="absolute right-5 top-5 text-gray-400 cursor-pointer" />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <button onClick={() => navigate("/forgot-password")}>
                    Forgot Password?
                  </button>
                </div>
                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
                >
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-gray-500 text-sm">OR</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Google Login */}
                <button
                  type="button"
                  className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-3"
                >
                  <FaGoogle />
                  Continue with Google
                </button>
              </form>

              <p className="text-center text-gray-400 mt-8">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-green-400 hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}