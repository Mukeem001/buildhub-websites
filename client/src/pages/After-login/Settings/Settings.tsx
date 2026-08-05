import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Bell,
  Check,
  ChevronRight,
  Globe2,
  Lock,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  UserRound,
  Zap,
} from "lucide-react";
import { getWebsiteSettings, updateWebsiteSettings } from "../../../services/website.service";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [websiteSettingsLoaded, setWebsiteSettingsLoaded] = useState(false);
  const [searchParams] = useSearchParams();

  const websiteId = searchParams.get("site") || undefined;

  useEffect(() => {
    const loadSettings = async () => {
      if (!websiteId) {
        return;
      }

      setLoading(true);
      try {
        const settings = await getWebsiteSettings(websiteId);
        setCompanyName(settings?.companyName || "");
        setBusinessEmail(settings?.email || "");
        setBusinessPhone(settings?.phone || "");
        setBusinessAddress(settings?.address || "");
        setWebsiteSettingsLoaded(true);
      } catch (error) {
        console.error("Unable to load website settings", error);
      } finally {
        setLoading(false);
      }
    };

    void loadSettings();
  }, [websiteId]);

  const handleSave = async () => {
    setLoading(true);

    try {
      if (websiteId) {
        await updateWebsiteSettings(websiteId, {
          companyName,
          email: businessEmail,
          phone: businessPhone,
          address: businessAddress,
        });
      }

      setSaved(true);
    } catch (error) {
      console.error("Unable to save website settings", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaved(false);
      }, 2500);
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] px-4 py-6 text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1400px]">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
                <SettingsIcon />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-400">
                  Preferences
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  Settings
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Manage your account preferences, notifications, security and
              workspace settings from one place.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
          >
            {saved ? <Check size={17} /> : <Save size={17} />}

            {saved ? "Changes Saved" : "Save Changes"}
          </button>
        </div>

        {/* ================= QUICK PROFILE ================= */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10">
          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold shadow-lg shadow-blue-500/20">
                U
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                  Your Account
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-white">
                  User Account
                </h2>

                <p className="truncate text-sm text-slate-500">
                  Manage your BuildHub account preferences
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <Sparkles size={17} className="text-blue-400" />

              <div>
                <p className="text-xs text-slate-500">
                  Current Plan
                </p>

                <p className="text-sm font-semibold text-blue-400">
                  Free Plan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SETTINGS GRID ================= */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* ================= LEFT ================= */}
          <div className="space-y-6">

            {/* ACCOUNT */}
            <SettingsSection
              icon={<UserRound size={19} />}
              title="Account Preferences"
              description="Manage your basic account information and preferences."
            >
              <SettingItem
                icon={<UserRound size={18} />}
                title="Profile Information"
                description="Update your name, profile image and personal details."
                action={
                  <button className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white">
                    Manage
                    <ChevronRight size={14} />
                  </button>
                }
              />

              <SettingItem
                icon={<Mail size={18} />}
                title="Email Address"
                description="user@example.com"
                action={
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <Check size={14} />
                    Verified
                  </span>
                }
              />

              <SettingItem
                icon={<Globe2 size={18} />}
                title="Language"
                description="Choose your preferred language."
                action={
                  <select className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500/50">
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                }
              />
            </SettingsSection>

            {/* NOTIFICATIONS */}
            <SettingsSection
              icon={<Bell size={19} />}
              title="Notifications"
              description="Choose what notifications you want to receive."
            >
              <ToggleItem
                icon={<Mail size={18} />}
                title="Email Notifications"
                description="Receive important account notifications by email."
                enabled={emailNotifications}
                onChange={() =>
                  setEmailNotifications(!emailNotifications)
                }
              />

              <ToggleItem
                icon={<Zap size={18} />}
                title="Project Updates"
                description="Get notified when your websites are updated."
                enabled={projectUpdates}
                onChange={() =>
                  setProjectUpdates(!projectUpdates)
                }
              />

              <ToggleItem
                icon={<Sparkles size={18} />}
                title="Product & Marketing"
                description="Receive tips, news and BuildHub updates."
                enabled={marketingEmails}
                onChange={() =>
                  setMarketingEmails(!marketingEmails)
                }
              />
            </SettingsSection>

            {/* APPEARANCE */}
            <SettingsSection
              icon={<Palette size={19} />}
              title="Appearance"
              description="Customize how BuildHub looks on your devices."
            >
              <div className="p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white">
                    Theme
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Select your preferred interface appearance.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <ThemeButton
                    active={darkMode}
                    icon={<Moon size={18} />}
                    title="Dark"
                    onClick={() => setDarkMode(true)}
                  />

                  <ThemeButton
                    active={!darkMode}
                    icon={<Sun size={18} />}
                    title="Light"
                    onClick={() => setDarkMode(false)}
                  />

                  <ThemeButton
                    active={false}
                    icon={<Monitor size={18} />}
                    title="System"
                    onClick={() => {}}
                  />

                </div>
              </div>

              <ToggleItem
                icon={<Zap size={18} />}
                title="Auto Save"
                description="Automatically save changes while editing websites."
                enabled={autoSave}
                onChange={() => setAutoSave(!autoSave)}
              />
            </SettingsSection>

            {/* SECURITY */}
            <SettingsSection
              icon={<ShieldCheck size={19} />}
              title="Security"
              description="Protect your account and manage login security."
            >
              <SettingItem
                icon={<Lock size={18} />}
                title="Password"
                description="Change your account password."
                action={
                  <button className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white">
                    Change
                    <ChevronRight size={14} />
                  </button>
                }
              />

              <SettingItem
                icon={<Smartphone size={18} />}
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account."
                action={
                  <button className="rounded-xl bg-blue-600/10 px-3 py-2 text-xs font-semibold text-blue-400 transition hover:bg-blue-600/20">
                    Enable
                  </button>
                }
              />
            </SettingsSection>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">

            {/* PLAN */}
            <div className="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-950">
              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Sparkles size={19} />
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-400">
                    CURRENT
                  </span>
                </div>

                <p className="text-sm text-slate-500">
                  Your Plan
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Free
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Perfect for getting started with your first website.
                </p>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
                  <Sparkles size={16} />
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* WORKSPACE */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Workspace
                    </h3>

                    <p className="text-xs text-slate-500">
                      Website management
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <WorkspaceStat
                  label="Websites"
                  value="3 / 3"
                />

                <WorkspaceStat
                  label="Storage"
                  value="1.2 GB"
                />

                <WorkspaceStat
                  label="Team Members"
                  value="1"
                />
              </div>
            </div>

            {/* PRIVACY */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Privacy
                  </h3>

                  <p className="text-xs text-slate-500">
                    Your data is protected
                  </p>
                </div>
              </div>

              <p className="text-xs leading-5 text-slate-500">
                BuildHub keeps your account information secure and only uses
                your data to provide and improve our services.
              </p>

              <button className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
                Privacy Policy
                <ChevronRight size={14} />
              </button>
            </div>

            {/* DANGER */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <Trash2 size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Danger Zone
                  </h3>

                  <p className="text-xs text-slate-500">
                    Irreversible account actions
                  </p>
                </div>
              </div>

              <p className="text-xs leading-5 text-slate-500">
                Deleting your account will permanently remove your websites,
                projects and account data.
              </p>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20">
                <Trash2 size={15} />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              All caught up
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your settings are automatically synchronized across your devices.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? "Saved" : "Save Preferences"}
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SETTINGS SECTION
========================================================= */

const SettingsSection = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/5">
      <div className="border-b border-slate-800 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            {icon}
          </div>

          <div>
            <h2 className="font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-800">
        {children}
      </div>
    </div>
  );
};

/* =========================================================
   SETTING ITEM
========================================================= */

const SettingItem = ({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-200">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {action}
      </div>
    </div>
  );
};

/* =========================================================
   TOGGLE ITEM
========================================================= */

const ToggleItem = ({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
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

      <button
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

/* =========================================================
   THEME BUTTON
========================================================= */

const ThemeButton = ({
  active,
  icon,
  title,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
        active
          ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
          : "border-slate-800 bg-slate-950/60 text-slate-500 hover:border-slate-700 hover:text-slate-300"
      }`}
    >
      {icon}

      {title}

      {active && (
        <span className="absolute right-2 top-2">
          <Check size={12} />
        </span>
      )}
    </button>
  );
};

/* =========================================================
   WORKSPACE STAT
========================================================= */

const WorkspaceStat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-3 last:border-0 last:pb-0 first:pt-0">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-300">
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   SETTINGS ICON
========================================================= */

const SettingsIcon = () => {
  return (
    <div className="relative">
      <div className="h-4 w-4 rounded-full border-2 border-white" />

      <div className="absolute -left-1.5 -top-1.5 h-1.5 w-1.5 rounded-full bg-white" />
      <div className="absolute -right-1.5 -top-1.5 h-1.5 w-1.5 rounded-full bg-white" />
      <div className="absolute -bottom-1.5 -left-1.5 h-1.5 w-1.5 rounded-full bg-white" />
      <div className="absolute -bottom-1.5 -right-1.5 h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
};

export default Settings;