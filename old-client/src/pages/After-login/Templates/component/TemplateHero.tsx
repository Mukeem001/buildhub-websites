import { motion } from "framer-motion";
import { FaSearch, FaRocket } from "react-icons/fa";
import { useState } from "react";

interface TemplateHeroProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateHero = ({
  search,
  setSearch,
}: TemplateHeroProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-36 pb-20">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-5">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400">

            <FaRocket />

            250+ Premium Templates

          </div>

          <h1 className="mt-8 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">

            Choose The Perfect

            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">

              Website Template

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">

            Launch Ecommerce, Restaurant, Portfolio, Agency,
            School, Hospital and Business websites in minutes.

          </p>

          {/* Search */}

          <div
            className={`mx-auto mt-12 flex max-w-2xl items-center rounded-2xl border bg-slate-900 px-5 transition ${
              focused
                ? "border-blue-500"
                : "border-slate-700"
            }`}
          >

            <FaSearch className="text-xl text-slate-500" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search templates..."
              className="h-16 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
            />

          </div>

          {/* Stats */}

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">

            {[
              ["250+", "Templates"],
              ["20+", "Categories"],
              ["50K+", "Users"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >

                <h2 className="text-3xl font-black text-white">

                  {value}

                </h2>

                <p className="mt-2 text-slate-400">

                  {label}

                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default TemplateHero;