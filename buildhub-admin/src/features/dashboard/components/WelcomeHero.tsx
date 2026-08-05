import { Sparkles, ArrowUpRight } from "lucide-react";

interface WelcomeHeroProps {
  onCreateWebsite: () => void;
}

const WelcomeHero = ({ onCreateWebsite }: WelcomeHeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            <Sparkles size={16} />
            BuildHub AI Platform
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white">
            Welcome to your Enterprise Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-zinc-400">
            Manage users, websites, AI generation, analytics,
            templates, billing and infrastructure from one place.
          </p>
        </div>

        <button
          onClick={onCreateWebsite}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
        >
          Create Website
          <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default WelcomeHero;