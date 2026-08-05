import {
  Ticket,
  SupportStats,
} from "../types/ticket";

export const supportStats: SupportStats = {
  total: 482,
  open: 67,
  pending: 41,
  resolved: 329,
  closed: 45,
  urgent: 12,
  assigned: 58,
  avgResponseTime: "18 min",
  satisfaction: 96,
};

export const tickets: Ticket[] = [
  {
    id: 1001,
    subject: "Unable to connect custom domain",
    customer: "John Smith",
    email: "john@example.com",
    category: "Domain",
    priority: "High",
    status: "Open",
    assignedTo: "Sarah",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
    message:
      "My custom domain is not connecting after updating DNS records.",
  },
  {
    id: 1002,
    subject: "Billing invoice missing",
    customer: "Emily Johnson",
    email: "emily@example.com",
    category: "Billing",
    priority: "Medium",
    status: "Pending",
    assignedTo: "David",
    createdAt: "2026-07-09",
    updatedAt: "2026-07-10",
    message:
      "I can't find last month's invoice in my dashboard.",
  },
  {
    id: 1003,
    subject: "Website editor not loading",
    customer: "Michael Brown",
    email: "michael@example.com",
    category: "Technical",
    priority: "Urgent",
    status: "Open",
    assignedTo: "Alex",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
    message:
      "The website editor remains stuck on the loading screen.",
  },
  {
    id: 1004,
    subject: "Need refund",
    customer: "Sophia Wilson",
    email: "sophia@example.com",
    category: "Billing",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Sarah",
    createdAt: "2026-07-08",
    updatedAt: "2026-07-09",
    message:
      "I accidentally purchased the wrong plan.",
  },
];