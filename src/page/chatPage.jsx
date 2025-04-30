import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponseSection from "../components/chatPage/responseSection";
import InputSection from "../components/chatPage/inputSection";
import { getChatById } from '../data/chatHistoryData';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  useEffect(() => {
    const chatData = getChatById(id);
    if (chatData) {
      setMessages(chatData.messages || []);
      setChatTitle(chatData.title);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSendMessage = (text, imageData = null) => {
    const newMessage = { text, image: imageData, isUser: true };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    
    setTimeout(() => {
      const aiResponse = {
        text: `Response to your message: "${text}"`,
        isUser: false
      };
      setMessages([...updatedMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-light-sidebar dark:bg-dark-header transition-colors duration-200">
    {/* Response Section - fixed height with scroll */}
    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col" style={{ height: 'calc(100vh - 150px)' }}>
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-light-sidebar dark:bg-dark-header z-10">
        <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">{chatTitle}</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ResponseSection messages={messages} isLoading={isLoading} />
      </div>
    </div>
    
    {/* Input Section - fixed height */}
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-r border-gray-300 dark:border-gray-700 p-4 order-2 lg:order-1" style={{ height: 'calc(100vh - 150px)' }}>
      <div className="w-full max-w-2xl mx-auto">
        <InputSection onSendMessage={handleSendMessage} />
      </div>
    </div>
  </div>
  );
};

export default ChatPage;