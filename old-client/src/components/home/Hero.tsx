import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              🚀 Build Professional Websites in Minutes
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">
              Create Amazing Websites
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Without Coding
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              Launch Ecommerce, Restaurant, Portfolio, Agency and Business
              websites instantly with premium templates, free hosting,
              custom domain support and powerful admin panel.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700">
                Start Free
                <FaArrowRight />
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-4 transition hover:border-blue-500">
                <FaPlay />
                Live Demo
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Free Hosting",
                "Free SSL Certificate",
                "SEO Optimized",
                "Custom Domain",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <h2 className="text-4xl font-bold">20K+</h2>
                <p className="text-slate-400">Websites</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">120+</h2>
                <p className="text-slate-400">Templates</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">99.9%</h2>
                <p className="text-slate-400">Uptime</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-slate-800 p-5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>

                <div className="ml-4 rounded-lg bg-slate-800 px-4 py-1 text-sm text-slate-400">
                  dashboard.buildhub.com
                </div>
              </div>

              {/* Dashboard */}
              <div className="space-y-6 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-800 p-5">
                    <p className="text-slate-400">Revenue</p>
                    <h3 className="mt-3 text-3xl font-bold">$48,250</h3>
                    <div className="mt-5 h-2 rounded-full bg-slate-700">
                      <div className="h-2 w-4/5 rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-800 p-5">
                    <p className="text-slate-400">Orders</p>
                    <h3 className="mt-3 text-3xl font-bold">1,284</h3>
                    <div className="mt-5 h-2 rounded-full bg-slate-700">
                      <div className="h-2 w-3/4 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-800 p-6">
                  <p className="mb-6 text-slate-400">Visitors</p>

                  <div className="flex h-52 items-end gap-3">
                    {[45, 70, 50, 90, 60, 120, 80, 140].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: item }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.6,
                        }}
                        className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -left-10 top-10 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl"
            >
              <p className="text-slate-400 text-sm">Today's Sales</p>
              <h3 className="mt-2 text-2xl font-bold">$8,240</h3>
            </motion.div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute -right-10 bottom-10 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl"
            >
              <p className="text-slate-400 text-sm">New Customers</p>
              <h3 className="mt-2 text-2xl font-bold">+258</h3>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;