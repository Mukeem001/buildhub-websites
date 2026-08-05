import React from "react";
import {
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  WandSparkles,
} from "lucide-react";

interface TemplateHeroProps {
  totalTemplates?: number;
  onExplore?: () => void;
}

const TemplateHero: React.FC<TemplateHeroProps> = ({
  totalTemplates = 0,
  onExplore,
}) => {
  return (
    <section className="relative w-full overflow-hidden rounded-[28px] border border-slate-800 bg-[#07101f] shadow-2xl shadow-black/20">
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue glow */}

        <div
          className="
            absolute
            -left-24
            -top-32
            h-72
            w-72
            rounded-full
            bg-blue-600/20
            blur-[100px]
          "
        />

        {/* Cyan glow */}

        <div
          className="
            absolute
            -right-20
            top-10
            h-80
            w-80
            rounded-full
            bg-cyan-500/10
            blur-[110px]
          "
        />

        {/* Bottom glow */}

        <div
          className="
            absolute
            bottom-[-160px]
            left-[35%]
            h-80
            w-80
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

        {/* Grid pattern */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="max-w-3xl">

            {/* Badge */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-3.5
                py-2
                text-xs
                font-semibold
                text-blue-300
                shadow-lg
                shadow-blue-950/20
              "
            >
              <Sparkles
                size={14}
                className="text-cyan-400"
              />

              Premium Website Templates

              <span className="h-1 w-1 rounded-full bg-blue-400" />

              {totalTemplates} available
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-3xl
                text-3xl
                font-extrabold
                leading-[1.12]
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Build a website that{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-300
                  to-blue-400
                  bg-clip-text
                  text-transparent
                "
              >
                looks incredible.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
                sm:text-base
                lg:text-lg
              "
            >
              Start with a professionally designed template and
              customize every detail to match your brand. No
              complicated setup — just choose, edit and launch.
            </p>

            {/* Buttons */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {/* Explore */}

              <button
                onClick={onExplore}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-blue-500/30
                "
              >
                <LayoutTemplate size={17} />

                Explore Templates

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* AI / Customize */}

              <button
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900/70
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-200
                  backdrop-blur
                  transition
                  duration-300
                  hover:border-blue-500/40
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <WandSparkles
                  size={17}
                  className="text-cyan-400"
                />

                Customize Your Way
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================== */}

          <div className="hidden lg:block">
            <div className="relative h-64 w-64 xl:h-72 xl:w-72">

              {/* Outer glow */}

              <div
                className="
                  absolute
                  inset-8
                  rounded-full
                  bg-blue-500/20
                  blur-3xl
                "
              />

              {/* Main circle */}

              <div
                className="
                  absolute
                  inset-4
                  flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-blue-500/20
                  bg-gradient-to-br
                  from-blue-500/10
                  via-slate-900/80
                  to-cyan-500/10
                  shadow-2xl
                  shadow-blue-950/40
                "
              >
                {/* Inner circle */}

                <div
                  className="
                    flex
                    h-36
                    w-36
                    items-center
                    justify-center
                    rounded-[32px]
                    border
                    border-slate-700/80
                    bg-slate-950/80
                    shadow-2xl
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-600
                      to-cyan-400
                      shadow-xl
                      shadow-blue-600/30
                    "
                  >
                    <LayoutTemplate
                      size={36}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Floating card - top */}

              <div
                className="
                  absolute
                  right-0
                  top-2
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900/90
                  px-3
                  py-2.5
                  shadow-xl
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

                  <span className="text-xs font-semibold text-slate-300">
                    Ready to launch
                  </span>
                </div>
              </div>

              {/* Floating card - bottom */}

              <div
                className="
                  absolute
                  bottom-3
                  left-0
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900/90
                  px-3
                  py-2.5
                  shadow-xl
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={14}
                    className="text-blue-400"
                  />

                  <span className="text-xs font-semibold text-slate-300">
                    Fully customizable
                  </span>
                </div>
              </div>

              {/* Decorative dots */}

              <span className="absolute left-7 top-24 h-2 w-2 rounded-full bg-cyan-400/70" />
              <span className="absolute bottom-20 right-7 h-1.5 w-1.5 rounded-full bg-blue-400/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateHero;