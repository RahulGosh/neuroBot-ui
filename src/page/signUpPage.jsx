import { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { fakeAuth } from "./../services/fakeAuthService";
import { useTheme } from "../context/themeContext";
import AuthHeader from "../components/auth/authHeader";

const SignUpPage = () => {
  const { darkMode } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await fakeAuth.register(
        firstName,
        lastName,
        email,
        password
      );
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
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
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className={`w-full max-w-5xl ${
          darkMode ? "bg-gray-800/80" : "bg-white/90"
        } backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}>
          <div className="flex flex-col md:flex-row">
            {/* Left Panel with Background Image */}
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-teal-900/40 z-10"></div>
              <img
                src="/ai-robot.webp"
                alt="Legal AI Assistant"
                className="h-64 md:h-full w-full object-cover object-center"
              />
            </div>

            {/* Right Panel with Form */}
            <div className={`md:w-1/2 p-6 md:p-8 flex flex-col justify-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              <div className="mb-4 md:mb-6">
                <h2 className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Create an account
                </h2>
                <p className={`text-xs md:text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className={`${
                      darkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    } hover:underline`}
                  >
                    Log in
                  </Link>
                </p>
              </div>

              {error && (
                <div className={`mb-4 md:mb-6 p-2 md:p-3 text-xs md:text-sm rounded-lg ${
                  darkMode ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-700"
                }`}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FiUser className={`h-4 md:h-5 w-4 md:w-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm rounded-lg border ${
                        darkMode
                          ? "border-gray-600 bg-gray-700/70 text-white"
                          : "border-gray-300 bg-white text-gray-800"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FiUser className={`h-4 md:h-5 w-4 md:w-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm rounded-lg border ${
                        darkMode
                          ? "border-gray-600 bg-gray-700/70 text-white"
                          : "border-gray-300 bg-white text-gray-800"
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FiMail className={`h-4 md:h-5 w-4 md:w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700/70 text-white"
                        : "border-gray-300 bg-white text-gray-800"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FiLock className={`h-4 md:h-5 w-4 md:w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 text-xs md:text-sm rounded-lg border ${
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
                    className={`absolute right-0 top-0 pr-3 md:pr-4 flex items-center h-full ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-600"
                    }`}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                <div className="flex items-start pt-1 md:pt-2">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className={`h-3 md:h-4 w-3 md:w-4 rounded ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    } text-emerald-600 focus:ring-emerald-500`}
                  />
                  <label className={`ml-2 text-xs md:text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className={`${
                        darkMode
                          ? "text-emerald-400 hover:text-emerald-300"
                          : "text-emerald-600 hover:text-emerald-700"
                      } hover:underline`}
                    >
                      terms & conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 md:mt-6 py-2 md:py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm md:text-base font-medium rounded-lg shadow transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 md:h-5 w-4 md:w-5 text-white"
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
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
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

export default SignUpPage;