import { useState } from 'react';
import { useTheme } from '../context/themeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    console.log('Sign up attempted with:', email);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-header text-light-text dark:text-dark-text">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">NeuroBot</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account? 
              <Link to="/login" className="text-emerald-500 hover:underline ml-1">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          
          <div className="mt-6">
            <button 
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md flex justify-center items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Sign up with test ID
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;