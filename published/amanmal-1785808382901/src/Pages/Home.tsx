import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Acne Care",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    },
    {
      id: 2,
      name: "Glow Care",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
    },
    {
      id: 3,
      name: "Hydration",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800",
    },
    {
      id: 4,
      name: "Luxury Care",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800",
    },
  ];

  return (


    
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-10 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-white/10 backdrop-blur-xl py-20 px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-5 py-2 rounded-full bg-green-500/20 text-green-400 font-semibold mb-6">
                Premium Skincare Collection
              </span>

              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Reveal Your
                <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
                  Natural Glow
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
                Premium face wash crafted with botanical extracts and advanced skincare science for healthy glowing skin.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold shadow-xl hover:scale-105 transition"
                >
                  Shop Now
                </button>

                <button
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 font-semibold hover:bg-white/20 transition"
                >
                  Explore
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 flex-wrap">
                <div>
                  <h3 className="text-3xl font-bold text-green-400">50K+</h3>
                  <p className="text-gray-400">Happy Customers</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-green-400">120+</h3>
                  <p className="text-gray-400">Products Sold</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-green-400">4.9★</h3>
                  <p className="text-gray-400">Customer Rating</p>
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-[40px] p-4 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000"
                  alt="Product"
                  className="w-full h-[500px] object-cover rounded-[32px]"
                />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-8 top-12 bg-black/80 rounded-2xl shadow-xl p-4 border border-green-400/20">
                <p className="font-bold text-white">🔥 Best Seller</p>
                <p className="text-green-400">Glow Essentials Kit</p>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-6 bottom-10 bg-black/80 rounded-2xl shadow-xl p-4 border border-green-400/20">
                <p className="font-bold text-white">Dermat Approved</p>
                <p className="text-gray-400">Safe For All Skin</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            Popular Categories
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-green-400 font-semibold"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate("/products")}
              className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-2xl"
              />

              <h3 className="text-center font-bold text-xl mt-4">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>


            {/* Top Picks */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            Top Picks For You
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-green-400 font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Neem Face Wash",
              price: "₹299",
              image:
                "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
            },
            {
              name: "Vitamin C Cleanser",
              price: "₹399",
              image:
                "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
            },
            {
              name: "Aloe Vera Wash",
              price: "₹349",
              image:
                "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800",
            },
            {
              name: "Gold Glow Cleanser",
              price: "₹599",
              image:
                "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-[30px] border border-white/10 overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {product.name}
                </h3>

                <p className="text-green-400 font-bold text-2xl mt-2">
                  {product.price}
                </p>

                <button
                  onClick={() => navigate("/cart")}
                  className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-green-500/10 to-black shadow-xl border border-white/10">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12">
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Special Offer
              </span>

              <h2 className="text-5xl font-bold mt-6 leading-tight">
                Buy 2 Face Wash
                <br />
                <span className="text-green-400">
                  Get 1 Free!
                </span>
              </h2>

              <p className="text-gray-400 mt-6 text-lg">
                Limited time deal. Grab your skincare combo today.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold"
              >
                Shop Offer →
              </button>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200"
                alt="Offer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
     

            {/* Skin Concerns */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16">
          Solve Your Skin Concerns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            "Acne",
            "Dry Skin",
            "Dark Spots",
            "Oily Skin",
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              onClick={() => navigate("/products")}
              className="rounded-[30px] p-8 text-center bg-white/5 border border-white/10 backdrop-blur-xl hover:border-green-400/40 transition cursor-pointer"
            >
              <h3 className="text-2xl font-bold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Loved By Customers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ali Khan",
              review:
                "Best face wash I’ve ever used. My skin feels fresh every day.",
            },
            {
              name: "Sara Ahmed",
              review:
                "Premium quality and amazing fragrance. Worth every rupee.",
            },
            {
              name: "Usman",
              review:
                "My acne reduced a lot after using PureGlow regularly.",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-[30px] p-8 border border-white/10 backdrop-blur-xl hover:shadow-2xl transition"
            >
              <div className="text-green-400 text-xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-7">
                "{review.review}"
              </p>

              <h4 className="mt-6 font-bold text-xl">
                {review.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            "Is this suitable for sensitive skin?",
            "How often should I use it?",
            "Is it dermatologically tested?",
          ].map((question, index) => (
            <div
              key={index}
              className="rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold">{question}</h3>

              <p className="text-gray-400 mt-4 leading-8">
                Yes, our premium formula is crafted to be gentle and effective for most skin types.
              </p>
            </div>
          ))}
        </div>
      </section>

      
    </div>



  );
}