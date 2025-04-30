import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../context/themeContext';

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="w-5 h-5 text-toggle-light" />
      ) : (
        <FiMoon className="w-5 h-5 text-toggle-dark" />
      )}
    </button>
  );
};