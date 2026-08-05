import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Cloud,
  Database,
  Fingerprint,
  Globe,
  Sparkles,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Free SSL Certificates",
    description:
      "Every website is automatically secured with HTTPS encryption.",
  },
  {
    icon: Database,
    title: "Automatic Daily Backups",
    description:
      "Your website data is backed up regularly to keep everything safe.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Deliver content quickly from servers located around the world.",
  },
  {
    icon: Fingerprint,
    title: "Secure Authentication",
    description:
      "Modern authentication with role-based access and secure login.",
  },
];

export default function Security() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            Enterprise Security
          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Your Website Is
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Protected 24/7
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Security is built into every BuildHub website with
            enterprise-grade infrastructure, monitoring and protection.
          </p>
        </motion.div>

        {/* Main Layout */}

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

                        <div className="space-y-6">

              {securityFeatures.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
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

              {/* Header */}

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    Live Security Dashboard
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Protection Status
                  </h3>
                </div>

                <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                  Secure
                </div>

              </div>

              {/* Security Score */}

              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#0d1529] py-10">

                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-cyan-500/20">

                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20">

                    <div className="text-center">

                      <h2 className="text-4xl font-black text-cyan-400">
                        99%
                      </h2>

                      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                        Secure
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Status Cards */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                  <ShieldCheck
                    size={24}
                    className="text-emerald-400"
                  />

                  <h4 className="mt-4 font-semibold text-white">
                    Firewall
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Active
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                  <Lock
                    size={24}
                    className="text-cyan-400"
                  />

                  <h4 className="mt-4 font-semibold text-white">
                    SSL
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Enabled
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                  <Cloud
                    size={24}
                    className="text-blue-400"
                  />

                  <h4 className="mt-4 font-semibold text-white">
                    Backups
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Daily
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                  <Fingerprint
                    size={24}
                    className="text-purple-400"
                  />

                  <h4 className="mt-4 font-semibold text-white">
                    Identity
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Verified
                  </p>

                </div>

              </div>

              {/* Bottom Banner */}

              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

                <div className="flex items-start gap-4">

                  <ShieldCheck
                    size={28}
                    className="text-emerald-400"
                  />

                  <div>

                    <h4 className="font-bold text-white">
                      Enterprise Infrastructure
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Continuous monitoring, DDoS protection,
                      automatic SSL renewal and encrypted backups
                      keep your website secure around the clock.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Badge */}

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -right-6 -top-6 hidden rounded-2xl border border-white/10 bg-[#101827]/90 px-5 py-4 shadow-xl backdrop-blur-xl lg:block"
            >
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Uptime
              </p>

              <h3 className="mt-2 text-2xl font-black text-emerald-400">
                99.9%
              </h3>
            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
