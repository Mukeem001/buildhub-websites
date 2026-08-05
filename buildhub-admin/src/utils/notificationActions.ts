import { Notification } from "@/features/notifications/types/notification";

export const exportNotificationsCSV = (
  notifications: Notification[]
) => {
  if (!notifications.length) return;

  const headers = [
    "ID",
    "Title",
    "Recipient",
    "Type",
    "Priority",
    "Status",
    "Created At",
  ];

  const rows = notifications.map((n) => [
    n.id,
    n.title,
    n.recipient,
    n.type,
    n.priority,
    n.status,
    n.createdAt,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `notifications-${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const deleteSelectedNotifications = (
  notifications: Notification[],
  ids: number[]
) => notifications.filter((n) => !ids.includes(n.id));

export const markSelectedAsRead = (
  notifications: Notification[],
  ids: number[]
): Notification[] =>
  notifications.map((n) =>
    ids.includes(n.id)
      ? { ...n, status: "Read" as Notification["status"] }
      : n
  );

export const markSelectedAsUnread = (
  notifications: Notification[],
  ids: number[]
): Notification[] =>
  notifications.map((n) =>
    ids.includes(n.id)
      ? { ...n, status: "Unread" as Notification["status"] }
      : n
  );

export const sendNotification = (
  notifications: Notification[],
  data: {
    title: string;
    message: string;
    recipient: string;
    type: string;
    priority: string;
    schedule: string;
  }
): Notification[] => {
  return [
    {
      id: Date.now(),
      title: data.title,
      message: data.message,
      recipient: data.recipient,
      type: data.type as Notification["type"],
      priority: data.priority as Notification["priority"],
      status: data.schedule ? "Scheduled" : "Unread",
      createdAt: new Date().toISOString().split("T")[0],
    },
    ...notifications,
  ];
};