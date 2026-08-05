import { motion } from "framer-motion";
import {
  Bot,
  MousePointerClick,
  Globe,
  Rocket,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const advancedFeatures = [
  {
    icon: Bot,
    title: "AI Website Builder",
    description:
      "Generate complete responsive websites with AI. Simply describe your business and BuildHub creates pages, sections and content automatically.",
    badge: "AI Powered",
  },
  {
    icon: MousePointerClick,
    title: "Drag & Drop Editor",
    description:
      "Customize every section visually with a modern drag & drop editor. No coding required.",
    badge: "Visual Editing",
  },
  {
    icon: Globe,
    title: "Domain Management",
    description:
      "Connect custom domains or launch instantly using a free BuildHub subdomain.",
    badge: "Domains",
  },
  {
    icon: Rocket,
    title: "One Click Publish",
    description:
      "Deploy your website globally with CDN, SSL and optimized hosting in seconds.",
    badge: "Deployment",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track visitors, traffic, conversions and performance from one dashboard.",
    badge: "Insights",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Automatic SSL, backups, monitoring and advanced protection for every project.",
    badge: "Security",
  },
];

export default function AdvancedFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-24">

      {/* Background */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            Advanced Platform Features
          </div>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Powerful Tools For
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Modern Website Creation
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            From AI-powered website generation to analytics,
            domains and deployment, BuildHub provides everything
            required to launch and grow your online presence.
          </p>
        </motion.div>

        {/* Feature List */}

        <div className="space-y-24">

                      {advancedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const reverse = index % 2 === 1;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className={`grid items-center gap-14 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* ================= Content ================= */}

                <div>

                  <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
                    {feature.badge}
                  </span>

                  <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                    <Icon size={30} className="text-cyan-400" />
                  </div>

                  <h3 className="mt-8 text-3xl font-black text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-5 max-w-xl leading-8 text-slate-400">
                    {feature.description}
                  </p>

                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-3 text-slate-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      Premium User Experience
                    </li>

                    <li className="flex items-center gap-3 text-slate-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      Fully Responsive Layout
                    </li>

                    <li className="flex items-center gap-3 text-slate-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      Enterprise Performance
                    </li>
                  </ul>

                  <button className="mt-10 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
                    Learn More
                  </button>

                </div>

                {/* ================= Preview Card ================= */}

                <div className="relative">

                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl">

                    <div className="mb-8 flex items-center justify-between">

                      <div>
                        <p className="text-sm text-slate-400">
                          Feature Preview
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-white">
                          {feature.title}
                        </h4>
                      </div>

                      <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        Active
                      </div>

                    </div>

                    <div className="space-y-6">

                      {[92, 86, 98].map((value, i) => (

                        <div key={i}>

                          <div className="mb-2 flex justify-between text-sm">
                            <span className="text-slate-400">
                              Performance
                            </span>

                            <span className="text-white">
                              {value}%
                            </span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-white/10">

                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1 }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                            />

                          </div>

                        </div>

                      ))}

                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">

                      <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                        <p className="text-sm text-slate-400">
                          Speed
                        </p>

                        <h4 className="mt-2 text-2xl font-bold text-white">
                          A+
                        </h4>

                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#0d1529] p-5">

                        <p className="text-sm text-slate-400">
                          Status
                        </p>

                        <h4 className="mt-2 text-2xl font-bold text-emerald-400">
                          Ready
                        </h4>

                      </div>

                    </div>

                  </div>

                  {/* Floating Badge */}

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                    }}
                    className="absolute -right-6 -top-6 hidden rounded-2xl border border-white/10 bg-[#101827]/90 px-5 py-4 shadow-xl backdrop-blur-xl lg:block"
                  >

                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      AI Score
                    </p>

                    <h4 className="mt-2 text-2xl font-black text-cyan-400">
                      98%
                    </h4>

                  </motion.div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}