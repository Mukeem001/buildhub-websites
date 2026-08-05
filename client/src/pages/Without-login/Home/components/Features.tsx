import { motion } from "framer-motion";
import {
  FaRocket,
  FaPalette,
  FaMobileAlt,
  FaSearch,
  FaShieldAlt,
  FaGlobe,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";

const features = [
  {
    title: "Lightning Fast",
    desc: "Optimized performance with blazing fast loading speed.",
    icon: FaRocket,
  },
  {
    title: "Beautiful Templates",
    desc: "Professional responsive templates for every business.",
    icon: FaPalette,
  },
  {
    title: "Responsive Design",
    desc: "Looks perfect on Mobile, Tablet and Desktop.",
    icon: FaMobileAlt,
  },
  {
    title: "SEO Ready",
    desc: "Built-in SEO optimization to rank better on Google.",
    icon: FaSearch,
  },
  {
    title: "Free SSL",
    desc: "Every website is secured with SSL certificate.",
    icon: FaShieldAlt,
  },
  {
    title: "Custom Domain",
    desc: "Connect your own domain in just a few clicks.",
    icon: FaGlobe,
  },
  {
    title: "Analytics",
    desc: "Track visitors, traffic and website performance.",
    icon: FaChartLine,
  },
  {
    title: "Ecommerce",
    desc: "Sell products online with integrated store features.",
    icon: FaShoppingCart,
  },
];

const Features = () => {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-black lg:text-5xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Build modern websites with premium features without writing a
            single line of backend code.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: .5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:border-blue-500"
              >
                <div className="inline-flex rounded-2xl bg-blue-600/15 p-4 text-3xl text-blue-500 transition group-hover:scale-110">
                  <Icon />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.desc}
                </p>

                <button className="mt-7 font-semibold text-blue-400 transition hover:text-blue-300">
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;