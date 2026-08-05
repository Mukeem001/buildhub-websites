import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes. You can switch between plans whenever you want. Changes are applied automatically without affecting your website.",
  },
  {
    question: "Do yearly plans include a discount?",
    answer:
      "Yes. Annual billing gives you the best value and saves up to 20% compared to monthly billing.",
  },
  {
    question: "Can I connect my own custom domain?",
    answer:
      "Absolutely. Professional, Business and Enterprise plans allow you to connect your own custom domains with free SSL.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes. Our Starter plan lets you build and publish your first website using a BuildHub subdomain at no cost.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support all major credit cards, debit cards and secure online payment providers for fast and reliable billing.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel whenever you like. Your subscription remains active until the end of your billing period.",
  },
  {
    question: "Do you provide customer support?",
    answer:
      "Every customer receives support. Professional, Business and Enterprise plans include priority support with faster response times.",
  },
  {
    question: "Is BuildHub secure?",
    answer:
      "Yes. Every website includes SSL, secure cloud infrastructure, automated backups and enterprise-grade protection.",
  },
];

export default function PricingFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24">

      {/* Background */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

            <Sparkles size={16} />

            Frequently Asked Questions

          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">

            Have Questions?

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

              We've Got Answers

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">

            Everything you need to know about pricing,
            billing, subscriptions and BuildHub plans.

          </p>

        </motion.div>

        {/* FAQ List */}

        <div className="space-y-5">

                      {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-6 text-left"
                >
                  <span className="pr-6 text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown
                      size={22}
                      className="text-cyan-400"
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-6 py-6">
                        <p className="leading-8 text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 text-center backdrop-blur-2xl"
        >
          <h3 className="text-3xl font-black text-white">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Our team is here to help you choose the perfect plan,
            answer billing questions, and guide you through every
            step of building your website.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-cyan-400">
              Contact Support
            </button>

            <button className="rounded-xl border border-white/10 bg-white/[0.05] px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.08]">
              Schedule a Demo
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}