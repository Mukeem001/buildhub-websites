import React from "react";
import {
  Rocket,
  Users,
  Code2,
  Globe2,
} from "lucide-react";

const OurStory: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 sm:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-180px] top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
              Our Story
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            From An Idea To A
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Growing Platform
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            We believe creating a website should be simple, fast, and
            accessible to everyone — regardless of their technical experience.
          </p>
        </div>

        {/* Main Story */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-blue-950/20 sm:p-7">
              {/* Fake Browser Header */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                </div>

                <div className="rounded-md border border-slate-800 bg-slate-950 px-4 py-1 text-[9px] text-slate-500">
                  buildhub.com
                </div>

                <div className="w-8" />
              </div>

              {/* Dashboard Mockup */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 sm:col-span-2">
                  <div className="mb-4 h-3 w-28 rounded bg-slate-800" />

                  <div className="space-y-3">
                    <div className="h-3 w-full rounded bg-slate-800" />
                    <div className="h-3 w-4/5 rounded bg-slate-800" />
                    <div className="h-3 w-3/5 rounded bg-slate-800" />
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <div className="h-12 w-full rounded-t bg-blue-600/30" />
                    <div className="h-20 w-full rounded-t bg-blue-500/40" />
                    <div className="h-16 w-full rounded-t bg-cyan-500/40" />
                    <div className="h-28 w-full rounded-t bg-blue-500/60" />
                    <div className="h-24 w-full rounded-t bg-purple-500/40" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                    <Globe2 className="h-5 w-5 text-blue-400" />
                  </div>

                  <div className="h-3 w-16 rounded bg-slate-800" />

                  <div className="mt-3 h-2 w-full rounded bg-slate-800" />

                  <div className="mt-2 h-2 w-4/5 rounded bg-slate-800" />
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-4 right-4 rounded-xl border border-blue-500/20 bg-slate-950/95 px-4 py-3 shadow-xl shadow-blue-950/30 backdrop-blur-sm sm:right-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10">
                    <Rocket className="h-4 w-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Website Published
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Successfully launched
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Making website creation accessible to everyone.
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-400 sm:text-base">
              <p>
                BuildHub started with a simple idea:{" "}
                <span className="font-medium text-slate-200">
                  building a professional website shouldn't require years of
                  technical knowledge.
                </span>
              </p>

              <p>
                Instead of spending weeks dealing with complicated tools,
                hosting configurations, and code, creators should be able to
                choose a template, customize their website, connect their
                domain, and launch.
              </p>

              <p>
                That's why we're building BuildHub — a platform that brings
                templates, customization, hosting, domains, and everything
                needed to launch a website together in one place.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>

                <h4 className="text-sm font-semibold text-white">
                  Built For Everyone
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Beginners, creators, businesses, and professionals.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10">
                  <Code2 className="h-4 w-4 text-blue-400" />
                </div>

                <h4 className="text-sm font-semibold text-white">
                  No Complexity
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Powerful tools without unnecessary technical barriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default OurStory;