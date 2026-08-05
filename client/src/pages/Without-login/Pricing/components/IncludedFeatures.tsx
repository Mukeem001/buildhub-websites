import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Globe,
  ShieldCheck,
  Search,
  BarChart3,
  Database,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Website Builder",
    description:
      "Generate complete websites with AI in just a few minutes.",
  },
  {
    icon: Globe,
    title: "Cloud Hosting",
    description:
      "Fast, reliable cloud hosting with global performance.",
  },
  {
    icon: ShieldCheck,
    title: "Free SSL Security",
    description:
      "Every website is protected with enterprise-grade SSL.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description:
      "Built-in SEO tools to improve your search rankings.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track visitors, traffic and website performance.",
  },
  {
    icon: Database,
    title: "Automatic Backups",
    description:
      "Daily backups keep your website safe and recoverable.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Every template looks perfect on every device.",
  },
  {
    icon: Sparkles,
    title: "Automatic Updates",
    description:
      "Stay up to date with continuous platform improvements.",
  },
];

export default function IncludedFeatures() {
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

            <Sparkles size={16} />

            Included With Every Plan

          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">

            Everything You Need

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

              To Build & Grow

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Every BuildHub plan includes powerful tools,
            enterprise-grade infrastructure and modern features
            to help you launch and scale with confidence.

          </p>

        </motion.div>

        {/* Features Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">


                      {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/30"
              >
                {/* Hover Glow */}

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15">

                  <Icon
                    size={30}
                    className="text-cyan-400"
                  />

                </div>

                {/* Content */}

                <h3 className="mt-7 text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>

        {/* Bottom Trust Banner */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div className="max-w-3xl">

              <h3 className="text-3xl font-black text-white">
                More Than Just Website Hosting
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                Every BuildHub plan comes with powerful AI tools,
                enterprise-grade infrastructure, automatic updates,
                secure cloud hosting, responsive templates and
                performance optimization—so you can focus on growing
                your business instead of managing servers.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-[#0d1529] px-6 py-5 text-center">

                <h4 className="text-3xl font-black text-cyan-400">
                  99.9%
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Uptime
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d1529] px-6 py-5 text-center">

                <h4 className="text-3xl font-black text-emerald-400">
                  24/7
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Support
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}