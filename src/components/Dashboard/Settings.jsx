import React, { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth"; // Import useAuth hook

const Settings = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("security");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Security Question Form State
  const [securityForm, setSecurityForm] = useState({
    question: "",
    answer: "",
    currentPassword: "",
  });

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Use auth hook instead of direct api hook
  const {
    user: authUser,
    setSecurityQuestion,
    updatePassword,
    getCurrentUser,
    authLoading,
    authError,
  } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Auto-hide messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response?.status === "success") {
        setUser(response.data.user);
        // Pre-fill security question if exists
        if (response.data.user.securityQuestion?.question) {
          setSecurityForm((prev) => ({
            ...prev,
            question: response.data.user.securityQuestion.question,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSecurityFormChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetSecurityQuestion = async (e) => {
    e.preventDefault();

    if (
      !securityForm.question ||
      !securityForm.answer ||
      !securityForm.currentPassword
    ) {
      setErrorMessage("Please provide question, answer, and current password");
      return;
    }

    try {
      const response = await setSecurityQuestion(
        securityForm.question,
        securityForm.answer,
        securityForm.currentPassword
      );

      if (response.status === "success") {
        setSuccessMessage(
          user?.securityQuestion?.question
            ? "Security question updated successfully!"
            : "Security question set successfully!"
        );

        setSecurityForm({
          question: user?.securityQuestion?.question || "",
          answer: "",
          currentPassword: "",
        });
        fetchCurrentUser(); // Refresh user data
      } else {
        setErrorMessage(response.message || "Failed to set security question");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to set security question");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long");
      return;
    }

    try {
      const response = await updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      if (response.status === "success") {
        setSuccessMessage("Password updated successfully!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setErrorMessage(response.message || "Failed to update password");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to update password");
    }
  };

  const resetSecurityForm = () => {
    setSecurityForm({
      question: user?.securityQuestion?.question || "",
      answer: "",
      currentPassword: "",
    });
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const hasSecurityQuestion = user?.securityQuestion?.question;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Account Settings
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage your security preferences and password
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="flex items-center justify-between p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-700">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-500 transition-colors duration-200 hover:text-green-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-center justify-between p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 transition-colors duration-200 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Auth Error Alert */}
        {authError && (
          <div className="flex items-center justify-between p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700">Error: {authError}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Security Settings
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === "password"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  Change Password
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Security Question Section */}
            {activeTab === "security" && (
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Security Question
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {hasSecurityQuestion
                        ? "Update your security question for password recovery"
                        : "Set up a security question for password recovery"}
                    </p>
                    <div className="p-3 mt-3 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="text-sm text-blue-700">
                          <strong>Security Note:</strong> Current password is
                          always required to set or update your security
                          question. A new token will be issued for security.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hasSecurityQuestion ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-500">
                      {hasSecurityQuestion ? "Configured" : "Not Set"}
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={handleSetSecurityQuestion}
                  className="space-y-6"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Security Question *
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={securityForm.question}
                      onChange={handleSecurityFormChange}
                      placeholder="e.g., What was the name of your first pet?"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Answer *
                    </label>
                    <input
                      type="text"
                      name="answer"
                      value={securityForm.answer}
                      onChange={handleSecurityFormChange}
                      placeholder="Enter your answer"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This answer will be used to verify your identity for
                      password recovery
                    </p>
                  </div>

                  {/* Current Password - Always required */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={securityForm.currentPassword}
                      onChange={handleSecurityFormChange}
                      placeholder="Enter your current password"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Your current password is required to set or update
                      security question
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetSecurityForm}
                      className="px-6 py-2 font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="inline-flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {authLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Saving...
                        </>
                      ) : hasSecurityQuestion ? (
                        "Update Security Question"
                      ) : (
                        "Set Security Question"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Section */}
            {activeTab === "password" && (
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Change Password
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your account password for enhanced security
                  </p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordFormChange}
                      placeholder="Enter your current password"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      New Password *
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordFormChange}
                      placeholder="Enter your new password"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      minLength="6"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordFormChange}
                      placeholder="Confirm your new password"
                      className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetPasswordForm}
                      className="px-6 py-2 font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="inline-flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {authLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
