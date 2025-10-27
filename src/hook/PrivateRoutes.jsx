import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children, redirectTo = "/", showLoading = true }) => {
  const { isAuthenticated, checkAuth, authLoading, getCurrentUser, logout } =
    useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      // Prevent multiple verifications
      if (hasVerified) {
        return;
      }

      // If already authenticated, no need to check again
      if (isAuthenticated) {
        setIsChecking(false);
        setHasVerified(true);
        return;
      }

      const hasLocalAuth = checkAuth();

      if (!hasLocalAuth) {
        setIsChecking(false);
        setHasVerified(true);
        return;
      }

      try {
        // Only call getCurrentUser if we have local auth but not global auth state
        await getCurrentUser();
      } catch (error) {
        console.error("Authentication verification failed:", error);
        // Logout user if verification fails
        logout();
      } finally {
        setIsChecking(false);
        setHasVerified(true);
      }
    };

    verifyAuthentication();
  }, [isAuthenticated, checkAuth, getCurrentUser, logout, hasVerified]);

  // Show loading indicator
  if ((authLoading || isChecking) && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  // Redirect to home page if not authenticated after checking
  if (!isAuthenticated && !isChecking && hasVerified) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PrivateRoute;
