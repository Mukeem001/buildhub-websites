import { FileText, ShieldCheck } from "lucide-react";
import { AuditLogSettings as AuditLogSettingsType } from "../types/settings";

interface AuditLogSettingsProps {
  settings: AuditLogSettingsType;
  onChange: (settings: AuditLogSettingsType) => void;
  onExportCSV?: () => void;
  onExportJSON?: () => void;
  onClearLogs?: () => void;
}

const AuditLogSettings = ({
  settings,
  onChange,
  onExportCSV,
  onExportJSON,
  onClearLogs,
}: AuditLogSettingsProps) => {
  const updateField = <
    K extends keyof AuditLogSettingsType
  >(
    key: K,
    value: AuditLogSettingsType[K]
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

            <FileText size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Audit Log Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure system audit logs, activity tracking and retention policies.
            </p>

          </div>

        </div>

      </div>

      {/* Settings */}

      <div className="space-y-5 p-6">

        <Toggle
          title="Enable Audit Logs"
          description="Store every important system event."
          checked={settings.enabled}
          onToggle={() =>
            updateField("enabled", !settings.enabled)
          }
        />

        <Toggle
          title="User Activity Logging"
          description="Track all user actions."
          checked={settings.userActivity}
          onToggle={() =>
            updateField(
              "userActivity",
              !settings.userActivity
            )
          }
        />

        <Toggle
          title="Admin Activity Logging"
          description="Track administrator operations."
          checked={settings.adminActivity}
          onToggle={() =>
            updateField(
              "adminActivity",
              !settings.adminActivity
            )
          }
        />

        <Toggle
          title="API Request Logging"
          description="Store every incoming API request."
          checked={settings.apiActivity}
          onToggle={() =>
            updateField(
              "apiActivity",
              !settings.apiActivity
            )
          }
        />

        {/* Retention */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Log Retention Period
          </label>

          <select
            value={settings.retention}
            onChange={(e) =>
              updateField(
                "retention",
                e.target.value as AuditLogSettingsType["retention"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="30 Days">
              30 Days
            </option>

            <option value="90 Days">
              90 Days
            </option>

            <option value="180 Days">
              180 Days
            </option>

            <option value="365 Days">
              365 Days
            </option>

          </select>

        </div>
                {/* Action Buttons */}

        <div className="flex flex-wrap gap-4 pt-2">

          <button
            onClick={() => onExportCSV?.()}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Export CSV
          </button>

          <button
            onClick={() => onExportJSON?.()}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
          >
            Export JSON
          </button>

          <button
            onClick={() => onClearLogs?.()}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Clear Logs
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="mb-6 text-xl font-semibold text-white">
            Audit Statistics
          </h3>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Audit Logs
              </p>

              <h3
                className={`mt-2 text-3xl font-bold ${
                  settings.enabled
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.enabled ? "ON" : "OFF"}
              </h3>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                User Activity
              </p>

              <h3
                className={`mt-2 text-3xl font-bold ${
                  settings.userActivity
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.userActivity ? "Enabled" : "Disabled"}
              </h3>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Admin Activity
              </p>

              <h3
                className={`mt-2 text-3xl font-bold ${
                  settings.adminActivity
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.adminActivity ? "Enabled" : "Disabled"}
              </h3>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                API Activity
              </p>

              <h3
                className={`mt-2 text-3xl font-bold ${
                  settings.apiActivity
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.apiActivity ? "Enabled" : "Disabled"}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Security Overview */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-emerald-500/10 p-3">

              <ShieldCheck
                size={28}
                className="text-emerald-400"
              />

            </div>

            <div className="flex-1">

              <h3 className="text-xl font-semibold text-white">
                Audit & Compliance Status
              </h3>

              <p className="mt-2 text-zinc-400">
                Audit logging is configured to maintain security,
                compliance and traceability across the BuildHub platform.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-sm text-zinc-500">
                    Retention Policy
                  </p>

                  <h4 className="mt-2 font-semibold text-white">
                    {settings.retention}
                  </h4>

                </div>

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-sm text-zinc-500">
                    Overall Status
                  </p>

                  <h4 className="mt-2 font-semibold text-emerald-400">
                    Secure
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuditLogSettings;