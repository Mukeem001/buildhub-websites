import { Bell, Send } from "lucide-react";
import { NotificationSettings as NotificationSettingsType } from "../types/settings";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onChange: (settings: NotificationSettingsType) => void;
}

const NotificationSettings = ({
  settings,
  onChange,
}: NotificationSettingsProps) => {
  const updateField = <
    K extends keyof NotificationSettingsType
  >(
    key: K,
    value: NotificationSettingsType[K]
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

            <Bell size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Notification Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure notification channels and integrations.
            </p>

          </div>

        </div>

      </div>

      {/* Notification Toggles */}

      <div className="space-y-5 p-6">

        <Toggle
          title="Email Notifications"
          description="Receive platform notifications via email."
          checked={settings.email}
          onToggle={() =>
            updateField("email", !settings.email)
          }
        />

        <Toggle
          title="Push Notifications"
          description="Enable browser push notifications."
          checked={settings.push}
          onToggle={() =>
            updateField("push", !settings.push)
          }
        />

        <Toggle
          title="Slack Integration"
          description="Send alerts directly to Slack."
          checked={settings.slack}
          onToggle={() =>
            updateField("slack", !settings.slack)
          }
        />

        <Toggle
          title="Discord Integration"
          description="Send notifications to Discord channels."
          checked={settings.discord}
          onToggle={() =>
            updateField("discord", !settings.discord)
          }
        />

        <Toggle
          title="Telegram Integration"
          description="Deliver notifications through Telegram."
          checked={settings.telegram}
          onToggle={() =>
            updateField("telegram", !settings.telegram)
          }
        />
                {/* Status Overview */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Notification Overview
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Manage all notification channels and third-party integrations
                from one place.
              </p>

            </div>

            <button
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              <Send size={18} />
              Send Test Notification
            </button>

          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="text-sm text-zinc-500">
                Active Channels
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {
                  [
                    settings.email,
                    settings.push,
                    settings.slack,
                    settings.discord,
                    settings.telegram,
                  ].filter(Boolean).length
                }
              </h3>

            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="text-sm text-zinc-500">
                Total Integrations
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                5
              </h3>

            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="text-sm text-zinc-500">
                System Status
              </p>

              <h3 className="mt-2 text-xl font-bold text-emerald-400">
                Operational
              </h3>

            </div>

          </div>

          {/* Integration Cards */}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">

            {[
              {
                name: "Email",
                enabled: settings.email,
              },
              {
                name: "Push",
                enabled: settings.push,
              },
              {
                name: "Slack",
                enabled: settings.slack,
              },
              {
                name: "Discord",
                enabled: settings.discord,
              },
              {
                name: "Telegram",
                enabled: settings.telegram,
              },
            ].map((service) => (

              <div
                key={service.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >

                <h4 className="font-semibold text-white">
                  {service.name}
                </h4>

                <div
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    service.enabled
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {service.enabled
                    ? "Enabled"
                    : "Disabled"}
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default NotificationSettings;