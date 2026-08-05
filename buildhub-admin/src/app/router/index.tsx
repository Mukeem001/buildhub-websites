import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import UsersPage from "@/features/users/UsersPage";
import WebsitesPage from "@/features/websites/WebsitesPage";
import TemplatesPage from "@/features/templates/TemplatesPage";
import OrdersPage from "@/features/orders/OrdersPage";
import PaymentsPage from "@/features/payments/PaymentsPage";
import DomainsPage from "@/features/domains/DomainsPage";
import MediaPage from "@/features/media/MediaPage";
import AIPage from "@/features/ai/AIPage";
import AnalyticsPage from "@/features/analytics/AnalyticsPage";
import NotificationsPage from "@/features/notifications/NotificationsPage";
import CMSPage from "@/features/cms/CMSPage";
import SupportPage from "@/features/support/SupportPage";
import LogsPage from "@/features/logs/LogsPage";
import RolesPage from "@/features/roles/RolesPage";
import SettingsPage from "@/features/settings/SettingsPage";
import ProfilePage from "@/features/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "websites", element: <WebsitesPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "domains", element: <DomainsPage /> },
      { path: "media", element: <MediaPage /> },
      { path: "ai", element: <AIPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "cms", element: <CMSPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "logs", element: <LogsPage /> },
      { path: "roles", element: <RolesPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);