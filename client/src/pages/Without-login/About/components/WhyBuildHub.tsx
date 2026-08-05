import React from "react";
import {
  MousePointer2,
  Layers3,
  Server,
  Link2,
  Settings2,
  Headphones,
} from "lucide-react";

const WhyBuildHub: React.FC = () => {
  const features = [
    {
      icon: MousePointer2,
      title: "Easy To Use",
      description:
        "Create and customize your website with an intuitive experience designed for everyone.",
    },
    {
      icon: Layers3,
      title: "Beautiful Templates",
      description:
        "Start with professionally designed templates and make them your own.",
    },
    {
      icon: Server,
      title: "Reliable Hosting",
      description:
        "Your website gets the infrastructure it needs to stay fast and available.",
    },
    {
      icon: Link2,
      title: "Custom Domains",
      description:
        "Connect your own domain or launch with a BuildHub subdomain.",
    },
    {
      icon: Settings2,
      title: "Powerful Tools",
      description:
        "Manage your website, content, settings, and growth from one place.",
    },
    {
      icon: Headphones,
      title: "Helpful Support",
      description:
        "Get assistance whenever you need help building or managing your website.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b1225] py-24 sm:py-28">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-[-200px] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute right-[-200px] bottom-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
              Why BuildHub
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything You Need To
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Build With Confidence
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            From choosing your first template to connecting your domain,
            BuildHub brings the essential tools together in one simple
            platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-950"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-600/10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-600/10 transition duration-300 group-hover:bg-blue-600/20">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-5 h-px w-0 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
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

export default WhyBuildHub;