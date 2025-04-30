import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiSun,
  FiMoon,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../../page/authContext";
import { useTheme } from "../../../context/themeContext";

const ChatPageHeader = ({ toggleSidebar, sidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  const handleContactUsClick = () => {
    setIsProfileDropdownOpen(false);
    navigate("/#contact");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-[0.8rem] flex justify-between items-center sticky top-0 z-50 bg-light-sidebar dark:bg-dark-header shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        )}
        <Link
          to="/"
          className="text-xl font-bold text-gray-700 dark:text-gray-300"
        >
          NeuroBot
        </Link>
      </div>

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

        {isProfileDropdownOpen && (
          <motion.div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
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
                <button
                  onClick={handleContactUsClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                  <FiMail className="w-4 h-4" />
                  <span>Contact Us</span>
                </button>
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
                <button
                  onClick={handleContactUsClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                  <FiMail className="w-4 h-4" />
                  <span>Contact Us</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default ChatPageHeader;
