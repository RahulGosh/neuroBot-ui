import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiMenu,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { chatHistoryData } from "./data/chatHistoryData";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  // Filter chats by category
  const todayChats = chatHistoryData.filter(chat => chat.category === "today");
  const yesterdayChats = chatHistoryData.filter(chat => chat.category === "yesterday");
  const previous7DaysChats = chatHistoryData.filter(chat => chat.category === "previous7Days");
  const previous30DaysChats = chatHistoryData.filter(chat => chat.category === "previous30Days");

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:block fixed md:static z-40 w-64 h-screen overflow-y-auto bg-light-sidebar dark:bg-dark-sidebar border-r border-gray-200 dark:border-gray-700 flex flex-col`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <button
          className="mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 items-center justify-center transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div className="flex items-center">
          <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <FiSearch size={20} />
          </button>
          <Link to="/chat" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <FiPlus size={20} />
          </Link>
        </div>
      </div>
      <div className="flex-1 px-2 py-2 overflow-y-auto">
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
    </div>
  );
};

export default Sidebar;