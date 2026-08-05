import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter your password",
  name,
  id,
  autoComplete = "current-password",
  required = true,
  disabled = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">

      {/* Lock Icon */}

      <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

      {/* Input */}

      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-14 pr-14 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {/* Show / Hide */}

      <button
        type="button"
        onClick={() =>
          setShowPassword(!showPassword)
        }
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
      >
        {showPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>

    </div>
  );
};

export default PasswordInput;