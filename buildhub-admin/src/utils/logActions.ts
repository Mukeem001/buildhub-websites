import { Log } from "@/features/logs/types/log";

/* ===========================
   Export CSV
=========================== */

export const exportLogsCSV = (logs: Log[]) => {
  const headers = [
    "ID",
    "Title",
    "Category",
    "Level",
    "Source",
    "User",
    "IP Address",
    "Endpoint",
    "Status Code",
    "Created At",
  ];

  const rows = logs.map((log) => [
    log.id,
    log.title,
    log.category,
    log.level,
    log.source,
    log.user,
    log.ipAddress,
    log.endpoint,
    log.statusCode,
    log.createdAt,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `logs-${Date.now()}.csv`;

  link.click();

  URL.revokeObjectURL(url);
};

/* ===========================
   Export JSON
=========================== */

export const exportLogsJSON = (logs: Log[]) => {
  const blob = new Blob(
    [JSON.stringify(logs, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `logs-${Date.now()}.json`;

  link.click();

  URL.revokeObjectURL(url);
};

/* ===========================
   Delete Single Log
=========================== */

export const deleteLog = (
  logs: Log[],
  id: number
): Log[] => {
  return logs.filter(
    (log) => log.id !== id
  );
};

/* ===========================
   Delete Selected Logs
=========================== */

export const deleteSelectedLogs = (
  logs: Log[],
  ids: number[]
): Log[] => {
  return logs.filter(
    (log) => !ids.includes(log.id)
  );
};

/* ===========================
   Clear All Logs
=========================== */

export const clearLogs = (): Log[] => {
  return [];
};

/* ===========================
   Search Logs
=========================== */

export const searchLogs = (
  logs: Log[],
  keyword: string
): Log[] => {

  if (!keyword.trim()) return logs;

  const value = keyword.toLowerCase();

  return logs.filter(
    (log) =>
      log.title.toLowerCase().includes(value) ||
      log.description.toLowerCase().includes(value) ||
      log.user.toLowerCase().includes(value) ||
      log.source.toLowerCase().includes(value) ||
      log.endpoint.toLowerCase().includes(value)
  );
};

/* ===========================
   Filter Logs
=========================== */

interface FilterOptions {
  category?: string;
  level?: string;
  user?: string;
  date?: string;
}

export const filterLogs = (
  logs: Log[],
  filters: FilterOptions
): Log[] => {
  return logs.filter((log) => {

    const categoryMatch =
      !filters.category ||
      log.category === filters.category;

    const levelMatch =
      !filters.level ||
      log.level === filters.level;

    const userMatch =
      !filters.user ||
      log.user
        .toLowerCase()
        .includes(filters.user.toLowerCase());

    const dateMatch =
      !filters.date ||
      log.createdAt.startsWith(filters.date);

    return (
      categoryMatch &&
      levelMatch &&
      userMatch &&
      dateMatch
    );
  });
};

/* ===========================
   Auto Refresh
=========================== */

export const startAutoRefresh = (
  callback: () => void,
  seconds: number
) => {
  return window.setInterval(
    callback,
    seconds * 1000
  );
};

export const stopAutoRefresh = (
  intervalId: number
) => {
  clearInterval(intervalId);
};