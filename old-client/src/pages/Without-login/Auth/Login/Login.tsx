import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import { loginUser } from "@/services/auth.service";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import SocialLogin from "@/components/auth/SocialLogin";
import AuthDivider from "@/components/auth/AuthDivider";
import RememberMe from "@/components/auth/RememberMe";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await loginUser({ email, password });
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to manage your websites and admin panels."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">

            Email Address

          </label>

          <div className="relative">

            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-14 pr-5 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">

            Password

          </label>

          <PasswordInput
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* Remember */}

        <RememberMe
          checked={rememberMe}
          onChange={setRememberMe}
        />

        {/* Login */}

        <AuthButton loading={loading}>

          Login

        </AuthButton>

        {/* Divider */}

        <AuthDivider />
                {/* Social Login */}

        <SocialLogin
          onGoogle={() =>
            console.log("Google Login")
          }
          onGithub={() =>
            console.log("GitHub Login")
          }
          onFacebook={() =>
            console.log("Facebook Login")
          }
        />

        {/* Signup */}

        <div className="pt-2 text-center">

          <p className="text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-blue-500 transition hover:text-blue-400"
            >
              Create Account
            </Link>

          </p>

        </div>

        {/* Demo Credentials */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

          <h3 className="mb-3 font-bold text-white">
            Demo Account
          </h3>

          <div className="space-y-2 text-sm">

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Email
              </span>

              <span className="font-medium text-white">
                demo@buildhub.com
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Password
              </span>

              <span className="font-medium text-white">
                12345678
              </span>

            </div>

          </div>

        </div>

      </form>

    </AuthLayout>
  );
};

export default Login;