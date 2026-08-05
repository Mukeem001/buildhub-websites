import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  fetchCurrentUserProfile,
  updateCurrentUserProfile,
} from "../../../services/auth.service";
import {
  Check,
  Edit3,
  Globe2,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  User,
  Camera,
  Save,
  Lock,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

const Profile = () => {
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(
    user?.fullName || ""
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchCurrentUserProfile();
        if (data) {
          setFullName(data.fullName || "");
          setPhone(data.phone || "");
          if (user && data.id === user.id) {
            login({
              ...user,
              fullName: data.fullName || user.fullName,
              phone: data.phone || user.phone,
              plan: data.plan || user.plan,
            });
          }
        }
      } catch (error) {
        console.error("Unable to fetch profile", error);
      }
    };

    void loadProfile();
  }, [login, user]);

  const initials =
    user?.fullName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const handleSave = async () => {
    setLoading(true);

    try {
      const updatedUser = await updateCurrentUserProfile({
        fullName,
        phone,
      });

      login(updatedUser);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      alert((error as any)?.message || "Unable to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] px-4 py-6 text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
                <User size={20} />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-400">
                  Account
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  My Profile
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Manage your personal information, account details and profile
              preferences.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saved ? <Check size={17} /> : <Save size={17} />}

            {saved ? "Changes Saved" : loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* =====================================================
            PROFILE HERO
        ===================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b1224]">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

          {/* Cover */}
          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-600/20 via-slate-900 to-cyan-500/10 sm:h-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.12),transparent_35%)]" />
          </div>

          {/* Profile content */}
          <div className="relative px-5 pb-6 sm:px-7">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 md:flex-row md:items-end md:justify-between">

              {/* Avatar */}
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#0b1224] bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-bold text-white shadow-xl shadow-blue-950/40 sm:h-28 sm:w-28">
                    {initials}
                  </div>

                  <button
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#0b1224] bg-slate-800 text-slate-300 shadow-lg transition hover:bg-slate-700 hover:text-white"
                    aria-label="Change profile image"
                  >
                    <Camera size={15} />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold sm:text-2xl">
                      {user?.fullName || "User"}
                    </h2>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      <Check size={11} />
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </div>

              {/* Plan */}
              <div className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-600">
                    Current Plan
                  </p>

                  <p className="text-sm font-bold text-blue-400">
                    Free Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* PERSONAL INFORMATION */}

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="border-b border-slate-800 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <User size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Update the information associated with your BuildHub
                      account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">

                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    />

                    <Edit3
                      size={15}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950/50 pl-11 pr-4 text-sm text-slate-500 outline-none"
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <Check size={12} />
                    Email verified
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Account Type
                  </label>

                  <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4">
                    <BriefcaseBusiness
                      size={17}
                      className="text-slate-600"
                    />

                    <span className="text-sm text-slate-400">
                      Website Creator
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="text"
                      placeholder="Add your location"
                      className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Personal Website
                  </label>

                  <div className="relative">
                    <Globe2
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="text"
                      placeholder="https://yourwebsite.com"
                      className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* BIO */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="border-b border-slate-800 p-5 sm:p-6">
                <h2 className="font-semibold">
                  About You
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Tell others a little about yourself.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <textarea
                  rows={5}
                  placeholder="Write a short introduction about yourself..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />

                <div className="mt-2 text-right text-[11px] text-slate-600">
                  Maximum 500 characters
                </div>
              </div>
            </section>

            {/* SECURITY */}

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="border-b border-slate-800 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Account Security
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Keep your account secure and protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-800">

                <SecurityRow
                  icon={<Lock size={17} />}
                  title="Password"
                  description="Your password is securely encrypted."
                  action="Change Password"
                />

                <SecurityRow
                  icon={<ShieldCheck size={17} />}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of protection."
                  action="Enable"
                />

              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* ACCOUNT SUMMARY */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Account Overview
                  </h2>

                  <p className="text-xs text-slate-500">
                    Your BuildHub activity
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <OverviewItem
                  label="Plan"
                  value={user?.plan ? user.plan.replace(/^[a-z]/, (m) => m.toUpperCase()) : "Free"}
                />

                <OverviewItem
                  label="Websites"
                  value="3"
                />

                <OverviewItem
                  label="Projects"
                  value="3"
                />

                <OverviewItem
                  label="Account Status"
                  value="Active"
                  success
                />

              </div>
            </section>

            {/* PROFILE COMPLETION */}

            <section className="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-950 p-5">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                    Profile
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    Almost there!
                  </h3>
                </div>

                <span className="text-xl font-bold text-blue-400">
                  75%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  style={{ width: "75%" }}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Complete your profile to get the most out of BuildHub.
              </p>

              <button className="mt-4 text-xs font-semibold text-blue-400 transition hover:text-blue-300">
                Complete Profile →
              </button>
            </section>

            {/* PLAN CARD */}

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="p-5">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Sparkles size={18} />
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold text-blue-400">
                    FREE
                  </span>
                </div>

                <p className="text-xs uppercase tracking-wider text-slate-600">
                  Current Plan
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Free Plan
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Get started with the essential tools for building your
                  website.
                </p>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:brightness-110">
                  <Sparkles size={16} />
                  Upgrade Plan
                </button>
              </div>
            </section>

            {/* SUPPORT */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Need Help?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Our support team is here to help you with your account.
                  </p>

                  <button className="mt-3 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300">
                    Contact Support →
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* =====================================================
            BOTTOM SAVE BAR
        ===================================================== */}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-white">
              Keep your profile up to date
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your information helps us personalize your BuildHub experience.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}

            {saved ? "Saved Successfully" : loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SECURITY ROW
========================================================= */

const SecurityRow = ({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button className="self-start rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white sm:self-auto">
        {action}
      </button>
    </div>
  );
};

/* =========================================================
   OVERVIEW ITEM
========================================================= */

const OverviewItem = ({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${
          success
            ? "text-emerald-400"
            : "text-slate-300"
        }`}
      >
        {success && (
          <span className="mr-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        )}

        {value}
      </span>
    </div>
  );
};

export default Profile;