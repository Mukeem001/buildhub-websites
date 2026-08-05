import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Payment() {
    const navigate = useNavigate();
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
          Secure Payment
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mt-5"
        >
          Complete Your
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Payment
          </span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Choose your preferred payment method and complete checkout
          securely.
        </p>
      </section>

      {/* Payment Layout */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Payment Form */}
          <div className="lg:col-span-2 rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-8">Payment Details</h2>

            {/* Payment Methods */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button className="py-4 rounded-2xl border border-green-400 bg-green-500/20">
                Card
              </button>
              <button className="py-4 rounded-2xl border border-white/10 bg-white/5">
                UPI
              </button>
              <button className="py-4 rounded-2xl border border-white/10 bg-white/5">
                Wallet
              </button>
              <button className="py-4 rounded-2xl border border-white/10 bg-white/5">
                COD
              </button>
            </div>

            {/* Card Form */}
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                />

                <input
                  type="password"
                  placeholder="CVV"
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-green-400"
                />
              </div>
            </form>
          </div>

          {/* Right Side - Summary */}
          <div className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 h-fit sticky top-28">
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

            <div className="space-y-5 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹1097</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹99</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-400">-₹50</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-bold text-white">
                <span>Total</span>
                <span>₹1146</span>
              </div>
            </div>

            {/* Secure Payment Badges */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-green-400">✔</span>
                256-bit SSL Secure Payment
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-green-400">✔</span>
                100% Safe Transaction
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-green-400">✔</span>
                Instant Payment Confirmation
              </div>
            </div>

            {/* Pay Button */}
            <button
  onClick={() => navigate("/order-success")}
  className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
>
  Pay Now
</button>
           <button
  onClick={() => navigate("/address")}
  className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
>
  Back To Address
</button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[45px] p-10 md:p-20 text-center border border-white/10 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-700/20 backdrop-blur-xl">
          <h2 className="text-4xl md:text-6xl font-bold">Secure & Fast Checkout</h2>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
            Complete your payment and enjoy premium skincare delivered to your
            doorstep.
          </p>
        </div>
      </section>

      <div className="py-8 text-center text-gray-500 border-t border-white/10">
        Secure Payment • Fast Delivery • PureGlow 💚
      </div>
    </div>
  );
}

