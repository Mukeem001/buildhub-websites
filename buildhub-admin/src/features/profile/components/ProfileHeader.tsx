import { Camera, Pencil, ShieldCheck } from "lucide-react";
import { Profile } from "../types/profile";

interface ProfileHeaderProps {
  profile: Profile;
  completion: number;
  onEdit?: () => void;
  onAvatarChange?: () => void;
  onCoverChange?: () => void;
}

const ProfileHeader = ({
  profile,
  completion,
  onEdit,
  onAvatarChange,
  onCoverChange,
}: ProfileHeaderProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Cover */}

      <div className="relative h-72 w-full">

        <img
          src={profile.coverImage}
          alt="Cover"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />

        <button
          onClick={onCoverChange}
          className="absolute right-6 top-6 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-cyan-500 hover:text-black"
        >
          <Camera size={18} />
          Change Cover
        </button>

      </div>

      {/* Profile */}

      <div className="relative px-8 pb-8">

        <div className="-mt-20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">

            {/* Avatar */}

            <div className="relative">

              <img
                src={profile.avatar}
                alt={profile.firstName}
                className="h-40 w-40 rounded-3xl border-4 border-zinc-900 object-cover shadow-2xl"
              />

              <button
                onClick={onAvatarChange}
                className="absolute bottom-3 right-3 rounded-xl bg-cyan-500 p-3 text-black transition hover:bg-cyan-400"
              >
                <Camera size={18} />
              </button>

            </div>

            {/* Info */}

            <div className="pb-2">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-4xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h1>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  VERIFIED
                </span>

              </div>

              <p className="mt-2 text-lg text-zinc-400">
                @{profile.username}
              </p>

              <p className="mt-2 text-zinc-500">
                {profile.designation} • {profile.company}
              </p>

            </div>

          </div>

          {/* Edit Button */}

          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

        </div>

                {/* Bottom Information */}

        <div className="mt-8 grid gap-6 xl:grid-cols-[320px_1fr]">

          {/* Profile Completion */}

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

            <div className="mb-5 flex items-center gap-3">

              <ShieldCheck
                size={24}
                className="text-cyan-400"
              />

              <h3 className="text-xl font-semibold text-white">
                Profile Completion
              </h3>

            </div>

            <div className="mb-4 flex items-center justify-between">

              <span className="text-zinc-400">
                Completion
              </span>

              <span className="font-bold text-cyan-400">
                {completion}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                style={{ width: `${completion}%` }}
                className="h-full rounded-full bg-cyan-500 transition-all duration-500"
              />

            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Complete your profile to unlock all BuildHub account features.
            </p>

          </div>

          {/* Account Information */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-zinc-500">
                  Account Status
                </p>

                <h4 className="mt-2 font-semibold text-emerald-400">
                  Active
                </h4>

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  Member Since
                </p>

                <h4 className="mt-2 font-semibold text-white">
                  {profile.createdAt}
                </h4>

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  Email Address
                </p>

                <h4 className="mt-2 font-semibold text-white break-all">
                  {profile.email}
                </h4>

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  Location
                </p>

                <h4 className="mt-2 font-semibold text-white">
                  {profile.location}
                </h4>

              </div>

              <div className="md:col-span-2">

                <p className="text-sm text-zinc-500">
                  Website
                </p>

                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block break-all font-semibold text-cyan-400 hover:underline"
                >
                  {profile.website}
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;