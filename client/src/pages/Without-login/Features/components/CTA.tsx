import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Bot,
} from "lucide-react";

const benefits = [
  "Start Free — No Credit Card Required",
  "AI-Powered Website Builder",
  "Free SSL & Cloud Hosting",
  "Publish Your Website in Minutes",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#050816] py-28">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[170px]" />

      {/* Grid Pattern */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0b1325] via-[#0d1831] to-[#07111f] p-10 md:p-14"
        >
          {/* Background Accent */}

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">

            {/* ================= LEFT ================= */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles size={16} />
                Start Your Journey Today
              </div>

              <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
                Ready To Build
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Your Dream Website?
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Build professional websites using AI, premium templates,
                cloud hosting and enterprise-grade tools — all in one
                powerful platform.
              </p>

              {/* Benefits */}

              <div className="mt-10 grid gap-4 sm:grid-cols-2">


                                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="flex-shrink-0 text-emerald-400"
                    />

                    <span className="text-sm text-slate-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">

                <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

                  Start Building Free

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </button>

                <button className="rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.08]">
                  View Pricing
                </button>

              </div>

            </motion.div>

            {/* ================= RIGHT ================= */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">

                <div className="mb-8 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      BuildHub Platform
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      Ready To Launch
                    </h3>

                  </div>

                  <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                    LIVE
                  </div>

                </div>

                <div className="space-y-4">

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10">
                      <Bot
                        size={28}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>

                      <h4 className="font-semibold text-white">
                        AI Website Builder
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        Generate complete websites instantly.
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                      <Rocket
                        size={28}
                        className="text-blue-400"
                      />
                    </div>

                    <div>

                      <h4 className="font-semibold text-white">
                        One-Click Deployment
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        Publish globally with cloud hosting.
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
                      <ShieldCheck
                        size={28}
                        className="text-emerald-400"
                      />
                    </div>

                    <div>

                      <h4 className="font-semibold text-white">
                        Enterprise Security
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        SSL, backups and 24/7 protection included.
                      </p>

                    </div>

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
                className="absolute -right-6 -top-6 hidden rounded-2xl border border-white/10 bg-[#101827]/90 px-5 py-4 shadow-2xl backdrop-blur-xl lg:block"
              >

                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Websites Created
                </p>

                <h3 className="mt-2 text-2xl font-black text-cyan-400">
                  50K+
                </h3>

              </motion.div>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}