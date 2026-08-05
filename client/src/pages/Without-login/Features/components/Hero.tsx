import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    value: "250+",
    label: "Premium Templates",
  },
  {
    value: "50K+",
    label: "Websites Created",
  },
  {
    value: "99.9%",
    label: "Platform Uptime",
  },
];

const highlights = [
  "AI Website Builder",
  "SEO Ready",
  "Custom Domains",
  "Cloud Hosting",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#050816]">
      {/* Background Glow */}

      <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[120px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-20 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">

        {/* ================= LEFT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-sm font-medium text-cyan-300">
              Powerful No-Code Website Builder
            </span>
          </div>

          {/* Heading */}

          <h1 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
            Build Stunning Websites

            <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Without Writing Code
            </span>
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            Launch professional business websites, online stores,
            portfolios, agencies and landing pages using AI,
            premium templates and enterprise-grade hosting.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">
              Start Building

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10">
              Explore Features
            </button>

          </div>

          {/* Highlights */}

          <div className="mt-10 grid grid-cols-2 gap-4">

            {highlights.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />

                <span className="text-sm text-slate-300">
                  {item}
                </span>

              </div>

            ))}

          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-6">

            {stats.map((item) => (

              <div key={item.label}>

                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {item.label}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-xl"
        >
                      {/* Dashboard Preview */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 pb-5">

              <div>
                <p className="text-sm text-slate-400">
                  BuildHub Studio
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  Website Dashboard
                </h3>
              </div>

              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                ● Live
              </div>

            </div>

            {/* Analytics */}

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c1426] p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    Visitors
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    84.2K
                  </h2>

                </div>

                <div className="rounded-xl bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-400">
                  +18%
                </div>

              </div>

              <div className="mt-6 flex h-24 items-end gap-2">

                {[35, 55, 45, 70, 65, 90, 80].map((value, index) => (

                  <div
                    key={index}
                    className="flex-1 rounded-t-full bg-gradient-to-t from-blue-600 to-cyan-400"
                    style={{
                      height: `${value}%`,
                    }}
                  />

                ))}

              </div>

            </div>

            {/* Feature Cards */}

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-[#0c1426] p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">

                  <span className="text-xl">🤖</span>

                </div>

                <h4 className="font-semibold text-white">
                  AI Builder
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Generate complete websites in minutes.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1426] p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">

                  <span className="text-xl">🌐</span>

                </div>

                <h4 className="font-semibold text-white">
                  Domains
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Connect custom domains instantly.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1426] p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">

                  <span className="text-xl">🔒</span>

                </div>

                <h4 className="font-semibold text-white">
                  SSL Security
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Automatic SSL on every website.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1426] p-5">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">

                  <span className="text-xl">🚀</span>

                </div>

                <h4 className="font-semibold text-white">
                  One Click Publish
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Publish your website globally.
                </p>

              </div>

            </div>

          </div>

          {/* Floating Cards */}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-10 top-16 hidden rounded-2xl border border-white/10 bg-[#0d1528]/90 p-5 shadow-2xl backdrop-blur-xl xl:block"
          >

            <p className="text-xs uppercase tracking-wider text-slate-400">
              Websites
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              50K+
            </h3>

          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -right-8 bottom-16 hidden rounded-2xl border border-white/10 bg-[#0d1528]/90 p-5 shadow-2xl backdrop-blur-xl xl:block"
          >

            <p className="text-xs uppercase tracking-wider text-slate-400">
              Uptime
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-400">
              99.9%
            </h3>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};
