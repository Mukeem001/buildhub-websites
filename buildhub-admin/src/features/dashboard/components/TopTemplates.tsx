import { Star, Download, Crown } from "lucide-react";
import type { DashboardTemplate } from "@/services/dashboard";

interface TopTemplatesProps {
  templates?: DashboardTemplate[];
  loading?: boolean;
}

const TopTemplates = ({ templates }: TopTemplatesProps) => {
  const items = templates ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Top Templates</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((template) => (
            <div
              key={template.name}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500/40"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  {template.premium && (
                    <Crown size={16} className="text-yellow-400" />
                  )}
                </div>
                <p className="text-sm text-zinc-400">{template.category}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-300">
                  <Download size={16} />
                  <span>{template.downloads}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">No template data available.</p>
        )}
      </div>
    </div>
  );
};

export default TopTemplates;
