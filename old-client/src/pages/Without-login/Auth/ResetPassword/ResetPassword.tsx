import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ][passwordStrength];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters."
      );
      return;
    }

    setLoading(true);

    try {
      console.log({
        password,
      });

      // Backend Reset Password API

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      alert(
        "Password changed successfully."
      );

      navigate("/login");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* New Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">
            New Password
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

        {/* Password Strength */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm text-slate-400">
              Password Strength
            </span>

            <span className="text-sm font-semibold text-white">
              {strengthLabel}
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
              }}
            />

          </div>

        </div>
                {/* Password Requirements */}

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

          <h3 className="mb-3 font-semibold text-white">
            Password Requirements
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">

            <li>• Minimum 8 characters</li>

            <li>• At least one uppercase letter</li>

            <li>• At least one lowercase letter</li>

            <li>• At least one number</li>

            <li>• At least one special character</li>

          </ul>

        </div>

        {/* Reset Button */}

        <AuthButton loading={loading}>
          Reset Password
        </AuthButton>

        {/* Security Info */}

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <h3 className="font-semibold text-white">
            Security Tip
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Choose a strong, unique password that you don't use on
            other websites. This helps keep your account secure.
          </p>

        </div>

      </form>

    </AuthLayout>
  );
};

export default ResetPassword;