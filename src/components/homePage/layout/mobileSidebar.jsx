import {
    FiPlus,
    FiSearch,
    FiEdit,
    FiMenu,
    FiClock,
    FiUpload,
    FiLoader,
    FiCheckCircle,
    FiChevronDown,
    FiChevronRight
  } from "react-icons/fi";
  import { Link, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { Drawer, IconButton } from "@mui/material";
  import { Close } from "@mui/icons-material";
  import { chatHistoryData } from "../../../data/chatHistoryData";
  
  const MobileSidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const [expandedTabs, setExpandedTabs] = useState({
      history: true,
      uploads: false,
      progress: false,
      finalized: false
    });
    
    // Filter chats by category
    const todayChats = chatHistoryData.filter(chat => chat.category === "today");
    const yesterdayChats = chatHistoryData.filter(chat => chat.category === "yesterday");
    const previous7DaysChats = chatHistoryData.filter(chat => chat.category === "previous7Days");
    const previous30DaysChats = chatHistoryData.filter(chat => chat.category === "previous30Days");
  
    // Mock data for other tabs
    const recentUploads = [
      { id: 1, name: "Project Proposal.pdf", icon: <FiUpload className="mr-2" /> },
      { id: 2, name: "Research Data.xlsx", icon: <FiUpload className="mr-2" /> },
      { id: 3, name: "Meeting Notes.docx", icon: <FiUpload className="mr-2" /> }
    ];
  
    const inProgress = [
      { id: 1, name: "Thesis Draft", icon: <FiLoader className="mr-2" /> },
      { id: 2, name: "Code Review", icon: <FiLoader className="mr-2" /> },
      { id: 3, name: "Design Mockups", icon: <FiLoader className="mr-2" /> }
    ];
  
    const finalized = [
      { id: 1, name: "Final Report", icon: <FiCheckCircle className="mr-2" /> },
      { id: 2, name: "Approved Budget", icon: <FiCheckCircle className="mr-2" /> },
      { id: 3, name: "Client Contract", icon: <FiCheckCircle className="mr-2" /> }
    ];
  
    const handleChatClick = (chatId) => {
      navigate(`/chat/${chatId}`);
      toggleSidebar(); // Close sidebar after navigation
    };
  
    const toggleTab = (tabName) => {
      setExpandedTabs(prev => ({
        ...prev,
        [tabName]: !prev[tabName]
      }));
    };
  
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa', // light-sidebar
            color: '#000000', // light-text
            '&.dark': {
              backgroundColor: '#171717', // dark-sidebar
              color: '#ffffff', // dark-text
            }
          }
        }}
      >
        <div className="h-full flex flex-col bg-light-sidebar dark:bg-dark-sidebar">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-light-sidebar dark:bg-dark-sidebar">
            <IconButton 
              onClick={toggleSidebar} 
              aria-label="close sidebar"
              className="text-gray-700 dark:text-gray-300"
            >
              <Close />
            </IconButton>
  
            <div className="flex items-center">
              <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                <FiSearch size={20} />
              </button>
              <Link 
                to="/chat" 
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <FiPlus size={20} />
              </Link>
            </div>
          </div>
  
          <div className="flex-1 px-2 py-2 overflow-y-auto custom-scrollbar bg-light-sidebar dark:bg-dark-sidebar">
            {/* History Tab */}
            <div className="mb-1">
              <button
                onClick={() => toggleTab("history")}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  <span>History</span>
                </div>
                {expandedTabs.history ? <FiChevronDown /> : <FiChevronRight />}
              </button>
              
              {expandedTabs.history && (
                <div className="ml-4">
                  {/* Today Section */}
                  {todayChats.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Today
                      </h3>
                      <div className="space-y-1">
                        {todayChats.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                            className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            <span className="truncate">{chat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Yesterday Section */}
                  {yesterdayChats.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Yesterday
                      </h3>
                      <div className="space-y-1">
                        {yesterdayChats.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                            className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            <span className="truncate">{chat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Previous 7 Days Section */}
                  {previous7DaysChats.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Previous 7 Days
                      </h3>
                      <div className="space-y-1">
                        {previous7DaysChats.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                            className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            <span className="truncate">{chat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Previous 30 Days Section */}
                  {previous30DaysChats.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Previous 30 Days
                      </h3>
                      <div className="space-y-1">
                        {previous30DaysChats.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                            className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            <span className="truncate">{chat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
  
            {/* Recent Uploads Tab */}
            <div className="mb-1">
              <button
                onClick={() => toggleTab("uploads")}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <div className="flex items-center">
                  <FiUpload className="mr-2" />
                  <span>Recent Uploads</span>
                </div>
                {expandedTabs.uploads ? <FiChevronDown /> : <FiChevronRight />}
              </button>
              
              {expandedTabs.uploads && (
                <div className="ml-4 space-y-1">
                  {recentUploads.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
  
            {/* In Progress Tab */}
            <div className="mb-1">
              <button
                onClick={() => toggleTab("progress")}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <div className="flex items-center">
                  <FiLoader className="mr-2" />
                  <span>In Progress</span>
                </div>
                {expandedTabs.progress ? <FiChevronDown /> : <FiChevronRight />}
              </button>
              
              {expandedTabs.progress && (
                <div className="ml-4 space-y-1">
                  {inProgress.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
  
            {/* Finalized Tab */}
            <div className="mb-1">
              <button
                onClick={() => toggleTab("finalized")}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <div className="flex items-center">
                  <FiCheckCircle className="mr-2" />
                  <span>Finalized</span>
                </div>
                {expandedTabs.finalized ? <FiChevronDown /> : <FiChevronRight />}
              </button>
              
              {expandedTabs.finalized && (
                <div className="ml-4 space-y-1">
                  {finalized.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    );
  };
  
  export default MobileSidebar;