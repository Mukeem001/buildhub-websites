import { FaTrash, FaShoppingCart, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart = ({ cartItems, setCartItems }: CartProps) => {
  const navigate = useNavigate();
  const increaseQty = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = 50;
  const gst = 20;
  const total = subtotal + deliveryFee + gst;

  return (
    <div className="min-h-screen bg-[#f8f4ee]">

      {/* HERO */}
    <section className="max-w-7xl mx-auto px-4 py-8">
  <div className="relative min-h-[650px] rounded-[45px] overflow-hidden shadow-2xl bg-[#0b0b0b]">

    {/* Background */}
    <img
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    {/* Glow Effects */}
    <div className="absolute -top-20 left-20 w-96 h-96 bg-orange-500/30 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 blur-[120px] rounded-full"></div>

    <div className="relative z-10 grid lg:grid-cols-2 h-full items-center px-8 md:px-16 py-16">

      {/* LEFT */}
      <div>
        <span className="inline-block px-5 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-orange-300 font-semibold">
          Premium Cart Experience
        </span>

        <h1 className="mt-8 text-6xl md:text-8xl font-black leading-none text-white">
          Luxury
          <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Checkout
          </span>
        </h1>

        <p className="text-gray-300 text-xl mt-6 max-w-xl leading-9">
          Your selected gourmet dishes are waiting.
          Fast delivery, premium packaging, unforgettable taste.
        </p>

      
      
      </div>

      {/* RIGHT */}
      <div className="relative hidden lg:flex justify-center items-center">

        {/* Main Food */}
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200"
          className="w-[420px] h-[420px] rounded-full object-cover border-[10px] border-white/10 shadow-2xl"
          alt=""
        />

       

        {/* Floating Delivery Card */}
        <div className="absolute bottom-10 left-0 bg-white rounded-3xl shadow-2xl p-5">
          <p className="font-bold text-gray-900">
            Preparing Order 🍔
          </p>
          <div className="w-48 h-3 bg-gray-200 rounded-full mt-3">
            <div className="w-32 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[35px] shadow-xl p-16 text-center">
            <div className="w-28 h-28 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <FaShoppingCart className="text-orange-500 text-5xl" />
            </div>

            <h2 className="text-4xl font-black mt-8">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Add delicious food to start ordering.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
  {cartItems.map((item) => (
    <div
      key={item.id}
      className="group relative rounded-[36px] p-[1px] bg-gradient-to-r from-orange-200 via-red-200 to-orange-100 shadow-xl hover:shadow-2xl transition duration-500"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-[36px] p-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* IMAGE */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full lg:w-52 h-52 object-cover rounded-[28px] group-hover:scale-[1.03] transition duration-500"
            />

            <div className="absolute top-4 left-4 px-3 py-2 rounded-full bg-black/70 backdrop-blur text-white text-xs font-semibold">
              Chef Special ✨
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Premium handcrafted meal
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                >
                  <FaTrash />
                </button>
              </div>

              {/* PRICE */}
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                  <span className="text-2xl font-black">
                    ₹{item.price}
                  </span>
                </div>

                <div className="px-4 py-3 rounded-2xl bg-gray-100">
                  <span className="font-semibold text-gray-700">
                    Total: ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* QUANTITY CONTROLS */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 bg-[#f8f4ee] rounded-[24px] p-2 shadow-inner">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-14 h-14 rounded-2xl bg-white shadow font-bold text-2xl hover:scale-105 transition"
                >
                  −
                </button>

                <div className="w-16 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-xl flex items-center justify-center shadow-lg">
                  {item.quantity}
                </div>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-14 h-14 rounded-2xl bg-white shadow font-bold text-2xl hover:scale-105 transition"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Delivery in
                </p>
                <p className="font-bold text-green-600">
                  25-30 mins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            {/* RIGHT */}
                      {/* RIGHT SIDE */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-[36px] p-[1px] bg-gradient-to-r from-orange-300 via-red-300 to-orange-200 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-xl rounded-[36px] p-7">

                  <h2 className="text-3xl font-black text-gray-900 mb-8">
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  <div className="rounded-[28px] bg-gradient-to-r from-orange-50 to-red-50 p-5 border border-orange-100">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTag className="text-orange-500 text-xl" />
                      <span className="font-bold text-gray-800">
                        Apply Coupon
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
                    />

                    <button className="w-full mt-4 py-3 rounded-2xl bg-black text-white font-semibold hover:scale-[1.02] transition">
                      Apply Coupon
                    </button>
                  </div>

                  {/* Bill Details */}
                  <div className="space-y-5 mt-8">
                    <div className="flex justify-between text-gray-600">
                      <span>Items</span>
                      <span>{cartItems.length}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>GST</span>
                      <span>₹{gst}</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="rounded-[24px] bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          Grand Total
                        </span>

                        <span className="text-3xl font-black">
                          ₹{total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-8 rounded-[28px] bg-[#f8f4ee] p-5">
                    <p className="text-sm text-gray-500">
                      Estimated Delivery
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mt-2">
                      25 - 30 Minutes
                    </h4>
                  </div>

                  {/* Checkout Button */}
                  <button
  onClick={() => navigate("/address")}
  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
>
  Proceed To Checkout
</button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
