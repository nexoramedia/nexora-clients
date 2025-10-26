import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children, redirectTo = "/*", showLoading = true }) => {
  const { isAuthenticated, checkAuth, authLoading, getCurrentUser } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      // Prevent multiple checks
      if (hasChecked) return;

      const hasLocalAuth = checkAuth();

      if (!hasLocalAuth) {
        setIsChecking(false);
        setHasChecked(true);
        return;
      }

      try {
        await getCurrentUser();
      } catch (error) {
        console.error("Authentication verification failed:", error);
      } finally {
        setIsChecking(false);
        setHasChecked(true);
      }
    };

    verifyAuthentication();
  }, [checkAuth, getCurrentUser, hasChecked]);

  // Show loading indicator
  if ((authLoading || isChecking) && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated && hasChecked) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PrivateRoute;
