import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    FaThLarge,
    FaClone,
    FaGlobe,
    FaChartLine,
    FaCog,
    FaUser,
    FaCreditCard,
    FaLifeRing,
    FaSignOutAlt,
    FaLink,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const links = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: FaThLarge,
    },
    {
        name: "Websites",
        path: "/websites",
        icon: FaGlobe,
    },
    {
        name: "Domain",
        path: "/domain",
        icon: FaLink,
    },
    {
        name: "Templates",
        path: "/DashboardTemplates",
        icon: FaClone,
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: FaChartLine,
    },
    {
        name: "Billing",
        path: "/billing",
        icon: FaCreditCard,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: FaCog,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: FaUser,
    },
    {
        name: "Support",
        path: "/support",
        icon: FaLifeRing,
    },
];

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="
    fixed
    left-0
    top-0
    z-50
    h-screen
    w-72
    bg-[#070d1f]
    border-r
    border-slate-800
    flex
    flex-col
    overflow-y-auto
    sidebar-scroll
  ">

            {/* Logo */}

            <div className="border-b border-slate-800 px-8 py-7">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
                        B
                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-white">
                            BuildHub
                        </h2>

                        <p className="text-xs text-slate-400">
                            Website Builder
                        </p>

                    </div>

                </Link>

            </div>

            {/* Navigation */}

            <div className="flex-1 px-5 py-3">

                <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Main Menu
                </p>

                <div className="space-y-1">

                    {links.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    }`
                                }
                            >
                                <Icon className="text-lg" />

                                <span className="font-medium">
                                    {item.name}
                                </span>
                            </NavLink>
                        );
                    })}

                </div>

            </div>

            {/* User */}

            <div className="border-t border-slate-800 p-4">

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white">

                            {user?.fullName?.charAt(0)?.toUpperCase() ||
                                user?.email?.charAt(0)?.toUpperCase() ||
                                "U"}

                        </div>

                        <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-white">
                                {user?.fullName || "User"}
                            </h3>

                            <p className="truncate text-xs text-slate-400">
                                {user?.email}
                            </p>

                        </div>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-[11px] font-medium text-blue-400">
                            Free Plan
                        </span>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;