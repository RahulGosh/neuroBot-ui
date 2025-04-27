import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../../chatPage/layout/themeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = ({ darkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSectionClick = (sectionId) => {
    setMobileMenuOpen(false);
    
    // Use setTimeout to ensure the menu closes before scrolling
    setTimeout(() => {
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // Navigate to home with hash, then scroll
        window.location.href = `/#${sectionId}`;
      }
    }, 300); // Match this duration with your menu closing animation
  };

  const navLinks = [
    { name: 'Chat', path: '/chat' },
    { name: 'Features', section: 'features-section' },
    { name: 'FAQ', section: 'faq' },
    { name: 'Contact Us', section: 'contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 flex flex-col items-center sticky top-0 z-50 bg-white dark:bg-dark-header shadow-sm"
    >
      {/* Top Row - Logo and Mobile Menu */}
      <div className="w-full flex justify-between items-center md:hidden">
        <Link to="/" className="text-xl font-bold">NeuroBot</Link>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Centered Desktop Navigation */}
      <div className="w-full hidden md:flex flex-col items-center">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">NeuroBot</Link>
          
          {/* Centered Navigation Links */}
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              link.path ? (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleSectionClick(link.section)}
                  className="hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/sign-up" 
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              Sign Up
            </Link>
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-white dark:bg-dark-header shadow-lg z-40 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-4">
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
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-center"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSectionClick(link.section)}
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-center w-full"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <Link 
                  to="/login"
                  className="block px-4 py-2 text-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign-up"
                  className="block px-4 py-2 text-center bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
                <div className="flex justify-center py-2">
                  <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;