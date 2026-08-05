import { motion } from "framer-motion";
import { FaArrowRight, FaRocket } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[32px] border border-slate-700 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl sm:p-12 lg:p-16"
        >

          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <FaRocket />
                Ready to Launch?
              </span>

              <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl">
                Build Your Dream Website
                <span className="block">
                  In Just A Few Minutes.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                Choose a premium template, customize it, connect your domain
                and publish instantly. No coding required.
              </p>

            </div>

            {/* Right */}

            <div className="flex flex-col gap-5 lg:items-end">

              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-900 transition hover:scale-105 lg:w-auto">
                Start For Free
                <FaArrowRight />
              </button>

              <button className="w-full rounded-2xl border border-white/40 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/10 lg:w-auto">
                View Templates
              </button>

              <p className="text-center text-sm text-blue-100 lg:text-right">
                ✔ No Credit Card Required
                <br />
                ✔ Free Hosting Included
                <br />
                ✔ Custom Domain Support
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CTA;