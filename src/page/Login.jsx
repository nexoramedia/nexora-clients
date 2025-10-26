import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
  FaQuestionCircle,
  FaArrowLeft,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    answer: "",
    newPassword: "",
    confirmPassword: "",
    resetToken: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  const {
    login,
    getSecurityQuestion,
    verifySecurityQuestion,
    resetPasswordWithSecurity,
    authLoading,
    authError,
    isAuthenticated,
    user,
  } = useAuth();

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check for token in localStorage
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        sessionStorage.getItem("authToken");

      // Check if user data exists
      const userData =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (token || isAuthenticated || user) {
        setIsAlreadyLoggedIn(true);
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      console.log("Login successful:", result.user);
      // Redirect logic will be handled by the useEffect above
    } else {
      console.log("Login failed:", result.message);
    }
  };

  const handleGetSecurityQuestion = async (e) => {
    e.preventDefault();
    const result = await getSecurityQuestion(forgotPasswordData.email);
    if (result.status === "success") {
      setSecurityQuestion(result.data.securityQuestion);
      setForgotPasswordStep(2);
    }
  };

  const handleVerifySecurityQuestion = async (e) => {
    e.preventDefault();
    const result = await verifySecurityQuestion(
      forgotPasswordData.email,
      forgotPasswordData.answer
    );
    if (result.status === "success") {
      setForgotPasswordData((prev) => ({
        ...prev,
        resetToken: result.resetToken,
      }));
      setForgotPasswordStep(3);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const result = await resetPasswordWithSecurity(
      forgotPasswordData.resetToken,
      forgotPasswordData.newPassword,
      forgotPasswordData.answer
    );

    if (result.status === "success") {
      setForgotPasswordStep(4);
    }
  };

  const resetForgotPasswordFlow = () => {
    setForgotPasswordStep(0);
    setForgotPasswordData({
      email: "",
      answer: "",
      newPassword: "",
      confirmPassword: "",
      resetToken: "",
    });
    setSecurityQuestion("");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard"); // or "/home" depending on your routes
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");

    // Reset state
    setIsAlreadyLoggedIn(false);

    // You might want to call a logout function from your auth context
    // logout();
  };

  // Render message for already logged in users
  const renderAlreadyLoggedIn = () => (
    <div className="text-center">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 border bg-green-500/20 border-green-500/30 rounded-2xl backdrop-blur-sm">
        <FaCheckCircle className="w-10 h-10 text-green-400" />
      </div>

      {/* Success Badge */}
      <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 border shadow-lg rounded-2xl bg-gradient-to-r from-green-500/10 to-green-400/10 backdrop-blur-sm border-green-500/20 shadow-green-500/5">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold tracking-wider text-green-400">
          ALREADY LOGGED IN
        </span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main Message */}
      <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
        Welcome
        <span className="block mt-2 text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-400 bg-clip-text bg-size-200 animate-gradient">
          Back!
        </span>
      </h1>

      <p className="max-w-md mx-auto mb-8 text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
        You are already logged into your account. You can go to your dashboard
        or return to the home page.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoToDashboard}
          className="flex-1 flex items-center justify-center py-4 px-6 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          <FaHome className="w-5 h-5 mr-3" />
          Go to Dashboard
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoToHome}
          className="flex items-center justify-center flex-1 px-6 py-4 font-medium text-white transition-all duration-300 border border-white/20 rounded-2xl bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 backdrop-blur-sm hover:bg-white/10"
        >
          <FaHome className="w-5 h-5 mr-3" />
          Go to Home
        </motion.button>
      </div>

      {/* Logout Option */}
      <div className="pt-6 mt-8 border-t border-white/10">
        <p className="mb-4 text-sm text-gray-400">Not {user?.name || "you"}?</p>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-400 transition-colors hover:text-red-300"
        >
          Sign out and log in as different user
        </button>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <>
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
          <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
          <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
            ADMIN PORTAL
          </span>
          <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Welcome
          <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
            Back
          </span>
        </h1>

        <p className="max-w-sm mx-auto text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
          Sign in to access your admin dashboard
        </p>
      </div>

      {/* Error Message */}
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 text-sm text-red-400 border bg-red-400/10 border-red-400/20 rounded-2xl backdrop-blur-sm"
        >
          {authError}
        </motion.div>
      )}

      {/* Login Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="h-5 w-5 text-[#66B5FF]" />
            </div>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
              placeholder="Email address"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="h-5 w-5 text-[#66B5FF]" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#0084FF] focus:ring-[#0084FF] border-gray-600 rounded bg-gray-800"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-300"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              onClick={() => setForgotPasswordStep(1)}
              className="font-medium text-[#66B5FF] hover:text-[#0084FF] transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={authLoading}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          {authLoading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              Signing in...
            </div>
          ) : (
            <span className="flex items-center">
              Sign in
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </motion.button>
      </motion.form>
    </>
  );

  const renderForgotPasswordStep1 = () => (
    <>
      <div className="text-center">
        <button
          onClick={resetForgotPasswordFlow}
          className="inline-flex items-center mb-6 text-sm text-[#66B5FF] hover:text-[#0084FF] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to login
        </button>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
          <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
          <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
            RESET PASSWORD
          </span>
          <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Reset Your
          <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
            Password
          </span>
        </h1>

        <p className="max-w-sm mx-auto text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
          Enter your email to get started
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleGetSecurityQuestion}
        className="mt-8 space-y-6"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-[#66B5FF]" />
          </div>
          <input
            name="email"
            type="email"
            required
            value={forgotPasswordData.email}
            onChange={handleForgotPasswordChange}
            className="block w-full pl-10 pr-3 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
            placeholder="Enter your email"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={authLoading}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          {authLoading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              Checking...
            </div>
          ) : (
            <span className="flex items-center">
              Continue
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </motion.button>
      </motion.form>
    </>
  );

  const renderForgotPasswordStep2 = () => (
    <>
      <div className="text-center">
        <button
          onClick={() => setForgotPasswordStep(1)}
          className="inline-flex items-center mb-6 text-sm text-[#66B5FF] hover:text-[#0084FF] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
          <FaQuestionCircle className="text-[#0084FF]" />
          <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
            SECURITY QUESTION
          </span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Security Check
        </h1>

        <div className="p-4 mb-6 bg-gray-900/50 border border-[#0084FF]/20 rounded-2xl backdrop-blur-sm">
          <p className="text-lg font-medium text-[#66B5FF] mb-2">
            Your Security Question:
          </p>
          <p className="text-white">{securityQuestion}</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleVerifySecurityQuestion}
        className="mt-8 space-y-6"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock className="h-5 w-5 text-[#66B5FF]" />
          </div>
          <input
            name="answer"
            type="text"
            required
            value={forgotPasswordData.answer}
            onChange={handleForgotPasswordChange}
            className="block w-full pl-10 pr-3 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
            placeholder="Enter your answer"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={authLoading}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          {authLoading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              Verifying...
            </div>
          ) : (
            <span className="flex items-center">
              Verify Answer
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </motion.button>
      </motion.form>
    </>
  );

  const renderForgotPasswordStep3 = () => (
    <>
      <div className="text-center">
        <button
          onClick={() => setForgotPasswordStep(2)}
          className="inline-flex items-center mb-6 text-sm text-[#66B5FF] hover:text-[#0084FF] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
          <FaLock className="text-[#0084FF]" />
          <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
            NEW PASSWORD
          </span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Create New Password
        </h1>

        <p className="max-w-sm mx-auto text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
          Enter your new password below
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleResetPassword}
        className="mt-8 space-y-6"
      >
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="h-5 w-5 text-[#66B5FF]" />
            </div>
            <input
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              value={forgotPasswordData.newPassword}
              onChange={handleForgotPasswordChange}
              className="block w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
              placeholder="New password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="h-5 w-5 text-[#66B5FF]" />
            </div>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={forgotPasswordData.confirmPassword}
              onChange={handleForgotPasswordChange}
              className="block w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-[#66B5FF] transition-colors" />
              )}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={authLoading}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          {authLoading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              Resetting...
            </div>
          ) : (
            <span className="flex items-center">
              Reset Password
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </motion.button>
      </motion.form>
    </>
  );

  const renderForgotPasswordStep4 = () => (
    <>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 border bg-green-500/20 border-green-500/30 rounded-2xl backdrop-blur-sm">
          <FaCheckCircle className="w-8 h-8 text-green-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 border shadow-lg rounded-2xl bg-gradient-to-r from-green-500/10 to-green-400/10 backdrop-blur-sm border-green-500/20 shadow-green-500/5">
          <span className="text-sm font-semibold tracking-wider text-green-400">
            SUCCESS
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Password Reset
          <span className="block mt-2 text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-400 bg-clip-text bg-size-200 animate-gradient">
            Successful!
          </span>
        </h1>

        <p className="max-w-sm mx-auto mb-8 text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
          Your password has been reset successfully. You can now log in with
          your new password.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetForgotPasswordFlow}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#66B5FF] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF] transition-all duration-300 shadow-lg shadow-[#0084FF]/20"
        >
          <span className="flex items-center">
            Back to Login
            <svg
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-black sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#66B5FF] rounded-full opacity-40 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-8"
      >
        <AnimatePresence mode="wait">
          {isAlreadyLoggedIn ? (
            <motion.div
              key="already-logged-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderAlreadyLoggedIn()}
            </motion.div>
          ) : (
            <>
              {forgotPasswordStep === 0 && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderLoginForm()}
                </motion.div>
              )}

              {forgotPasswordStep === 1 && (
                <motion.div
                  key="forgot-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderForgotPasswordStep1()}
                </motion.div>
              )}

              {forgotPasswordStep === 2 && (
                <motion.div
                  key="forgot-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderForgotPasswordStep2()}
                </motion.div>
              )}

              {forgotPasswordStep === 3 && (
                <motion.div
                  key="forgot-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderForgotPasswordStep3()}
                </motion.div>
              )}

              {forgotPasswordStep === 4 && (
                <motion.div
                  key="forgot-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderForgotPasswordStep4()}
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Additional Links - Only show on login screen */}
        {!isAlreadyLoggedIn && forgotPasswordStep === 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Need help?{" "}
              <a
                href="#"
                className="font-medium text-[#66B5FF] hover:text-[#0084FF] transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        )}
      </motion.div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default Login;
