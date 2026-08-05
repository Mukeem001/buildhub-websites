import { motion } from "framer-motion";
import {
  ShoppingCart,
  Briefcase,
  Palette,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  HeartPulse,
  Newspaper,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    icon: ShoppingCart,
    title: "eCommerce",
    description:
      "Launch a complete online store with products, payments and inventory.",
  },
  {
    icon: Briefcase,
    title: "Business",
    description:
      "Professional business websites with modern layouts and SEO.",
  },
  {
    icon: Palette,
    title: "Portfolio",
    description:
      "Showcase your work with beautiful portfolio templates.",
  },
  {
    icon: Building2,
    title: "Agency",
    description:
      "Perfect for creative agencies, startups and software companies.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description:
      "Menus, reservations and food ordering in one place.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Courses, schools and learning platforms made simple.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Clinics, hospitals and healthcare providers online.",
  },
  {
    icon: Newspaper,
    title: "Blog & News",
    description:
      "Publish articles with a fast and SEO-friendly blogging system.",
  },
];

export default function WebsiteCategories() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            Website Categories
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Build Any Website
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Whether you're creating an online store, portfolio,
            restaurant or business website, BuildHub gives you
            everything you need to launch quickly.
          </p>
        </motion.div>

        {/* Categories Grid */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                      {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-white/[0.05]"
              >
                {/* Hover Glow */}

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  <Icon
                    size={30}
                    className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}

                <h3 className="relative z-10 text-xl font-bold text-white">
                  {category.title}
                </h3>

                {/* Description */}

                <p className="relative z-10 mt-4 leading-7 text-slate-400">
                  {category.description}
                </p>

                {/* CTA */}

                <button className="relative z-10 mt-8 inline-flex items-center gap-2 font-medium text-cyan-400 transition-all duration-300 group-hover:gap-3">
                  Explore Templates

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Bottom Border */}

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div className="max-w-2xl">
              <h3 className="text-3xl font-black text-white">
                Ready to Build Your Dream Website?
              </h3>

              <p className="mt-4 text-slate-400">
                Choose from hundreds of professionally designed templates,
                customize them with AI, connect your domain and publish your
                website in just a few clicks.
              </p>
            </div>

            <button className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">
              Browse Templates

              <ArrowRight
                size={18}
                className="transition-transform duration-300 hover:translate-x-1"
              />
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}