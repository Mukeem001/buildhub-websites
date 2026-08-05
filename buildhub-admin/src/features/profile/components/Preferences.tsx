import { Settings2 } from "lucide-react";
import { PreferenceSettings } from "../types/profile";

interface PreferencesProps {
  preferences: PreferenceSettings;
  onChange: (preferences: PreferenceSettings) => void;
  onSave?: () => void;
}

const Preferences = ({
  preferences,
  onChange,
  onSave,
}: PreferencesProps) => {

  const updateField = <
    K extends keyof PreferenceSettings
  >(
    key: K,
    value: PreferenceSettings[K]
  ) => {
    onChange({
      ...preferences,
      [key]: value,
    });
  };

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">

            <Settings2 size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Preferences
            </h2>

            <p className="mt-2 text-zinc-400">
              Customize your BuildHub dashboard experience.
            </p>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="grid gap-6 p-6 md:grid-cols-2">

        {/* Theme */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Theme
          </label>

          <select
            value={preferences.theme}
            onChange={(e) =>
              updateField(
                "theme",
                e.target.value as PreferenceSettings["theme"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
            <option value="System">System</option>
          </select>

        </div>

        {/* Language */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Language
          </label>

          <select
            value={preferences.language}
            onChange={(e) =>
              updateField("language", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Urdu</option>
            <option>Arabic</option>
          </select>

        </div>

        {/* Timezone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Timezone
          </label>

          <select
            value={preferences.timezone}
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
            value={preferences.dateFormat}
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

        {/* Time Format */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Time Format
          </label>

          <select
            value={preferences.timeFormat}
            onChange={(e) =>
              updateField(
                "timeFormat",
                e.target.value as PreferenceSettings["timeFormat"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="12 Hour">12 Hour</option>
            <option value="24 Hour">24 Hour</option>
          </select>

        </div>
                {/* Compact Mode */}

        <div className="md:col-span-2">

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <div>

              <h3 className="font-semibold text-white">
                Compact Mode
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                Reduce spacing throughout the dashboard for a denser layout.
              </p>

            </div>

            <button
              onClick={() =>
                updateField(
                  "compactMode",
                  !preferences.compactMode
                )
              }
              className={`relative h-7 w-14 rounded-full transition ${
                preferences.compactMode
                  ? "bg-cyan-500"
                  : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  preferences.compactMode
                    ? "left-8"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        </div>

        {/* Summary */}

        <div className="md:col-span-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h3 className="mb-5 text-xl font-semibold text-white">
            Preference Summary
          </h3>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Theme
              </p>

              <h4 className="mt-2 font-bold text-cyan-400">
                {preferences.theme}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Language
              </p>

              <h4 className="mt-2 font-bold text-white">
                {preferences.language}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Timezone
              </p>

              <h4 className="mt-2 font-bold text-white">
                {preferences.timezone}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-5">

              <p className="text-sm text-zinc-500">
                Layout
              </p>

              <h4 className="mt-2 font-bold text-emerald-400">
                {preferences.compactMode ? "Compact" : "Comfortable"}
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
          Save Preferences
        </button>

      </div>

    </div>

  );
};

export default Preferences;