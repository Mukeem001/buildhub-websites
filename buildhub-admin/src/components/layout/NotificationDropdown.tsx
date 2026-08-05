import {
  Bell,
  CheckCircle2,
  CreditCard,
  Globe,
  UserPlus,
} from "lucide-react";

const notifications = [
  {
    title: "New User Registered",
    message: "John Carter joined BuildHub",
    icon: UserPlus,
    color: "text-blue-400",
    time: "2 min ago",
  },
  {
    title: "Payment Received",
    message: "$299 Premium Plan",
    icon: CreditCard,
    color: "text-emerald-400",
    time: "12 min ago",
  },
  {
    title: "Website Published",
    message: "FashionHub is Live",
    icon: Globe,
    color: "text-purple-400",
    time: "35 min ago",
  },
  {
    title: "Backup Completed",
    message: "Daily backup finished successfully",
    icon: CheckCircle2,
    color: "text-green-400",
    time: "1 hour ago",
  },
];

const NotificationDropdown = () => {
  return (
    <div className="absolute right-0 top-16 z-50 w-96 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Bell size={18} />
          Notifications
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          Mark all read
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-start gap-4 border-b border-zinc-800 p-5 text-left transition hover:bg-zinc-900"
            >
              <div
                className={`rounded-xl bg-zinc-900 p-3 ${item.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {item.message}
                </p>

                <span className="mt-2 block text-xs text-zinc-500">
                  {item.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <button className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-500">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;