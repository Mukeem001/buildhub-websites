export type WebsiteStatus =
  | "Published"
  | "Draft"
  | "Maintenance";

export type WebsitePlan =
  | "Free"
  | "Pro"
  | "Business"
  | "Enterprise";

export interface Website {
  id: string | number;
  name: string;
  domain: string;
  owner: string;
  template: string;
  status: WebsiteStatus;
  plan: WebsitePlan;
  visitors: number;
  storage: string;
  createdAt: string;
}