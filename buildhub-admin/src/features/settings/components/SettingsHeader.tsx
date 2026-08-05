import {
  Search,
  Save,
  RotateCcw,
  Upload,
  Download,
  Settings2,
} from "lucide-react";

interface SettingsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;

  onSave: () => void;
  onReset: () => void;
  onImport: () => void;
  onExport: () => void;
}

const SettingsHeader = ({
  search,
  onSearchChange,
  onSave,
  onReset,
  onImport,
  onExport,
}: SettingsHeaderProps) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Top */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

        {/* Title */}

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Settings2 size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Platform Settings
            </h1>

            <p className="mt-2 text-zinc-400">
              Configure your BuildHub platform, branding, security,
              integrations and global preferences.
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="relative w-full xl:w-96">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search settings..."
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-zinc-800" />

      {/* Actions */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          <Save size={18} />
          Save Changes
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          onClick={onImport}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
        >
          <Upload size={18} />
          Import
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
        >
          <Download size={18} />
          Export
        </button>

      </div>

    </div>
  );
};

export default SettingsHeader;