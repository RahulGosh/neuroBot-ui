import { useState } from "react";
import {
  FiMenu,
  FiMoreHorizontal,
  FiSearch,
  FiEdit,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-14 flex items-center px-2 md:px-4 bg-white dark:bg-dark-header sticky top-0 z-10">
     {!sidebarOpen && (
        <button
          className="mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      )}

      <button
        className="lg:hidden mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors"
        aria-label="Search"
      >
        <FiEdit className="w-5 h-5" />
      </button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>

        <div className="relative">
          <button
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white transition-colors"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <span className="text-sm font-medium">A</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  User Account
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  user@example.com
                </p>
              </div>

              <div
                className="flex items-center gap-2 px-4 pt-2 pb-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={toggleTheme}
              >
                {darkMode ? (
                  <FiSun className="w-4 h-4" />
                ) : (
                  <FiMoon className="w-4 h-4" />
                )}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>

              <a
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiLogIn className="w-4 h-4" />
                <span>Login</span>
              </a>

              <a
                href="/register"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiUserPlus className="w-4 h-4" />
                <span>Register</span>
              </a>

              <a
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
