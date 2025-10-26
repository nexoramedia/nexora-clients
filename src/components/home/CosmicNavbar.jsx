import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserAstronaut,
  FaVideo,
  FaMagic,
  FaStar,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { HiSparkles, HiCursorClick } from "react-icons/hi";

import logo from "../../assets/main-log.png";
import { useAuth } from "../../hook/useAuth";

// ===== Floating Particles for Navbar =====
const NavbarParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#0084FF]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

// ===== Profile Dropdown Component =====
const ProfileDropdown = ({ isOpen, onClose, user, onLogout, onDashboard }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-[#0084FF]/30 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700/50">
            <p className="text-sm font-medium text-white truncate">
              {user?.name || user?.email || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || "Welcome!"}
            </p>
          </div>

          {/* Dropdown Items */}
          <div className="p-1">
            <motion.button
              onClick={onDashboard}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-[#0084FF]/20 hover:text-white transition-all duration-200 group"
              whileHover={{ x: 4 }}
            >
              <FaTachometerAlt className="w-4 h-4 text-[#0084FF] group-hover:text-[#66B5FF]" />
              <span>Dashboard</span>
            </motion.button>

            <motion.button
              onClick={onLogout}
              className="flex items-center w-full gap-3 px-3 py-2 text-sm text-gray-300 transition-all duration-200 rounded-lg hover:bg-red-500/20 hover:text-white group"
              whileHover={{ x: 4 }}
            >
              <FaSignOutAlt className="w-4 h-4 text-red-400 group-hover:text-red-300" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===== Mobile Menu Component =====
const MobileMenu = ({
  isOpen,
  onClose,
  navigation,
  scrollToSection,
  user,
  onLogout,
  onDashboard,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black border-l border-[#0084FF]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-10 h-10" />
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 transition-colors rounded-lg bg-gray-800/50 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* User Info in Mobile Menu */}
            {user && (
              <div className="px-6 py-4 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="w-8 h-8 text-[#0084FF]" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-400">Welcome back!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-gray-800/30 text-white hover:bg-[#0084FF]/30 transition-all duration-300 group"
                  onClick={() => {
                    scrollToSection(item.href.replace("#", ""));
                    onClose();
                  }}
                >
                  <item.icon className="w-5 h-5 text-[#0084FF] group-hover:text-[#66B5FF]" />
                  <span className="font-medium">{item.name}</span>
                  <HiSparkles className="w-4 h-4 ml-auto text-yellow-400 transition-opacity opacity-0 group-hover:opacity-100" />
                </motion.button>
              ))}

              {/* Dashboard Link in Mobile Menu */}
              {user && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-gray-800/30 text-white hover:bg-[#0084FF]/30 transition-all duration-300 group"
                  onClick={() => {
                    onDashboard();
                    onClose();
                  }}
                >
                  <FaTachometerAlt className="w-5 h-5 text-[#0084FF] group-hover:text-[#66B5FF]" />
                  <span className="font-medium">Dashboard</span>
                </motion.button>
              )}
            </nav>

            {/* CTA Section */}
            <div className="absolute space-y-3 bottom-6 left-6 right-6">
              {user ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full py-3 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    scrollToSection("contact");
                    onClose();
                  }}
                >
                  <FaRocket className="w-4 h-4" />
                  Book a Call
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===== Main Navbar Component =====
export default function CosmicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "#home", icon: FaRocket },
    { name: "Services", href: "#services", icon: FaVideo },
    { name: "Work", href: "#showreel", icon: FaStar },
    { name: "About", href: "#about", icon: FaUserAstronaut },
    { name: "Contact", href: "#contact", icon: FaMagic },
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

  // Handle navigation click
  const handleNavClick = (name, href) => {
    setActiveLink(name);
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
  };

  // Handle dashboard navigation
  const handleDashboard = () => {
    // Navigate to dashboard - adjust based on your routing
    window.location.href = "/dashboard";
    setIsProfileDropdownOpen(false);
  };

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active link based on scroll position
      const sections = navigation.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(navigation[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-[#0084FF]/20"
            : "bg-black border-t border-gray-800/30"
        }`}
      >
        {/* Background Effects */}
        <NavbarParticles />

        {/* Top Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-[#0084FF] via-[#0066CC] to-[#66B5FF]" />

        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo} alt="Logo" className="h-20 w-34" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="items-center hidden gap-1 lg:flex">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeLink === item.name
                      ? "text-white bg-[#0084FF]/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>

                  {/* Active Indicator */}
                  {activeLink === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#0084FF] rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-[#0084FF]/30 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Profile Dropdown for authenticated users */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    className="flex items-center gap-2 p-2 text-gray-300 transition-colors rounded-lg hover:text-white hover:bg-gray-800/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                  >
                    <FaUserCircle className="w-6 h-6 text-[#0084FF]" />
                    <span className="hidden text-sm font-medium sm:block">
                      {user?.name || "Profile"}
                    </span>
                  </motion.button>

                  <ProfileDropdown
                    isOpen={isProfileDropdownOpen}
                    onClose={() => setIsProfileDropdownOpen(false)}
                    user={user}
                    onLogout={handleLogout}
                    onDashboard={handleDashboard}
                  />
                </div>
              ) : (
                /* CTA Button for non-authenticated users */
                <motion.button
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 132, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                >
                  <FaRocket className="w-4 h-4" />
                  <span>Book a Call</span>
                  <HiCursorClick className="w-4 h-4" />
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                className="p-2 text-gray-300 transition-colors rounded-lg lg:hidden hover:text-white hover:bg-gray-800/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBars className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scrolling Progress Bar */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isScrolled
              ? window.scrollY /
                (document.body.scrollHeight - window.innerHeight)
              : 0,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        scrollToSection={scrollToSection}
        user={user}
        onLogout={handleLogout}
        onDashboard={handleDashboard}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
