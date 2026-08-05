import { Globe, Languages } from "lucide-react";
import { LocalizationSettings as LocalizationSettingsType } from "../types/settings";

interface LocalizationSettingsProps {
  settings: LocalizationSettingsType;
  onChange: (settings: LocalizationSettingsType) => void;
}

const LocalizationSettings = ({
  settings,
  onChange,
}: LocalizationSettingsProps) => {
  const updateField = <
    K extends keyof LocalizationSettingsType
  >(
    key: K,
    value: LocalizationSettingsType[K]
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

            <Globe size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Localization Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure language, region, currency and formatting preferences.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        {/* Language */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Default Language
          </label>

          <select
            value={settings.language}
            onChange={(e) =>
              updateField("language", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Arabic</option>
            <option>French</option>
            <option>German</option>
          </select>

        </div>

        {/* Country */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Default Country
          </label>

          <select
            value={settings.country}
            onChange={(e) =>
              updateField("country", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>UAE</option>
            <option>Germany</option>
          </select>

        </div>

        {/* Currency */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Currency
          </label>

          <select
            value={settings.currency}
            onChange={(e) =>
              updateField("currency", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>AED</option>
          </select>

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
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>Europe/London</option>
            <option>America/New_York</option>
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
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>

        </div>

        {/* Number Format */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Number Format
          </label>

          <select
            value={settings.numberFormat}
            onChange={(e) =>
              updateField("numberFormat", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>1,234,567.89</option>
            <option>1.234.567,89</option>
            <option>12,34,567.89</option>
          </select>

        </div>

      </div>

      {/* Toggles */}

      <div className="space-y-5 border-t border-zinc-800 p-6">

        <Toggle
          title="RTL Support"
          description="Enable right-to-left layout for supported languages."
          checked={settings.rtl}
          onToggle={() =>
            updateField("rtl", !settings.rtl)
          }
        />

        <Toggle
          title="Multi-language Support"
          description="Allow users to switch between multiple languages."
          checked={settings.multilanguage}
          onToggle={() =>
            updateField(
              "multilanguage",
              !settings.multilanguage
            )
          }
        />

      </div>

      {/* Preview */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Languages
              size={24}
              className="text-cyan-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Localization Preview
            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Language
              </p>

              <p className="mt-2 font-semibold text-white">
                {settings.language}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Region
              </p>

              <p className="mt-2 font-semibold text-white">
                {settings.country}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Currency
              </p>

              <p className="mt-2 font-semibold text-white">
                {settings.currency}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Timezone
              </p>

              <p className="mt-2 font-semibold text-white">
                {settings.timezone}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                RTL
              </p>

              <p
                className={`mt-2 font-semibold ${
                  settings.rtl
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.rtl ? "Enabled" : "Disabled"}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Multi-language
              </p>

              <p
                className={`mt-2 font-semibold ${
                  settings.multilanguage
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {settings.multilanguage
                  ? "Enabled"
                  : "Disabled"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LocalizationSettings;