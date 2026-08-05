import { motion } from "framer-motion";
import {
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, Pixel Studio",
    company: "Creative Agency",
    rating: 5,
    review:
      "BuildHub helped us launch our agency website in less than an hour. The AI tools saved us days of work.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechFlow",
    rating: 5,
    review:
      "The templates are beautiful, performance is outstanding and publishing is incredibly simple.",
  },
  {
    name: "Emily Davis",
    role: "eCommerce Owner",
    company: "Fashion Store",
    rating: 5,
    review:
      "Everything from payments to custom domains worked perfectly. Highly recommended for growing businesses.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background */}

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
            Customer Success Stories
          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Loved By
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Thousands Of Customers
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Businesses, creators and startups around the world trust
            BuildHub to launch fast, modern and scalable websites.
          </p>

          {/* Rating */}

          <div className="mt-8 flex items-center justify-center gap-2">

            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="ml-3 text-white font-semibold">
              4.9/5 Average Rating
            </span>

          </div>

        </motion.div>

        {/* Testimonial Grid */}

        <div className="grid gap-8 lg:grid-cols-3">


                      {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-white/[0.06]"
            >
              {/* Hover Glow */}

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Quote */}

              <div className="mb-8 flex items-center justify-between">

                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <Quote
                  size={36}
                  className="text-cyan-400/40"
                />

              </div>

              {/* Review */}

              <p className="relative z-10 leading-8 text-slate-300">
                "{testimonial.review}"
              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white">
                  {testimonial.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>

                  <h4 className="font-bold text-white">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {testimonial.role}
                  </p>

                  <span className="text-sm text-cyan-400">
                    {testimonial.company}
                  </span>

                </div>

              </div>

            </motion.div>
          ))}

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

            <div>

              <h3 className="text-3xl font-black text-white">
                Join 50,000+ Happy Customers
              </h3>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                From startups and creators to growing businesses,
                thousands of customers trust BuildHub to create,
                manage and scale professional websites with confidence.
              </p>

            </div>

            <button className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

              Start Building Today

              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}