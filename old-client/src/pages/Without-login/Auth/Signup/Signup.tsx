import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "@/services/auth.service";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
} from "react-icons/fa";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialLogin from "@/components/auth/SocialLogin";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [acceptTerms, setAcceptTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      alert(
        "Please accept the Terms & Conditions."
      );
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        fullName,
        email,
        password,
        phone,
      });
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start building your website today."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Full Name */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Full Name
          </label>

          <div className="relative">

            <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-14 pr-5 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

        </div>

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
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-14 pr-5 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Mobile Number
          </label>

          <div className="relative">

            <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="tel"
              required
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
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
            autoComplete="new-password"
          />

        </div>

        {/* Confirm Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Confirm Password
          </label>

          <PasswordInput
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm your password"
            autoComplete="new-password"
          />

        </div> 
                {/* Terms & Conditions */}

        <label className="flex items-start gap-3">

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) =>
              setAcceptTerms(e.target.checked)
            }
            className="mt-1 h-5 w-5 rounded border-slate-600 bg-slate-900 accent-blue-600"
          />

          <span className="text-sm leading-6 text-slate-400">
            I agree to the{" "}

            <Link
              to="/terms"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Terms & Conditions
            </Link>

            {" "}and{" "}

            <Link
              to="/privacy"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Privacy Policy
            </Link>

          </span>

        </label>

        {/* Signup Button */}

        <AuthButton loading={loading}>
          Create Account
        </AuthButton>

        {/* Divider */}

        <AuthDivider text="OR SIGN UP WITH" />

        {/* Social Login */}

        <SocialLogin
          onGoogle={() =>
            console.log("Google Signup")
          }
          onGithub={() =>
            console.log("GitHub Signup")
          }
          onFacebook={() =>
            console.log("Facebook Signup")
          }
        />

        {/* Login Link */}

        <div className="pt-2 text-center">

          <p className="text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-500 transition hover:text-blue-400"
            >
              Login
            </Link>

          </p>

        </div>

      </form>

    </AuthLayout>
  );
};

export default Signup;