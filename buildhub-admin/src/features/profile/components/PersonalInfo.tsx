import { User } from "lucide-react";
import { Profile } from "../types/profile";

interface PersonalInfoProps {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onSave?: () => void;
}

const PersonalInfo = ({
  profile,
  onChange,
  onSave,
}: PersonalInfoProps) => {

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

            <User size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Personal Information
            </h2>

            <p className="mt-2 text-zinc-400">
              Update your personal details and public profile.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="grid gap-6 p-6 md:grid-cols-2">

        {/* First Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            First Name
          </label>

          <input
            type="text"
            value={profile.firstName}
            onChange={(e) =>
              updateField("firstName", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Last Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Last Name
          </label>

          <input
            type="text"
            value={profile.lastName}
            onChange={(e) =>
              updateField("lastName", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Username */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Username
          </label>

          <input
            type="text"
            value={profile.username}
            onChange={(e) =>
              updateField("username", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Designation */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Designation
          </label>

          <input
            type="text"
            value={profile.designation}
            onChange={(e) =>
              updateField("designation", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Company */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Company
          </label>

          <input
            type="text"
            value={profile.company}
            onChange={(e) =>
              updateField("company", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

                {/* Bio */}

        <div className="md:col-span-2">

          <div className="mb-2 flex items-center justify-between">

            <label className="text-sm font-medium text-zinc-300">
              Bio
            </label>

            <span className="text-xs text-zinc-500">
              {profile.bio.length}/300
            </span>

          </div>

          <textarea
            rows={5}
            maxLength={300}
            value={profile.bio}
            onChange={(e) =>
              updateField("bio", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500 resize-none"
            placeholder="Tell us something about yourself..."
          />

        </div>

        {/* Website */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Website
          </label>

          <input
            type="url"
            value={profile.website}
            onChange={(e) =>
              updateField("website", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
            placeholder="https://example.com"
          />

        </div>

        {/* Location */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Location
          </label>

          <input
            type="text"
            value={profile.location}
            onChange={(e) =>
              updateField("location", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
            placeholder="New Delhi, India"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-zinc-800 p-6">

        <button
          onClick={() => onSave?.()}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Save Personal Information
        </button>

      </div>

    </div>

  );

};

export default PersonalInfo;