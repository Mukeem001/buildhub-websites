import { Link } from "react-router-dom";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showForgotPassword?: boolean;
}

const RememberMe = ({
  checked,
  onChange,
  showForgotPassword = true,
}: RememberMeProps) => {
  return (
    <div className="flex items-center justify-between">

      {/* Remember Me */}

      <label className="flex cursor-pointer items-center gap-3">

        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
          className="h-5 w-5 rounded border-slate-600 bg-slate-900 accent-blue-600"
        />

        <span className="text-sm text-slate-300">
          Remember me
        </span>

      </label>

      {/* Forgot Password */}

      {showForgotPassword && (
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          Forgot Password?
        </Link>
      )}

    </div>
  );
};

export default RememberMe;