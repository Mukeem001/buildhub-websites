import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PricingToggleProps {
  yearly: boolean;
  onToggle: () => void;
}

export default function PricingToggle({
  yearly,
  onToggle,
}: PricingToggleProps) {
  return (
    <section className="relative bg-[#050816] py-16">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl"
        >

          {/* Badge */}

          <div className="flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

              <Sparkles size={16} />

              Flexible Billing

            </div>

          </div>

          {/* Heading */}

          <div className="mt-8 text-center">

            <h2 className="text-3xl font-black text-white md:text-4xl">
              Choose Your Billing Cycle
            </h2>

            <p className="mt-4 max-w-xl text-slate-400">
              Switch between monthly and yearly billing anytime.
              Save more with annual plans.
            </p>

          </div>

          {/* Toggle */}

          <div className="mt-12 flex items-center justify-center gap-6">

            {/* Monthly */}

            <button
              onClick={!yearly ? undefined : onToggle}
              className={`text-lg font-semibold transition ${
                !yearly
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Monthly
            </button>

            {/* Toggle Switch */}

            <button
              onClick={onToggle}
              className="relative flex h-12 w-24 items-center rounded-full border border-cyan-500/20 bg-[#0b1325] p-1"
            >
              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
                className={`absolute h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${
                  yearly ? "left-[50px]" : "left-1"
                }`}
              />
            </button>

            {/* Yearly */}

            <div className="flex items-center gap-3">

              <button
                onClick={yearly ? undefined : onToggle}
                className={`text-lg font-semibold transition ${
                  yearly
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Yearly
              </button>

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                Save 20%
              </span>

            </div>

          </div>

          {/* Bottom Text */}

          <div className="mt-10 text-center">

                        <motion.div
              key={yearly ? "yearly" : "monthly"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-300"
            >
              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              {yearly
                ? "Save 20% with yearly billing and unlock the best value."
                : "Pay monthly with complete flexibility. Upgrade anytime."}
            </motion.div>
          </div>

          {/* Benefits */}

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#0b1325] p-6 text-center"
            >
              <h3 className="text-2xl font-black text-white">
                20%
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Annual Savings
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#0b1325] p-6 text-center"
            >
              <h3 className="text-2xl font-black text-white">
                Anytime
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Upgrade or Downgrade
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#0b1325] p-6 text-center"
            >
              <h3 className="text-2xl font-black text-white">
                Secure
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Encrypted Payments
              </p>
            </motion.div>

          </div>

          {/* Bottom Banner */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 px-6 py-5 text-center"
          >
            <p className="text-sm leading-7 text-slate-300">

              Every plan includes cloud hosting, free SSL,
              automatic updates, responsive templates,
              AI-powered tools and 24/7 customer support.

            </p>
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}