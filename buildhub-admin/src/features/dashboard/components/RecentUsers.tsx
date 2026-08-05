import { Avatar, AvatarFallback } from "@/../@/components/ui/avatar";
import type { DashboardUser } from "@/services/dashboard";

interface RecentUsersProps {
  users?: DashboardUser[];
  loading?: boolean;
}

const RecentUsers = ({ users }: RecentUsersProps) => {
  const items = users ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">Recent Users</h2>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((user, index) => (
            <div
              key={`${user.email}-${index}`}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {user.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-medium text-white">{user.name}</h3>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                </div>
              </div>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                {user.plan}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">No recent users yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
