import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";

const highlights = [
  "No Credit Card Required",
  "Cancel Anytime",
  "Free SSL Included",
  "24/7 Support",
];

const stats = [
  {
    value: "50K+",
    label: "Active Websites",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "99.9%",
    label: "Platform Uptime",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#050816]">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">

        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

            <Sparkles size={16} />

            Simple & Transparent Pricing

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">

            Choose The Perfect Plan

            <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

              For Your Business

            </span>

          </h1>

          {/* Description */}

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

            Whether you're building your first website or managing
            multiple client projects, BuildHub has a plan designed
            for every stage of your growth.

          </p>

          {/* CTA Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

              Start Free

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>

            <button className="rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.08]">

              Compare Plans

            </button>

          </div>

          {/* Highlights */}

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
                        {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <CheckCircle2
                  size={20}
                  className="flex-shrink-0 text-emerald-400"
                />

                <span className="text-sm text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-6">

            {stats.map((stat) => (
              <div key={stat.label}>

                <h3 className="text-3xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-xl"
        >

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-2xl">

            {/* Glow */}

            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />

            {/* Header */}

            <div className="relative flex items-center justify-between border-b border-white/10 pb-6">

              <div>

                <p className="text-sm text-slate-400">
                  Pricing Overview
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Professional Plan
                </h3>

              </div>

              <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                Most Popular
              </div>

            </div>

            {/* Price */}

            <div className="relative mt-8">

              <div className="flex items-end gap-2">

                <span className="text-5xl font-black text-white">
                  $29
                </span>

                <span className="mb-2 text-slate-400">
                  /month
                </span>

              </div>

              <p className="mt-3 text-slate-400">
                Perfect for freelancers, startups and growing businesses.
              </p>

            </div>

            {/* Features */}

            <div className="mt-8 space-y-4">

              {[
                "Unlimited AI Generations",
                "Premium Templates",
                "Custom Domain",
                "Cloud Hosting",
                "Advanced Analytics",
                "Priority Support",
              ].map((feature) => (

                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-slate-300">
                    {feature}
                  </span>

                </div>

              ))}

            </div>

            {/* Bottom Cards */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                <CreditCard
                  size={26}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-sm text-slate-400">
                  Billing
                </p>

                <h4 className="mt-2 text-xl font-bold text-white">
                  Monthly
                </h4>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                <ShieldCheck
                  size={26}
                  className="text-emerald-400"
                />

                <p className="mt-4 text-sm text-slate-400">
                  Security
                </p>

                <h4 className="mt-2 text-xl font-bold text-white">
                  Included
                </h4>

              </div>

            </div>

          </div>

          {/* Floating Card */}

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-[#101827]/90 px-5 py-4 shadow-2xl backdrop-blur-xl lg:block"
          >

            <div className="flex items-center gap-3">

              <Zap
                size={22}
                className="text-yellow-400"
              />

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Save
                </p>

                <h4 className="text-xl font-black text-white">
                  20% Yearly
                </h4>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}