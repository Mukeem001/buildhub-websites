type AdminLogEntry = {
  id: string;
  type: "login" | "activity" | "error";
  message: string;
  timestamp: string;
  user?: string;
};

const buildLogResponse = (websiteId: string | undefined, logs: AdminLogEntry[]) => ({
  websiteId,
  logs,
});

export const getLoginLogs = async (websiteId?: string) =>
  buildLogResponse(websiteId, [
    {
      id: "login-1",
      type: "login",
      message: "Admin logged in",
      timestamp: new Date().toISOString(),
      user: "admin",
    },
  ]);

export const getActivityLogs = async (websiteId?: string) =>
  buildLogResponse(websiteId, [
    {
      id: "activity-1",
      type: "activity",
      message: "Product updated",
      timestamp: new Date().toISOString(),
      user: "admin",
    },
  ]);

export const getErrorsLogs = async (websiteId?: string) =>
  buildLogResponse(websiteId, []);

export const getLogs = async (websiteId?: string) =>
  buildLogResponse(websiteId, [
    {
      id: "login-1",
      type: "login",
      message: "Admin logged in",
      timestamp: new Date().toISOString(),
      user: "admin",
    },
    {
      id: "activity-1",
      type: "activity",
      message: "Product updated",
      timestamp: new Date().toISOString(),
      user: "admin",
    },
  ]);
