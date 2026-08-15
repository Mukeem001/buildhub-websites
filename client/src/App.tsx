import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Without-login/Home/Home";

// Common Pages
import About from "./pages/Without-login/About/About";
import Contact from "./pages/Without-login/Contact/Contact";
import Pricing from "./pages/Without-login/Pricing/Pricing";
import Features from "./pages/Without-login/Features/Features";
import Templates from "./pages/Without-login/Templates/Templates";
import TemplatePreview from "./pages/Without-login/TemplatePreview/TemplatePreview";
import ForgotPassword from "./pages/Without-login/Auth/ForgotPassword/ForgotPassword";

// After-login Pages
import Dashboard from "./pages/After-login/Dashboard/Dashboard";
import Websites from "./pages/After-login/Websites/Websites";
import DashboardTemplates from "./pages/After-login/Templates/Templates";
import Analytics from "./pages/After-login/Analytics/Analytics";
import Billing from "./pages/After-login/Billing/Billing";
import Settings from "./pages/After-login/Settings/Settings";
import Support from "./pages/After-login/Support/Support";
import Profile from "./pages/After-login/Profile/Profile";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Domain from "./pages/After-login/Domain/Domain";
import WebsiteEditor from "./pages/After-login/Websites/WebsiteEditor";

const HomeRoute = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <Home />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Website ================= */}

        <Route path="/" element={<MainLayout />}>

          <Route index element={<HomeRoute />} />

          {/* Public pages */}
          <Route path="templates" element={<Templates />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="features" element={<Features />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* Authenticated pages */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="templates/:slug" element={<TemplatePreview />} />
          <Route
            path="DashboardTemplates"
            element={
              <ProtectedRoute>
                <DashboardTemplates />
              </ProtectedRoute>
            }
          />
          <Route
            path="websites"
            element={
              <ProtectedRoute>
                <Websites />
              </ProtectedRoute>
            }
          />
          <Route
            path="websites/:id/edit"
            element={
              <ProtectedRoute>
                <WebsiteEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
           <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
           <Route
            path="domain"
            element={
              <ProtectedRoute>
                <Domain />
              </ProtectedRoute>
            }
          />
           



        </Route>

      

      </Routes>
    </BrowserRouter>
  );
}

export default App;