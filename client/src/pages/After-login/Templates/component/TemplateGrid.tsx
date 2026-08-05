import React from "react";
import { Search, Sparkles } from "lucide-react";
import TemplateCard from "./TemplateCard";
import type { Template } from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
  onPreview?: (template: Template) => void;
  onUse?: (template: Template) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  onPreview,
  onUse,
}) => {
  /* =====================================================
     EMPTY STATE
  ====================================================== */

  if (templates.length === 0) {
    return (
      <section className="mt-8 w-full">
        <div
          className="
            flex
            min-h-[320px]
            w-full
            flex-col
            items-center
            justify-center
            rounded-[24px]
            border
            border-dashed
            border-slate-800
            bg-slate-950/50
            px-6
            py-16
            text-center
          "
        >
          {/* Icon */}

          <div
            className="
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              text-slate-500
              shadow-xl
            "
          >
            <Search size={26} />
          </div>

          {/* Heading */}

          <h3 className="text-lg font-bold text-white sm:text-xl">
            No templates found
          </h3>

          {/* Description */}

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't find any templates matching your search or
            selected category. Try another keyword or category.
          </p>
        </div>
      </section>
    );
  }

  /* =====================================================
     TEMPLATE GRID
  ====================================================== */

  return (
    <section className="mt-8 w-full">

      {/* GRID HEADER */}

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Sparkles
              size={17}
              className="text-blue-400"
            />

            <h2 className="text-lg font-bold text-white sm:text-xl">
              Featured Templates
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Choose a professionally designed template for your
            website.
          </p>
        </div>

        {/* Template count */}

        <div
          className="
            w-fit
            rounded-full
            border
            border-slate-800
            bg-slate-900/70
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-400
          "
        >
          {templates.length}{" "}
          {templates.length === 1
            ? "Template"
            : "Templates"}
        </div>
      </div>

      {/* =================================================
          CARDS
      ================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          sm:gap-6
          md:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-3
        "
      >
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={onPreview}
            onUse={onUse}
          />
        ))}
      </div>
    </section>
  );
};

export default TemplateGrid;