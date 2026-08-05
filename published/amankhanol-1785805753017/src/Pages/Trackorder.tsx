import React from "react";

const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-[#f8f4ee] py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-orange-500 font-bold text-sm">
            Live Delivery
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
            Track Your Order
          </h1>

          <p className="text-gray-500 mt-3">
            Your delicious meal is almost there
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Route Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="uppercase tracking-[3px] text-gray-400 text-sm font-semibold">
                    Live Tracking
                  </p>

                  <h2 className="text-3xl font-black mt-2">
                    Order On The Way
                  </h2>
                </div>

                <div className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold">
                  8 mins
                </div>
              </div>

              {/* Route */}
              <div className="relative py-12">
                <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>

                <div className="absolute top-1/2 left-[65%] -translate-y-1/2 text-4xl animate-bounce">
                  🛵
                </div>

                <div className="flex justify-between relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl shadow-lg">
                      🍔
                    </div>
                    <p className="mt-3 font-semibold">Restaurant</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl shadow-lg">
                      🏠
                    </div>
                    <p className="mt-3 font-semibold">Home</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-xl">
              <h3 className="text-2xl font-black mb-8">
                Delivery Progress
              </h3>

              <div className="space-y-6">

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-semibold text-lg">
                    Order Confirmed
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-semibold text-lg">
                    Food Prepared
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="font-semibold text-lg text-orange-500">
                    Rider Nearby
                  </span>
                </div>

                <div className="flex items-center gap-4 opacity-40">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span className="font-semibold text-lg">
                    Delivered
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Delivery Partner */}
            <div className="bg-[#111111] text-white rounded-[32px] p-6 shadow-xl">
              <p className="text-gray-400 text-sm">
                Delivery Partner
              </p>

              <h3 className="text-2xl font-black mt-2">
                Rahul • ID 245
              </h3>

              <p className="text-gray-400 mt-2">
                Premium Delivery Rider
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 transition">
                  Call
                </button>

                <button className="py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition">
                  Locate
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-[32px] p-6 shadow-xl">
              <h3 className="text-2xl font-black mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-semibold">#ORD2048</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Items</span>
                  <span className="font-semibold">3</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Time</span>
                  <span className="font-semibold text-orange-500">
                    8 mins
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-black">
                  <span>Total Paid</span>
                  <span className="text-orange-500">₹769</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;