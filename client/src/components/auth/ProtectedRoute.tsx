import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import LoginPromptModal from "./LoginPromptModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [user]);

  if (!user) {
    return (
      <LoginPromptModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          navigate("/", { replace: true });
        }}
        initialMode="login"
        redirectPath={location.pathname}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
