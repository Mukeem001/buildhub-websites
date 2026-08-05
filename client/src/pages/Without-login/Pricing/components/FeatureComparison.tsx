import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";

const comparison = [
  {
    feature: "AI Website Builder",
    starter: true,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Premium Templates",
    starter: true,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Cloud Hosting",
    starter: true,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Free SSL",
    starter: true,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Custom Domain",
    starter: false,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Advanced Analytics",
    starter: false,
    professional: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "White Label",
    starter: false,
    professional: false,
    business: true,
    enterprise: true,
  },
  {
    feature: "API Access",
    starter: false,
    professional: false,
    business: true,
    enterprise: true,
  },
  {
    feature: "Dedicated Account Manager",
    starter: false,
    professional: false,
    business: false,
    enterprise: true,
  },
];

const renderIcon = (enabled: boolean) =>
  enabled ? (
    <CheckCircle2
      size={20}
      className="mx-auto text-emerald-400"
    />
  ) : (
    <X
      size={18}
      className="mx-auto text-slate-600"
    />
  );

export default function FeatureComparison() {
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

            Compare Plans

          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">

            Find The Perfect Plan

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

              Feature Comparison

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Compare every feature across all plans and choose
            the option that fits your business needs.

          </p>

        </motion.div>

        {/* Comparison Table */}

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">

          <table className="min-w-full border-collapse">


                        <thead className="sticky top-0 z-10 bg-[#0b1325]/95 backdrop-blur-xl">

              <tr className="border-b border-white/10">

                <th className="px-8 py-6 text-left text-lg font-bold text-white">
                  Features
                </th>

                <th className="px-6 py-6 text-center text-white">
                  Starter
                </th>

                <th className="bg-cyan-500/10 px-6 py-6 text-center text-cyan-300">
                  Professional
                </th>

                <th className="px-6 py-6 text-center text-white">
                  Business
                </th>

                <th className="px-6 py-6 text-center text-white">
                  Enterprise
                </th>

              </tr>

            </thead>

            <tbody>

              {comparison.map((item, index) => (

                <motion.tr
                  key={item.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.03]"
                >

                  <td className="px-8 py-5 font-medium text-white">
                    {item.feature}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {renderIcon(item.starter)}
                  </td>

                  <td className="bg-cyan-500/5 px-6 py-5 text-center">
                    {renderIcon(item.professional)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {renderIcon(item.business)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {renderIcon(item.enterprise)}
                  </td>

                </motion.tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Enterprise CTA */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 backdrop-blur-xl"
        >

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div>

              <h3 className="text-3xl font-black text-white">
                Need Something More?
              </h3>

              <p className="mt-4 max-w-2xl leading-8 text-slate-400">
                Looking for custom integrations, dedicated infrastructure,
                enterprise security, SSO, API access and personalized onboarding?
                Our Enterprise plan is built for large teams and organizations.
              </p>

            </div>

            <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-cyan-400">
              Contact Sales
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}