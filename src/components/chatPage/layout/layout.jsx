import { useState, useEffect, useCallback, useRef } from "react";
import Sidebar from "../../../sidebar";
import ChatPageHeader from "./chatPageHeader";
import MobileSidebar from "../../homePage/layout/mobileSidebar";
import { Resizable } from "re-resizable";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const previousWidthRef = useRef(256);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Set sidebar state based on screen size
      setSidebarOpen(!mobile); // Open on desktop, close on mobile
    };

    handleResize(); // Initialize on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);// Removed sidebarOpen dependency to prevent interference with user toggle

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      if (!prev) {
        setSidebarWidth(previousWidthRef.current);
      } else {
        previousWidthRef.current = sidebarWidth;
      }
      return !prev;
    });
  }, [sidebarWidth]);

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleResizeStop = useCallback((e, direction, ref, d) => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
    setSidebarWidth(prevWidth => {
      const newWidth = prevWidth + d.width;
      previousWidthRef.current = newWidth;
      return newWidth;
    });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-light-sidebar dark:bg-dark-header overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-transition {
          transition: width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }
        .resize-handle {
          position: absolute;
          right: -5px;
          width: 10px;
          top: 0;
          bottom: 0;
          cursor: col-resize;
          background-color: transparent;
          z-index: 10;
        }
        .resize-handle:hover, .resize-handle:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .resize-handle::after {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 4px;
          height: 24px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.1);
        }
        body.resizing {
          user-select: none;
        }
      `}} />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <ChatPageHeader
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Mobile Sidebar */}
        {isMobile && (
          <>
            {/* Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={toggleSidebar}
              />
            )}
            {/* Sidebar */}
            <div 
              className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`}
            >
              <MobileSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          </>
        )}

        {/* Desktop Resizable Sidebar */}
        {!isMobile && (
          <Resizable
            size={{ width: sidebarOpen ? sidebarWidth : 0, height: "100%" }}
            minWidth={200}
            maxWidth={400}
            enable={{ right: true }}
            onResizeStop={handleResizeStop}
            onResizeStart={handleResizeStart}
            className={`${sidebarOpen ? "flex" : "hidden"} flex-shrink-0 border-r border-gray-200 dark:border-gray-700`}
          >
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          </Resizable>
        )}

        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isResizing ? 'select-none' : ''
        }`}>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;