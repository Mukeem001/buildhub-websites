import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaEye,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ecommerce from "../../assets/images/ecommerce.webp";
import restaurant from "../../assets/images/restaurant.webp";
import portfolio from "../../assets/images/portfolio.webp";

const templates = [
  {
    id: 1,
    title: "Modern Ecommerce",
    image: ecommerce,
    rating: 4.9,
    premium: true,
    category: "Ecommerce",
  },
  {
    id: 2,
    title: "Restaurant Pro",
    image: restaurant,
    rating: 4.8,
    premium: false,
    category: "Restaurant",
  },
  {
    id: 3,
    title: "Portfolio X",
    image: portfolio,
    rating: 5,
    premium: true,
    category: "Portfolio",
  },
];

const RelatedTemplates = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-4xl font-black text-white">
              Similar Templates
            </h2>

            <p className="mt-3 text-slate-400">
              Explore more templates that match this design.
            </p>

          </div>

          <Link
            to="/templates"
            className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {templates.map((template, index) => (

            <motion.div
              key={template.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950"
            >

              {/* Image */}

              <div className="relative overflow-hidden">

                <img
                  src={template.image}
                  alt={template.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                {template.premium && (

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">

                    <FaCrown />

                    Premium

                  </div>

                )}

              </div>

              {/* Content */}

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                    {template.category}
                  </span>

                  <span className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    {template.rating}
                  </span>

                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {template.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  Responsive design with premium admin panel,
                  SEO optimization and fast loading.
                </p>

                <div className="mt-8 flex gap-3">

                  <Link
                    to={`/template/${template.id}`}
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    Use Template
                  </Link>

                  <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-slate-700">
                    <FaEye />
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default RelatedTemplates;