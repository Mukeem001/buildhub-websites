import { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Send,
  ShieldCheck,
} from "lucide-react";
import { EmailSettings as EmailSettingsType } from "../types/settings";

interface EmailSettingsProps {
  settings: EmailSettingsType;
  onChange: (settings: EmailSettingsType) => void;
  onSendTestEmail?: () => void;
}

const EmailSettings = ({
  settings,
  onChange,
  onSendTestEmail,
}: EmailSettingsProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const updateField = <
    K extends keyof EmailSettingsType
  >(
    key: K,
    value: EmailSettingsType[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">

            <Mail size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Email Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure SMTP server and email delivery
              settings.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        {/* SMTP Host */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            SMTP Host
          </label>

          <input
            type="text"
            value={settings.smtpHost}
            onChange={(e) =>
              updateField(
                "smtpHost",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* SMTP Port */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            SMTP Port
          </label>

          <input
            type="number"
            value={settings.smtpPort}
            onChange={(e) =>
              updateField(
                "smtpPort",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Username */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            SMTP Username
          </label>

          <input
            type="text"
            value={settings.smtpUsername}
            onChange={(e) =>
              updateField(
                "smtpUsername",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            SMTP Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword ? "text" : "password"
              }
              value={settings.smtpPassword}
              onChange={(e) =>
                updateField(
                  "smtpPassword",
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>
                {/* Encryption */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Encryption
          </label>

          <select
            value={settings.encryption}
            onChange={(e) =>
              updateField(
                "encryption",
                e.target.value as EmailSettingsType["encryption"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="None">None</option>
            <option value="SSL">SSL</option>
            <option value="TLS">TLS</option>
          </select>

        </div>

        {/* Sender Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Sender Name
          </label>

          <input
            type="text"
            value={settings.senderName}
            onChange={(e) =>
              updateField(
                "senderName",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Sender Email */}

        <div className="lg:col-span-2">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Sender Email
          </label>

          <input
            type="email"
            value={settings.senderEmail}
            onChange={(e) =>
              updateField(
                "senderEmail",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

      </div>

      {/* SMTP Status */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-emerald-500/10 p-3">

                <ShieldCheck
                  size={28}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  SMTP Connection Status
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  Your email server is configured and ready to
                  send emails.
                </p>

              </div>

            </div>

            <button
              onClick={() => onSendTestEmail?.()}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              <Send size={18} />
              Send Test Email
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EmailSettings;