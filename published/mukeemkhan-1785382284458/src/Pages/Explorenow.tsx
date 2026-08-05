import React from "react";
import { useNavigate } from "react-router-dom";

import { FaFire } from "react-icons/fa";

const ExploreNow = () => {
  const navigate = useNavigate();

  const deals = [
    {
      id: 1,
      name: "Truffle Burger",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
    },
    {
      id: 2,
      name: "Premium Pizza",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
    },
    {
      id: 3,
      name: "Lava Cake",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200",
    },
  ];

  const categories = [
    {
      title: "Burgers",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    },
    {
      title: "Pizza",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    },
    {
      title: "Desserts",
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    },
    {
      title: "Drinks",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
    },
  ];

  const whyChooseUs = [
    {
      title: "Fast Delivery",
      desc: "Get food delivered within 30 minutes.",
      icon: "⚡",
    },
    {
      title: "Top Chefs",
      desc: "Prepared by experienced premium chefs.",
      icon: "👨‍🍳",
    },
    {
      title: "Fresh Ingredients",
      desc: "Only high quality fresh ingredients used.",
      icon: "🥗",
    },
  ];

  const reviews = [
    {
      name: "Ali Khan",
      review:
        "Amazing UI and delicious food. Delivery was super fast.",
    },
    {
      name: "Sara Ahmed",
      review: "Packaging premium thi aur food bohot tasty tha.",
    },
    {
      name: "Usman",
      review: "Best food ordering website experience till now.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative rounded-[40px] overflow-hidden min-h-[650px] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 grid lg:grid-cols-2 min-h-[650px] items-center px-8 md:px-16">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-white">
                <FaFire className="text-orange-400" />
                Premium Collection 2026
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
                Taste Food Like
                <span className="block text-orange-400">Never Before</span>
              </h1>

              <p className="text-gray-200 text-lg mt-6 max-w-xl leading-8">
                Discover gourmet meals crafted by top chefs with luxury presentation
                and unforgettable taste.
              </p>

            

              <div className="flex gap-10 mt-12 flex-wrap">
                <div>
                  <h3 className="text-4xl font-bold text-white">50K+</h3>
                  <p className="text-gray-300">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white">150+</h3>
                  <p className="text-gray-300">Luxury Dishes</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white">4.9★</h3>
                  <p className="text-gray-300">Rating</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-6 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000"
                  className="w-[450px] h-[450px] rounded-[32px] object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-orange-500 font-semibold uppercase tracking-wider">
              Categories
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Explore By Taste
            </h2>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 rounded-2xl bg-white shadow-lg hover:shadow-xl transition"
          >
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => navigate("/menu")}
              className="group relative rounded-[32px] overflow-hidden h-72 cursor-pointer shadow-xl"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                alt=""
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM DEALS */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="mb-10">
          <p className="text-orange-500 font-semibold uppercase tracking-wider">
            Best Offers
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Premium Deals For You
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {deals.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:-translate-y-3 hover:shadow-2xl transition duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                  alt={item.name}
                />

                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                  30% OFF
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-3xl font-black text-orange-500">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => navigate("/cart")}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 font-semibold uppercase tracking-wider">
            Why Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Premium Experience
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[32px] p-8 shadow-xl hover:-translate-y-3 transition"
            >
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-2xl font-bold mt-6">{item.title}</h3>
              <p className="text-gray-500 mt-4 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12">
          <p className="text-orange-500 font-semibold uppercase">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Loved By Customers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-[30px] p-8 shadow-lg"
            >
              <div className="text-yellow-500 text-2xl">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mt-5 leading-7">"{review.review}"</p>
              <h4 className="mt-6 font-bold text-xl">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* BIG CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative rounded-[45px] overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 shadow-2xl">
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 text-center py-20 px-6">
            <h2 className="text-4xl md:text-6xl font-black text-white">
              Ready To Order?
            </h2>
            <p className="text-white/90 text-lg mt-6 max-w-2xl mx-auto">
              Join thousands of happy customers enjoying premium food.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="mt-8 px-10 py-4 rounded-2xl bg-white text-orange-500 font-bold text-lg hover:scale-105 transition"
            >
              Order Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreNow;

