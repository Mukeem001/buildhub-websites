import {
  X,
  Globe,
  User,
  LayoutTemplate,
  HardDrive,
  Activity,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import type { Website } from "@/utils/websiteActions";

interface WebsiteDrawerProps {
  open: boolean;
  website: Website | null;
  onClose: () => void;
}

const WebsiteDrawer = ({
  open,
  website,
  onClose,
}: WebsiteDrawerProps) => {
  if (!open) return null;

  const currentWebsite = website ?? {
    name: "Unknown website",
    domain: "-",
    owner: "Unknown",
    template: "Unknown",
    status: "Draft",
    plan: "Free",
    visitors: 0,
    storage: "0 GB",
    createdAt: "-",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-500/10 p-4">
              <Globe className="h-7 w-7 text-blue-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {currentWebsite.name}
              </h2>

              <p className="text-zinc-400">
                {currentWebsite.domain}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X />
          </button>

        </div>

        {/* Content */}
        <div className="space-y-8 p-6">

          {/* Info Grid */}
          <div className="grid gap-4">

            <InfoCard
              icon={<User size={18} />}
              title="Owner"
              value={currentWebsite.owner}
            />

            <InfoCard
              icon={<LayoutTemplate size={18} />}
              title="Template"
              value={currentWebsite.template}
            />

            <InfoCard
              icon={<HardDrive size={18} />}
              title="Storage"
              value={currentWebsite.storage}
            />

            <InfoCard
              icon={<Activity size={18} />}
              title="Visitors"
              value={currentWebsite.visitors.toLocaleString()}
            />

          </div>

          {/* Performance */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Performance
            </h3>

            <Score title="SEO Score" value={96} />

            <Score title="Performance" value={91} />

            <Score title="Accessibility" value={98} />

            <Score title="Best Practices" value={95} />

          </div>

          {/* Analytics */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              AI Analytics
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <MiniCard
                title="AI Score"
                value="98%"
                icon={<ShieldCheck size={20} />}
              />

              <MiniCard
                title="Growth"
                value="+34%"
                icon={<BarChart3 size={20} />}
              />

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="text-blue-500">{icon}</div>

      <div>
        <p className="text-sm text-zinc-500">{title}</p>
        <h4 className="font-medium text-white">{value}</h4>
      </div>
    </div>
  );
}

function Score({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="mb-5">

      <div className="mb-2 flex justify-between">

        <span className="text-zinc-400">
          {title}
        </span>

        <span className="font-semibold text-white">
          {value}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

function MiniCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-4 text-blue-500">
        {icon}
      </div>

      <h4 className="text-sm text-zinc-500">
        {title}
      </h4>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}

export default WebsiteDrawer;