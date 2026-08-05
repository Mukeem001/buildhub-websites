import { GeneralSettings as GeneralSettingsType } from "../types/settings";

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  onChange: (settings: GeneralSettingsType) => void;
}

const GeneralSettings = ({
  settings,
  onChange,
}: GeneralSettingsProps) => {
  const updateField = <
    K extends keyof GeneralSettingsType
  >(
    key: K,
    value: GeneralSettingsType[K]
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

        <h2 className="text-2xl font-bold text-white">
          General Settings
        </h2>

        <p className="mt-2 text-zinc-400">
          Configure your platform information and regional
          preferences.
        </p>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        {/* Platform Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Platform Name
          </label>

          <input
            type="text"
            value={settings.platformName}
            onChange={(e) =>
              updateField(
                "platformName",
                e.target.value
              )
            }
            placeholder="BuildHub"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Company Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Company Name
          </label>

          <input
            type="text"
            value={settings.companyName}
            onChange={(e) =>
              updateField(
                "companyName",
                e.target.value
              )
            }
            placeholder="Company Name"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Website */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Website URL
          </label>

          <input
            type="url"
            value={settings.website}
            onChange={(e) =>
              updateField(
                "website",
                e.target.value
              )
            }
            placeholder="https://example.com"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Support Email */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Support Email
          </label>

          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) =>
              updateField(
                "supportEmail",
                e.target.value
              )
            }
            placeholder="support@example.com"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

                {/* Timezone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Timezone
          </label>

          <select
            value={settings.timezone}
            onChange={(e) =>
              updateField("timezone", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="Asia/Kolkata">Asia / Kolkata</option>
            <option value="Asia/Dubai">Asia / Dubai</option>
            <option value="Europe/London">Europe / London</option>
            <option value="America/New_York">America / New York</option>
            <option value="UTC">UTC</option>
          </select>

        </div>

        {/* Date Format */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Date Format
          </label>

          <select
            value={settings.dateFormat}
            onChange={(e) =>
              updateField("dateFormat", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="DD/MM/YYYY">
              DD/MM/YYYY
            </option>

            <option value="MM/DD/YYYY">
              MM/DD/YYYY
            </option>

            <option value="YYYY-MM-DD">
              YYYY-MM-DD
            </option>

          </select>

        </div>

        {/* Default Language */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Default Language
          </label>

          <select
            value={settings.language}
            onChange={(e) =>
              updateField("language", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="English">
              English
            </option>

            <option value="Hindi">
              Hindi
            </option>

            <option value="Arabic">
              Arabic
            </option>

            <option value="French">
              French
            </option>

            <option value="German">
              German
            </option>

          </select>

        </div>

      </div>

      {/* Platform Information */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <h3 className="text-lg font-semibold text-cyan-400">
            Platform Information
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

            <div>

              <p className="text-sm text-zinc-500">
                Platform Version
              </p>

              <p className="mt-1 font-semibold text-white">
                BuildHub v1.0.0
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Environment
              </p>

              <p className="mt-1 font-semibold text-emerald-400">
                Production
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                License
              </p>

              <p className="mt-1 font-semibold text-amber-400">
                Enterprise
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default GeneralSettings;