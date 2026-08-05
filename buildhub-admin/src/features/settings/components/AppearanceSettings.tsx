import { Monitor, Sparkles } from "lucide-react";
import { AppearanceSettings as AppearanceSettingsType } from "../types/settings";

interface AppearanceSettingsProps {
  settings: AppearanceSettingsType;
  onChange: (settings: AppearanceSettingsType) => void;
}

const AppearanceSettings = ({
  settings,
  onChange,
}: AppearanceSettingsProps) => {
  const updateField = <
    K extends keyof AppearanceSettingsType
  >(
    key: K,
    value: AppearanceSettingsType[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  const Toggle = ({
    title,
    description,
    checked,
    onToggle,
  }: {
    title: string;
    description: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <div>

        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {description}
        </p>

      </div>

      <button
        onClick={onToggle}
        className={`relative h-7 w-14 rounded-full transition ${
          checked
            ? "bg-cyan-500"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked
              ? "left-8"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Monitor size={26} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Appearance Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Customize the look and feel of your admin dashboard.
            </p>

          </div>

        </div>

      </div>

      {/* Toggles */}

      <div className="space-y-5 p-6">

        <Toggle
          title="Dark Mode"
          description="Always use dark appearance."
          checked={settings.darkMode}
          onToggle={() =>
            updateField(
              "darkMode",
              !settings.darkMode
            )
          }
        />

        <Toggle
          title="Compact Sidebar"
          description="Reduce sidebar width for more workspace."
          checked={settings.compactSidebar}
          onToggle={() =>
            updateField(
              "compactSidebar",
              !settings.compactSidebar
            )
          }
        />

        <Toggle
          title="Glass Effect"
          description="Enable frosted glass backgrounds."
          checked={settings.glassEffect}
          onToggle={() =>
            updateField(
              "glassEffect",
              !settings.glassEffect
            )
          }
        />

        <Toggle
          title="Rounded Corners"
          description="Use modern rounded components."
          checked={settings.roundedCorners}
          onToggle={() =>
            updateField(
              "roundedCorners",
              !settings.roundedCorners
            )
          }
        />

        <Toggle
          title="Animations"
          description="Enable transitions and animations."
          checked={settings.animations}
          onToggle={() =>
            updateField(
              "animations",
              !settings.animations
            )
          }
        />
                {/* Font Family */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Font Family
          </label>

          <select
            value={settings.fontFamily}
            onChange={(e) =>
              updateField("fontFamily", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Outfit">Outfit</option>
          </select>

        </div>

      </div>

      {/* Live Preview */}

      <div className="border-t border-zinc-800 p-6">

        <div className="mb-5 flex items-center gap-3">

          <Sparkles
            size={22}
            className="text-cyan-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Live Dashboard Preview
          </h3>

        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

          {/* Fake Header */}

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

            <div>

              <h4
                className="text-lg font-bold text-white"
                style={{
                  fontFamily: settings.fontFamily,
                }}
              >
                BuildHub Dashboard
              </h4>

              <p className="text-sm text-zinc-400">
                Enterprise Admin Panel
              </p>

            </div>

            <div className="flex gap-2">

              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: "#ef4444",
                }}
              />

              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: "#eab308",
                }}
              />

              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: "#22c55e",
                }}
              />

            </div>

          </div>

          {/* Preview Cards */}

          <div className="grid gap-5 md:grid-cols-3">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className={`border border-zinc-800 bg-zinc-900 p-5 transition ${
                  settings.roundedCorners
                    ? "rounded-2xl"
                    : "rounded-md"
                } ${
                  settings.glassEffect
                    ? "backdrop-blur-lg"
                    : ""
                }`}
              >

                <div className="mb-4 flex items-center gap-3">

                  <div className="h-10 w-10 rounded-xl bg-cyan-500" />

                  <div>

                    <h4
                      className="font-semibold text-white"
                      style={{
                        fontFamily: settings.fontFamily,
                      }}
                    >
                      Widget {item}
                    </h4>

                    <p className="text-xs text-zinc-500">
                      Preview Card
                    </p>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="h-3 rounded bg-zinc-700" />

                  <div className="h-3 w-3/4 rounded bg-zinc-700" />

                  <div className="h-3 w-1/2 rounded bg-zinc-700" />

                </div>

              </div>

            ))}

          </div>

          {/* Enabled Features */}

          <div className="mt-8 flex flex-wrap gap-3">

            {settings.darkMode && (
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                🌙 Dark Mode
              </span>
            )}

            {settings.compactSidebar && (
              <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
                📂 Compact Sidebar
              </span>
            )}

            {settings.glassEffect && (
              <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
                ✨ Glass Effect
              </span>
            )}

            {settings.roundedCorners && (
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                🔵 Rounded UI
              </span>
            )}

            {settings.animations && (
              <span className="rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                🎬 Animations
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AppearanceSettings;