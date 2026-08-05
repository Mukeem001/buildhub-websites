import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaPaintBrush,
  FaRocket,
} from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Choose a Template",
    description:
      "Browse premium templates and select the one that matches your business.",
    icon: FaLayerGroup,
  },
  {
    id: "02",
    title: "Customize Everything",
    description:
      "Change logo, colors, images, products and pages without coding.",
    icon: FaPaintBrush,
  },
  {
    id: "03",
    title: "Publish Instantly",
    description:
      "Go live with a free subdomain or connect your own custom domain.",
    icon: FaRocket,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            How It Works
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Launch Your Website in 3 Easy Steps
          </h2>

          <p className="mt-5 text-slate-400">
            No coding. No server setup. No technical knowledge required.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="relative mt-20 grid gap-8 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8"
              >
                {/* Number */}

                <div className="absolute right-6 top-6 text-6xl font-black text-slate-800">
                  {step.id}
                </div>

                {/* Icon */}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-3xl text-blue-400">
                  <Icon />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>

                <button className="mt-8 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Learn More
                </button>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;