import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950/95 p-10 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
