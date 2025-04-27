import { useState, useRef, useEffect } from 'react';
import { FiPaperclip, FiSend, FiImage, FiFile, FiFileText, FiX } from 'react-icons/fi';
import ResponseSection from './responseSection';
import InputSection from './inputSection';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text, imageData = null) => {
    const userMessage = {
      isUser: true,
      text: text,
      image: imageData
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    setTimeout(() => {
      const botResponse = {
        isUser: false,
        text: `I received your message: "${text}"${imageData ? " with an image." : ""}`,
        image: null
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <ResponseSection messages={messages} isLoading={isLoading} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <InputSection onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface