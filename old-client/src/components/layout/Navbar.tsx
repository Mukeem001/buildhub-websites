import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import { getCurrentUser, logoutUser } from "../../services/auth.service";
import LoginPromptModal from "@/components/auth/LoginPromptModal";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Templates", path: "/templates" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());
    const handleInvalidation = () => {
      setUser(null);
      navigate("/");
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth:session-invalidated", handleInvalidation);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth:session-invalidated", handleInvalidation);
    };
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
  };

  const openAuthPopup = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthPopupOpen(true);
    setIsOpen(false);
  };

  const closeAuthPopup = () => {
    setAuthPopupOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
          Build<span className="text-blue-500">Hub</span>
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition font-medium ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right */}

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-white font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthPopup("login")}
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </button>

              <button
                onClick={() => openAuthPopup("signup")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile */}

        <button
          className="lg:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-300"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <>
             

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-slate-800 rounded-xl py-3 text-center text-white font-semibold"
              >
                Logout
              </button>
              
               <Link
                to="/dashboard"
                className="text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthPopup("login")}
                className="text-gray-300 text-left"
              >
                Login
              </button>

              <button
                onClick={() => openAuthPopup("signup")}
                className="bg-blue-600 rounded-xl py-3 text-center text-white font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      <LoginPromptModal
        isOpen={authPopupOpen}
        onClose={closeAuthPopup}
        initialMode={authMode}
      />
    </header>
  );
};

export default Navbar;