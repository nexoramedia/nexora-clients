import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaArrowUp,
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { HiSparkles, HiMail } from "react-icons/hi";
import logo from "../../assets/main-log.png";
import { useAuth } from "../../hook/useAuth";
import { FaMeta, FaX } from "react-icons/fa6";

// ===== Back to Top Button =====
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-xl text-white shadow-2xl backdrop-blur-sm border border-[#0084FF]/30"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-4 h-4" />
    </motion.button>
  );
};

// ===== Simplified Cosmic Footer =====
export default function CosmicFooter() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, user, logout } = useAuth();

  const socials = [
    {
      icon: FaX,
      href: "https://x.com/ShahorinH4802",
      color: "#1DA1F2",
      label: "Twitter",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/nexora-pro-123ba7353/",
      color: "#0077B5",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/shahorinhasan",
      color: "#E4405F",
      label: "Instagram",
    },
    // { icon: FaMeta, href: "#", color: "#1877F2", label: "FaceBook" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#showreel" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll to any section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const navbarHeight = 64; // Height of your navbar

      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  // Handle quick link click
  const handleQuickLinkClick = (href) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  // Handle admin login
  const handleAdminLogin = () => {
    // Navigate to login page - adjust based on your routing
    window.location.href = "/login";
  };

  // Handle dashboard navigation
  const handleDashboard = () => {
    // Navigate to dashboard - adjust based on your routing
    window.location.href = "/dashboard";
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0084FF]/50 to-transparent" />

        {/* Floating Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0084FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 py-12 mx-auto">
        {/* Main Content */}
        <div className="grid gap-8 mb-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Logo" className="h-20 w-34" />
            </motion.div>

            <p className="text-sm text-gray-400">
              Next-generation video editing and creative solutions for the
              digital universe.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 transition-all duration-300 rounded-lg bg-gray-800/50 hover:bg-gray-700/50"
                >
                  <social.icon
                    className="w-4 h-4"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="flex items-center gap-2 font-semibold text-white">
              <HiSparkles className="w-4 h-4 text-[#0084FF]" />
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-gray-400 hover:text-[#0084FF] text-sm transition-colors duration-300 text-left"
                  whileHover={{ x: 5 }}
                  onClick={() => handleQuickLinkClick(link.href)}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Admin Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="flex items-center gap-2 font-semibold text-white">
              <FaUserShield className="w-4 h-4 text-[#0084FF]" />
              {isAuthenticated ? "Admin Panel" : "Admin Access"}
            </h4>

            {isAuthenticated ? (
              // Logged In State
              <div className="space-y-3">
                {/* User Info */}
                <div className="p-3 border rounded-lg bg-gray-800/30 border-gray-700/50">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || user?.email || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email || "Welcome back!"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={handleDashboard}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-lg hover:shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTachometerAlt className="w-4 h-4" />
                    Dashboard
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              </div>
            ) : (
              // Logged Out State
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Access the admin dashboard to manage your content and
                  settings.
                </p>
                <motion.button
                  onClick={handleAdminLogin}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserShield className="w-4 h-4" />
                  Admin Login
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800/50">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <div className="flex items-center gap-4">
              <span>© {currentYear} All rights reserved</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />

      {/* Floating Accents */}
      <motion.div
        className="absolute bottom-1/4 left-10 w-2 h-2 bg-[#0084FF]/40 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-1 h-1 bg-[#0066CC]/30 rounded-full blur-sm"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </footer>
  );
}
