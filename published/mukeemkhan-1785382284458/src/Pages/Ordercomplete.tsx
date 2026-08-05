import React from "react";

import { useNavigate } from "react-router-dom";
import {
    FaCheckCircle,
    FaReceipt,
    FaHome,
    FaUtensils,
} from "react-icons/fa";

const OrderComplete = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8f4ee] flex items-center justify-center px-4 py-12">
            {/* Background blur */}
            <div className="fixed top-20 left-20 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl"></div>
            <div className="fixed bottom-20 right-20 w-72 h-72 rounded-full bg-red-300/20 blur-3xl"></div>

            <div className="relative w-full max-w-3xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-[36px] shadow-2xl border border-white p-8 md:p-10">

                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                            <FaCheckCircle className="text-white text-5xl" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mt-6">
                        <p className="uppercase tracking-[4px] text-orange-500 font-semibold text-sm">
                            Order Successful
                        </p>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
                            Order Confirmed 🎉
                        </h1>

                        <p className="text-gray-500 mt-4 text-lg">
                            Your delicious order has been placed successfully.
                        </p>
                    </div>

                    {/* Order info */}
                    <div className="grid md:grid-cols-3 gap-4 mt-10">
                        <div className="rounded-2xl bg-[#f9f9f9] p-5 border">
                            <p className="text-sm text-gray-500">Order ID</p>
                            <h3 className="font-bold text-lg mt-2">#ORD-2048</h3>
                        </div>

                        <div className="rounded-2xl bg-[#f9f9f9] p-5 border">
                            <p className="text-sm text-gray-500">Delivery Time</p>
                            <h3 className="font-bold text-lg mt-2">25-30 mins</h3>
                        </div>

                        <div className="rounded-2xl bg-[#f9f9f9] p-5 border">
                            <p className="text-sm text-gray-500">Payment</p>
                            <h3 className="font-bold text-lg mt-2">Successful</h3>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-10">
                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="w-1/3 h-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                        </div>

                        <div className="flex justify-between text-sm mt-3 text-gray-500">
                            <span>Confirmed</span>
                            <span>Cooking</span>
                            <span>Delivered</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

                        {/* Back Home */}
                        <button
                            onClick={() => navigate("/")}
                            className="py-4 rounded-2xl border border-gray-300 bg-white font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                        >
                            <FaHome />
                            Back Home
                        </button>

                        {/* Order Again */}
                        <button
                            onClick={() => navigate("/menu")}
                            className="py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition"
                        >
                            <FaUtensils />
                            Order Again
                        </button>

                        {/* Track Order */}
                        <button
                            onClick={() => navigate("/trackorder")}
                            className="py-4 rounded-2xl bg-black text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition"
                        >
                            Track Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;