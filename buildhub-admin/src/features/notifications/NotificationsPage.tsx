import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import NotificationsHeader from "./components/NotificationsHeader";
import NotificationsStats from "./components/NotificationsStats";
import NotificationsTable from "./components/NotificationsTable";
import BulkActionsBar from "./components/BulkActionsBar";
import NotificationDrawer from "./components/NotificationDrawer";
import SendNotificationModal from "./components/SendNotificationModal";
import DeleteNotificationDialog from "./components/DeleteNotificationDialog";

import { notifications as initialNotifications } from "./data/notifications";
import { Notification } from "./types/notification";

import {
  exportNotificationsCSV,
  deleteSelectedNotifications,
  markSelectedAsRead,
  markSelectedAsUnread,
  sendNotification,
} from "@/utils/notificationActions";

const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.recipient.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "" || item.type === type;

      const matchesStatus =
        status === "" || item.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [notifications, search, type, status]);

  return (
    <div className="space-y-8">

      <NotificationsHeader
        search={search}
        type={type}
        status={status}
        onSearchChange={setSearch}
        onTypeChange={setType}
        onStatusChange={setStatus}
        onRefresh={() => window.location.reload()}
        onExport={() =>
          exportNotificationsCSV(filteredNotifications)
        }
        onSendNotification={() => setSendModalOpen(true)}
      />

      <NotificationsStats />

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onDelete={() => {
          setNotifications((prev) =>
            deleteSelectedNotifications(prev, selectedIds)
          );
          setSelectedIds([]);
        }}
        onMarkRead={() => {
          setNotifications((prev) =>
            markSelectedAsRead(prev, selectedIds)
          );
        }}
        onMarkUnread={() => {
          setNotifications((prev) =>
            markSelectedAsUnread(prev, selectedIds)
          );
        }}
        onExport={() =>
          exportNotificationsCSV(
            notifications.filter((n) =>
              selectedIds.includes(n.id)
            )
          )
        }
        onClear={() => setSelectedIds([])}
      />

      <NotificationsTable
        notifications={filteredNotifications}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onView={(notification) => {
          setSelectedNotification(notification);
          setDrawerOpen(true);
        }}
        onEdit={(notification) => {
          setSelectedNotification(notification);
          setSendModalOpen(true);
        }}
        onDelete={(notification) => {
          setSelectedNotification(notification);
          setDeleteOpen(true);
        }}
      />

      <NotificationDrawer
        open={drawerOpen}
        notification={selectedNotification}
        onClose={() => setDrawerOpen(false)}
        onEdit={(notification) => {
          setDrawerOpen(false);
          setSelectedNotification(notification);
          setSendModalOpen(true);
        }}
      />

      <SendNotificationModal
        open={sendModalOpen}
        onClose={() => {
          setSendModalOpen(false);
          setSelectedNotification(null);
        }}
        onSend={(data) => {
          setNotifications((prev) =>
            sendNotification(prev, data)
          );
        }}
      />

      <DeleteNotificationDialog
        open={deleteOpen}
        notification={selectedNotification}
        onClose={() => setDeleteOpen(false)}
        onConfirm={(notification) => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notification.id)
          );
          setDeleteOpen(false);
        }}
      />

    </div>
  );
};

export default NotificationsPage;