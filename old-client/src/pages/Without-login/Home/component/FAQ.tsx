import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Do I need coding knowledge?",
    answer:
      "No. You can create, customize and publish your website without writing a single line of code.",
  },
  {
    question: "Can I connect my own domain?",
    answer:
      "Yes. You can connect your custom domain or use a free subdomain provided by our platform.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. Every website comes with fast hosting, free SSL certificate and automatic backups.",
  },
  {
    question: "Can I change templates later?",
    answer:
      "Yes. You can switch templates without losing your important website data.",
  },
  {
    question: "Will I get an admin panel?",
    answer:
      "Yes. Every website automatically gets its own dedicated admin dashboard to manage products, pages, orders and settings.",
  },
  {
    question: "Can I create an Ecommerce website?",
    answer:
      "Absolutely. Ecommerce, Restaurant, Portfolio, School, Hospital and many other templates are supported.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            FAQ
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-slate-400">
            Everything you need to know before creating your website.
          </p>
        </motion.div>

        {/* FAQ List */}

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {

            const isOpen = active === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >

                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-white sm:text-lg">
                    {faq.question}
                  </span>

                  <FaChevronDown
                    className={`transition duration-300 ${
                      isOpen ? "rotate-180 text-blue-500" : "text-slate-400"
                    }`}
                  />
                </button>

                <AnimatePresence>

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
                        duration: .3,
                      }}
                    >
                      <div className="border-t border-slate-800 px-6 py-5 leading-8 text-slate-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </motion.div>
            );

          })}

        </div>

      </div>
    </section>
  );
};

export default FAQ;