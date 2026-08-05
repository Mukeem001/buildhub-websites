import { Mail } from "lucide-react";
import { Profile } from "../types/profile";

interface ContactInfoProps {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onSave?: () => void;
}

const ContactInfo = ({
  profile,
  onChange,
  onSave,
}: ContactInfoProps) => {

  const updateField = <
    K extends keyof Profile
  >(
    key: K,
    value: Profile[K]
  ) => {
    onChange({
      ...profile,
      [key]: value,
    });
  };

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">

            <Mail size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Contact Information
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage your contact details and regional preferences.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="grid gap-6 p-6 md:grid-cols-2">

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Phone Number
          </label>

          <input
            type="tel"
            value={profile.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Address */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Address
          </label>

          <textarea
            rows={4}
            value={profile.location}
            onChange={(e) =>
              updateField("location", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition resize-none focus:border-cyan-500"
            placeholder="Enter your complete address..."
          />

        </div>

        {/* Country */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Country
          </label>

          <input
            type="text"
            placeholder="India"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* City */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            City
          </label>

          <input
            type="text"
            placeholder="New Delhi"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

                {/* ZIP Code */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            ZIP / Postal Code
          </label>

          <input
            type="text"
            placeholder="110001"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Timezone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Timezone
          </label>

          <select
            value={profile.timezone}
            onChange={(e) =>
              updateField("timezone", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="Asia/Kolkata">
              Asia/Kolkata (IST)
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

          </select>

        </div>

        {/* Language */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Preferred Language
          </label>

          <select
            value={profile.language}
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

            <option value="Urdu">
              Urdu
            </option>

            <option value="Arabic">
              Arabic
            </option>

          </select>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-zinc-800 p-6">

        <button
          onClick={() => onSave?.()}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Save Contact Information
        </button>

      </div>

    </div>

  );

};

export default ContactInfo;