import { useMemo, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { PasswordSettings as PasswordSettingsType } from "../types/profile";

interface PasswordSettingsProps {
  password: PasswordSettingsType;
  onChange: (password: PasswordSettingsType) => void;
  onSave?: () => void;
}

const PasswordSettings = ({
  password,
  onChange,
  onSave,
}: PasswordSettingsProps) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const updateField = <
    K extends keyof PasswordSettingsType
  >(
    key: K,
    value: PasswordSettingsType[K]
  ) => {
    onChange({
      ...password,
      [key]: value,
    });
  };

  const strength = useMemo(() => {
    const value = password.newPassword;

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
  }, [password.newPassword]);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][strength];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Lock size={24} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Password Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Change your account password securely.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="space-y-6 p-6">

        {/* Current Password */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Current Password
          </label>

          <div className="relative">

            <input
              type={showCurrent ? "text" : "password"}
              value={password.currentPassword}
              onChange={(e) =>
                updateField(
                  "currentPassword",
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showCurrent ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            New Password
          </label>

          <div className="relative">

            <input
              type={showNew ? "text" : "password"}
              value={password.newPassword}
              onChange={(e) =>
                updateField(
                  "newPassword",
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showNew ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              value={password.confirmPassword}
              onChange={(e) =>
                updateField(
                  "confirmPassword",
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>
                {/* Password Strength */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm text-zinc-400">
              Password Strength
            </span>

            <span
              className={`text-sm font-semibold ${
                strength >= 4
                  ? "text-emerald-400"
                  : strength >= 2
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {strengthLabel}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

            <div
              style={{
                width: `${(strength / 5) * 100}%`,
              }}
              className={`h-full rounded-full transition-all duration-500 ${
                strength >= 4
                  ? "bg-emerald-500"
                  : strength >= 2
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />

          </div>

        </div>

        {/* Requirements */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Password Requirements
          </h3>

          <ul className="space-y-3 text-sm">

            <li
              className={
                password.newPassword.length >= 8
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            >
              ✓ Minimum 8 characters
            </li>

            <li
              className={
                /[A-Z]/.test(password.newPassword)
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            >
              ✓ One uppercase letter
            </li>

            <li
              className={
                /[a-z]/.test(password.newPassword)
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            >
              ✓ One lowercase letter
            </li>

            <li
              className={
                /[0-9]/.test(password.newPassword)
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            >
              ✓ One number
            </li>

            <li
              className={
                /[^A-Za-z0-9]/.test(password.newPassword)
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            >
              ✓ One special character
            </li>

          </ul>

        </div>

        {/* Password Match */}

        <div>

          {password.confirmPassword.length > 0 && (

            <p
              className={`text-sm font-medium ${
                password.newPassword === password.confirmPassword
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {password.newPassword === password.confirmPassword
                ? "✓ Passwords match"
                : "✕ Passwords do not match"}
            </p>

          )}

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-zinc-800 p-6">

        <button
          onClick={() => onSave?.()}
          disabled={
            password.newPassword !== password.confirmPassword ||
            strength < 4
          }
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
        >
          Update Password
        </button>

      </div>

    </div>

  );
};

export default PasswordSettings;