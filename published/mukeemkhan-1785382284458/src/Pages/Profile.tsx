import { useState } from "react";
import { FaUser, FaCrown, FaEdit } from "react-icons/fa";
import {
  
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingBag,
  
  FaTimes,
  FaSave,
  FaStar,
  FaHeart,
  
} from "react-icons/fa";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
};

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Ahmad Sheikh",
    email: "ahmad@example.com",
    phone: "+91 9876543210",
    address: "House No. 123, Main Road, New Delhi, India - 110001",
    bio: "Food Lover 🍔",
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
    alert("Profile updated successfully! ✅");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f4ee] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Heading */}
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-orange-500 font-bold text-sm">
            Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            My Profile
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Premium Card */}
         <div className="bg-white rounded-[32px] shadow-xl overflow-hidden h-fit sticky top-28">
  {/* Top Banner */}
  <div className="h-28 bg-gradient-to-r from-[#111] via-[#1f1f1f] to-[#2b2b2b] relative">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#ff6b00,_transparent_35%)]"></div>
  </div>

  {/* Content */}
  <div className="px-6 pb-6 -mt-14">
    
    {/* Avatar Icon */}
  <div className="relative w-28 h-28 mx-auto rounded-[30px] bg-gradient-to-br from-orange-500 to-red-500 p-[2px] shadow-2xl rotate-3 hover:rotate-0 transition">
  <div className="w-full h-full rounded-[28px] bg-[#111] flex flex-col items-center justify-center text-white">
    <FaUser className="text-3xl" />
    <span className="text-xs mt-1 font-bold tracking-wider">
      MEMBER
    </span>
  </div>
</div>
    {/* Name */}
    <div className="text-center mt-4">
      <h2 className="text-3xl font-black text-gray-900">
        {profileData.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {profileData.bio}
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-500 mt-4 font-semibold">
        <FaCrown />
        Premium Member
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3 mt-6">
      <div className="rounded-2xl bg-[#f8f4ee] p-4 text-center">
        <h3 className="text-2xl font-black">48</h3>
        <p className="text-xs text-gray-500 mt-1">Orders</p>
      </div>

      <div className="rounded-2xl bg-[#f8f4ee] p-4 text-center">
        <h3 className="text-2xl font-black">4.9</h3>
        <p className="text-xs text-gray-500 mt-1">Rating</p>
      </div>

      <div className="rounded-2xl bg-[#f8f4ee] p-4 text-center">
        <h3 className="text-2xl font-black">12</h3>
        <p className="text-xs text-gray-500 mt-1">Wishlist</p>
      </div>
    </div>

    {/* Edit Button */}
    <button
      onClick={() => {
        setFormData(profileData);
        setShowEditModal(true);
      }}
      className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
    >
      <FaEdit />
      Edit Profile
    </button>
  </div>
</div>

          {/* Right Side */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Info */}
            <div className="bg-white rounded-[36px] shadow-xl p-8">
              <h3 className="text-3xl font-black mb-8">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="rounded-2xl bg-[#f8f4ee] p-5">
                  <FaUser className="text-orange-500 text-xl mb-4" />
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <h4 className="font-bold mt-2">{profileData.name}</h4>
                </div>

                <div className="rounded-2xl bg-[#f8f4ee] p-5">
                  <FaEnvelope className="text-orange-500 text-xl mb-4" />
                  <p className="text-gray-500 text-sm">Email</p>
                  <h4 className="font-bold mt-2">{profileData.email}</h4>
                </div>

                <div className="rounded-2xl bg-[#f8f4ee] p-5">
                  <FaPhone className="text-orange-500 text-xl mb-4" />
                  <p className="text-gray-500 text-sm">Phone</p>
                  <h4 className="font-bold mt-2">{profileData.phone}</h4>
                </div>

                <div className="rounded-2xl bg-[#f8f4ee] p-5">
                  <FaMapMarkerAlt className="text-orange-500 text-xl mb-4" />
                  <p className="text-gray-500 text-sm">Location</p>
                  <h4 className="font-bold mt-2">New Delhi</h4>
                </div>
              </div>
            </div>
                        {/* Recent Orders */}
            <div className="bg-white rounded-[36px] shadow-xl p-8">
              <h3 className="text-3xl font-black mb-8">
                Recent Orders
              </h3>

              <div className="space-y-4">

                <div className="rounded-2xl border border-gray-100 p-5 flex justify-between items-center hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <FaShoppingBag className="text-orange-500" />
                    </div>

                    <div>
                      <h4 className="font-bold">Cheese Burger</h4>
                      <p className="text-sm text-gray-500">Order #2048</p>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                    Delivered
                  </span>
                </div>

                <div className="rounded-2xl border border-gray-100 p-5 flex justify-between items-center hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <FaShoppingBag className="text-orange-500" />
                    </div>

                    <div>
                      <h4 className="font-bold">Italian Pizza</h4>
                      <p className="text-sm text-gray-500">Order #2049</p>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 font-semibold text-sm">
                    On The Way
                  </span>
                </div>

                <div className="rounded-2xl border border-gray-100 p-5 flex justify-between items-center hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <FaShoppingBag className="text-orange-500" />
                    </div>

                    <div>
                      <h4 className="font-bold">Cold Coffee</h4>
                      <p className="text-sm text-gray-500">Order #2050</p>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                    Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#111111] text-white rounded-[36px] shadow-2xl p-8">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-400 text-xl" />
                <h3 className="text-3xl font-black">
                  Delivery Address
                </h3>
              </div>

              <p className="text-gray-300 mt-6 leading-8">
                {profileData.address}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-xl w-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">
                Edit Profile
              </h2>

              <button onClick={handleCancel}>
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full rounded-2xl bg-gray-100 px-5 py-4 outline-none"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full rounded-2xl bg-gray-100 px-5 py-4 outline-none"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full rounded-2xl bg-gray-100 px-5 py-4 outline-none"
              />

              <input
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="w-full rounded-2xl bg-gray-100 px-5 py-4 outline-none"
              />

              <textarea
                rows={4}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-2xl bg-gray-100 px-5 py-4 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-3"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;