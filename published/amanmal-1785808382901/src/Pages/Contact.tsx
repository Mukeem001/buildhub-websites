import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#06110d] via-[#081814] to-[#020303] overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-10 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[6px] text-green-400 text-sm"
        >
          Contact Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mt-5"
        >
          Let’s Talk About
          <span className="block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Your Skin Care
          </span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-9">
          Have questions about our products? Need skincare advice?  
          Our PureGlow experts are here to help.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            whileHover={{ y: -10 }}
            className="rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 text-center"
          >
            <FaPhoneAlt className="text-green-400 text-4xl mx-auto mb-5" />
            <h3 className="text-2xl font-bold">Call Us</h3>
            <p className="text-gray-400 mt-4">+91 9876543210</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 text-center"
          >
            <FaEnvelope className="text-green-400 text-4xl mx-auto mb-5" />
            <h3 className="text-2xl font-bold">Email</h3>
            <p className="text-gray-400 mt-4">support@pureglow.com</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 text-center"
          >
            <FaMapMarkerAlt className="text-green-400 text-4xl mx-auto mb-5" />
            <h3 className="text-2xl font-bold">Location</h3>
            <p className="text-gray-400 mt-4">Mumbai, India</p>
          </motion.div>

        </div>
      </section>

            {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[6px] text-green-400 text-sm">
              Send Message
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-5 leading-tight">
              We’d Love To <br />
              Hear From You
            </h2>

            <p className="text-gray-400 mt-6 leading-9 text-lg">
              Whether you have product questions, skincare concerns,
              or feedback — our team is ready to assist you.
            </p>

            <div className="mt-10 rounded-[30px] bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/10 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold">Support Hours</h3>

              <p className="text-gray-400 mt-4 leading-8">
                Monday - Saturday <br />
                9:00 AM - 8:00 PM
              </p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[35px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10"
          >
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl px-5 py-4 bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl px-5 py-4 bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl px-5 py-4 bg-white/10 border border-white/10 outline-none focus:border-green-400"
              />

              <textarea
                rows={6}
                placeholder="Your Message..."
                className="w-full rounded-2xl px-5 py-4 bg-white/10 border border-white/10 outline-none focus:border-green-400 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

            {/* Location / Map Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            Visit Us
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Our Store Location
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-3xl mx-auto">
            Visit our flagship PureGlow experience center and explore premium skincare.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
>
  
</motion.div>
<div className="relative rounded-[35px] overflow-hidden border border-white/10">
  <iframe
    title="PureGlow Location"
    src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
    className="w-full h-[450px]"
    style={{ border: 0 }}
  />

  <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl">
    <p className="text-green-400 font-bold">PureGlow Store</p>
    <p className="text-sm text-gray-300">Mumbai, India</p>
  </div>
</div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[6px] text-green-400 text-sm">
            FAQ
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "How long does delivery take?",
              a: "Orders are typically delivered within 3-7 business days depending on your location.",
            },
            {
              q: "Are PureGlow products safe for sensitive skin?",
              a: "Yes, our products are dermatologically tested and suitable for most skin types.",
            },
            {
              q: "Can I return products?",
              a: "Yes, we offer easy returns within 7 days for unopened products.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
            >
              <h3 className="text-xl md:text-2xl font-semibold">
                {item.q}
              </h3>

              <p className="text-gray-400 mt-4 leading-8">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[45px] bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-700/20 border border-white/10 backdrop-blur-xl p-10 md:p-20 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Need Skincare <br /> Guidance?
          </h2>

          <p className="text-gray-300 mt-8 text-lg max-w-3xl mx-auto leading-9">
            Our skincare experts are ready to help you choose the perfect
            products for your skin type and concerns.
          </p>

          <button className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 transition">
            Contact Expert
          </button>
        </motion.div>
      </section>
    </div>
  );
}

