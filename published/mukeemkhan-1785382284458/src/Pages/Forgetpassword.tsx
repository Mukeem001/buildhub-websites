import React, { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    alert(`Reset link sent to ${email} ✅`);
  };

  return (
    <div className="min-h-screen bg-[#f8f4ee] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-[#111] via-[#1f1f1f] to-black p-12 text-white flex-col justify-between overflow-hidden">
          
          <div className="absolute top-10 left-10 w-52 h-52 rounded-full bg-orange-500/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-red-500/20 blur-3xl"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
              <FaLock className="text-3xl text-orange-400" />
            </div>

            <h1 className="text-5xl font-black mt-8 leading-tight">
              Forgot Your
              <span className="block text-orange-400">
                Password?
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8 max-w-md">
              No worries. Enter your email and we’ll send a secure reset link.
            </p>
          </div>

          <p className="relative z-10 text-gray-500 text-sm">
            Premium Secure Recovery
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 text-gray-500 hover:text-black mb-8 font-semibold"
          >
            <FaArrowLeft />
            Back to Login
          </button>

          <div>
            <p className="uppercase tracking-[4px] text-orange-500 font-bold text-sm">
              Recovery
            </p>

            <h2 className="text-4xl font-black mt-3">
              Reset Password
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              Enter your registered email address to receive password reset instructions.
            </p>
          </div>

          {/* Input */}
          <div className="mt-10">
            <label className="block font-semibold text-gray-700 mb-3">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-5 top-5 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f8f4ee] rounded-2xl border border-gray-200 py-4 pl-14 pr-4 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleReset}
            className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition"
          >
            Send Reset Link
          </button>

          <div className="mt-8 p-5 rounded-2xl bg-orange-50 border border-orange-100">
            <p className="text-sm text-gray-600 leading-6">
              You’ll receive a password reset email within a few minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;