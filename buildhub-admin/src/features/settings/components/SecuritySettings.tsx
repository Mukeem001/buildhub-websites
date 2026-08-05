import { Shield, Lock } from "lucide-react";
import { SecuritySettings as SecuritySettingsType } from "../types/settings";

interface SecuritySettingsProps {
  settings: SecuritySettingsType;
  onChange: (settings: SecuritySettingsType) => void;
}

const SecuritySettings = ({
  settings,
  onChange,
}: SecuritySettingsProps) => {
  const updateField = <
    K extends keyof SecuritySettingsType
  >(
    key: K,
    value: SecuritySettingsType[K]
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

            <Shield size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Security Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure authentication, password policy and
              platform security.
            </p>

          </div>

        </div>

      </div>

      {/* Toggles */}

      <div className="space-y-5 p-6">

        <Toggle
          title="Two-Factor Authentication"
          description="Require administrators to use 2FA."
          checked={settings.enable2FA}
          onToggle={() =>
            updateField(
              "enable2FA",
              !settings.enable2FA
            )
          }
        />

        <Toggle
          title="Require Uppercase Letters"
          description="Passwords must contain uppercase characters."
          checked={settings.requireUppercase}
          onToggle={() =>
            updateField(
              "requireUppercase",
              !settings.requireUppercase
            )
          }
        />

        <Toggle
          title="Require Numbers"
          description="Passwords must contain at least one number."
          checked={settings.requireNumbers}
          onToggle={() =>
            updateField(
              "requireNumbers",
              !settings.requireNumbers
            )
          }
        />

        <Toggle
          title="Require Symbols"
          description="Passwords must contain special symbols."
          checked={settings.requireSymbols}
          onToggle={() =>
            updateField(
              "requireSymbols",
              !settings.requireSymbols
            )
          }
        />

        {/* Session Timeout */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Session Timeout (Minutes)
          </label>

          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) =>
              updateField(
                "sessionTimeout",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Login Attempts */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Maximum Login Attempts
          </label>

          <input
            type="number"
            value={settings.loginAttempts}
            onChange={(e) =>
              updateField(
                "loginAttempts",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Password Length */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Minimum Password Length
          </label>

          <input
            type="number"
            value={settings.passwordMinLength}
            onChange={(e) =>
              updateField(
                "passwordMinLength",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>
                {/* IP Whitelist */}

        <div>

          <label className="mb-3 block text-sm font-medium text-zinc-300">
            IP Whitelist
          </label>

          <div className="space-y-3">

            {settings.ipWhitelist.length === 0 ? (

              <div className="rounded-xl border border-dashed border-zinc-700 p-5 text-center text-sm text-zinc-500">
                No IP addresses added.
              </div>

            ) : (

              settings.ipWhitelist.map((ip, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                >

                  <span className="font-mono text-sm text-white">
                    {ip}
                  </span>

                  <button
                    onClick={() =>
                      updateField(
                        "ipWhitelist",
                        settings.ipWhitelist.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>

                </div>

              ))

            )}

          </div>

          <button
            onClick={() =>
              updateField("ipWhitelist", [
                ...settings.ipWhitelist,
                "192.168.1.1",
              ])
            }
            className="mt-4 rounded-xl bg-cyan-500 px-5 py-2 font-medium text-black transition hover:bg-cyan-400"
          >
            + Add IP Address
          </button>

        </div>

      </div>

      {/* Security Status */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-emerald-500/10 p-3">

              <Lock
                size={26}
                className="text-emerald-400"
              />

            </div>

            <div className="flex-1">

              <h3 className="text-lg font-semibold text-white">
                Security Overview
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Your current security configuration helps protect the
                BuildHub platform against unauthorized access.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-4">

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    2FA
                  </p>

                  <p className="mt-1 font-semibold text-emerald-400">
                    {settings.enable2FA ? "Enabled" : "Disabled"}
                  </p>

                </div>

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    Password Policy
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {settings.passwordMinLength} Characters
                  </p>

                </div>

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    Login Attempts
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {settings.loginAttempts}
                  </p>

                </div>

                <div className="rounded-xl bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    Whitelisted IPs
                  </p>

                  <p className="mt-1 font-semibold text-cyan-400">
                    {settings.ipWhitelist.length}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SecuritySettings;