import { Image, Palette } from "lucide-react";
import { BrandingSettings as BrandingSettingsType } from "../types/settings";

interface BrandingSettingsProps {
  settings: BrandingSettingsType;
  onChange: (settings: BrandingSettingsType) => void;
}

const BrandingSettings = ({
  settings,
  onChange,
}: BrandingSettingsProps) => {
  const updateField = <
    K extends keyof BrandingSettingsType
  >(
    key: K,
    value: BrandingSettingsType[K]
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
          Branding Settings
        </h2>

        <p className="mt-2 text-zinc-400">
          Manage your brand identity, logos, colors and platform assets.
        </p>

      </div>

      {/* Upload Fields */}

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        {/* Logo */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Platform Logo
          </label>

          <input
            type="text"
            value={settings.logo}
            onChange={(e) =>
              updateField("logo", e.target.value)
            }
            placeholder="/branding/logo.svg"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Dashboard Logo */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Dashboard Logo
          </label>

          <input
            type="text"
            value={settings.dashboardLogo}
            onChange={(e) =>
              updateField("dashboardLogo", e.target.value)
            }
            placeholder="/branding/dashboard-logo.svg"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Favicon */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Favicon
          </label>

          <input
            type="text"
            value={settings.favicon}
            onChange={(e) =>
              updateField("favicon", e.target.value)
            }
            placeholder="/branding/favicon.ico"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Login Background */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Login Background
          </label>

          <input
            type="text"
            value={settings.loginBackground}
            onChange={(e) =>
              updateField(
                "loginBackground",
                e.target.value
              )
            }
            placeholder="/branding/login-bg.jpg"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>
                {/* Primary Color */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Primary Color
          </label>

          <div className="flex items-center gap-3">

            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) =>
                updateField("primaryColor", e.target.value)
              }
              className="h-12 w-20 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950"
            />

            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) =>
                updateField("primaryColor", e.target.value)
              }
              className="h-12 flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

        {/* Secondary Color */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Secondary Color
          </label>

          <div className="flex items-center gap-3">

            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) =>
                updateField("secondaryColor", e.target.value)
              }
              className="h-12 w-20 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950"
            />

            <input
              type="text"
              value={settings.secondaryColor}
              onChange={(e) =>
                updateField("secondaryColor", e.target.value)
              }
              className="h-12 flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

      </div>

      {/* Brand Preview */}

      <div className="border-t border-zinc-800 p-6">

        <h3 className="mb-5 text-lg font-semibold text-white">
          Live Brand Preview
        </h3>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Preview Left */}

            <div className="flex items-center gap-5">

              <div
                className="flex h-20 w-20 items-center justify-center rounded-3xl"
                style={{
                  backgroundColor: settings.primaryColor,
                }}
              >
                <Image
                  size={34}
                  className="text-white"
                />
              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">
                  BuildHub
                </h2>

                <p className="mt-2 text-zinc-400">
                  AI Website Builder Platform
                </p>

              </div>

            </div>

            {/* Colors */}

            <div className="flex items-center gap-6">

              <div className="text-center">

                <div
                  className="mx-auto mb-3 h-14 w-14 rounded-full border border-zinc-700"
                  style={{
                    background: settings.primaryColor,
                  }}
                />

                <p className="text-xs text-zinc-500">
                  Primary
                </p>

              </div>

              <div className="text-center">

                <div
                  className="mx-auto mb-3 h-14 w-14 rounded-full border border-zinc-700"
                  style={{
                    background: settings.secondaryColor,
                  }}
                />

                <p className="text-xs text-zinc-500">
                  Secondary
                </p>

              </div>

              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: settings.primaryColor,
                }}
              >
                <Palette
                  size={22}
                  className="text-white"
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BrandingSettings;