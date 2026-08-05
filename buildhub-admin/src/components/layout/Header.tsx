import {
    Bell,
    CalendarDays,
    ChevronDown,
    Menu,
    Moon,
    Search,
    Settings,
    Sun,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/../@/components/ui/avatar";

import { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

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
    "/ai": "AI Assistant",
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

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return true;

        const storedTheme = window.localStorage.getItem("theme");
        if (storedTheme) return storedTheme === "dark";

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", isDark ? "dark" : "light");
        root.classList.toggle("dark", isDark);
        window.localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${isDark ? "border-white/10 bg-zinc-950/80" : "border-zinc-200 bg-white/80"}`}>
            <div className="flex h-20 items-center justify-between px-6">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={onMenuClick}
                        className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div>
                        <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                            Welcome back 👋
                        </p>

                        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
                            {title}
                        </h1>
                    </div>

                </div>

                {/* CENTER */}
                <div className="hidden w-[420px] xl:block">

                    <div className="relative">

                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <input
                            placeholder="Search users, websites, templates..."
                            className={`w-full rounded-2xl border py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 ${isDark ? "border-white/10 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-900"}`}
                        />

                    </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                    {/* Date */}
                    <div className={`hidden items-center gap-2 rounded-xl border px-4 py-2 lg:flex ${isDark ? "border-white/10 bg-zinc-900" : "border-zinc-200 bg-white"}`}>

                        <CalendarDays className={`h-4 w-4 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} />

                        <span className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                            {today}
                        </span>

                    </div>

                    {/* Theme */}

                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`rounded-xl border p-3 transition hover:border-blue-500 ${isDark ? "border-white/10 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-200 bg-white hover:bg-zinc-100"}`}
                    >
                        {isDark ? (
                            <Moon className="h-5 w-5 text-zinc-300" />
                        ) : (
                            <Sun className="h-5 w-5 text-zinc-700" />
                        )}
                    </button>

                    {/* Notification */}

                    <div className="relative">

                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`relative rounded-xl border p-3 transition hover:border-blue-500 ${isDark ? "border-white/10 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-200 bg-white hover:bg-zinc-100"}`}
                        >
                            <Bell className={`h-5 w-5 ${isDark ? "text-zinc-300" : "text-zinc-700"}`} />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                        </button>

                        {showNotifications && <NotificationDropdown />}

                    </div>

                    {/* Settings */}

                    <button className={`rounded-xl border p-3 transition hover:border-blue-500 ${isDark ? "border-white/10 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-200 bg-white hover:bg-zinc-100"}`}>

                        <Settings className={`h-5 w-5 ${isDark ? "text-zinc-300" : "text-zinc-700"}`} />

                    </button>

                    {/* Profile */}

                    <div className="relative">

                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition hover:border-blue-500 ${isDark ? "border-white/10 bg-zinc-900" : "border-zinc-200 bg-white"}`}
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-blue-600 text-white">
                                    AS
                                </AvatarFallback>
                            </Avatar>

                            <div className="hidden text-left lg:block">
                                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>
                                    Ahmad Sheikh
                                </p>

                                <p className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                                    Super Admin
                                </p>
                            </div>

                            <ChevronDown className={`hidden h-4 w-4 ${isDark ? "text-zinc-500" : "text-zinc-500"} lg:block`} />
                        </button>

                        {showProfile && <ProfileDropdown />}

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;