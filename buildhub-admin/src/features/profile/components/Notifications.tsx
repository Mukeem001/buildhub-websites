import { Bell } from "lucide-react";
import { NotificationSettings } from "../types/profile";

interface NotificationsProps {
  settings: NotificationSettings;
  onChange: (settings: NotificationSettings) => void;
  onSave?: () => void;
}

const Notifications = ({
  settings,
  onChange,
  onSave,
}: NotificationsProps) => {

  const updateField = <
    K extends keyof NotificationSettings
  >(
    key: K,
    value: NotificationSettings[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  const Toggle = ({
    label,
    description,
    value,
    onToggle,
  }: {
    label: string;
    description: string;
    value: boolean;
    onToggle: () => void;
  }) => (

    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <div>

        <h3 className="font-semibold text-white">
          {label}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {description}
        </p>

      </div>

      <button
        onClick={onToggle}
        className={`relative h-7 w-14 rounded-full transition ${
          value
            ? "bg-cyan-500"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            value
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

            <Bell size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Notification Preferences
            </h2>

            <p className="mt-2 text-zinc-400">
              Choose how you'd like to receive updates and alerts.
            </p>

          </div>

        </div>

      </div>

      {/* Notification Toggles */}

      <div className="space-y-5 p-6">

        <Toggle
          label="Email Notifications"
          description="Receive account activity and updates via email."
          value={settings.email}
          onToggle={() =>
            updateField("email", !settings.email)
          }
        />

        <Toggle
          label="Push Notifications"
          description="Get instant browser and mobile notifications."
          value={settings.push}
          onToggle={() =>
            updateField("push", !settings.push)
          }
        />

        <Toggle
          label="SMS Notifications"
          description="Receive important notifications via SMS."
          value={settings.sms}
          onToggle={() =>
            updateField("sms", !settings.sms)
          }
        />

        <Toggle
          label="Marketing Emails"
          description="Receive news, offers and product announcements."
          value={settings.marketing}
          onToggle={() =>
            updateField("marketing", !settings.marketing)
          }
        />
                <Toggle
          label="Security Alerts"
          description="Always receive notifications about login attempts and security events."
          value={settings.securityAlerts}
          onToggle={() =>
            updateField(
              "securityAlerts",
              !settings.securityAlerts
            )
          }
        />

        <Toggle
          label="Product Updates"
          description="Receive notifications about new BuildHub features and improvements."
          value={settings.productUpdates}
          onToggle={() =>
            updateField(
              "productUpdates",
              !settings.productUpdates
            )
          }
        />

        {/* Summary */}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="mb-5 text-xl font-semibold text-white">
            Notification Summary
          </h3>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Enabled
              </p>

              <h4 className="mt-2 text-2xl font-bold text-emerald-400">
                {
                  Object.values(settings).filter(Boolean).length
                }
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Disabled
              </p>

              <h4 className="mt-2 text-2xl font-bold text-red-400">
                {
                  Object.values(settings).filter(
                    (value) => !value
                  ).length
                }
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Total Preferences
              </p>

              <h4 className="mt-2 text-2xl font-bold text-cyan-400">
                {Object.keys(settings).length}
              </h4>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-zinc-800 p-6">

        <button
          onClick={() => onSave?.()}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Save Notification Preferences
        </button>

      </div>

    </div>

  );
};

export default Notifications;