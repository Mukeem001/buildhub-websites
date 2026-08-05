import { ShieldCheck, Smartphone, Mail, MessageSquare } from "lucide-react";
import { TwoFactorSettings } from "../types/profile";

interface TwoFactorAuthProps {
  settings: TwoFactorSettings;
  onChange: (settings: TwoFactorSettings) => void;
  onSave?: () => void;
  onRegenerateCodes?: () => void;
}

const TwoFactorAuth = ({
  settings,
  onChange,
  onSave,
  onRegenerateCodes,
}: TwoFactorAuthProps) => {

  const updateField = <
    K extends keyof TwoFactorSettings
  >(
    key: K,
    value: TwoFactorSettings[K]
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

            <ShieldCheck size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Two-Factor Authentication
            </h2>

            <p className="mt-2 text-zinc-400">
              Secure your account with an additional verification layer.
            </p>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="space-y-6 p-6">

        {/* Enable Toggle */}

        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <div>

            <h3 className="font-semibold text-white">
              Enable Two-Factor Authentication
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Require an additional verification code during login.
            </p>

          </div>

          <button
            onClick={() =>
              updateField("enabled", !settings.enabled)
            }
            className={`relative h-7 w-14 rounded-full transition ${
              settings.enabled
                ? "bg-cyan-500"
                : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                settings.enabled
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Verification Method */}

        <div>

          <label className="mb-3 block text-sm font-medium text-zinc-300">
            Verification Method
          </label>

          <div className="grid gap-4 md:grid-cols-3">

            <button
              onClick={() =>
                updateField("method", "Authenticator")
              }
              className={`rounded-2xl border p-5 transition ${
                settings.method === "Authenticator"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >
              <Smartphone className="mb-3 text-cyan-400" />
              <h4 className="font-semibold text-white">
                Authenticator
              </h4>
            </button>

            <button
              onClick={() =>
                updateField("method", "Email")
              }
              className={`rounded-2xl border p-5 transition ${
                settings.method === "Email"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >
              <Mail className="mb-3 text-cyan-400" />
              <h4 className="font-semibold text-white">
                Email
              </h4>
            </button>

            <button
              onClick={() =>
                updateField("method", "SMS")
              }
              className={`rounded-2xl border p-5 transition ${
                settings.method === "SMS"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >
              <MessageSquare className="mb-3 text-cyan-400" />
              <h4 className="font-semibold text-white">
                SMS
              </h4>
            </button>

          </div>

        </div>

        {/* QR Placeholder */}

        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8">

          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900">

            <span className="text-center text-sm text-zinc-500">
              QR Code
              <br />
              Placeholder
            </span>

          </div>

          <p className="mt-4 text-center text-sm text-zinc-400">
            Scan this QR code using your Authenticator App.
          </p>

        </div>
                {/* Backup Recovery Codes */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-lg font-semibold text-white">
              Recovery Codes
            </h3>

            <button
              onClick={() => onRegenerateCodes?.()}
              className="rounded-xl border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
            >
              Regenerate Codes
            </button>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            {settings.backupCodes.map((code) => (

              <div
                key={code}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300"
              >
                {code}
              </div>

            ))}

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Store these recovery codes in a safe place. Each code can only be
            used once if you lose access to your authentication device.
          </p>

        </div>

        {/* Security Status */}

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <h3 className="mb-5 text-xl font-semibold text-white">
            Security Status
          </h3>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Two-Factor Status
              </p>

              <h4
                className={`mt-2 text-lg font-bold ${
                  settings.enabled
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.enabled ? "Enabled" : "Disabled"}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Verification Method
              </p>

              <h4 className="mt-2 text-lg font-bold text-cyan-400">
                {settings.method}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Recovery Codes
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                {settings.backupCodes.length} Available
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
          Save 2FA Settings
        </button>

      </div>

    </div>

  );
};

export default TwoFactorAuth;