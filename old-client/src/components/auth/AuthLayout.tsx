import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const features = [
  "Unlimited Websites",
  "Free SSL Certificate",
  "Admin Dashboard",
  "Responsive Templates",
];

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-950 pt-20">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= Left ================= */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-slate-900 to-slate-950 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb33,transparent_45%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-14">

            {/* Logo */}

            <div>

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                  <FaRocket />
                </div>

                <div>

                  <h1 className="text-3xl font-black text-white">
                    BuildHub
                  </h1>

                  <p className="text-slate-400">
                    Website Builder Platform
                  </p>

                </div>

              </Link>

            </div>

            {/* Center */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >

              <h2 className="max-w-lg text-5xl font-black leading-tight text-white">
                Build Professional Websites In Minutes
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Launch your business website, admin panel and
                custom domain from one powerful platform.
              </p>

              <div className="mt-10 space-y-5">

                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">

                      <FaCheckCircle className="text-white" />

                    </div>

                    <span className="text-lg text-slate-200">
                      {feature}
                    </span>

                  </div>
                ))}

              </div>

            </motion.div>

            {/* Bottom */}

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">

                <FaShieldAlt className="mb-4 text-3xl text-green-400" />

                <h3 className="font-bold text-white">
                  Secure Platform
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Enterprise grade security for every website.
                </p>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">

                <FaGlobe className="mb-4 text-3xl text-blue-400" />

                <h3 className="font-bold text-white">
                  Global Hosting
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Lightning fast servers with worldwide CDN.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Right ================= */}

        <div className="flex items-center justify-center px-5 py-14">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >

            <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-8 shadow-2xl">

              <div className="mb-10 text-center">

                <Link
                  to="/"
                  className="inline-block lg:hidden"
                >
                  <h1 className="text-3xl font-black text-white">
                    BuildHub
                  </h1>
                </Link>

                <h2 className="mt-6 text-4xl font-black text-white">
                  {title}
                </h2>

                <p className="mt-3 text-slate-400">
                  {subtitle}
                </p>

              </div>

              {children}

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
};

export default AuthLayout;