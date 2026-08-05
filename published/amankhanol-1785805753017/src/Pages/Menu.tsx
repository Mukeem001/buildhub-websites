import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar } from "react-icons/fa";

type Food = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  quantity?: number;
};

type MenuProps = {
  addToCart?: (food: Food) => void;
};

const Menu = ({ addToCart }: MenuProps) => {
  const navigate = useNavigate();
  const foods: Food[] = [
    {
      id: 1,
      name: "Cheese Burger",
      category: "Burger",
      price: 199,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
    {
      id: 2,
      name: "Italian Pizza",
      category: "Pizza",
      price: 299,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 149,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
    {
      id: 4,
      name: "Veg Sandwich",
      category: "Sandwich",
      price: 129,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
    },
    {
      id: 5,
      name: "Chicken Burger",
      category: "Burger",
      price: 249,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
    },
    {
      id: 6,
      name: "Cold Coffee",
      category: "Drinks",
      price: 99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    },
  ];

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Dessert",
    "Sandwich",
    "Drinks",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const increaseQty = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (food: Food) => {
    if (addToCart) {
      addToCart({
        ...food,
        quantity: quantities[food.id] || 1,
      });
      alert(`${food.name} Added To Cart ✅`);
    }
  };

  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const searchMatch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero */}
     <div className="bg-[#f8f5f0] py-12">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Heading */}
    <div className="text-center mb-10">
      <p className="text-orange-500 font-semibold tracking-wider uppercase">
        Explore Our Specials
      </p>

      <h1 className="text-5xl md:text-7xl font-extrabold mt-3 leading-tight">
        Delicious <span className="text-orange-500">Menu</span>
      </h1>

      <p className="mt-4 text-gray-500 text-lg">
        Handpicked dishes made with love & premium ingredients 
      </p>
    </div>

    {/* Hero Banner */}
    <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#111] to-[#2b2b2b] shadow-2xl">
      <div className="grid lg:grid-cols-2 items-center">
        
        {/* Left Content */}
        <div className="p-8 md:p-14 text-white z-10">
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-400 text-black font-bold text-sm">
             LIMITED OFFER
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Flat <span className="text-orange-400">40% OFF</span>
          </h2>

          <p className="text-2xl mt-3 font-semibold">
            On Premium Burgers
          </p>

          <p className="mt-5 text-gray-300 text-lg max-w-md">
            Taste the juiciest burgers crafted with fresh ingredients and premium cheese.
          </p>

        
        </div>

        {/* Right Image */}
        <div className="relative h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200"
            alt="Burger"
            className="w-full h-full object-cover"
          />

          {/* Floating Badge */}
          <div className="absolute top-8 right-8 bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-4xl font-bold text-orange-500">40%</span>
            <span className="font-semibold text-gray-700">OFF</span>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/20 blur-3xl rounded-full"></div>
    </div>
  </div>
</div>
      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="relative">
          <FaSearch className="absolute left-4 top-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your favorite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white p-4 pl-12 rounded-2xl shadow-lg outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 shadow"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow text-yellow-500 flex items-center gap-1">
                  <FaStar />
                  <span>{food.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {food.name}
                    </h2>
                    <p className="text-gray-500">{food.category}</p>
                  </div>

                  <span className="text-2xl font-bold text-orange-500">
                    ₹{food.price}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3 bg-orange-50 px-3 py-2 rounded-xl">
                    <button
                      onClick={() => decreaseQty(food.id)}
                      className="w-8 h-8 rounded-lg bg-white shadow font-bold"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg w-6 text-center">
                      {quantities[food.id] || 1}
                    </span>

                    <button
                      onClick={() => increaseQty(food.id)}
                      className="w-8 h-8 rounded-lg bg-white shadow font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(food)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">No Food Found 😔</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;