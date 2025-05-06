import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
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
          <Routes>
            <Route path="/" element={
              <div className="normal-scroll-container">
                <HomePage />
              </div>
            } />
            <Route path="/chat" element={
              <div className="chat-page-root">
                <Layout>
                  <AiPage />
                </Layout>
              </div>
            } />
            <Route path="/chat/:id" element={
              <div className="chat-page-root">
                <Layout>
                  <ChatPage />
                </Layout>
              </div>
            } />
            <Route path="/login" element={
              <div className="normal-scroll-container">
                <LoginPage />
              </div>
            } />
            <Route path="/sign-up" element={
              <div className="normal-scroll-container">
                <SignUpPage />
              </div>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}