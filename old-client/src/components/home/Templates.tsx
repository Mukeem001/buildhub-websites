import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaDesktop,
  FaEye,
  FaShoppingBag,
  FaStore,
} from "react-icons/fa";

const templates = [
  {
    title: "Ecommerce",
    category: "Shopping",
    color: "from-blue-500 to-cyan-500",
    icon: FaShoppingBag,
  },
  {
    title: "Restaurant",
    category: "Food",
    color: "from-orange-500 to-red-500",
    icon: FaStore,
  },
  {
    title: "Portfolio",
    category: "Personal",
    color: "from-violet-500 to-fuchsia-500",
    icon: FaDesktop,
  },
  {
    title: "Agency",
    category: "Business",
    color: "from-green-500 to-emerald-500",
    icon: FaDesktop,
  },
  {
    title: "Hospital",
    category: "Medical",
    color: "from-sky-500 to-indigo-500",
    icon: FaDesktop,
  },
  {
    title: "School",
    category: "Education",
    color: "from-pink-500 to-rose-500",
    icon: FaDesktop,
  },
];

const Templates = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Templates
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Choose Your Website
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Start with professionally designed templates and customize
            everything with your own branding.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950"
              >
                <div
                  className={`flex h-56 items-center justify-center bg-gradient-to-br ${item.color}`}
                >
                  <Icon className="text-7xl text-white transition duration-300 group-hover:scale-110" />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Responsive, SEO-friendly and ready to publish with one click.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-white transition hover:border-blue-500">
                      <FaEye />
                      Preview
                    </button>

                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
                      Use Template
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Templates;