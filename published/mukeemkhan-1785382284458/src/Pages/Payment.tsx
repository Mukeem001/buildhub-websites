import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCreditCard,
    FaGooglePay,
    FaMoneyBillWave,
    FaLock,
} from "react-icons/fa";

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card");

    return (
        <div className="min-h-screen bg-[#f8f4ee] py-10">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-orange-500 font-semibold uppercase tracking-widest">
                        Checkout
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black mt-2">
                        Payment
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Secure payment for your order
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Left */}
                    <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl p-6 md:p-8">
                        <h2 className="text-2xl font-black mb-6">
                            Select Payment Method
                        </h2>

                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                            <button
                                onClick={() => setPaymentMethod("card")}
                                className={`p-5 rounded-3xl border-2 transition ${paymentMethod === "card"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <FaCreditCard className="text-3xl mx-auto mb-3 text-orange-500" />
                                Card
                            </button>

                            <button
                                onClick={() => setPaymentMethod("upi")}
                                className={`p-5 rounded-3xl border-2 transition ${paymentMethod === "upi"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <FaGooglePay className="text-3xl mx-auto mb-3 text-orange-500" />
                                UPI
                            </button>

                            <button
                                onClick={() => setPaymentMethod("cash")}
                                className={`p-5 rounded-3xl border-2 transition ${paymentMethod === "cash"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <FaMoneyBillWave className="text-3xl mx-auto mb-3 text-orange-500" />
                                Cash
                            </button>
                        </div>



                        {/* CARD PAYMENT */}
                        {paymentMethod === "card" && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-3">
                                        Card Holder Name
                                    </label>

                                    <input
                                        placeholder="Enter card holder name"
                                        className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-3">
                                        Card Number
                                    </label>

                                    <input
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-3">
                                            Expiry Date
                                        </label>

                                        <input
                                            placeholder="MM/YY"
                                            className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-3">
                                            CVV
                                        </label>

                                        <input
                                            placeholder="***"
                                            className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* UPI PAYMENT */}
                        {paymentMethod === "upi" && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-3">
                                    UPI ID
                                </label>

                                <input
                                    placeholder="example@upi"
                                    className="w-full rounded-2xl bg-[#f7f7f7] border border-gray-200 px-5 py-4 outline-none focus:border-orange-400"
                                />
                            </div>
                        )}

                        {/* CASH PAYMENT */}
                        {paymentMethod === "cash" && (
                            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Cash On Delivery
                                </h3>

                                <p className="text-gray-500 mt-3 leading-7">
                                    Pay in cash when your order arrives at your doorstep.
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mt-8 bg-green-50 rounded-2xl p-4">
                            <FaLock className="text-green-500" />
                            <p className="text-sm text-gray-600">
                                Your payment is secured with encrypted checkout.
                            </p>
                        </div>
                    </div>



                    {/* RIGHT SUMMARY */}
                    <div className="h-fit sticky top-28">
                        <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white">

                            {/* Top */}
                            <div className="bg-white/95 backdrop-blur-xl p-6 border-b border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-black tracking-tight text-gray-900">
                                    Order Summary
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    Review your payment details
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <div className="space-y-5">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900">₹699</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className="font-bold text-gray-900">₹50</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>GST</span>
                                        <span className="font-bold text-gray-900">₹20</span>
                                    </div>



                                    <hr />

                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-black text-gray-900">
                                            Total
                                        </span>

                                        <span className="text-3xl font-black text-orange-500">
                                            ₹769
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/ordercomplete")}
                                    className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition"
                                >
                                    Pay Now
                                </button>
                                <p className="text-center text-gray-400 text-xs mt-4">
                                    Secure Payment • SSL Encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;