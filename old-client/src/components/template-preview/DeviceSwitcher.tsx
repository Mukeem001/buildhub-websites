import { motion } from "framer-motion";
import {
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaExternalLinkAlt,
  FaExpand,
} from "react-icons/fa";
import type { DeviceType } from "../../types/preview";

interface DeviceSwitcherProps {
  device: DeviceType;
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  previewUrl: string;
}

const DeviceSwitcher = ({
  device,
  setDevice,
  previewUrl,
}: DeviceSwitcherProps) => {
  const devices = [
    {
      id: "desktop",
      label: "Desktop",
      icon: FaDesktop,
    },
    {
      id: "tablet",
      label: "Tablet",
      icon: FaTabletAlt,
    },
    {
      id: "mobile",
      label: "Mobile",
      icon: FaMobileAlt,
    },
  ];

  return (
    <section className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-wrap items-center gap-3">

          {devices.map((item) => {
            const Icon = item.icon;
            const active = device === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                onClick={() =>
                  setDevice(item.id as DeviceType)
                }
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon />
                <span className="hidden sm:inline">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <FaExternalLinkAlt />
            <span className="hidden sm:inline">
              Live Demo
            </span>
          </a>

          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaExpand />
            <span className="hidden sm:inline">
              Fullscreen
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};

export default DeviceSwitcher;