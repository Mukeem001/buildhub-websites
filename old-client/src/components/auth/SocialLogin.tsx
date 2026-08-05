import {
  FaGoogle,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa";

interface SocialLoginProps {
  onGoogle?: () => void;
  onGithub?: () => void;
  onFacebook?: () => void;
}

const SocialLogin = ({
  onGoogle,
  onGithub,
  onFacebook,
}: SocialLoginProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">

      {/* Google */}

      <button
        type="button"
        onClick={onGoogle}
        className="flex h-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-white transition-all duration-200 hover:border-red-500 hover:bg-slate-900"
      >
        <FaGoogle className="text-xl" />
      </button>

      {/* GitHub */}

      <button
        type="button"
        onClick={onGithub}
        className="flex h-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-white transition-all duration-200 hover:border-white hover:bg-slate-900"
      >
        <FaGithub className="text-xl" />
      </button>

      {/* Facebook */}

      <button
        type="button"
        onClick={onFacebook}
        className="flex h-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-white transition-all duration-200 hover:border-blue-500 hover:bg-slate-900"
      >
        <FaFacebookF className="text-xl" />
      </button>

    </div>
  );
};

export default SocialLogin;