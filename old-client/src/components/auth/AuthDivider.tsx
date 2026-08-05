interface AuthDividerProps {
  text?: string;
  className?: string;
}

const AuthDivider = ({
  text = "OR CONTINUE WITH",
  className = "",
}: AuthDividerProps) => {
  return (
    <div className={`my-8 flex items-center ${className}`.trim()}>

      <div className="h-px flex-1 bg-slate-700" />

      <span className="mx-4 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {text}
      </span>

      <div className="h-px flex-1 bg-slate-700" />

    </div>
  );
};

export default AuthDivider;