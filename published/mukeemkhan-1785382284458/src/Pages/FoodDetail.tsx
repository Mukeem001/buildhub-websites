import { useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaTruck,
  FaClock,
} from "react-icons/fa";

type Food = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  ingredients: string[];
  category?: string;
};

type FoodDetailProps = {
  addToCart?: (food: Food) => void;
};

const FoodDetails = ({ addToCart }: FoodDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const food: Food = {
    id: 1,
    name: "Cheese Burger",
    price: 199,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
    description:
      "A juicy grilled burger loaded with melted cheese, fresh vegetables, and special sauce. Perfect for satisfying your hunger.",
    ingredients: [
      "Fresh Bun",
      "Cheese Slice",
      "Beef Patty",
      "Tomato",
      "Onion",
      "Lettuce",
      "Special Sauce",
    ],
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(food);
      alert(`${food.name} cart me add ho gaya ✅`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="bg-orange-500 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">
            Food Details
          </h1>
          <p className="mt-2">
            Fresh & Delicious Food
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-4xl font-bold">
              {food.name}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold">
                {food.rating}
              </span>
              <span className="text-gray-500">
                (250 Reviews)
              </span>
            </div>

            <p className="text-orange-500 text-3xl font-bold mt-6">
              ₹{food.price}
            </p>

            <p className="text-gray-600 mt-6 leading-7">
              {food.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="w-10 h-10 bg-gray-200 rounded-lg text-xl"
                >
                  -
                </button>

                <span className="font-bold text-xl">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="w-10 h-10 bg-gray-200 rounded-lg text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              <FaShoppingCart />
              Add To Cart
            </button>

            {/* Delivery Info */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-orange-500 text-xl" />
                  <span className="font-semibold">
                    Free Delivery
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <FaClock className="text-orange-500 text-xl" />
                  <span className="font-semibold">
                    30 Min Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">
                Ingredients
              </h3>

              <div className="flex flex-wrap gap-3">
                {food.ingredients.map(
                  (ingredient, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full"
                    >
                      {ingredient}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">

            {/* Logo */}
            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                FoodieHub
              </h2>

              <p className="text-gray-400 mt-4">
                Fresh food delivered quickly to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Quick Links
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer">
                  Home
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Menu
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Cart
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Wishlist
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Categories
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>Burger</li>
                <li>Pizza</li>
                <li>Drinks</li>
                <li>Dessert</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contact Us
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>📍 New Delhi, India</li>
                <li>📞 +91 9876543210</li>
                <li>✉ support@foodiehub.com</li>
              </ul>
            </div>

          </div>

          <hr className="border-gray-700 my-8" />

          <div className="text-center text-gray-500">
            © 2026 FoodieHub. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodDetails;