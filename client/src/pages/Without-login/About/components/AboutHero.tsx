import React from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[80px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-[-180px] top-[100px] h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute left-1/2 top-[300px] h-[250px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-7 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About BuildHub</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            We Make Building
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Websites Simple
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            BuildHub is a powerful website building platform designed to help
            individuals and businesses create beautiful, professional
            websites without the complexity of traditional coding.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:bg-blue-500 sm:w-auto"
            >
              Start Building
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-blue-500/50 hover:bg-slate-800 sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              See How It Works
            </button>
          </div>

          {/* Mini Stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                50K+
              </h3>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Active Users
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                250+
              </h3>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Templates
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                99.9%
              </h3>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Uptime
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                20K+
              </h3>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Websites Built
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default AboutHero;