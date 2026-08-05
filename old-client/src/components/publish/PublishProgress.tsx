import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaSpinner,
  FaServer,
  FaGlobe,
  FaDatabase,
  FaLock,
} from "react-icons/fa";

interface PublishProgressProps {
  currentStep: number;
}

const steps = [
  {
    title: "Creating Website",
    description: "Generating website files...",
    icon: <FaGlobe />,
  },
  {
    title: "Creating Admin Panel",
    description: "Building dashboard...",
    icon: <FaDatabase />,
  },
  {
    title: "Deploying Server",
    description: "Uploading files...",
    icon: <FaServer />,
  },
  {
    title: "Installing SSL",
    description: "Securing website...",
    icon: <FaLock />,
  },
  {
    title: "Going Live",
    description: "Finalizing deployment...",
    icon: <FaCheckCircle />,
  },
];

const PublishProgress = ({
  currentStep,
}: PublishProgressProps) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
          <FaSpinner className="animate-spin" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Publishing Website
        </h2>

        <p className="mt-3 text-slate-400">
          Please wait while we prepare your website.
        </p>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentStep + 1) / steps.length) * 100
              }%`,
            }}
            transition={{
              duration: 0.4,
            }}
            className="h-full rounded-full bg-blue-600"
          />

        </div>

        <p className="mt-3 text-center text-sm text-slate-400">
          {currentStep + 1} / {steps.length}
        </p>

      </div>

      {/* Steps */}

      <div className="mt-10 space-y-5">

        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-5 rounded-2xl border p-5 transition ${
                completed
                  ? "border-green-500 bg-green-500/10"
                  : active
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-800 bg-slate-950"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-xl ${
                  completed
                    ? "bg-green-600 text-white"
                    : active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {completed ? (
                  <FaCheckCircle />
                ) : active ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  step.icon
                )}
              </div>

              <div className="flex-1">

                <h3 className="font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {step.description}
                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* Notice */}

      <div className="mt-10 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

        <p className="text-center text-sm text-yellow-300">
          ⚡ Please don't close this window while your website is being published.
        </p>

      </div>
    </div>
  );
};

export default PublishProgress;