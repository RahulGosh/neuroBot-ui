import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import AuthHeader from "../components/auth/authHeader";
import { useAuth } from "./authContext";

const LoginPage = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/40"
        : "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100"
    } transition-colors duration-300`}>
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className={`w-full max-w-4xl ${
          darkMode ? "bg-gray-800/80" : "bg-white/90"
        } backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}>
          <div className="flex flex-col md:flex-row">
            {/* Left Panel with Background Image - Larger on mobile */}
            <div className="w-full h-64 sm:h-72 md:h-auto md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-teal-900/40 z-10"></div>
              <img
                src="/ai1.jpg"
                alt="Legal AI Assistant"
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Right Panel with Form - Smaller text on mobile */}
            <div className={`w-full md:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col justify-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              <div className="mb-5 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Welcome Back
                </h2>
                <p className={`text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className={`${
                      darkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    } hover:underline font-medium`}
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              {error && (
                <div className={`mb-5 sm:mb-6 p-3 text-sm sm:text-base rounded-lg ${
                  darkMode ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-700"
                }`}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700/70 text-white"
                        : "border-gray-300 bg-white text-gray-800"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700/70 text-white"
                        : "border-gray-300 bg-white text-gray-800"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-0 top-0 pr-3 flex items-center h-full ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-600"
                    }`}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className={`h-4 sm:h-5 w-4 sm:w-5 rounded ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } text-emerald-600 focus:ring-emerald-500`}
                    />
                    <label className={`ml-2 sm:ml-3 text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className={`text-sm sm:text-base ${
                      darkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    } hover:underline font-medium`}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-5 sm:mt-6 py-2 sm:py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm sm:text-base font-medium rounded-lg shadow transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;