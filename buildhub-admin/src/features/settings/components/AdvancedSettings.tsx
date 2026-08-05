import {
  Settings2,
  AlertTriangle,
  RotateCcw,
  Download,
} from "lucide-react";
import { AdvancedSettings as AdvancedSettingsType } from "../types/settings";

interface AdvancedSettingsProps {
  settings: AdvancedSettingsType;
  onChange: (settings: AdvancedSettingsType) => void;
  onResetSettings?: () => void;
  onExportConfig?: () => void;
  onImportConfig?: () => void;
}

const AdvancedSettings = ({
  settings,
  onChange,
  onResetSettings,
  onExportConfig,
  onImportConfig,
}: AdvancedSettingsProps) => {
  const updateField = <
    K extends keyof AdvancedSettingsType
  >(
    key: K,
    value: AdvancedSettingsType[K]
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

            <Settings2 size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Advanced Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure advanced platform behavior and developer options.
            </p>

          </div>

        </div>

      </div>

      {/* Toggles */}

      <div className="space-y-5 p-6">

        <Toggle
          title="Developer Mode"
          description="Enable experimental developer tools."
          checked={settings.developerMode}
          onToggle={() =>
            updateField(
              "developerMode",
              !settings.developerMode
            )
          }
        />

        <Toggle
          title="Debug Mode"
          description="Enable detailed debugging logs."
          checked={settings.debugMode}
          onToggle={() =>
            updateField(
              "debugMode",
              !settings.debugMode
            )
          }
        />

        <Toggle
          title="Verbose Logging"
          description="Store extended diagnostic information."
          checked={settings.verboseLogging}
          onToggle={() =>
            updateField(
              "verboseLogging",
              !settings.verboseLogging
            )
          }
        />

        <Toggle
          title="Beta Features"
          description="Enable experimental BuildHub features."
          checked={settings.betaFeatures}
          onToggle={() =>
            updateField(
              "betaFeatures",
              !settings.betaFeatures
            )
          }
        />

              {/* Danger Zone */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

            <div className="mb-6 flex items-center gap-3">

              <AlertTriangle
                size={24}
                className="text-red-400"
              />

              <h3 className="text-xl font-semibold text-white">
                Danger Zone
              </h3>

            </div>

            <p className="mb-6 text-sm text-zinc-400">
              These actions may affect your entire BuildHub installation.
              Please proceed carefully.
            </p>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => onResetSettings?.()}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                <RotateCcw size={18} />
                Reset All Settings
              </button>

              <button
                onClick={() => onExportConfig?.()}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
              >
                <Download size={18} />
                Export Configuration
              </button>

              <button
                onClick={() => onImportConfig?.()}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
              >
                <Download size={18} className="rotate-180" />
                Import Configuration
              </button>

            </div>

          </div>

        </div>

        {/* Status Overview */}

        <div className="border-t border-zinc-800 p-6">

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

            <h3 className="mb-6 text-xl font-semibold text-white">
              Advanced Configuration Status
            </h3>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-xl bg-zinc-950 p-5">

                <p className="text-sm text-zinc-500">
                  Developer Mode
                </p>

                <h4
                  className={`mt-2 text-lg font-bold ${
                    settings.developerMode
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {settings.developerMode ? "Enabled" : "Disabled"}
                </h4>

              </div>

              <div className="rounded-xl bg-zinc-950 p-5">

                <p className="text-sm text-zinc-500">
                  Debug Mode
                </p>

                <h4
                  className={`mt-2 text-lg font-bold ${
                    settings.debugMode
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {settings.debugMode ? "Enabled" : "Disabled"}
                </h4>

              </div>

              <div className="rounded-xl bg-zinc-950 p-5">

                <p className="text-sm text-zinc-500">
                  Verbose Logging
                </p>

                <h4
                  className={`mt-2 text-lg font-bold ${
                    settings.verboseLogging
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {settings.verboseLogging ? "Enabled" : "Disabled"}
                </h4>

              </div>

              <div className="rounded-xl bg-zinc-950 p-5">

                <p className="text-sm text-zinc-500">
                  Beta Features
                </p>

                <h4
                  className={`mt-2 text-lg font-bold ${
                    settings.betaFeatures
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {settings.betaFeatures ? "Enabled" : "Disabled"}
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdvancedSettings;