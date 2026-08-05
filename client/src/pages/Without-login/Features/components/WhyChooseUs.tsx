import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Bot,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Bot,
    title: "AI Powered Builder",
    description:
      "Generate complete professional websites in minutes using AI.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Global CDN, optimized assets and modern infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "SSL, backups, monitoring and advanced protection included.",
  },
];

const comparison = [
  {
    label: "Website Creation Speed",
    value: 98,
  },
  {
    label: "SEO Optimization",
    value: 95,
  },
  {
    label: "Performance",
    value: 99,
  },
  {
    label: "Security",
    value: 100,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">

        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            Why Choose BuildHub
          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl">
            Build Better Websites
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Faster Than Ever
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Everything required to launch modern business websites
            from one platform. No coding, no server management,
            no complicated setup.
          </p>

          <div className="mt-10 space-y-6">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                    <Icon
                      size={28}
                      className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">
            Start Building Free

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  BuildHub Performance
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Platform Overview
                </h3>
              </div>

              <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                Excellent
              </div>
            </div>

            <div className="space-y-7">
              {comparison.map((item) => (
                <div key={item.label}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      {item.label}
                    </span>

                    <span className="font-semibold text-white">
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}

            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5 text-center">
                <h4 className="text-3xl font-black text-white">
                  50K+
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Websites Live
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5 text-center">
                <h4 className="text-3xl font-black text-emerald-400">
                  99.9%
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Uptime
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={24}
                  className="mt-0.5 text-emerald-400"
                />

                <div>
                  <h4 className="font-semibold text-white">
                    Trusted by Thousands
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    BuildHub helps creators, startups and businesses
                    launch premium websites with enterprise-grade
                    performance and security.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}