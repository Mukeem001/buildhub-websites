import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import { forgotPassword } from "@/services/auth.service";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthButton from "@/components/auth/AuthButton";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await forgotPassword(email);
      alert("OTP sent successfully. Please check your email.");
      navigate("/login");
    } catch (error: any) {
      alert(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address to receive an OTP."
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

        <AuthButton loading={loading}>
          Send OTP
        </AuthButton>

        <div className="text-center">

          <Link
            to="/login"
            className="font-semibold text-blue-500 hover:text-blue-400"
          >
            ← Back to Login
          </Link>

        </div> 
                {/* Info Box */}

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <h3 className="font-semibold text-white">
            Password Recovery
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            We'll send a One-Time Password (OTP) to your
            registered email address. Enter the OTP on the
            next screen to verify your identity and create
            a new password.
          </p>

        </div>

      </form>

    </AuthLayout>
  );
};

export default ForgotPassword;