import { KeyRound, Shield, Globe } from "lucide-react";
import { APISettings as APISettingsType } from "../types/settings";

interface APISettingsProps {
  settings: APISettingsType;
  onChange: (settings: APISettingsType) => void;
}

const APISettings = ({
  settings,
  onChange,
}: APISettingsProps) => {
  const updateField = <
    K extends keyof APISettingsType
  >(
    key: K,
    value: APISettingsType[K]
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

            <KeyRound size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              API Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage API access, authentication, webhooks and rate limits.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        {/* API Key */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Public API Key
          </label>

          <input
            type="text"
            value={settings.apiKey}
            onChange={(e) =>
              updateField(
                "apiKey",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* JWT Secret */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            JWT Secret
          </label>

          <input
            type="password"
            value={settings.jwtSecret}
            onChange={(e) =>
              updateField(
                "jwtSecret",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Webhook */}

        <div className="lg:col-span-2">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Webhook URL
          </label>

          <input
            type="url"
            value={settings.webhookUrl}
            onChange={(e) =>
              updateField(
                "webhookUrl",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Rate Limit */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Rate Limit (Requests / Minute)
          </label>

          <input
            type="number"
            value={settings.rateLimit}
            onChange={(e) =>
              updateField(
                "rateLimit",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* API Version */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            API Version
          </label>

          <select
            value={settings.apiVersion}
            onChange={(e) =>
              updateField(
                "apiVersion",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
            <option value="v3">v3</option>
          </select>

        </div>

        <div className="lg:col-span-2 space-y-5">

          <Toggle
            title="Enable REST API"
            description="Allow REST API access."
            checked={settings.restApi}
            onToggle={() =>
              updateField(
                "restApi",
                !settings.restApi
              )
            }
          />

          <Toggle
            title="Enable GraphQL API"
            description="Allow GraphQL endpoint."
            checked={settings.graphql}
            onToggle={() =>
              updateField(
                "graphql",
                !settings.graphql
              )
            }
          />

          <Toggle
            title="Enable API Logs"
            description="Store request and response logs."
            checked={settings.apiLogs}
            onToggle={() =>
              updateField(
                "apiLogs",
                !settings.apiLogs
              )
            }
          />

        </div>

        {/* Actions */}

        <div className="lg:col-span-2 flex flex-wrap gap-4">

          <button
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Generate New API Key
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(settings.apiKey)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
          >
            Copy API Key
          </button>

        </div>

      </div>

      {/* API Overview */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Shield
              size={24}
              className="text-cyan-400"
            />

            <h3 className="text-xl font-semibold text-white">
              API Security Overview
            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                REST API
              </p>

              <h4
                className={`mt-2 text-lg font-bold ${
                  settings.restApi
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.restApi
                  ? "Enabled"
                  : "Disabled"}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                GraphQL
              </p>

              <h4
                className={`mt-2 text-lg font-bold ${
                  settings.graphql
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.graphql
                  ? "Enabled"
                  : "Disabled"}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Rate Limit
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                {settings.rateLimit}/min
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                API Version
              </p>

              <h4 className="mt-2 text-lg font-bold text-cyan-400">
                {settings.apiVersion}
              </h4>

            </div>

          </div>

          {/* Endpoint Status */}

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <div className="flex items-center gap-3">

              <Globe
                size={22}
                className="text-emerald-400"
              />

              <div>

                <h4 className="font-semibold text-white">
                  API Endpoint Status
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  All API endpoints are online and responding normally.
                </p>

              </div>

            </div>

          </div>

          {/* API Logs */}

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-semibold text-white">
                  Request Logging
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  Monitor incoming API requests for debugging and auditing.
                </p>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  settings.apiLogs
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {settings.apiLogs
                  ? "Enabled"
                  : "Disabled"}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default APISettings;