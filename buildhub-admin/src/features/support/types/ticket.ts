export type TicketStatus =
  | "Open"
  | "Pending"
  | "Resolved"
  | "Closed";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export type TicketCategory =
  | "Billing"
  | "Technical"
  | "Website"
  | "Domain"
  | "Account"
  | "Templates"
  | "Bug"
  | "Other";

export interface Ticket {
  id: number;

  subject: string;

  customer: string;

  email: string;

  category: TicketCategory;

  priority: TicketPriority;

  status: TicketStatus;

  assignedTo: string;

  createdAt: string;

  updatedAt: string;

  message: string;
}

export interface SupportStats {
  total: number;

  open: number;

  pending: number;

  resolved: number;

  closed: number;

  urgent: number;

  assigned: number;

  avgResponseTime: string;

  satisfaction: number;
}