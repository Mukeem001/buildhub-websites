import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 via-white to-orange-50">

      {/* Login Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">

        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:block relative">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
              alt="Food"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-10">

              <h1 className="text-5xl font-bold">
                FoodieHub
              </h1>

              <p className="mt-5 text-xl text-center">
                Fresh Food Delivered
                <br />
                To Your Doorstep
              </p>

            </div>

          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            <div className="text-center mb-8">

              <h2 className="text-4xl font-bold text-gray-800">
                Welcome Back 👋
              </h2>

              <p className="text-gray-500 mt-2">
                Login to continue your food journey
              </p>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="font-medium text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-orange-500">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none"
                />

              </div>

            </div>

            {/* Password */}
            <div className="mb-5">

              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-orange-500">

                <FaLock className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-6 text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-orange-500 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition">
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-8">

              <div className="flex-1 h-[1px] bg-gray-300"></div>

              <span className="px-4 text-gray-500">
                OR
              </span>

              <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">

              <button className="border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <FaGoogle />
                Google
              </button>

              <button className="border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <FaFacebookF />
                Facebook
              </button>

            </div>

            {/* Signup */}
            <p className="text-center mt-8 text-gray-600">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

      {/* Footer */}
     

    </div>
  );
};

export default Login;