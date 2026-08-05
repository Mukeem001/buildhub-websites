import { Cpu, Server } from "lucide-react";
import { SystemSettings as SystemSettingsType } from "../types/settings";

interface SystemSettingsProps {
  settings: SystemSettingsType;
  onChange: (settings: SystemSettingsType) => void;
  onClearCache?: () => void;
  onRestartServices?: () => void;
}

const SystemSettings = ({
  settings,
  onChange,
  onClearCache,
  onRestartServices,
}: SystemSettingsProps) => {
  const updateField = <K extends keyof SystemSettingsType>(
    key: K,
    value: SystemSettingsType[K]
  ) => {
    onChange({ ...settings, [key]: value });
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
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className={`relative h-7 w-14 rounded-full transition ${checked ? "bg-cyan-500" : "bg-zinc-700"}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-8" : "left-1"}`} />
      </button>
    </div>
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Server size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">System Settings</h2>
            <p className="mt-2 text-zinc-400">Configure core application settings and server behavior.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <Toggle
          title="Maintenance Mode"
          description="Temporarily disable public access."
          checked={settings.maintenanceMode}
          onToggle={() => updateField("maintenanceMode", !settings.maintenanceMode)}
        />

        <Toggle
          title="Enable Cache"
          description="Improve performance using application cache."
          checked={settings.cacheEnabled}
          onToggle={() => updateField("cacheEnabled", !settings.cacheEnabled)}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">System Name</label>
          <input
            type="text"
            value={settings.systemName}
            onChange={(e) => updateField("systemName", e.target.value)}
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Base URL</label>
          <input
            type="url"
            value={settings.baseUrl}
            onChange={(e) => updateField("baseUrl", e.target.value)}
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Environment</label>
          <select
            value={settings.environment}
            onChange={(e) => updateField("environment", e.target.value as SystemSettingsType["environment"])}
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="Development">Development</option>
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Application Version</label>
          <input
            type="text"
            value={settings.version}
            onChange={(e) => updateField("version", e.target.value)}
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="border-t border-zinc-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
              <Cpu size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">System health</p>
              <p className="text-sm text-zinc-400">Core services are running normally.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {onClearCache && (
              <button
                type="button"
                onClick={onClearCache}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-cyan-500 hover:text-cyan-400"
              >
                Clear Cache
              </button>
            )}

            {onRestartServices && (
              <button
                type="button"
                onClick={onRestartServices}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                Restart Services
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;