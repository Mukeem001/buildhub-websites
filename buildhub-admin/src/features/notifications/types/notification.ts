export type NotificationType =
  | "System"
  | "Payment"
  | "Orders"
  | "Users"
  | "Security"
  | "Website"
  | "Marketing";

export type NotificationPriority =
  | "Low"
  | "Medium"
  | "High";

export type NotificationStatus =
  | "Unread"
  | "Read"
  | "Scheduled";

export interface Notification {
  id: number;

  title: string;

  message: string;

  recipient: string;

  type: NotificationType;

  priority: NotificationPriority;

  status: NotificationStatus;

  createdAt: string;
}

export interface NotificationStats {
  total: number;

  unread: number;

  read: number;

  scheduled: number;

  highPriority: number;

  sentToday: number;
}