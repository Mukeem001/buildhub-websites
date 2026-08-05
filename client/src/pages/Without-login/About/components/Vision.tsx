import React from "react";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const Vision: React.FC = () => {
  const points = [
    "Make website creation accessible to everyone",
    "Give creators powerful tools without unnecessary complexity",
    "Help businesses launch their online presence faster",
    "Keep improving the experience as the web evolves",
  ];

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900/80 to-purple-600/10">
          <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                Our Vision
              </div>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                A Future Where
                <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Anyone Can Build
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                We imagine a world where having a great website doesn't
                require a technical background. BuildHub is being created to
                make that future easier to reach.
              </p>

              <div className="mt-7 space-y-3">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative mx-auto max-w-md rounded-2xl border border-slate-700/80 bg-slate-950/80 p-5 shadow-2xl shadow-blue-950/30">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>

                    <div>
                      <div className="h-2.5 w-20 rounded bg-slate-700" />
                      <div className="mt-1.5 h-2 w-12 rounded bg-slate-800" />
                    </div>
                  </div>

                  <div className="h-7 w-7 rounded-lg bg-slate-900" />
                </div>

                {/* Main visual */}
                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="h-3 w-24 rounded bg-slate-700" />

                  <div className="mt-4 h-20 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30" />

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-lg bg-slate-800/80" />
                    <div className="h-16 rounded-lg bg-slate-800/80" />
                    <div className="h-16 rounded-lg bg-slate-800/80" />
                  </div>

                  <div className="mt-4 h-9 rounded-lg bg-blue-600/20" />
                </div>

                {/* Floating notification */}
                <div className="absolute -right-3 -top-4 rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 shadow-xl sm:-right-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white">
                        Ready to Launch
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Your website is live
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating arrow */}
                <div className="absolute -bottom-4 -left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-600 shadow-lg shadow-blue-900/30 sm:-left-5">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default Vision;