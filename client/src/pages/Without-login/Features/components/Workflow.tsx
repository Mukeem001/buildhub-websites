import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Bot,
  Globe,
  Rocket,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const workflowSteps = [
  {
    icon: LayoutTemplate,
    step: "01",
    title: "Choose a Template",
    description:
      "Browse hundreds of professionally designed templates for every industry.",
  },
  {
    icon: Bot,
    step: "02",
    title: "Customize with AI",
    description:
      "Generate content, sections and layouts instantly using AI-powered tools.",
  },
  {
    icon: Globe,
    step: "03",
    title: "Connect Your Domain",
    description:
      "Use your own domain or launch instantly with a BuildHub subdomain.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Publish Website",
    description:
      "Deploy globally with SSL, CDN and enterprise cloud hosting in one click.",
  },
  {
    icon: BarChart3,
    step: "05",
    title: "Track & Grow",
    description:
      "Monitor visitors, analytics and conversions from your dashboard.",
  },
];

export default function Workflow() {
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
            How It Works
          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Build Your Website
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              In Just 5 Simple Steps
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Launch your website from idea to production without writing
            a single line of code.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative">

                      {/* Desktop Timeline Line */}

          <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20 lg:block" />

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">

            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative"
                >
                  {/* Step Circle */}

                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl transition-all duration-300 group-hover:scale-110">

                    <Icon
                      size={34}
                      className="text-cyan-400"
                    />

                  </div>

                  {/* Step Number */}

                  <div className="mt-5 text-center">

                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                      Step {step.step}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {step.description}
                    </p>

                  </div>

                  {/* Connector Arrow */}

                  {index !== workflowSteps.length - 1 && (
                    <ArrowRight
                      size={20}
                      className="absolute -right-4 top-10 hidden text-cyan-400 xl:block"
                    />
                  )}
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
            className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-8 backdrop-blur-xl"
          >

            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

              <div className="max-w-2xl">

                <h3 className="text-3xl font-black text-white">
                  From Idea to Live Website in Minutes
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Pick a template, customize it with AI, connect your
                  domain and publish globally without touching a single
                  line of code.
                </p>

              </div>

              <button className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

                Start Building

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}