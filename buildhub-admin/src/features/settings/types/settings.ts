export interface GeneralSettings {
  platformName: string;
  companyName: string;
  website: string;
  supportEmail: string;
  timezone: string;
  dateFormat: string;
  language: string;
}

export interface BrandingSettings {
  logo: string;
  favicon: string;
  loginBackground: string;
  dashboardLogo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface AppearanceSettings {
  darkMode: boolean;
  compactSidebar: boolean;
  glassEffect: boolean;
  roundedCorners: boolean;
  animations: boolean;
  fontFamily: string;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  encryption: "None" | "SSL" | "TLS";
  senderName: string;
  senderEmail: string;
}

export interface PaymentProvider {
  enabled: boolean;
  sandbox: boolean;
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
}

export interface PaymentSettings {
  stripe: PaymentProvider;
  razorpay: PaymentProvider;
  paypal: PaymentProvider;
  cashfree: PaymentProvider;
}

export interface StorageProvider {
  enabled: boolean;
  bucket: string;
  region: string;
  accessKey: string;
  secretKey: string;
}

export interface StorageSettings {
  local: boolean;
  s3: StorageProvider;
  cloudinary: {
    enabled: boolean;
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  firebase: {
    enabled: boolean;
    projectId: string;
    apiKey: string;
    storageBucket: string;
  };
}

export interface SecuritySettings {
  enable2FA: boolean;
  sessionTimeout: number;
  loginAttempts: number;
  passwordMinLength: number;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  ipWhitelist: string[];
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  slack: boolean;
  discord: boolean;
  telegram: boolean;
}

export interface LocalizationSettings {
  language: string;
  timezone: string;
  currency: string;
  country: string;
  taxRate: number;
  dateFormat: string;
  numberFormat: string;
  rtl: boolean;
  multilanguage: boolean;
}

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
  allowAdmins: boolean;
}

export interface BackupSettings {
  automaticBackup: boolean;
  schedule: "Daily" | "Weekly" | "Monthly";
  destination: string;
  retentionDays: number;
  lastBackup: string;
}

export interface APISettings {
  apiKey: string;
  jwtSecret: string;
  webhookUrl: string;
  rateLimit: number;
  apiVersion: string;
  restApi: boolean;
  graphql: boolean;
  apiLogs: boolean;
}

export interface AdvancedSettings {
  developerMode: boolean;
  debugMode: boolean;
  verboseLogging: boolean;
  betaFeatures: boolean;
}

export interface AuditLogSettings {
  enabled: boolean;
  userActivity: boolean;
  adminActivity: boolean;
  apiActivity: boolean;
  retention: "30 Days" | "90 Days" | "180 Days" | "365 Days";
}

export interface SystemSettings {
  maintenanceMode: boolean;
  cacheEnabled: boolean;
  systemName: string;
  baseUrl: string;
  environment: "Development" | "Staging" | "Production";
  version: string;
}

export interface ApiKeysSettings {
  openai: string;
  gemini: string;
  claude: string;
  resend: string;
  stripe: string;
  cloudinary: string;
}

export interface SettingsState {
  general: GeneralSettings;
  branding: BrandingSettings;
  appearance: AppearanceSettings;
  email: EmailSettings;
  payments: PaymentSettings;
  storage: StorageSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  localization: LocalizationSettings;
  maintenance: MaintenanceSettings;
  backup: BackupSettings;
  api: APISettings;
  advanced: AdvancedSettings;
  audit: AuditLogSettings;
  system: SystemSettings;
  apiKeys?: ApiKeysSettings;
}