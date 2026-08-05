import { HardDrive, Database } from "lucide-react";
import {
  StorageProvider,
  StorageSettings as StorageSettingsType,
} from "../types/settings";

interface StorageSettingsProps {
  settings: StorageSettingsType;
  onChange: (settings: StorageSettingsType) => void;
}

const StorageSettings = ({
  settings,
  onChange,
}: StorageSettingsProps) => {
  const updateProvider = (
    provider: "s3",
    value: StorageProvider
  ) => {
    onChange({
      ...settings,
      [provider]: value,
    });
  };

  const updateCloudinary = (
    key: keyof StorageSettingsType["cloudinary"],
    value: string | boolean
  ) => {
    onChange({
      ...settings,
      cloudinary: {
        ...settings.cloudinary,
        [key]: value,
      },
    });
  };

  const updateFirebase = (
    key: keyof StorageSettingsType["firebase"],
    value: string | boolean
  ) => {
    onChange({
      ...settings,
      firebase: {
        ...settings.firebase,
        [key]: value,
      },
    });
  };

  const Toggle = ({
    checked,
    onClick,
  }: {
    checked: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative h-7 w-14 rounded-full transition ${
        checked ? "bg-cyan-500" : "bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-8" : "left-1"
        }`}
      />
    </button>
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">

            <HardDrive size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Storage Settings
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure file storage providers for uploads and media.
            </p>

          </div>

        </div>

      </div>

      {/* Local Storage */}

      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-white">
              Local Storage
            </h3>

            <p className="text-sm text-zinc-500">
              Store files on the application server.
            </p>

          </div>

          <Toggle
            checked={settings.local}
            onClick={() =>
              onChange({
                ...settings,
                local: !settings.local,
              })
            }
          />

        </div>

      </div>

      {/* AWS S3 */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              AWS S3
            </h3>

            <p className="text-sm text-zinc-500">
              Amazon Simple Storage Service
            </p>

          </div>

          <Toggle
            checked={settings.s3.enabled}
            onClick={() =>
              updateProvider("s3", {
                ...settings.s3,
                enabled: !settings.s3.enabled,
              })
            }
          />

        </div>
                {/* AWS S3 Fields */}

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            placeholder="Bucket Name"
            value={settings.s3.bucket}
            onChange={(e) =>
              updateProvider("s3", {
                ...settings.s3,
                bucket: e.target.value,
              })
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Region"
            value={settings.s3.region}
            onChange={(e) =>
              updateProvider("s3", {
                ...settings.s3,
                region: e.target.value,
              })
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Access Key"
            value={settings.s3.accessKey}
            onChange={(e) =>
              updateProvider("s3", {
                ...settings.s3,
                accessKey: e.target.value,
              })
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            placeholder="Secret Key"
            value={settings.s3.secretKey}
            onChange={(e) =>
              updateProvider("s3", {
                ...settings.s3,
                secretKey: e.target.value,
              })
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

      </div>

      {/* Cloudinary */}

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h3 className="text-lg font-semibold text-white">
            Cloudinary
          </h3>

          <Toggle
            checked={settings.cloudinary.enabled}
            onClick={() =>
              updateCloudinary(
                "enabled",
                !settings.cloudinary.enabled
              )
            }
          />

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            placeholder="Cloud Name"
            value={settings.cloudinary.cloudName}
            onChange={(e) =>
              updateCloudinary(
                "cloudName",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="API Key"
            value={settings.cloudinary.apiKey}
            onChange={(e) =>
              updateCloudinary(
                "apiKey",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            placeholder="API Secret"
            value={settings.cloudinary.apiSecret}
            onChange={(e) =>
              updateCloudinary(
                "apiSecret",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500 md:col-span-2"
          />

        </div>

      </div>

      {/* Firebase */}

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h3 className="text-lg font-semibold text-white">
            Firebase Storage
          </h3>

          <Toggle
            checked={settings.firebase.enabled}
            onClick={() =>
              updateFirebase(
                "enabled",
                !settings.firebase.enabled
              )
            }
          />

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            placeholder="Project ID"
            value={settings.firebase.projectId}
            onChange={(e) =>
              updateFirebase(
                "projectId",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="API Key"
            value={settings.firebase.apiKey}
            onChange={(e) =>
              updateFirebase(
                "apiKey",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Storage Bucket"
            value={settings.firebase.storageBucket}
            onChange={(e) =>
              updateFirebase(
                "storageBucket",
                e.target.value
              )
            }
            className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500 md:col-span-2"
          />

        </div>

      </div>

      {/* Status */}

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

        <div className="flex items-center gap-3">

          <Database
            size={22}
            className="text-emerald-400"
          />

          <div>

            <h3 className="font-semibold text-white">
              Storage Status
            </h3>

            <p className="text-sm text-zinc-400">
              Configure one or more storage providers for media uploads,
              backups, and user files.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StorageSettings;