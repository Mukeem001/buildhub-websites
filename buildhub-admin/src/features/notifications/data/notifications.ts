import {
  Notification,
  NotificationStats,
} from "../types/notification";

export const notificationStats: NotificationStats = {
  total: 328,
  unread: 52,
  read: 231,
  scheduled: 17,
  highPriority: 28,
  sentToday: 43,
};

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Payment Received",
    message: "A premium subscription payment has been received successfully.",
    recipient: "John Doe",
    type: "Payment",
    priority: "High",
    status: "Unread",
    createdAt: "2026-07-08",
  },
  {
    id: 2,
    title: "New Website Published",
    message: "A new website has been published successfully.",
    recipient: "Sarah Lee",
    type: "Website",
    priority: "Medium",
    status: "Read",
    createdAt: "2026-07-08",
  },
  {
    id: 3,
    title: "Security Alert",
    message: "Multiple failed login attempts detected.",
    recipient: "Admin",
    type: "Security",
    priority: "High",
    status: "Unread",
    createdAt: "2026-07-07",
  },
  {
    id: 4,
    title: "Marketing Campaign",
    message: "Weekly newsletter has been scheduled.",
    recipient: "All Users",
    type: "Marketing",
    priority: "Low",
    status: "Scheduled",
    createdAt: "2026-07-06",
  },
];