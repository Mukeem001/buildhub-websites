import { Bell, Menu, Search, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/users": "Users",
  "/websites": "Websites",
  "/templates": "Templates",
  "/orders": "Orders",
  "/payments": "Payments",
  "/domains": "Domains",
  "/media": "Media",
  "/ai": "AI",
  "/analytics": "Analytics",
  "/notifications": "Notifications",
  "/cms": "CMS",
  "/support": "Support",
  "/logs": "Logs",
  "/roles": "Roles",
  "/settings": "Settings",
  "/profile": "Profile",
};

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const title = routeTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/70 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:text-white md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <p className="text-sm text-zinc-500">Overview</p>
          <h1 className="truncate text-xl font-semibold text-white">{title}</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <label className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-400">
          <Search className="h-4 w-4 shrink-0" />
          <input
            className="w-28 bg-transparent outline-none placeholder:text-zinc-500 sm:w-40"
            placeholder="Search"
          />
        </label>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:text-white">
            <Bell className="h-4 w-4" />
          </button>

          <button className="rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:text-white">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
