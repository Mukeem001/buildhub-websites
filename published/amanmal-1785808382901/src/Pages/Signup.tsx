import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaGoogle,
} from "react-icons/fa";

export default function Signup() {
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
                            Join PureGlow
                        </p>

                        <h1 className="text-6xl font-bold mt-5 leading-tight">
                            Create Your
                            <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
                                Account
                            </span>
                        </h1>

                        <p className="text-gray-400 mt-8 text-lg leading-8 max-w-xl">
                            Join thousands of skincare lovers and begin your premium beauty journey.
                        </p>

                        <img
                            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000"
                            alt="Signup"
                            className="mt-10 rounded-[35px] shadow-2xl"
                        />
                    </motion.div>
                    {/* Right Side / Signup Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-xl mx-auto"
                    >
                        <div className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                            <h2 className="text-4xl font-bold text-center">
                                Sign Up
                            </h2>

                            <p className="text-gray-400 text-center mt-3">
                                Create your PureGlow account
                            </p>

                            <form className="mt-8 space-y-6">

                                {/* Name */}
                                <div className="relative">
                                    <FaUser className="absolute left-5 top-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                                    />
                                </div>

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
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <FaLock className="absolute left-5 top-5 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                                    />
                                </div>
                                {/* Signup Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
                                >
                                    Create Account
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-white/10"></div>
                                    <span className="text-gray-500 text-sm">OR</span>
                                    <div className="flex-1 h-px bg-white/10"></div>
                                </div>

                                {/* Google Signup */}
                                <button
                                    type="button"
                                    className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-3"
                                >
                                    <FaGoogle />
                                    Continue with Google
                                </button>
                            </form>
                            <p className="text-center text-gray-400 mt-8">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-green-400 hover:underline font-semibold"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}