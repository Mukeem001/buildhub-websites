import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaCrown,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
  FaTimes,
  FaSave,
} from "react-icons/fa";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
};

export default function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Ahmad Sheikh",
    email: "ahmad@gmail.com",
    phone: "+91 9876543210",
    address: "Mumbai, India",
    bio: "Skincare Lover ✨",
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setShowEditModal(false);
    alert("Profile Updated Successfully ✅");
  };

  const orders = [
    { product: "Glow Essentials Kit", price: "₹999", status: "Delivered" },
    { product: "Vitamin C Cleanser", price: "₹399", status: "Shipped" },
    { product: "Neem Face Wash", price: "₹299", status: "Processing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-6 h-fit sticky top-28">

            <div className="h-28 rounded-[28px] bg-gradient-to-r from-green-500 to-emerald-600 relative">
              <div className="absolute inset-0 bg-black/20 rounded-[28px]" />
            </div>

            <div className="px-4 pb-6 -mt-14">
              <div className="relative w-28 h-28 mx-auto rounded-[30px] bg-gradient-to-br from-green-400 to-emerald-600 p-[2px] shadow-2xl">
                <div className="w-full h-full rounded-[28px] bg-[#111] flex flex-col items-center justify-center text-white">
                  <FaUser className="text-3xl" />
                  <span className="text-xs mt-1 font-bold">
                    MEMBER
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <h2 className="text-3xl font-black">
                  {profileData.name}
                </h2>

                <p className="text-gray-400 mt-2">
                  {profileData.bio}
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mt-4 font-semibold">
                  <FaCrown />
                  Premium Member
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <h3 className="text-2xl font-black">24</h3>
                  <p className="text-xs text-gray-500 mt-1">Orders</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <h3 className="text-2xl font-black">4.9</h3>
                  <p className="text-xs text-gray-500 mt-1">Rating</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <h3 className="text-2xl font-black">12</h3>
                  <p className="text-xs text-gray-500 mt-1">Wishlist</p>
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold flex items-center justify-center gap-3"
              >
                <FaEdit />
                Edit Profile
              </button>
            </div>
          </div>

                    {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="h-48 bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 relative">
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-6 left-8">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Welcome Back
                  </h1>
                  <p className="text-white/80 mt-2">
                    Manage your PureGlow account
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-8">

              <div className="rounded-[35px] p-8 bg-white/5 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">
                  Personal Details
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center gap-4">
                    <FaUser className="text-green-400" />
                    <span>{profileData.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-green-400" />
                    <span>{profileData.email}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaPhone className="text-green-400" />
                    <span>{profileData.phone}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-green-400" />
                    <span>{profileData.address}</span>
                  </div>

                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4">

                <div className="rounded-3xl p-6 bg-white/5 border border-white/10 text-center">
                  <FaShoppingBag className="mx-auto text-3xl text-green-400 mb-3" />
                  <h3 className="text-3xl font-bold">24</h3>
                  <p className="text-gray-400">Orders</p>
                </div>

                <div className="rounded-3xl p-6 bg-white/5 border border-white/10 text-center">
                  <FaHeart className="mx-auto text-3xl text-green-400 mb-3" />
                  <h3 className="text-3xl font-bold">12</h3>
                  <p className="text-gray-400">Wishlist</p>
                </div>

                <div className="rounded-3xl p-6 bg-white/5 border border-white/10 text-center">
                  <FaStar className="mx-auto text-3xl text-green-400 mb-3" />
                  <h3 className="text-3xl font-bold">4.9</h3>
                  <p className="text-gray-400">Rating</p>
                </div>

              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-[35px] p-8 bg-white/5 border border-white/10">
              <h2 className="text-3xl font-bold mb-6">
                Recent Orders
              </h2>

              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-3xl p-5 bg-black/30 border border-white/10"
                  >
                    <div>
                      <h4 className="text-xl font-semibold">
                        {order.product}
                      </h4>

                      <p className="text-gray-400">
                        {order.price}
                      </p>
                    </div>

                    <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>


             
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d1512] border border-white/10 rounded-[32px] shadow-2xl max-w-xl w-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">
                Edit Profile
              </h2>

              <button onClick={() => setShowEditModal(false)}>
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none"
              />

              <input
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none"
              />

              <textarea
                rows={4}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-3"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}