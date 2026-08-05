import {
  Globe,
  CheckCircle2,
  Users,
  HardDrive,
} from "lucide-react";
import type { Website } from "@/utils/websiteActions";

interface WebsitesStatsProps {
  websites: Website[];
}

const parseStorageValue = (value: string) => {
  const match = value.match(/([\d.]+)\s*(TB|GB|MB|KB)/i);
  if (!match) return 0;

  const amount = Number(match[1]);
  const unit = match[2].toUpperCase();

  switch (unit) {
    case "TB":
      return amount * 1024 * 1024;
    case "GB":
      return amount * 1024;
    case "MB":
      return amount;
    case "KB":
      return amount / 1024;
    default:
      return 0;
  }
};

const formatStorageValue = (amountInMb: number) => {
  if (amountInMb >= 1024 * 1024) {
    return `${(amountInMb / (1024 * 1024)).toFixed(1)} TB`;
  }

  if (amountInMb >= 1024) {
    return `${(amountInMb / 1024).toFixed(1)} GB`;
  }

  if (amountInMb > 0) {
    return `${amountInMb.toFixed(1)} MB`;
  }

  return "0 GB";
};

const WebsitesStats = ({ websites }: WebsitesStatsProps) => {
  const totalWebsites = websites.length;
  const publishedWebsites = websites.filter(
    (website) => website.status === "Published"
  ).length;
  const totalVisitors = websites.reduce(
    (sum, website) => sum + (website.visitors ?? 0),
    0
  );
  const totalStorage = formatStorageValue(
    websites.reduce(
      (sum, website) => sum + parseStorageValue(website.storage || "0 GB"),
      0
    )
  );

  const stats = [
    {
      title: "Total Websites",
      value: totalWebsites.toLocaleString(),
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Published",
      value: publishedWebsites.toLocaleString(),
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Visitors",
      value: totalVisitors.toLocaleString(),
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Storage Used",
      value: totalStorage,
      icon: HardDrive,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{item.title}</p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div className={`rounded-xl p-4 ${item.bg}`}>
                <Icon className={`h-7 w-7 ${item.color}`} />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: "72%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WebsitesStats;
