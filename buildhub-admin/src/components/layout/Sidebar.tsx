import { LogOut, type LucideIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import { useEffect, useState } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return document.documentElement.getAttribute("data-theme") !== "light";
  });

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    navigate("/login");
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 flex-col overflow-hidden border-r transition-transform duration-200 md:relative md:translate-x-0 ${
          isDark ? "border-white/10 bg-zinc-950/95" : "border-zinc-200 bg-white/95"
        } ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={`border-b px-6 py-5 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
            BuildHub
          </p>
          <h2 className={`mt-2 text-xl font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Admin Panel</h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon as LucideIcon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-cyan-500/15 text-cyan-300"
                          : isDark
                            ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`border-t p-3 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/60 transition md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
};

export default Sidebar;
