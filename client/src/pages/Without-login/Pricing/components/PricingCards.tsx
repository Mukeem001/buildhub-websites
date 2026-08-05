import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PricingCardsProps {
  yearly: boolean;
}

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    description: "Perfect for individuals getting started.",
    popular: false,
    button: "Start Free",
    features: [
      "1 Website",
      "BuildHub Subdomain",
      "AI Website Builder",
      "Free SSL",
      "Basic Templates",
      "Community Support",
    ],
  },
  {
    name: "Professional",
    monthly: 29,
    yearly: 23,
    description: "Best for freelancers and creators.",
    popular: true,
    button: "Get Professional",
    features: [
      "10 Websites",
      "Custom Domain",
      "Premium Templates",
      "Unlimited AI",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Business",
    monthly: 79,
    yearly: 63,
    description: "Ideal for growing businesses.",
    popular: false,
    button: "Start Business",
    features: [
      "Unlimited Websites",
      "Team Members",
      "White Label",
      "API Access",
      "Advanced SEO",
      "Premium Support",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "Custom solution for large organizations.",
    popular: false,
    button: "Contact Sales",
    features: [
      "Unlimited Everything",
      "Dedicated Manager",
      "Custom Integrations",
      "Enterprise Security",
      "SLA",
      "24/7 Support",
    ],
  },
];

export default function PricingCards({
  yearly,
}: PricingCardsProps) {
  return (
    <section className="relative bg-[#050816] py-24">

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

            Flexible Plans

          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">

            Choose The Plan
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              That Fits Your Growth
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Transparent pricing with no hidden fees.
            Upgrade whenever your business grows.
          </p>

        </motion.div>

        {/* Pricing Grid */}

        <div className="grid gap-8 lg:grid-cols-4">


                      {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-300 ${
                plan.popular
                  ? "border-cyan-500/40 bg-gradient-to-b from-cyan-500/10 to-blue-500/10"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {/* Popular Badge */}

              {plan.popular && (
                <div className="absolute right-5 top-5 rounded-full bg-cyan-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}

              {/* Glow */}

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative p-8">

                {/* Plan */}

                <h3 className="text-2xl font-black text-white">
                  {plan.name}
                </h3>

                <p className="mt-3 min-h-[52px] text-sm leading-7 text-slate-400">
                  {plan.description}
                </p>

                {/* Price */}

                <div className="mt-8">

                  {plan.monthly === null ? (
                    <div>

                      <h2 className="text-5xl font-black text-white">
                        Custom
                      </h2>

                      <p className="mt-2 text-slate-400">
                        Contact our sales team
                      </p>

                    </div>
                  ) : (
                    <>
                      <div className="flex items-end gap-2">

                        <span className="text-5xl font-black text-white">
                          ${yearly ? plan.yearly : plan.monthly}
                        </span>

                        <span className="mb-2 text-slate-400">
                          /month
                        </span>

                      </div>

                      {yearly && (
                        <p className="mt-2 text-sm text-emerald-400">
                          Billed annually • Save 20%
                        </p>
                      )}
                    </>
                  )}

                </div>

                {/* CTA */}

                <button
                  className={`mt-8 w-full rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-cyan-500 text-white hover:bg-cyan-400"
                      : "border border-white/10 bg-white/[0.04] text-white hover:border-cyan-500/40 hover:bg-white/[0.08]"
                  }`}
                >
                  {plan.button}
                </button>

                {/* Divider */}

                <div className="my-8 border-t border-white/10" />

                {/* Features */}

                <div className="space-y-4">

                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-emerald-400"
                      />

                      <span className="text-sm leading-6 text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Bottom Note */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold text-white">
            Every Plan Includes
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-400">
            Free SSL certificates, global cloud hosting, AI-powered website
            builder, automatic updates, responsive templates, secure backups,
            analytics, and continuous platform improvements with no hidden
            fees.
          </p>
        </motion.div>

      </div>

    </section>
  );
}