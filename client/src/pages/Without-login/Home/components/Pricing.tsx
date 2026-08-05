import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCrown } from "react-icons/fa";

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthly: 0,
      yearly: 0,
      popular: false,
      features: [
        "1 Website",
        "Free Subdomain",
        "SSL Certificate",
        "Basic Templates",
        "Email Support",
      ],
    },
    {
      name: "Pro",
      monthly: 499,
      yearly: 4999,
      popular: true,
      features: [
        "10 Websites",
        "Custom Domain",
        "Premium Templates",
        "Admin Panel",
        "Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Business",
      monthly: 999,
      yearly: 9999,
      popular: false,
      features: [
        "Unlimited Websites",
        "Unlimited Domains",
        "All Templates",
        "AI Website Builder",
        "Team Members",
        "API Access",
        "24/7 Support",
      ],
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Pricing
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Simple & Transparent Pricing
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Choose the plan that fits your business.
          </p>

          {/* Toggle */}

          <div className="mt-10 inline-flex items-center rounded-full bg-slate-900 p-2">

            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 transition ${
                !yearly
                  ? "bg-blue-600 text-white"
                  : "text-slate-400"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 transition ${
                yearly
                  ? "bg-blue-600 text-white"
                  : "text-slate-400"
              }`}
            >
              Yearly
            </button>

          </div>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {plans.map((plan, index) => (

            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className={`relative rounded-3xl border p-8 ${
                plan.popular
                  ? "border-blue-500 bg-slate-900"
                  : "border-slate-800 bg-slate-900"
              }`}
            >

              {plan.popular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                    <FaCrown />
                    Most Popular
                  </div>
                </div>
              )}

              <h3 className="text-3xl font-bold text-white">
                {plan.name}
              </h3>

              <div className="mt-8">

                <span className="text-5xl font-black text-white">
                  ₹{yearly ? plan.yearly : plan.monthly}
                </span>

                <span className="ml-2 text-slate-400">
                  / {yearly ? "year" : "month"}
                </span>

              </div>

              <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
                Get Started
              </button>

              <div className="mt-10 space-y-5">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="rounded-full bg-green-500/20 p-2 text-green-400">
                      <FaCheck size={12} />
                    </div>

                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </div>

                ))}

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Pricing;