import React from "react";
import {
  Zap,
  Palette,
  ShieldCheck,
  Heart,
} from "lucide-react";

const Mission: React.FC = () => {
  const values = [
    {
      icon: Zap,
      title: "Speed",
      description:
        "Create and launch your website quickly without unnecessary steps or complicated setup.",
    },
    {
      icon: Palette,
      title: "Simplicity",
      description:
        "Everything is designed to be easy to understand, customize, and manage.",
    },
    {
      icon: ShieldCheck,
      title: "Reliability",
      description:
        "We focus on dependable infrastructure and a smooth experience from start to launch.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every feature we build starts with one question: how can we make things better for you?",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b1225] py-24 sm:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-[-200px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
              Our Mission
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything We Build Starts
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              With A Purpose
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Our mission is to remove the barriers between an idea and a
            beautiful, professional website.
          </p>
        </div>

        {/* Mission Banner */}
        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900/70 to-purple-600/10 p-6 sm:p-8">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 ring-1 ring-blue-500/20 md:mx-0">
              <Zap className="h-7 w-7 text-blue-400" />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                "Your idea deserves a website."
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Whether you're launching a business, showcasing your work,
                starting an online store, or sharing your passion, BuildHub
                gives you the tools to turn that idea into reality.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-600/10 transition duration-300 group-hover:bg-blue-600/20">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mission;