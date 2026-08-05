import React, { useState } from "react";
import {
  ArrowUpRight,
  Eye,
  Heart,
  Crown,
  Star,
  Download,
} from "lucide-react";

export interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  rating?: number;
  downloads?: number;
  premium?: boolean;
  isPremium?: boolean;
  slug?: string;
}

interface TemplateCardProps {
  template: Template;
  onPreview?: (template: Template) => void;
  onUse?: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onUse,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedDownloads = template.downloads?.toLocaleString() || "0";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-slate-800/90
        bg-[#0d1628]
        shadow-xl
        shadow-black/10
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/40
        hover:shadow-2xl
        hover:shadow-blue-950/20
      "
    >
      {/* =====================================================
          TEMPLATE IMAGE
      ====================================================== */}

      <div className="relative h-56 overflow-hidden sm:h-60 lg:h-64">

        {/* Image */}
        <img
          src={template.image}
          alt={template.name}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Dark overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0d1628]
            via-black/10
            to-black/5
          "
        />

        {/* =================================================
            PREMIUM BADGE
        ================================================== */}

        {(template.isPremium || template.premium) && (
          <div
            className="
              absolute
              left-4
              top-4
              flex
              items-center
              gap-1.5
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              to-amber-500
              px-3
              py-1.5
              text-[11px]
              font-bold
              text-slate-950
              shadow-lg
              shadow-amber-500/20
            "
          >
            <Crown
              size={13}
              fill="currentColor"
            />

            Premium
          </div>
        )}

        {/* =================================================
            FAVORITE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          aria-pressed={isFavorite}
          className={`
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            backdrop-blur-md
            transition-all
            duration-200
            hover:scale-105
            ${
              isFavorite
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                : "bg-black/45 text-white hover:bg-black/65"
            }
          `}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* =================================================
            HOVER ACTIONS
        ================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-4
            z-10
            flex
            translate-y-0
            items-center
            justify-center
            gap-2
            px-3
            opacity-100
            transition-all
            duration-300
            sm:translate-y-3
            sm:opacity-0
            sm:group-hover:translate-y-0
            sm:group-hover:opacity-100
          "
        >
          {/* Preview */}
          <button
            type="button"
            onClick={() => onPreview?.(template)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/20
              bg-white/90
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-900
              shadow-xl
              backdrop-blur-md
              transition
              hover:bg-white
            "
          >
            <Eye size={16} />

            <span>Preview</span>
          </button>

          {/* Use */}
          <button
            type="button"
            onClick={() => onUse?.(template)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-xl
              shadow-blue-600/25
              transition
              hover:from-blue-500
              hover:to-cyan-400
            "
          >
            <span>Use</span>

            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="p-5 sm:p-6">

        {/* CATEGORY + RATING */}

        <div className="mb-4 flex items-center justify-between gap-3">

          <span
            className="
              rounded-full
              border
              border-blue-500/10
              bg-blue-500/10
              px-3
              py-1
              text-[11px]
              font-medium
              text-blue-300
            "
          >
            {template.category}
          </span>

          <div
            className="
              flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              text-slate-300
            "
          >
            <Star
              size={15}
              fill="currentColor"
              className="text-yellow-400"
            />

            {(template.rating ?? 0).toFixed(1)}
          </div>
        </div>

        {/* TITLE */}

        <h3
          className="
            text-xl
            font-bold
            tracking-tight
            text-white
            transition-colors
            group-hover:text-blue-300
          "
        >
          {template.name}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            line-clamp-3
            text-sm
            leading-6
            text-slate-400
          "
        >
          {template.description}
        </p>

        {/* =================================================
            META INFORMATION
        ================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-slate-800
            pt-4
          "
        >
          <div className="flex items-center gap-2">

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-slate-800
                text-slate-400
              "
            >
              <Download size={15} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Downloads
              </p>

              <p className="mt-0.5 text-xs font-semibold text-slate-300">
                {formattedDownloads}
              </p>
            </div>
          </div>

          {/* Rating text */}

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-600">
              Rating
            </p>

            <p className="mt-0.5 text-xs font-semibold text-emerald-400">
              Excellent
            </p>
          </div>
        </div>

        {/* =================================================
            BOTTOM ACTION
        ================================================== */}

        <button
          type="button"
          onClick={() => onUse?.(template)}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-600/15
            transition-all
            duration-200
            hover:bg-blue-500
            hover:shadow-blue-600/25
            active:scale-[0.98]
          "
        >
          Use Template

          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default TemplateCard;