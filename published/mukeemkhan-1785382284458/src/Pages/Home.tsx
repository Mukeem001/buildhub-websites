import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type Category = {
  id: number;
  name: string;
  image: string;
  route: string;
};

type Food = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
};

type HomeProps = {
  addToCart?: (food: Food) => void;
};

const Home = ({ addToCart }: HomeProps) => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: 1,
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      route: "/menu",
    },
    {
      id: 2,
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      route: "/menu",
    },
    {
      id: 3,
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
      route: "/menu",
    },
    {
      id: 4,
      name: "Drinks",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      route: "/menu",
    },
  ];

  const foods: Food[] = [
    {
      id: 1,
      name: "Cheese Burger",
      price: 199,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
    {
      id: 2,
      name: "Italian Pizza",
      price: 299,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      price: 149,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
    {
      id: 4,
      name: "Veg Sandwich",
      price: 129,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
    },

  ];

  const banners = [
    {
      title: "50% OFF",
      subtitle: "On Burgers",
      desc: "Grab delicious burgers at half price.",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
    },
    {
      title: "30% OFF",
      subtitle: "On Pizza",
      desc: "Hot cheesy pizzas delivered fast.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const handleAddToCart = (food: Food) => {
    if (addToCart) {
      addToCart(food);
      alert(`${food.name} Your Product Is Added To Cart ✅`);
    }
  };

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentBanner((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1]">

      {/* SEARCH BAR */}


      {/* HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 py-20">
          {/* Background Blur Effects */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-300/30 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Side */}
              <div>
                <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold mb-6">
                  🍔 Premium Food Collection
                </span>

                <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900">
                  Discover
                  <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Delicious Meals
                  </span>
                </h1>

                <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                  Handcrafted meals from top chefs. Fresh ingredients,
                  lightning-fast delivery, and unforgettable taste.
                </p>

                <button
                  onClick={() => navigate("/Explorenow")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-xl hover:scale-105 transition"
                >
                  Order Now
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="px-8 py-4 rounded-2xl bg-white shadow-lg border font-semibold hover:shadow-xl transition"
                >
                  Explore Menu
                </button>

                {/* Stats */}
                <div className="flex gap-8 mt-10 flex-wrap">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">50K+</h3>
                    <p className="text-gray-500">Orders Delivered</p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">120+</h3>
                    <p className="text-gray-500">Premium Dishes</p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">4.9★</h3>
                    <p className="text-gray-500">Customer Rating</p>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="relative">
                <div className="bg-white/70 backdrop-blur-lg rounded-[40px] p-4 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200"
                    alt="Food"
                    className="w-full h-[500px] object-cover rounded-[32px]"
                  />
                </div>

                {/* Floating Card 1 */}
                <div className="absolute -left-8 top-12 bg-white rounded-2xl shadow-xl p-4">
                  <p className="font-bold text-gray-900">🔥 Best Seller</p>
                  <p className="text-orange-500">Cheese Burst Pizza</p>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -right-6 bottom-10 bg-white rounded-2xl shadow-xl p-4">
                  <p className="font-bold text-gray-900">30 Min</p>
                  <p className="text-gray-500">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            Popular Categories
          </h2>

          <button
            onClick={() => navigate("/menu")}
            className="text-orange-500 font-semibold"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(category.route)}
              className="bg-white rounded-3xl p-5 shadow-md hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
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
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Top Picks For You
          </h2>

          <button
            onClick={() => navigate("/menu")}
            className="text-orange-500 font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-64 object-cover"
                />

                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {food.name}
                </h3>

                <p className="text-orange-500 font-bold text-2xl mt-2">
                  ₹{food.price}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-yellow-500 font-medium">
                    ⭐ 4.8
                  </span>

                  <button
                    onClick={() => handleAddToCart(food)}
                    className="w-11 h-11 rounded-xl bg-orange-500 text-white text-2xl hover:bg-orange-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-orange-50 to-white shadow-xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12">
              <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Special Offer
              </span>

              <h2 className="text-5xl font-bold mt-6 leading-tight">
                Buy 2 Burgers
                <br />
                <span className="text-orange-500">
                  Get 1 Free!
                </span>
              </h2>

              <p className="text-gray-600 mt-6 text-lg">
                Limited time deal. Grab your combo today.
              </p>

              <button
                onClick={() => navigate("/menu")}
                className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition"
              >
                Order Now →
              </button>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200"
                alt="Burger"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ali Khan",
              review:
                "Amazing food quality and super fast delivery. Highly recommended!",
            },
            {
              name: "Sara Ahmed",
              review:
                "The burgers are delicious and packaging is premium. Loved it!",
            },
            {
              name: "Usman",
              review:
                "Best food ordering experience. UI bhi bohot smooth hai.",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-8 shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-yellow-500 text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 leading-7">
                "{review.review}"
              </p>

              <h4 className="mt-6 font-bold text-xl">
                {review.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;


