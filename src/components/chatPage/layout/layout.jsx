import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../../sidebar";
import ChatPageHeader from "./chatPageHeader";
import { useTheme } from "../../../context/themeContext";
import MobileSidebar from "../../homePage/layout/mobileSidebar";
import UploadFile from "../uploadFile";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Open sidebar by default on desktop, closed on mobile
    };

    handleResize(); // Call immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-light-sidebar dark:bg-dark-header overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <ChatPageHeader
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        <div
          className={`${isMobile ? "fixed inset-0 z-40" : "fixed"} ${
            sidebarOpen ? "block" : "hidden"
          } ${!isMobile ? "w-64" : ""}`}
        >
          {isMobile ? (
            <MobileSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          ) : (
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          )}
        </div>
        <div
          className={`flex-1 flex flex-col overflow-hidden ${
            !isMobile && sidebarOpen ? "ml-64" : ""
          }`}
        >
          {/* <div className="w-full">
            <UploadFile />
          </div>{" "} */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
