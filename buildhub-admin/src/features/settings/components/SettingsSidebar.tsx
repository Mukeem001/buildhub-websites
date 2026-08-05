import {
  Settings,
  Palette,
  Monitor,
  Mail,
  CreditCard,
  HardDrive,
  Shield,
  Bell,
  Globe,
  Wrench,
  Database,
  KeyRound,
  ClipboardList,
} from "lucide-react";

export type SettingsSection =
  | "general"
  | "branding"
  | "appearance"
  | "email"
  | "payments"
  | "storage"
  | "security"
  | "notifications"
  | "localization"
  | "maintenance"
  | "backup"
  | "apikeys"
  | "audit";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const menuItems = [
  {
    id: "general",
    label: "General",
    icon: Settings,
  },
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Monitor,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "storage",
    label: "Storage",
    icon: HardDrive,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "localization",
    label: "Localization",
    icon: Globe,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: Wrench,
  },
  {
    id: "backup",
    label: "Backup & Restore",
    icon: Database,
  },
  {
    id: "apikeys",
    label: "API Keys",
    icon: KeyRound,
  },
  {
    id: "audit",
    label: "Audit Logs",
    icon: ClipboardList,
  },
] as const;

const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) => {
  return (
    <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">

      {/* Desktop */}

      <div className="hidden lg:flex lg:flex-col lg:gap-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() =>
                onSectionChange(item.id as SettingsSection)
              }
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? "bg-cyan-500 text-black shadow-lg"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile */}

      <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() =>
                onSectionChange(item.id as SettingsSection)
              }
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800 text-zinc-300"
              }`}
            >
              <Icon size={18} />

              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

    </aside>
  );
};

export default SettingsSidebar;