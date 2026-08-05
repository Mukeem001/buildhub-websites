import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Globe,
  Calendar,
  Shield,
  Crown,
} from "lucide-react";
import { toast } from "sonner";
import { getUserById } from "@/services/users";

interface UserDrawerProps {
  open: boolean;
  userId?: string | number;
  onClose: () => void;
}

const UserDrawer = ({ open, userId, onClose }: UserDrawerProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !userId) return;

    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await getUserById(String(userId));
        setUser(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    void loadUser();
  }, [open, userId]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold text-white">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="text-zinc-400" />
          </button>

        </div>

        {/* Profile */}

        <div className="border-b border-zinc-800 p-6">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
              {(user?.fullName || user?.name || "U").charAt(0).toUpperCase()}
            </div>

            <div>

              <h3 className="text-2xl font-semibold text-white">
                {loading ? "Loading..." : user?.fullName || user?.name || "User"}
              </h3>

              <p className="text-zinc-400">
                {user?.role ? (user.role === "admin" ? "Administrator" : "User") : "No role"}
              </p>

            </div>

          </div>

        </div>

        {/* Info */}

        <div className="space-y-4 p-6">

          <Info icon={<Mail size={18} />} title="Email" value={user?.email || "-"} />

          <Info icon={<Phone size={18} />} title="Phone" value={user?.phone || "-"} />

          <Info icon={<Globe size={18} />} title="Websites" value={`${user?.websiteCount || 0} Website${(user?.websiteCount || 0) === 1 ? "" : "s"}`} />

          <Info icon={<Calendar size={18} />} title="Joined" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"} />

          <Info icon={<Shield size={18} />} title="Role" value={user?.role === "admin" ? "Admin" : "User"} />

          <Info icon={<Crown size={18} />} title="Plan" value={String(user?.plan || "free").toUpperCase()} />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 p-6">

          <StatCard title="Orders" value="148" />

          <StatCard title="Projects" value="18" />

          <StatCard title="Storage" value="124 GB" />

          <StatCard title="Revenue" value="$8,490" />

        </div>

      </div>
    </>
  );
};

interface InfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function Info({ icon, title, value }: InfoProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="text-blue-400">{icon}</div>

      <div>
        <p className="text-sm text-zinc-500">{title}</p>

        <h3 className="text-white">{value}</h3>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-500">{title}</p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}

export default UserDrawer;