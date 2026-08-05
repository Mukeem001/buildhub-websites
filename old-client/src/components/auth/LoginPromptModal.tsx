import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import PasswordInput from "@/components/auth/PasswordInput";
import RememberMe from "@/components/auth/RememberMe";
import SocialLogin from "@/components/auth/SocialLogin";

import { loginUser, registerUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

interface AuthPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthPopupModal = ({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthPopupModalProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setRememberMe(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSuccess = (user: any) => {
    login(user);
    handleClose();
    navigate("/dashboard");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const user = await loginUser({ email, password });
        handleSuccess(user);
      } else {
        const user = await registerUser({
          fullName,
          email,
          password,
          phone,
        });
        handleSuccess(user);
      }
    } catch (error: any) {
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {mode === "login"
                  ? "Login to manage your websites and admin panels."
                  : "Start building your website today."}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 transition hover:text-white"
            >
              Close
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-3"
          >
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-10 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </div>

            {mode === "login" && (
              <RememberMe
                checked={rememberMe}
                onChange={setRememberMe}
              />
            )}

            <AuthButton loading={loading}>
              {mode === "login" ? "Login" : "Create Account"}
            </AuthButton>

            <AuthDivider text={mode === "login" ? "OR CONTINUE WITH" : "OR SIGN UP WITH"} className="py-2" />

            <SocialLogin
              onGoogle={() => console.log("Google auth")}
              onGithub={() => console.log("GitHub auth")}
              onFacebook={() => console.log("Facebook auth")}
            />
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            {mode === "login" ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-blue-500 transition hover:text-blue-400"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-blue-500 transition hover:text-blue-400"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthPopupModal;
