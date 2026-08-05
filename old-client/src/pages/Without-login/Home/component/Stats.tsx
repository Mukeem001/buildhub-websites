import { motion } from "framer-motion";
import {
  FaUsers,
  FaGlobe,
  FaStore,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    title: "50,000+",
    subtitle: "Active Websites",
    icon: FaGlobe,
  },
  {
    title: "120+",
    subtitle: "Premium Templates",
    icon: FaStore,
  },
  {
    title: "99.99%",
    subtitle: "Server Uptime",
    icon: FaStar,
  },
  {
    title: "35K+",
    subtitle: "Happy Customers",
    icon: FaUsers,
  },
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Spotify",
];

const Stats = () => {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Growing Every Day
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Thousands of businesses trust our platform to build fast,
            secure and professional websites.
          </p>
        </motion.div>

        {/* Stats */}

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center transition hover:border-blue-500"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-3xl text-blue-400">
                  <Icon />
                </div>

                <h3 className="mt-6 text-4xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted Companies */}

        <div className="mt-24">
          <p className="text-center text-sm uppercase tracking-[5px] text-slate-500">
            Trusted by innovative companies
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <motion.div
                key={company}
                whileHover={{
                  scale: 1.05,
                }}
                className="flex h-20 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-lg font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;