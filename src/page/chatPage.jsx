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
    <div className="h-full flex flex-col lg:flex-row bg-white dark:bg-dark-header transition-colors duration-200">
      <div className="w-full lg:w-1/2 flex-1 order-1 lg:order-2">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">{chatTitle}</h1>
        </div>
        <ResponseSection messages={messages} isLoading={isLoading} />
      </div>
      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-gray-700 p-4 order-2 lg:order-1">
        <InputSection onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;