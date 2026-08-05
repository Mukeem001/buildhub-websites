import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Ecommerce Owner",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Launching my online store took less than an hour. The admin panel is extremely easy to use and the website feels premium.",
  },
  {
    name: "Sarah Khan",
    role: "Restaurant Owner",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Our restaurant website now accepts online orders and table reservations. Everything works smoothly on mobile too.",
  },
  {
    name: "Rohit Mehta",
    role: "Digital Agency",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "The template quality is amazing. We now create client websites in a fraction of the time compared to before.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Testimonials
          </span>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Loved by Thousands of Businesses
          </h2>

          <p className="mt-5 text-slate-400">
            See what our customers say after building their websites with our
            platform.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition hover:border-blue-500"
            >
              <FaQuoteLeft className="text-3xl text-blue-500" />

              <p className="mt-6 leading-8 text-slate-300">
                "{user.review}"
              </p>

              <div className="mt-6 flex">
                {Array.from({ length: user.rating }).map((_, i) => (
                  <FaStar
                    key={i}
                    className="mr-1 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white">
                      {user.name}
                    </h4>

                    <FaCheckCircle className="text-blue-500" />
                  </div>

                  <p className="text-sm text-slate-400">
                    {user.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}

        <div className="mt-20 grid gap-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-4xl font-black text-white">4.9/5</h3>
            <p className="mt-2 text-slate-400">Average Rating</p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-white">20K+</h3>
            <p className="mt-2 text-slate-400">Reviews</p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-white">98%</h3>
            <p className="mt-2 text-slate-400">Customer Satisfaction</p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-white">24/7</h3>
            <p className="mt-2 text-slate-400">Premium Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;