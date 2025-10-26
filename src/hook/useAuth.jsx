/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, createContext, useCallback } from "react";
import useApi from "./useApi";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const api = useApi();

  // Login function
  const login = useCallback(
    async (email, password) => {
      try {
        const result = await api.post("/api/auth/login", { email, password });

        if (result.status === "success") {
          const {
            token,
            data: { user },
          } = result;

          // Store token in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          setUser(user);
          setIsAuthenticated(true);

          return { success: true, user };
        } else {
          return { success: false, message: result.message };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    [api]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [api]);

  // Get security question
  const getSecurityQuestion = useCallback(
    async (email) => {
      try {
        const result = await api.post("/api/auth/get-security-question", {
          email,
        });
        return result;
      } catch (error) {
        return { status: "fail", message: error.message };
      }
    },
    [api]
  );

  // Verify security question
  const verifySecurityQuestion = useCallback(
    async (email, answer) => {
      try {
        const result = await api.post("/api/auth/verify-security-answer", {
          email,
          answer,
        });
        return result;
      } catch (error) {
        return { status: "fail", message: error.message };
      }
    },
    [api]
  );

  // Reset password with security
  const resetPasswordWithSecurity = useCallback(
    async (token, newPassword, answer) => {
      try {
        const result = await api.post(
          "/api/auth/reset-password-with-security",
          {
            token,
            newPassword,
            answer,
          }
        );
        return result;
      } catch (error) {
        return { status: "fail", message: error.message };
      }
    },
    [api]
  );

  // Set security question
  const setSecurityQuestion = useCallback(
    async (question, answer, currentPassword = null) => {
      try {
        const result = await api.post("/api/auth/set-security-question", {
          question,
          answer,
          currentPassword,
        });

        const { token } = result;

        localStorage.setItem("token", token);

        return result;
      } catch (error) {
        return { status: "fail", message: error.message };
      }
    },
    [api]
  );

  // Update password
  const updatePassword = useCallback(
    async (currentPassword, newPassword) => {
      try {
        const result = await api.patch("/api/auth/updatePassword", {
          currentPassword,
          newPassword,
        });

        const { token } = result;

        localStorage.setItem("token", token);

        return result;
      } catch (error) {
        return { status: "fail", message: error.message };
      }
    },
    [api]
  );

  // Verify token
  const verifyToken = useCallback(
    async (token) => {
      try {
        const result = await api.post("/api/auth/verify-token", { token });
        return result;
      } catch (error) {
        return { status: "fail", message: error.message, isValid: false };
      }
    },
    [api]
  );

  // Get current user
  const getCurrentUser = useCallback(async () => {
    try {
      const result = await api.get("/api/auth/me");
      if (result.status === "success") {
        setUser(result.data.user);
        setIsAuthenticated(true);
        return result;
      }
    } catch (error) {
      console.error("Get current user error:", error);
    }
  }, [api]);

  // Check if user is authenticated on app start
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
        return false;
      }
    }
    return false;
  }, [logout]);

  const value = {
    user,
    isAuthenticated,
    login,

    logout,
    getSecurityQuestion,
    verifySecurityQuestion,
    resetPasswordWithSecurity,
    setSecurityQuestion,
    updatePassword,
    verifyToken,
    getCurrentUser,
    checkAuth,
    authLoading: api.loading,
    authError: api.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
