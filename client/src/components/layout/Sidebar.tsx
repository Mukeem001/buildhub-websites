import { useEffect, useState } from "react";
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
    FaBars,
    FaTimes,
    FaChevronRight,
    FaLink,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";


/* =========================================================
   NAVIGATION
========================================================= */

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
        name: "Templates",
        path: "/DashboardTemplates",
        icon: FaClone,
    },
    {
        name: "System Templates",
        path: "/system-templates",
        icon: FaClone,
    },
     {
            name: "Domain",
            path: "/domain",
            icon: FaLink,
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


/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);


    /* =====================================================
       LOGOUT
    ===================================================== */

    const handleLogout = () => {

        logout();

        setMobileOpen(false);

        navigate("/");
    };


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    const closeMenu = () => {
        setMobileOpen(false);
    };


    /* =====================================================
       ESC KEY
    ===================================================== */

    useEffect(() => {

        const handleEscape = (event: KeyboardEvent) => {

            if (event.key === "Escape") {
                setMobileOpen(false);
            }

        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, []);


    /* =====================================================
       PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
    ===================================================== */

    useEffect(() => {

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };

    }, [mobileOpen]);


    return (
        <>
            {/* =================================================
                MOBILE HEADER
                ONLY MOBILE
            ================================================= */}

            <header
                className="
                    fixed
                    left-0
                    right-0
                    top-0
                    z-[50]
                    flex
                    h-[70px]
                    items-center
                    justify-between
                    border-b
                    border-slate-800/80
                    bg-[#050a18]
                    px-4
                    shadow-lg
                    shadow-black/10
                    lg:hidden
                "
            >

                {/* Logo */}

                <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-600
                            to-cyan-400
                            text-lg
                            font-bold
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                        "
                    >
                        B
                    </div>

                    <div className="leading-tight">

                        <h1
                            className="
                                text-base
                                font-bold
                                text-white
                            "
                        >
                            BuildHub
                        </h1>

                        <p
                            className="
                                text-[10px]
                                text-slate-500
                            "
                        >
                            Website Builder
                        </p>

                    </div>

                </Link>


                {/* Hamburger */}

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-900
                        text-slate-300
                        transition
                        hover:border-blue-500/40
                        hover:bg-slate-800
                        hover:text-white
                        active:scale-95
                    "
                >

                    <FaBars size={18} />

                </button>

            </header>


            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            <div
                onClick={closeMenu}
                className={`
                    fixed
                    inset-0
                    z-[60]
                    bg-black/70
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    lg:hidden

                    ${
                        mobileOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                    }
                `}
            />


            {/* =================================================
                DESKTOP SIDEBAR + MOBILE DRAWER
            ================================================= */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-[70]

                    flex
                    h-[100dvh]
                    w-[280px]
                    flex-col

                    border-r
                    border-slate-800

                    bg-[#070d1f]

                    shadow-2xl
                    shadow-black/40

                    transition-transform
                    duration-300
                    ease-in-out

                    lg:translate-x-0

                    ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* =================================================
                    SIDEBAR HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        h-[78px]
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-slate-800
                        px-6
                    "
                >

                    <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-blue-600
                                to-cyan-400
                                text-lg
                                font-bold
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                            "
                        >
                            B
                        </div>


                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    tracking-tight
                                    text-white
                                "
                            >
                                BuildHub
                            </h2>

                            <p
                                className="
                                    text-[10px]
                                    text-slate-500
                                "
                            >
                                Website Builder
                            </p>

                        </div>

                    </Link>


                    {/* Close only mobile */}

                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Close menu"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-800
                            bg-slate-900
                            text-slate-400
                            transition
                            hover:bg-slate-800
                            hover:text-white
                            lg:hidden
                        "
                    >

                        <FaTimes size={15} />

                    </button>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        px-4
                        py-6
                    "
                >

                    <p
                        className="
                            mb-4
                            px-3
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        Main Menu
                    </p>


                    <nav className="space-y-1.5">

                        {links.map((item) => {

                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-sm
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? `
                                                    bg-gradient-to-r
                                                    from-blue-600
                                                    to-cyan-500
                                                    font-semibold
                                                    text-white
                                                    shadow-lg
                                                    shadow-blue-600/20
                                                `
                                                : `
                                                    text-slate-400
                                                    hover:bg-slate-900
                                                    hover:text-white
                                                `
                                        }
                                        `
                                    }
                                >

                                    {({ isActive }) => (
                                        <>

                                            {/* Icon */}

                                            <span
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg

                                                    ${
                                                        isActive
                                                            ? "bg-white/15 text-white"
                                                            : "bg-slate-800/60 text-slate-500 group-hover:text-blue-400"
                                                    }
                                                `}
                                            >

                                                <Icon size={16} />

                                            </span>


                                            {/* Name */}

                                            <span className="flex-1">
                                                {item.name}
                                            </span>


                                            {/* Arrow */}

                                            {isActive && (
                                                <FaChevronRight
                                                    size={9}
                                                    className="
                                                        text-white/70
                                                    "
                                                />
                                            )}

                                        </>
                                    )}

                                </NavLink>
                            );

                        })}

                    </nav>

                </div>


                {/* =================================================
                    USER AREA
                ================================================= */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-slate-800
                        bg-[#060b19]
                        p-4
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-900/70
                            p-4
                        "
                    >

                        {/* User */}

                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-blue-600
                                    to-cyan-400
                                    text-sm
                                    font-bold
                                    text-white
                                "
                            >

                                {user?.fullName
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    user?.email
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                    "U"}

                            </div>


                            <div className="min-w-0 flex-1">

                                <h3
                                    className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {user?.fullName || "User"}
                                </h3>

                                <p
                                    className="
                                        truncate
                                        text-[10px]
                                        text-slate-500
                                    "
                                >
                                    {user?.email ||
                                        "user@example.com"}
                                </p>

                            </div>

                        </div>


                        {/* Bottom */}

                        <div
                            className="
                                mt-4
                                flex
                                items-center
                                justify-between
                                gap-2
                            "
                        >

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-blue-500/20
                                    bg-blue-500/10
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    text-blue-400
                                "
                            >
                                Free Plan
                            </span>


                            <button
                                type="button"
                                onClick={handleLogout}
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    bg-red-500/10
                                    px-3
                                    py-2
                                    text-[10px]
                                    font-semibold
                                    text-red-400
                                    transition
                                    hover:bg-red-500/20
                                    hover:text-red-300
                                "
                            >

                                <FaSignOutAlt size={10} />

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            </aside>


            {/* =================================================
                MOBILE CONTENT TOP SPACE
            ================================================= */}

            <div className="h-[70px] lg:hidden" />

        </>
    );
};


export default Sidebar;