import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[150px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[150px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            About PureGlow
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mt-5">
            Beauty Powered By
            <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
              Nature & Science
            </span>
          </h1>

          <p className="text-gray-400 mt-8 text-lg max-w-3xl mx-auto leading-9">
            We create premium skincare products using botanical ingredients
            and modern dermatological science for healthier glowing skin.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000"
            className="rounded-[40px] w-full h-[500px] object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[5px] text-green-400 text-sm">
              Our Story
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-5">
              Skincare Reimagined
            </h2>

            <p className="text-gray-400 mt-6 leading-9 text-lg">
              PureGlow started with a simple mission: create luxurious skincare
              products that combine nature’s healing power with scientific innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            Why Us
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Why Choose PureGlow
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-3xl mx-auto">
            Crafted with precision to deliver premium skincare results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🌿",
              title: "Natural Ingredients",
              desc: "Premium botanical extracts carefully selected for healthy skin."
            },
            {
              icon: "🧪",
              title: "Science Backed",
              desc: "Dermatologically tested formulas powered by modern research."
            },
            {
              icon: "✨",
              title: "Luxury Experience",
              desc: "Premium texture, fragrance, and results in every product."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12 }}
              className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 hover:border-green-400/40 transition"
            >
              <div className="text-5xl mb-6">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-8">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Stats */}
      <section className="py-20 bg-white/[0.03] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-bold text-green-400">50K+</h3>
            <p className="text-gray-400 mt-3">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">100+</h3>
            <p className="text-gray-400 mt-3">Cities Served</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">4.9</h3>
            <p className="text-gray-400 mt-3">Average Rating</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-green-400">24/7</h3>
            <p className="text-gray-400 mt-3">Support</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            Our Team
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Meet Our Experts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah",
              role: "Dermatologist",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000"
            },
            {
              name: "Alex Johnson",
              role: "Skin Researcher",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000"
            },
            {
              name: "Emma Lee",
              role: "Product Expert",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000"
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="rounded-[35px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold">
                  {member.name}
                </h3>

                <p className="text-green-400 mt-2">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


   

    </div>
  );
}



