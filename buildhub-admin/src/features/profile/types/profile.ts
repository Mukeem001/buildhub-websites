export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  designation: string;
  company: string;
  bio: string;
  website: string;
  location: string;
  timezone: string;
  language: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordSettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TwoFactorSettings {
  enabled: boolean;
  method: "Authenticator" | "SMS" | "Email";
  backupCodes: string[];
}

export interface Session {
  id: string;
  browser: string;
  device: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  securityAlerts: boolean;
  productUpdates: boolean;
}

export interface PreferenceSettings {
  theme: "Dark" | "Light" | "System";
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12 Hour" | "24 Hour";
  compactMode: boolean;
}

export interface SocialAccount {
  id: string;
  provider: string;
  username: string;
  connected: boolean;
}

export interface Activity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  status: "Success" | "Warning" | "Failed";
}

export interface ProfileStats {
  loginCount: number;
  projectsCreated: number;
  websitesPublished: number;
  apiKeys: number;
  storageUsed: number;
  accountAge: number;
  completion: number;
}

export interface ProfileState {
  profile: Profile;
  password: PasswordSettings;
  twoFactor: TwoFactorSettings;
  notifications: NotificationSettings;
  preferences: PreferenceSettings;
  sessions: Session[];
  socialAccounts: SocialAccount[];
  activities: Activity[];
  stats: ProfileStats;
}