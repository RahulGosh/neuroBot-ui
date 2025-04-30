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
        <FiSun className="w-5 h-5 text-yellow-500" /> // Changed to more standard yellow
      ) : (
        <FiMoon className="w-5 h-5 text-gray-700" /> // Darker icon for light mode
      )}
    </button>
  );
};