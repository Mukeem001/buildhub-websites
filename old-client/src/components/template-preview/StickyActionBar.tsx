import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaEye,
  FaShoppingCart,
  FaStar,
  FaCrown,
  FaTimes,
} from "react-icons/fa";

interface StickyActionBarProps {
  title: string;
  price: number;
  premium: boolean;
  rating: number;
  onPreview?: () => void;
  onWishlist?: () => void;
  onUseTemplate?: () => void;
}

const StickyActionBar = ({
  title,
  price,
  premium,
  rating,
  onPreview,
  onWishlist,
  onUseTemplate,
}: StickyActionBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {/* Floating Reopen Button */}

      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition hover:bg-blue-700"
        >
          <FaShoppingCart size={18} />
        </motion.button>
      )}

      <AnimatePresence>

        {isVisible && (
          <>

            {/* ================= Desktop ================= */}

            <motion.div
              initial={{ x: 350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              transition={{ duration: 0.35 }}
              className="fixed right-6 top-1/2 z-50 hidden w-[320px] -translate-y-1/2 xl:block"
            >

              <div className="relative rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">

                {/* Close */}

                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-red-600 hover:text-white"
                >
                  <FaTimes size={14} />
                </button>

                {premium && (
                  <div className="mb-5 flex w-fit items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                    <FaCrown />
                    Premium
                  </div>
                )}

                <h2 className="pr-10 text-2xl font-bold text-white">
                  {title}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-yellow-400">
                  <FaStar />
                  <span>{rating}</span>
                </div>

                <div className="mt-8">

                  <p className="text-slate-400">
                    Starting From
                  </p>

                  <h3 className="text-5xl font-black text-white">
                    ₹{price}
                  </h3>

                </div>

                <button
                  onClick={onUseTemplate}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
                >
                  <FaShoppingCart />
                  Use Template
                </button>

                <button
                  onClick={onPreview}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 py-4 font-semibold text-white transition hover:border-blue-500"
                >
                  <FaEye />
                  Live Preview
                </button>

                <button
                  onClick={onWishlist}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 py-4 font-semibold text-white transition hover:border-red-500 hover:text-red-400"
                >
                  <FaHeart />
                  Add To Wishlist
                </button>

              </div>

            </motion.div>

            {/* ================= Mobile ================= */}

            <motion.div
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              exit={{ y: 120 }}
              transition={{ duration: 0.35 }}
              className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 p-4 backdrop-blur xl:hidden"
            >

              <div className="mb-3 flex justify-end">

                <button
                  onClick={() => setIsVisible(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-red-600 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={onWishlist}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white"
                >
                  <FaHeart />
                </button>

                <button
                  onClick={onPreview}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white"
                >
                  <FaEye />
                </button>

                <button
                  onClick={onUseTemplate}
                  className="flex-1 rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
                >
                  Use Template • ₹{price}
                </button>

              </div>

            </motion.div>

          </>
        )}

      </AnimatePresence>
    </>
  );
};

export default StickyActionBar;