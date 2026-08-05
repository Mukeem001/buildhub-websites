import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHome,
  FaBriefcase,
  FaPlus,
  FaCheckCircle,
  FaPhoneAlt,
  FaStickyNote,
  FaCreditCard,
} from "react-icons/fa";

const Address = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("home");

  return (
    <div className="min-h-screen bg-[#f8f4ee] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Small Premium Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <p className="text-orange-500 font-semibold uppercase tracking-widest">
              Checkout
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
              Delivery Address
            </h1>
            <p className="text-gray-500 mt-3">
              Choose or add a delivery location
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <FaMapMarkerAlt className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-bold">New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Saved Address Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div
            onClick={() => setSelectedAddress("home")}
            className={`cursor-pointer rounded-3xl p-5 transition shadow-lg ${selectedAddress === "home"
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
              : "bg-white"
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <FaHome size={24} />
              </div>

              {selectedAddress === "home" && <FaCheckCircle size={24} />}
            </div>

            <h3 className="text-xl font-bold mt-5">Home</h3>
            <p className="mt-2 opacity-80 text-sm">
              House 123, Street 5, Delhi
            </p>
          </div>

          <div
            onClick={() => setSelectedAddress("office")}
            className={`cursor-pointer rounded-3xl p-5 transition shadow-lg ${selectedAddress === "office"
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
              : "bg-white"
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <FaBriefcase size={24} />
              </div>

              {selectedAddress === "office" && <FaCheckCircle size={24} />}
            </div>

            <h3 className="text-xl font-bold mt-5">Office</h3>
            <p className="mt-2 opacity-80 text-sm">
              Business Park, Sector 18
            </p>
          </div>


        </div>


        {/* FORM + SUMMARY WRAPPER */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT FORM */}
          <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl p-6 md:p-8">
            <div className="mb-8">
              <p className="text-orange-500 font-semibold uppercase tracking-wider">
                Details
              </p>
              <h2 className="text-3xl font-black mt-2 text-gray-900">
                Delivery Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  Full Name
                </label>
                <input
                  placeholder="Enter full name"
                  className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  Phone Number
                </label>

                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-5 text-gray-400" />
                  <input
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 pl-12 outline-none focus:border-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  City
                </label>
                <input
                  placeholder="Enter city"
                  className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  Zip Code
                </label>
                <input
                  placeholder="Zip Code"
                  className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                Complete Address
              </label>

              <textarea
                rows={5}
                placeholder="House / Apartment / Street / Landmark"
                className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none resize-none focus:border-orange-400"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                Delivery Notes
              </label>

              <div className="relative">
                <FaStickyNote className="absolute left-4 top-5 text-gray-400" />
                <input
                  placeholder="Optional notes"
                  className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 pl-12 outline-none focus:border-orange-400"
                />
              </div>
            </div>
          </div>


          {/* RIGHT SUMMARY */}
          <div className="h-fit sticky top-28">
            <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white">

              {/* Top */}
              <div className="bg-white/95 backdrop-blur-xl p-6 border-b border-gray-100 shadow-sm">
                <h2 className="text-2xl font-black tracking-tight text-gray-900">
                  Order Summary
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Review your payment details
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="space-y-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹699</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-gray-900">₹50</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>GST</span>
                    <span className="font-bold text-gray-900">₹20</span>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                    <p className="text-sm text-gray-500 mb-2">
                      Promo Code
                    </p>

                    <div className="flex gap-2">
                      <input
                        placeholder="Enter coupon"
                        className="flex-1 rounded-xl border px-3 py-2 outline-none"
                      />
                      <button className="px-4 rounded-xl bg-black text-white">
                        Apply
                      </button>
                    </div>
                  </div>

                  <hr />

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-gray-900">
                      Total
                    </span>

                    <span className="text-3xl font-black text-orange-500">
                      ₹769
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/payment")}
                  className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-3"
                >
                  <FaCreditCard />
                  Continue To Payment
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">
                  100% Secure Payment • Encrypted Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;