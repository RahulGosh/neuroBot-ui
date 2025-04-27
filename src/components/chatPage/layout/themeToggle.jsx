import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../context/themeContext';

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="w-5 h-5 text-gray-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};