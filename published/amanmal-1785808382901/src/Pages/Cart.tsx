import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaTag,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";


const cartItems = [
  
  {
    id: 1,
    name: "Neem Face Wash",
    price: 299,
    qty: 1,
    category: "Acne Care",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
  },
  {
    id: 2,
    name: "Vitamin C Cleanser",
    price: 399,
    qty: 2,
    category: "Glow Care",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shipping = 99;
  const discount = 50;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-14 text-center relative z-10">
        <p className="uppercase tracking-[6px] text-green-400 text-sm">
          Shopping Cart
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mt-5">
          Your
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Cart
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Review your selected skincare products before checkout.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Progress */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex justify-between mb-3">
                <span>Free Delivery Progress</span>
                <span className="text-green-400">80%</span>
              </div>

              <div className="h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 w-4/5" />
              </div>

              <p className="text-gray-400 mt-3">
                Add ₹200 more for free delivery
              </p>
            </div>

            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-6"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">

                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full md:w-40 h-40 rounded-3xl object-cover"
                  />

                  <div className="flex-1 w-full">
                    <p className="text-green-400">{item.category}</p>
                    <h2 className="text-2xl font-bold mt-2">{item.name}</h2>
                    <p className="text-green-400 text-2xl mt-3">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-5">
                      <button className="p-3 rounded-full bg-white/10">
                        <FaMinus />
                      </button>

                      <span className="text-xl font-bold">{item.qty}</span>

                      <button className="p-3 rounded-full bg-white/10">
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <button className="p-4 rounded-full bg-red-500/80">
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
                    {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="h-fit sticky top-28 rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

            {/* Coupon */}
            <div className="flex gap-3 mb-8">
              <div className="relative flex-1">
                <FaTag className="absolute left-4 top-4 text-gray-400" />
                <input
                  placeholder="Coupon Code"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
                />
              </div>

              <button className="px-5 rounded-2xl bg-green-500">
                Apply
              </button>
            </div>

            <div className="space-y-5 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-400">-₹{discount}</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaTruck className="text-green-400" />
                Fast Delivery
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaShieldAlt className="text-green-400" />
                Secure Payment
              </div>
            </div>

           <button
              onClick={() => navigate("/address")}
              className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
            >
              Proceed To Checkout
            </button>
           <button
  onClick={() => navigate("/products")}
  className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
>
  Continue Shopping
</button>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[45px] p-10 md:p-20 text-center border border-white/10 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-700/20 backdrop-blur-xl">
          <h2 className="text-4xl md:text-6xl font-bold">
            Ready To Checkout?
          </h2>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
            Complete your order and enjoy premium skincare crafted for glowing skin.
          </p>
<button
  onClick={() => navigate("/address")}
  className="mt-10 px-10 py-4 rounded-full ..."
>
  Checkout Now
</button>
        </div>
      </section>

      <div className="py-8 text-center text-gray-500 border-t border-white/10">
        Secure Checkout • Fast Delivery • PureGlow 💚
      </div>
    </div>
  );
}