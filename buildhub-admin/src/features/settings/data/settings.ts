import { SettingsState } from "../types/settings";

export const settingsData: SettingsState = {
  general: {
    platformName: "BuildHub",
    companyName: "BuildHub Technologies",
    website: "https://buildhub.ai",
    supportEmail: "support@buildhub.ai",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    language: "English",
  },

  branding: {
    logo: "/branding/logo.svg",
    favicon: "/branding/favicon.ico",
    loginBackground: "/branding/login-bg.jpg",
    dashboardLogo: "/branding/dashboard-logo.svg",
    primaryColor: "#06b6d4",
    secondaryColor: "#6366f1",
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
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "admin@buildhub.ai",
    smtpPassword: "********",
    encryption: "TLS",
    senderName: "BuildHub",
    senderEmail: "no-reply@buildhub.ai",
  },

  payments: {
    stripe: {
      enabled: true,
      sandbox: true,
      publicKey: "",
      secretKey: "",
      webhookSecret: "",
    },

    razorpay: {
      enabled: false,
      sandbox: true,
      publicKey: "",
      secretKey: "",
      webhookSecret: "",
    },

    paypal: {
      enabled: false,
      sandbox: true,
      publicKey: "",
      secretKey: "",
      webhookSecret: "",
    },

    cashfree: {
      enabled: false,
      sandbox: true,
      publicKey: "",
      secretKey: "",
      webhookSecret: "",
    },
  },

  storage: {
    local: true,

    s3: {
      enabled: false,
      bucket: "",
      region: "",
      accessKey: "",
      secretKey: "",
    },

    cloudinary: {
      enabled: false,
      cloudName: "",
      apiKey: "",
      apiSecret: "",
    },

    firebase: {
      enabled: false,
      projectId: "",
      apiKey: "",
      storageBucket: "",
    },
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
    message:
      "The platform is currently under scheduled maintenance. Please check back soon.",
    allowAdmins: true,
  },

  backup: {
    automaticBackup: true,
    schedule: "Daily",
    destination: "Local Storage",
    retentionDays: 7,
    lastBackup: "2026-07-10 02:30 AM",
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

  system: {
    maintenanceMode: false,
    cacheEnabled: true,
    systemName: "BuildHub",
    baseUrl: "https://app.buildhub.com",
    environment: "Production",
    version: "1.0.0",
  },

  audit: {
    enabled: true,
    userActivity: true,
    adminActivity: true,
    apiActivity: true,
    retention: "30 Days",
  },
};

export default settingsData;