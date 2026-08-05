import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSyncAlt,
  FaExpand,
  FaCompress,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
} from "react-icons/fa";

import type { DeviceType } from "../../types/preview";

interface PreviewFrameProps {
  device: DeviceType;
  previewUrl: string;
}

const PreviewFrame = ({
  device,
  previewUrl,
}: PreviewFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const width = useMemo(() => {
    switch (device) {
      case "mobile":
        return "390px";

      case "tablet":
        return "820px";

      default:
        return "100%";
    }
  }, [device]);

  useEffect(() => {
    setLoading(true);
  }, [reloadKey, previewUrl]);

  useEffect(() => {
    const handleChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener(
      "fullscreenchange",
      handleChange
    );

    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleChange
      );
  }, []);

  const toggleFullscreen = async () => {
    if (!frameRef.current) return;

    if (!document.fullscreenElement) {
      await frameRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <section className="bg-slate-900 py-8">

      <div className="mx-auto max-w-7xl px-5">

        {/* Toolbar */}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">

              {device === "desktop" && <FaDesktop />}

              {device === "tablet" && <FaTabletAlt />}

              {device === "mobile" && <FaMobileAlt />}

            </div>

            <div>

              <h3 className="font-bold text-white">

                {device.charAt(0).toUpperCase() +
                  device.slice(1)}{" "}
                Preview

              </h3>

              <p className="text-sm text-slate-400">

                Live Website Preview

              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                setReloadKey((prev) => prev + 1)
              }
              className="rounded-xl bg-slate-800 p-3 text-white transition hover:bg-slate-700"
            >
              <FaSyncAlt />
            </button>

            <button
              onClick={toggleFullscreen}
              className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
            >
              {fullscreen ? (
                <FaCompress />
              ) : (
                <FaExpand />
              )}
            </button>

          </div>

        </div>

        {/* Preview */}

        <div
          ref={frameRef}
          className="flex justify-center overflow-auto rounded-3xl border border-slate-800 bg-slate-950 p-5"
        >

          <motion.div
            animate={{
              width,
            }}
            transition={{
              duration: .35,
            }}
            className="relative overflow-hidden rounded-2xl bg-white shadow-2xl"
          >

            {loading && (

              <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950">

                <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

              </div>

            )}

            <iframe
              key={reloadKey}
              src={previewUrl}
              title="Template Preview"
              className="h-[900px] w-full border-0"
              onLoad={() => setLoading(false)}
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default PreviewFrame;