import { motion } from "framer-motion";
import {
  CreditCard,
  Bot,
  Mail,
  BarChart3,
  Database,
  ShieldCheck,
  Cloud,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const integrations = [
  {
    icon: CreditCard,
    title: "Payment Gateways",
    tools: "Stripe • Razorpay • PayPal",
    description:
      "Accept secure online payments from customers worldwide.",
  },
  {
    icon: Bot,
    title: "AI Services",
    tools: "OpenAI • Gemini",
    description:
      "Generate content, layouts and business websites using AI.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    tools: "Mailchimp • Resend",
    description:
      "Send newsletters, campaigns and automated emails.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    tools: "Google Analytics",
    description:
      "Track visitors, traffic and conversions in real time.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    tools: "Cloudinary",
    description:
      "Manage images and media with optimized cloud delivery.",
  },
  {
    icon: Database,
    title: "Database",
    tools: "Supabase • Firebase",
    description:
      "Reliable cloud databases with authentication support.",
  },
  
  {
    icon: ShieldCheck,
    title: "Authentication",
    tools: "Google • GitHub",
    description:
      "Secure sign-in with modern OAuth authentication.",
  },
];

export default function Integrations() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            Powerful Integrations
          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Connect Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Favorite Tools
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Integrate BuildHub with industry-leading services to
            automate workflows, accept payments, track analytics
            and grow your business faster.
          </p>
        </motion.div>

        {/* Integration Grid */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                      {integrations.map((integration, index) => {
            const Icon = integration.icon;

            return (
              <motion.div
                key={integration.title}
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

                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Connected Badge */}

                <div className="absolute right-5 top-5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  Connected
                </div>

                {/* Icon */}

                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  <Icon
                    size={30}
                    className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}

                <h3 className="relative z-10 text-xl font-bold text-white">
                  {integration.title}
                </h3>

                {/* Tools */}

                <p className="mt-3 text-sm font-medium text-cyan-300">
                  {integration.tools}
                </p>

                {/* Description */}

                <p className="mt-4 leading-7 text-slate-400">
                  {integration.description}
                </p>

                {/* Button */}

                <button className="mt-8 inline-flex items-center gap-2 font-medium text-cyan-400 transition-all duration-300 group-hover:gap-3">
                  Explore Integration

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

        {/* Enterprise CTA */}

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
                Build Your Perfect Workflow
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Connect payment gateways, AI services, analytics,
                email marketing and authentication providers in one
                powerful platform built for modern businesses.
              </p>

            </div>

            <button className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

              View All Integrations

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}