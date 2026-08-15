import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getCurrentUser, invalidateSession } from "../services/auth.service";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api.config";

const MainLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser?.token) return;

    const validateSession = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (response.status === 403) {
          const payload = await response.json().catch(() => null);
          invalidateSession(payload?.message || "Session suspended");
          navigate("/login");
        }
      } catch {
        // ignore network errors until next page load
      }
    };

    void validateSession();
  }, [navigate]);

  return (
    <>
      {user ? <Sidebar /> : <Navbar />}

      <div className={user ? "lg:ml-72" : ""}>
        <main className="app-main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;