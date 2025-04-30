import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useTheme, ThemeProvider } from './context/themeContext';
import Layout from "./components/chatPage/layout/layout";
import AiPage from "./page/AiPage";
import LoginPage from "./page/loginPage";
import ChatPage from "./page/chatPage";
import SignUpPage from "./page/signUpPage";
import HomePage from "./page/homePage";
import Header from "./components/homePage/layout/homePageHeader";
import { AuthProvider } from "./page/authContext";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import MobileSidebar from "./components/homePage/layout/mobileSidebar";
import AuthHeader from "./components/auth/authHeader";

export default function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar when switching to desktop view
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-header text-light-text dark:text-dark-text overflow-hidden">
          {/* Show MobileSidebar only on mobile */}
          {isMobile && (
            <MobileSidebar 
              isOpen={sidebarOpen} 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            />
          )}
          
          
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={
                <Layout>
                  <AiPage />
                </Layout>
              } />
              <Route path="/chat/:id" element={
                <Layout>
                  <ChatPage />
                </Layout>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  </AuthProvider>
  );
}