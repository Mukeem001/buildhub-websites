import { useState } from "react";

import GeneralSettings from "./components/GeneralSettings";
import BrandingSettings from "./components/BrandingSettings";
import AppearanceSettings from "./components/AppearanceSettings";
import EmailSettings from "./components/EmailSettings";
import PaymentSettings from "./components/PaymentSettings";
import StorageSettings from "./components/StorageSettings";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/NotificationSettings";
import LocalizationSettings from "./components/LocalizationSettings";
import BackupSettings from "./components/BackupSettings";
import APISettings from "./components/APISettings";
import AuditLogSettings from "./components/AuditLogSettings";
import SystemSettings from "./components/SystemSettings";
import AdvancedSettings from "./components/AdvancedSettings";
import { SettingsState } from "./types/settings";

import {
  Settings,
  Palette,
  Mail,
  CreditCard,
  Database,
  Shield,
  Bell,
  Globe,
  HardDrive,
  KeyRound,
  FileText,
  Server,
  SlidersHorizontal,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "email", label: "Email", icon: Mail },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "security", label: "Security", icon: Shield },
  { id: "notification", label: "Notifications", icon: Bell },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "backup", label: "Backup", icon: Database },
  { id: "api", label: "API", icon: KeyRound },
  { id: "audit", label: "Audit Logs", icon: FileText },
  { id: "system", label: "System", icon: Server },
  { id: "advanced", label: "Advanced", icon: SlidersHorizontal },
];

const initialSettings: SettingsState = {
  general: {
    platformName: "BuildHub",
    companyName: "BuildHub Labs",
    website: "https://buildhub.com",
    supportEmail: "support@buildhub.com",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    language: "English",
  },
  branding: {
    logo: "",
    favicon: "",
    loginBackground: "",
    dashboardLogo: "",
    primaryColor: "#06b6d4",
    secondaryColor: "#0f172a",
  },
  appearance: {
    darkMode: true,
    compactSidebar: false,
    glassEffect: true,
    roundedCorners: true,
    animations: true,
    fontFamily: "Inter",
  },
  email: {
    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUsername: "admin",
    smtpPassword: "",
    encryption: "TLS",
    senderName: "BuildHub",
    senderEmail: "noreply@buildhub.com",
  },
  payments: {
    stripe: { enabled: true, sandbox: true, publicKey: "", secretKey: "", webhookSecret: "" },
    razorpay: { enabled: false, sandbox: true, publicKey: "", secretKey: "", webhookSecret: "" },
    paypal: { enabled: false, sandbox: true, publicKey: "", secretKey: "", webhookSecret: "" },
    cashfree: { enabled: false, sandbox: true, publicKey: "", secretKey: "", webhookSecret: "" },
  },
  storage: {
    local: true,
    s3: { enabled: false, bucket: "", region: "", accessKey: "", secretKey: "" },
    cloudinary: { enabled: false, cloudName: "", apiKey: "", apiSecret: "" },
    firebase: { enabled: false, projectId: "", apiKey: "", storageBucket: "" },
  },
  security: {
    enable2FA: true,
    sessionTimeout: 30,
    loginAttempts: 5,
    passwordMinLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    ipWhitelist: [],
  },
  notifications: {
    email: true,
    push: true,
    slack: false,
    discord: false,
    telegram: false,
  },
  localization: {
    language: "English",
    timezone: "Asia/Kolkata",
    currency: "INR",
    country: "India",
    taxRate: 18,
    dateFormat: "DD/MM/YYYY",
    numberFormat: "1,234,567.89",
    rtl: false,
    multilanguage: true,
  },
  maintenance: {
    enabled: false,
    message: "Scheduled maintenance",
    allowAdmins: true,
  },
  backup: {
    automaticBackup: true,
    schedule: "Daily",
    destination: "Local Storage",
    retentionDays: 7,
    lastBackup: "Never",
  },
  api: {
    apiKey: "",
    jwtSecret: "",
    webhookUrl: "",
    rateLimit: 100,
    apiVersion: "v1",
    restApi: true,
    graphql: true,
    apiLogs: true,
  },
  advanced: {
    developerMode: false,
    debugMode: false,
    verboseLogging: false,
    betaFeatures: false,
  },
  audit: {
    enabled: true,
    userActivity: true,
    adminActivity: true,
    apiActivity: true,
    retention: "30 Days",
  },
  system: {
    maintenanceMode: false,
    cacheEnabled: true,
    systemName: "BuildHub",
    baseUrl: "https://app.buildhub.com",
    environment: "Production",
    version: "1.0.0",
  },
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  const updateSection = <K extends keyof SettingsState>(section: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [section]: value }));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "branding":
        return <BrandingSettings settings={settings.branding} onChange={(value) => updateSection("branding", value)} />;
      case "appearance":
        return <AppearanceSettings settings={settings.appearance} onChange={(value) => updateSection("appearance", value)} />;
      case "email":
        return <EmailSettings settings={settings.email} onChange={(value) => updateSection("email", value)} />;
      case "payment":
        return <PaymentSettings settings={settings.payments} onChange={(value) => updateSection("payments", value)} />;
      case "storage":
        return <StorageSettings settings={settings.storage} onChange={(value) => updateSection("storage", value)} />;
      case "security":
        return <SecuritySettings settings={settings.security} onChange={(value) => updateSection("security", value)} />;
      case "notification":
        return <NotificationSettings settings={settings.notifications} onChange={(value) => updateSection("notifications", value)} />;
      case "localization":
        return <LocalizationSettings settings={settings.localization} onChange={(value) => updateSection("localization", value)} />;
      case "backup":
        return <BackupSettings settings={settings.backup} onChange={(value) => updateSection("backup", value)} />;
      case "api":
        return <APISettings settings={settings.api} onChange={(value) => updateSection("api", value)} />;
      case "audit":
        return <AuditLogSettings settings={settings.audit} onChange={(value) => updateSection("audit", value)} />;
      case "system":
        return <SystemSettings settings={settings.system} onChange={(value) => updateSection("system", value)} />;
      case "advanced":
        return <AdvancedSettings settings={settings.advanced} onChange={(value) => updateSection("advanced", value)} />;
      case "general":
      default:
        return <GeneralSettings settings={settings.general} onChange={(value) => updateSection("general", value)} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-zinc-400">Manage every aspect of your BuildHub platform.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    activeTab === tab.id
                      ? "bg-cyan-500 text-black"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {renderActiveTab()}

          <div className="flex flex-wrap justify-end gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <button type="button" className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-semibold text-white transition hover:border-red-500 hover:text-red-400">
              Reset Changes
            </button>
            <button type="button" className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;