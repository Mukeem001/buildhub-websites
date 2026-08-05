import {
  Image,
  FileText,
  Video,
  HardDrive,
} from "lucide-react";

const stats = [
  {
    title: "Total Files",
    value: "2,486",
    icon: HardDrive,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Images",
    value: "1,528",
    icon: Image,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Videos",
    value: "486",
    icon: Video,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    title: "Documents",
    value: "472",
    icon: FileText,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
];

const MediaStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-violet-500/40`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h3>

              </div>

              <div
                className={`rounded-2xl ${item.bg} p-4`}
              >
                <Icon
                  className={`h-7 w-7 ${item.color}`}
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default MediaStats;