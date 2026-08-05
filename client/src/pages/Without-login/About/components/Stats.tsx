import React from "react";
import {
  Users,
  LayoutTemplate,
  Globe2,
  Activity,
} from "lucide-react";

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Active Users",
      description: "Creators building with BuildHub",
    },
    {
      icon: LayoutTemplate,
      number: "250+",
      label: "Premium Templates",
      description: "Ready-to-use website designs",
    },
    {
      icon: Globe2,
      number: "20K+",
      label: "Websites Built",
      description: "Ideas successfully launched",
    },
    {
      icon: Activity,
      number: "99.9%",
      label: "Platform Uptime",
      description: "Reliable experience every day",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
              BuildHub By The Numbers
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Growing Every
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Day
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Thousands of creators and businesses trust BuildHub to turn their
            ideas into professional websites.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-600/10 transition duration-300 group-hover:bg-blue-600/20">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>

                <h3 className="mt-5 text-3xl font-extrabold text-white">
                  {stat.number}
                </h3>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {stat.label}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default Stats;