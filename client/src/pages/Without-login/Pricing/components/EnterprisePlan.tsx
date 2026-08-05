import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Server,
  Users,
  Workflow,
  Headphones,
  Lock,
  Cloud,
  CheckCircle2,
} from "lucide-react";

const enterpriseFeatures = [
  "Dedicated Cloud Infrastructure",
  "Unlimited Team Members",
  "Single Sign-On (SSO)",
  "Enterprise-grade Security",
  "Custom API Integrations",
  "Priority 24/7 Support",
];

const stats = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    value: "SOC Ready",
  },
  {
    icon: Cloud,
    title: "Infrastructure",
    value: "Dedicated",
  },
  {
    icon: Headphones,
    title: "Support",
    value: "24/7",
  },
  {
    icon: Lock,
    title: "Compliance",
    value: "Advanced",
  },
];

export default function EnterprisePlan() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

              <Sparkles size={16} />

              Enterprise Solutions

            </div>

            {/* Heading */}

            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl">

              Custom Plans For

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

                Growing Enterprises

              </span>

            </h2>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

              BuildHub Enterprise is designed for organizations
              that require maximum performance, security,
              scalability and dedicated support.

            </p>

            {/* Features */}

            <div className="mt-10 space-y-4">


                              {enterpriseFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                  />

                  <span className="text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-cyan-400">

                Talk To Sales

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

              <button className="rounded-xl border border-white/10 bg-white/[0.05] px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.08]">

                Schedule Demo

              </button>

            </div>

          </motion.div>

          {/* ================= RIGHT ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >

            {/* Floating Badge */}

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -left-6 top-10 z-10 hidden rounded-2xl border border-white/10 bg-[#101827]/90 px-5 py-4 backdrop-blur-xl lg:block"
            >
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Trusted By
              </p>

              <h4 className="mt-2 text-2xl font-black text-white">
                Enterprise
              </h4>
            </motion.div>

            {/* Main Card */}

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl">

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center justify-between border-b border-white/10 pb-6">

                  <div>

                    <p className="text-sm text-slate-400">
                      Enterprise Suite
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      Custom Infrastructure
                    </h3>

                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                    Available
                  </div>

                </div>

                {/* Top Cards */}

                <div className="mt-8 grid grid-cols-2 gap-5">

                  <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <Server
                      size={28}
                      className="text-cyan-400"
                    />

                    <p className="mt-4 text-sm text-slate-400">
                      Dedicated Servers
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      High Performance
                    </h4>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <Users
                      size={28}
                      className="text-blue-400"
                    />

                    <p className="mt-4 text-sm text-slate-400">
                      Team Members
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      Unlimited
                    </h4>

                  </div>

                </div>

                {/* Bottom Cards */}

                <div className="mt-5 grid grid-cols-2 gap-5">

                  <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <Workflow
                      size={28}
                      className="text-indigo-400"
                    />

                    <p className="mt-4 text-sm text-slate-400">
                      API Access
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      Unlimited
                    </h4>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                    <ShieldCheck
                      size={28}
                      className="text-emerald-400"
                    />

                    <p className="mt-4 text-sm text-slate-400">
                      Security
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      Enterprise
                    </h4>

                  </div>

                </div>

                {/* Enterprise Stats */}

                <div className="mt-8 grid grid-cols-2 gap-4">

                  {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b1220] p-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                          <Icon
                            size={22}
                            className="text-cyan-400"
                          />
                        </div>

                        <div>

                          <p className="text-xs text-slate-400">
                            {item.title}
                          </p>

                          <h4 className="mt-1 font-bold text-white">
                            {item.value}
                          </h4>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}