import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "Is BuildHub free to use?",
    answer:
      "Yes. You can start building your website for free and upgrade whenever you need premium features, custom domains or advanced tools.",
  },
  {
    question: "Can I connect my own custom domain?",
    answer:
      "Absolutely. You can either connect your own domain or launch instantly using a free BuildHub subdomain.",
  },
  {
    question: "Do I need coding knowledge?",
    answer:
      "No. BuildHub is designed for everyone. Use AI tools, drag-and-drop editing and ready-made templates without writing code.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. Every website includes secure cloud hosting, SSL certificates and global CDN support.",
  },
  {
    question: "Can I create an online store?",
    answer:
      "Yes. BuildHub supports complete eCommerce functionality including products, payments, inventory and order management.",
  },
  {
    question: "Are websites mobile responsive?",
    answer:
      "Every template is fully responsive and optimized for mobile, tablet and desktop devices.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[150px]" />

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
            Everything You Need
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              To Know About BuildHub
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Find answers to the most common questions about creating,
            publishing and managing your website with BuildHub.
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
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {faq.question}
                  </h3>

                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-7 py-6">
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

        {/* Bottom Help Card */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div className="max-w-2xl">

              <h3 className="text-3xl font-black text-white">
                Still Have Questions?
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Our support team is always ready to help you with
                templates, domains, hosting, AI features and everything
                you need to launch your website successfully.
              </p>

            </div>

            <button className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500">

              Contact Support

              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                →
              </motion.span>

            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}