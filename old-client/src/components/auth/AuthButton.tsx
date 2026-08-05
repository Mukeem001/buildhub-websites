import { FaSpinner } from "react-icons/fa";

interface AuthButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

const AuthButton = ({
  children,
  type = "submit",
  loading = false,
  disabled = false,
  onClick,
  fullWidth = true,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${
          fullWidth ? "w-full" : ""
        }
        flex h-12 items-center justify-center gap-3
        rounded-2xl
        bg-blue-600
        px-6
        text-base
        font-bold
        text-white
        transition-all
        duration-200
        hover:bg-blue-700
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;