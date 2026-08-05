import { motion } from "framer-motion";
import {
  FaStore,
  FaUtensils,
  FaUserTie,
  FaSchool,
  FaHospital,
  FaDumbbell,
  FaBuilding,
  FaBlog,
  FaThLarge,
} from "react-icons/fa";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const categories = [
  {
    name: "All",
    icon: FaThLarge,
  },
  {
    name: "Ecommerce",
    icon: FaStore,
  },
  {
    name: "Restaurant",
    icon: FaUtensils,
  },
  {
    name: "Portfolio",
    icon: FaUserTie,
  },
  {
    name: "School",
    icon: FaSchool,
  },
  {
    name: "Hospital",
    icon: FaHospital,
  },
  {
    name: "Gym",
    icon: FaDumbbell,
  },
  {
    name: "Business",
    icon: FaBuilding,
  },
  {
    name: "Blog",
    icon: FaBlog,
  },
];

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) => {
  return (
    <section className="bg-slate-950 py-10">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Browse Categories
          </h2>

          <span className="hidden text-sm text-slate-400 md:block">
            {categories.length - 1} Categories Available
          </span>
        </div>

        {/* Mobile Scroll + Desktop Wrap */}

        <div className="-mx-5 overflow-x-auto px-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="flex w-max gap-4 md:w-auto md:flex-wrap">

            {categories.map((category, index) => {
              const Icon = category.icon;
              const active =
                selectedCategory === category.name;

              return (
                <motion.button
                  key={category.name}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setSelectedCategory(category.name)
                  }
                  className={`flex min-w-[150px] items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold transition md:min-w-fit ${
                    active
                      ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-white"
                  }`}
                >
                  <Icon className="text-lg" />

                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Category */}

        <motion.div
          key={selectedCategory}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <span className="text-slate-400">
            Selected :
          </span>

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {selectedCategory}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryFilter;