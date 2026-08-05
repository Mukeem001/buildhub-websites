import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistProps = {
  addToCart?: (item: WishlistItem) => void;
};

const Wishlist = ({ addToCart }: WishlistProps) => {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Cheese Burger",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
    {
      id: 2,
      name: "Italian Pizza",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
    {
      id: 4,
      name: "Cold Coffee",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(
      wishlistItems.filter((item) => item.id !== id)
    );
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (addToCart) {
      addToCart(item);
      removeItem(item.id);
      alert(`${item.name} added to cart ✅`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1]">

      {/* HERO SECTION */}
     <section className="max-w-7xl mx-auto px-4 py-8">
  <div className="relative min-h-[520px] rounded-[45px] overflow-hidden shadow-2xl">

    {/* Background Image */}
    <img
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
      alt="Wishlist Banner"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Gradient Light */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

    {/* Floating Blur */}
    <div className="absolute top-16 right-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>

    <div className="relative z-10 h-full grid lg:grid-cols-2 items-center px-8 md:px-16 py-16">

      {/* LEFT CONTENT */}
      <div>
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white">
          <FaHeart className="text-red-400" />
          Saved Favorites
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
          Your Favorite
          <span className="block text-orange-400">
            Food Collection
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-200 max-w-xl leading-8">
          All your handpicked meals in one premium place.
          Save favorites and order instantly anytime.
        </p>

       
      </div>

    
    </div>

    {/* Floating Stats */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-2xl px-8 py-5 flex gap-12">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">120+</h3>
        <p className="text-gray-500 text-sm">Saved Items</p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
        <p className="text-gray-500 text-sm">Happy Orders</p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">4.9★</h3>
        <p className="text-gray-500 text-sm">Rating</p>
      </div>
    </div>
  </div>
</section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-[30px] shadow-xl p-16 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <FaHeart className="text-orange-500 text-4xl" />
            </div>

            <h2 className="text-4xl font-bold mt-8">
              Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Start adding your favorite delicious items.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-orange-500 font-semibold uppercase">
                  Favorites
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Your Saved Items
                </h2>
              </div>

              <button
                onClick={() => navigate("/menu")}
                className="flex items-center gap-2 text-orange-500 font-semibold"
              >
                Add More <FaArrowRight />
              </button>
            </div>

            {/* CARDS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="text-orange-500 text-3xl font-black mt-4">
                      ₹{item.price}
                    </p>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
                      >
                        <FaShoppingCart />
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA SECTION */}
      {wishlistItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="rounded-[35px] bg-white shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                Ready to order your favorites?
              </h3>
              <p className="text-gray-500 mt-3">
                Move them to cart and checkout quickly.
              </p>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Go To Cart →
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Wishlist;