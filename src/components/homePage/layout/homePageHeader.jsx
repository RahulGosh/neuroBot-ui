import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiUser,
  FiSun,
  FiMoon,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
  FiMail,
} from "react-icons/fi";
import { useAuth } from "../../../page/authContext";
import { useTheme } from "../../../context/themeContext";
import { IconButton } from "@mui/material";

const HomePageHeader = ({ toggleSidebar, sidebarOpen, isMobile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const isChatPage = location.pathname === "/chat";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  const handleSectionClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleContactUsClick = () => {
    setIsProfileDropdownOpen(false);
    if (location.pathname !== "/") {
      navigate("/#contact");
    } else {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const navLinks = [
    { name: "Chat", path: "/chat" },
    { name: "Features", section: "features-section" },
    { name: "FAQ", section: "faq" },
    { name: "Contact Us", section: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-[0.8rem] flex justify-between items-center sticky top-0 z-50 bg-white dark:bg-dark-header shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      {/* Mobile View */}
      <div className="w-full flex justify-between items-center md:hidden relative">
        <Link to="/" className="text-xl font-bold">
          NeuroBot
        </Link>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleProfileDropdown}
              aria-label="User menu"
            >
              {user ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <FiUser className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      {isChatPage && (
                        <button
                          onClick={handleContactUsClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiMail className="w-4 h-4" />
                          <span>Contact Us</span>
                        </button>
                      )}
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            toggleTheme();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          {darkMode ? (
                            <FiSun className="w-4 h-4" />
                          ) : (
                            <FiMoon className="w-4 h-4" />
                          )}
                          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          toggleTheme();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                      >
                        {darkMode ? (
                          <FiSun className="w-4 h-4" />
                        ) : (
                          <FiMoon className="w-4 h-4" />
                        )}
                        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                      </button>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiLogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/sign-up"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiUserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                      {isChatPage && (
                        <button
                          onClick={handleContactUsClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiMail className="w-4 h-4" />
                          <span>Contact Us</span>
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isChatPage && (
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          NeuroBot
        </Link>

        <div className="flex items-center gap-8">
          {!isChatPage && (
            <nav className="flex items-center gap-6">
              {navLinks.map((link) =>
                link.path ? (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors px-2 py-1 rounded-md relative group"
                    >
                      {link.name}
                      <motion.span
                        className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleSectionClick(link.section)}
                      className="text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors px-2 py-1 rounded-md relative group"
                    >
                      {link.name}
                      <motion.span
                        className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </button>
                  </motion.div>
                )
              )}
            </nav>
          )}

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="User menu"
            >
              {user ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <FiUser className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      {isChatPage && (
                        <button
                          onClick={handleContactUsClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiMail className="w-4 h-4" />
                          <span>Contact Us</span>
                        </button>
                      )}
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            toggleTheme();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          {darkMode ? (
                            <div className="flex items-center gap-2 text-amber-500">
                              <FiSun className="w-4 h-4" />
                              <span>Light Mode</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-blue-500">
                              <FiMoon className="w-4 h-4" />
                              <span>Dark Mode</span>
                            </div>
                          )}
                        </button>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          toggleTheme();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                      >
                        {darkMode ? (
                          <FiSun className="w-4 h-4" />
                        ) : (
                          <FiMoon className="w-4 h-4" />
                        )}
                        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                      </button>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiLogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/sign-up"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiUserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                      {isChatPage && (
                        <button
                          onClick={handleContactUsClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        >
                          <FiMail className="w-4 h-4" />
                          <span>Contact Us</span>
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Modified to always show as column) */}
      <AnimatePresence>
        {mobileMenuOpen && !isChatPage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 md:hidden w-full bg-white dark:bg-dark-header shadow-lg z-40 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.path ? (
                    <Link
                      to={link.path}
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSectionClick(link.section)}
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-left w-full"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))}

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                {user && (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium">
                        Logged in as {user.name}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HomePageHeader;
