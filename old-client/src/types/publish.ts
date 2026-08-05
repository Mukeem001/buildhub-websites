export type PublishStep =
  | "details"
  | "publishing"
  | "success";

export type DomainType =
  | "subdomain"
  | "custom";

export interface PublishFormData {
  websiteName: string;
  subdomain: string;
  customDomain: string;

  domainType: DomainType;
  websiteId?: string;
  dnsHost?: string;
  dnsTarget?: string;
  customDomainVerified?: boolean;
  verificationReason?: string;

  createAdminPanel: boolean;
  enableSSL: boolean;
  enableSEO: boolean;
  enableAnalytics: boolean;
  enableBlog: boolean;

  templateId: number | string;
  templateName: string;
}

export interface PublishProgressItem {
  id: number;

  title: string;

  completed: boolean;

  loading: boolean;

  error?: boolean;
}

export interface PublishResult {
  success: boolean;

  websiteUrl: string;

  adminUrl: string;

  message: string;
}

export interface PublishWebsiteModalProps {
  isOpen: boolean;

  onClose: () => void;

  templateId: number | string;

  templateName: string;

  onPublish?: (
    data: PublishFormData
  ) => Promise<void> | void;
}