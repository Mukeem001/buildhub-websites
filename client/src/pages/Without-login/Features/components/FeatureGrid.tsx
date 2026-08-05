import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Rocket,
  ShieldCheck,
  Search,
  BarChart3,
  ShoppingBag,
  Zap,
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
    title: "Custom Domains",
    description:
      "Connect your own domain or launch with a free subdomain.",
  },
  {
    icon: Rocket,
    title: "Cloud Hosting",
    description:
      "Fast global hosting with automatic deployment and CDN.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Built-in SEO tools to improve search engine rankings.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track visitors, traffic sources and business growth.",
  },
  {
    icon: ShoppingBag,
    title: "eCommerce",
    description:
      "Sell products online with payments, orders and inventory.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Automatic SSL, backups and advanced protection.",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Optimized loading speed with modern infrastructure.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative bg-[#050816] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Everything You Need
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Powerful tools designed to help you create,
            manage and grow professional websites without coding.
          </p>
        </motion.div>

        {/* Grid Start */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                      {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-white/[0.05]"
              >
                {/* Glow Effect */}

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
                  <Icon
                    size={30}
                    className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}

                <h3 className="relative z-10 text-xl font-bold text-white">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="relative z-10 mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>

                {/* Learn More */}

                <button className="relative z-10 mt-8 inline-flex items-center gap-2 font-medium text-cyan-400 transition-all duration-300 group-hover:gap-3">
                  Learn More
                  <span className="text-lg">→</span>
                </button>

                {/* Bottom Line */}

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}