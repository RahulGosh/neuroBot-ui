import { useLocation } from "react-router-dom";
import CTA from "../components/homePage/cta";
import FAQ from "../components/homePage/faq";
import Features from "../components/homePage/features";
import Hero from "../components/homePage/hero";
import HowItWorks from "../components/homePage/howItWorks";
import Footer from "../components/homePage/layout/footer";
import Header from "../components/homePage/layout/homePageHeader";
import Testimonials from "../components/homePage/testimonials";
import { useTheme } from "../context/themeContext";
import Contact from "./../components/homePage/contact";
import { useCallback, useEffect, useState } from "react";
import SecurityTrustSection from "./securityTrustSection";
import HomePageHeader from "../components/homePage/layout/homePageHeader";
import { useAuth } from "./authContext";

const HomePage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        // Small timeout to ensure page is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user.name);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-header text-light-text dark:text-dark-text">
      <HomePageHeader
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        // toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <Hero id="" />
      <Features id="features-section" />
      <SecurityTrustSection />
      <HowItWorks />
      <Testimonials />
      <FAQ id="faq" />
      <Contact id="contact" />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
