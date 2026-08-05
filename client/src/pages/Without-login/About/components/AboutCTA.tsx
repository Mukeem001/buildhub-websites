import React from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

const AboutCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#0b1225] px-6 py-24 sm:px-8 sm:py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl shadow-blue-950/30 sm:p-12 lg:p-14">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-28 -left-16 h-60 w-60 rounded-full border border-white/10" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Ready to Build?
              </div>

              <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Turn Your Idea Into A Website Today.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Choose a template, customize it, connect your domain, and
                launch your website without the complexity.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-lg transition duration-300 hover:bg-slate-100"
              >
                Start For Free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/15"
              >
                Explore Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;