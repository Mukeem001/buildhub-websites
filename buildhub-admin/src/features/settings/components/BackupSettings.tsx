import { DatabaseBackup, Clock } from "lucide-react";
import { BackupSettings as BackupSettingsType } from "../types/settings";

interface BackupSettingsProps {
  settings: BackupSettingsType;
  onChange: (settings: BackupSettingsType) => void;
  onRunBackup?: () => void;
  onRestoreBackup?: () => void;
}

const BackupSettings = ({
  settings,
  onChange,
  onRunBackup,
  onRestoreBackup,
}: BackupSettingsProps) => {
  const updateField = <
    K extends keyof BackupSettingsType
  >(
    key: K,
    value: BackupSettingsType[K]
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

            <DatabaseBackup size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Backup Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure automatic backups and disaster recovery options.
            </p>

          </div>

        </div>

      </div>

      {/* Settings */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        {/* Auto Backup */}

        <div className="lg:col-span-2">

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <div>

              <h3 className="font-semibold text-white">
                Automatic Backups
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                Automatically create backups based on the selected schedule.
              </p>

            </div>

            <button
              onClick={() =>
                updateField(
                  "automaticBackup",
                  !settings.automaticBackup
                )
              }
              className={`relative h-7 w-14 rounded-full transition ${
                settings.automaticBackup
                  ? "bg-cyan-500"
                  : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  settings.automaticBackup
                    ? "left-8"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

        {/* Schedule */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Backup Schedule
          </label>

          <select
            value={settings.schedule}
            onChange={(e) =>
              updateField(
                "schedule",
                e.target.value as BackupSettingsType["schedule"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

        </div>

        {/* Destination */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Backup Destination
          </label>

          <select
            value={settings.destination}
            onChange={(e) =>
              updateField(
                "destination",
                e.target.value as BackupSettingsType["destination"]
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="Local">Local Storage</option>
            <option value="AWS S3">AWS S3</option>
            <option value="Cloudinary">Cloudinary</option>
            <option value="Google Drive">Google Drive</option>
          </select>

        </div>

        {/* Retention */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Retention (Days)
          </label>

          <input
            type="number"
            value={settings.retentionDays}
            onChange={(e) =>
              updateField(
                "retentionDays",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Last Backup */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Last Backup
          </label>

          <div className="flex h-12 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4">

            <Clock
              size={18}
              className="text-cyan-400"
            />

            <span className="text-zinc-300">
              {settings.lastBackup}
            </span>

          </div>

        </div>

                {/* Action Buttons */}

        <div className="lg:col-span-2 flex flex-wrap gap-4">

          <button
            onClick={() => onRunBackup?.()}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            ▶ Run Backup Now
          </button>

          <button
            onClick={() => onRestoreBackup?.()}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
          >
            ♻ Restore Backup
          </button>

        </div>

      </div>

      {/* Backup History */}

      <div className="border-t border-zinc-800 p-6">

        <h3 className="mb-5 text-xl font-semibold text-white">
          Backup History
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-zinc-800">

          <table className="min-w-full">

            <thead className="bg-zinc-950">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                  Destination
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                  Size
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {[
                {
                  date: "2026-07-10",
                  type: "Automatic",
                  destination: "AWS S3",
                  size: "2.4 GB",
                  status: "Completed",
                },
                {
                  date: "2026-07-09",
                  type: "Manual",
                  destination: "Local",
                  size: "2.3 GB",
                  status: "Completed",
                },
                {
                  date: "2026-07-08",
                  type: "Automatic",
                  destination: "AWS S3",
                  size: "2.2 GB",
                  status: "Completed",
                },
              ].map((backup, index) => (

                <tr
                  key={index}
                  className="border-t border-zinc-800"
                >

                  <td className="px-5 py-4 text-zinc-300">
                    {backup.date}
                  </td>

                  <td className="px-5 py-4 text-white">
                    {backup.type}
                  </td>

                  <td className="px-5 py-4 text-zinc-400">
                    {backup.destination}
                  </td>

                  <td className="px-5 py-4 text-zinc-400">
                    {backup.size}
                  </td>

                  <td className="px-5 py-4">

                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                      {backup.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Status Card */}

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <h3 className="text-lg font-semibold text-white">
            Backup Status
          </h3>

          <p className="mt-2 text-zinc-400">
            Automatic backups are{" "}
            <span className="font-semibold text-emerald-400">
              {settings.automaticBackup ? "Enabled" : "Disabled"}
            </span>
            . Your latest backup was completed on{" "}
            <span className="font-semibold text-white">
              {settings.lastBackup}
            </span>
            .
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">

            <div className="rounded-xl bg-zinc-950 p-4">

              <p className="text-sm text-zinc-500">
                Schedule
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                {settings.schedule}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-4">

              <p className="text-sm text-zinc-500">
                Destination
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                {settings.destination}
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-4">

              <p className="text-sm text-zinc-500">
                Retention
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                {settings.retentionDays} Days
              </h4>

            </div>

            <div className="rounded-xl bg-zinc-950 p-4">

              <p className="text-sm text-zinc-500">
                Last Backup
              </p>

              <h4 className="mt-2 text-lg font-bold text-cyan-400">
                {settings.lastBackup}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BackupSettings;