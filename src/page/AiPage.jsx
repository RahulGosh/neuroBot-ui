import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseSection from "../components/chatPage/responseSection";
import InputSection from "../components/chatPage/inputSection";
import { chatHistoryData } from '../data/chatHistoryData';
import { Resizable } from 're-resizable';

const AiPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inputWidth, setInputWidth] = useState(500);
  const responseSectionRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (responseSectionRef.current) {
      scrollPositionRef.current = responseSectionRef.current.scrollTop;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (responseSectionRef.current) {
      responseSectionRef.current.scrollTop = scrollPositionRef.current;
    }
  });

  const handleSendMessage = (text, imageData = null) => {
    const newUserMessage = { text, image: imageData, isUser: true };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        text: imageData
          ? `I received your image "${imageData.name}" with your message: "${text}"`
          : `Here's a response to your query about ${text}. This is a simulated response from the AI assistant.`,
        isUser: false
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setIsLoading(false);

      if (messages.length === 0) {
        const title = text.length > 30 ? `${text.substring(0, 30)}...` : text;
        const newChatId = chatHistoryData.length > 0
          ? Math.max(...chatHistoryData.map(chat => chat.id)) + 1
          : 1;

        const newChat = {
          id: newChatId,
          title,
          category: "today",
          messages: finalMessages
        };

        chatHistoryData.unshift(newChat);
        navigate(`/chat/${newChatId}`);
      }
    }, 1500);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-[90vh]">
        <div className="p-1 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-sm font-medium text-center truncate px-2">New Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ResponseSection messages={messages} isLoading={isLoading} />
        </div>
        <div className="p-1 border-t border-gray-200 dark:border-gray-700">
          <InputSection onSendMessage={handleSendMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-light-sidebar dark:bg-dark-header transition-colors duration-200">
      <Resizable
        size={{ width: inputWidth, height: '90vh' }}
        minWidth={300}
        maxWidth={800}
        enable={{ right: true }}
        onResizeStop={(e, direction, ref, d) => {
          setInputWidth(inputWidth + d.width);
        }}
        className="flex flex-col border-r border-gray-300 dark:border-gray-700"
      >
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            <InputSection onSendMessage={handleSendMessage} />
          </div>
        </div>
      </Resizable>

      <div className="flex flex-col flex-grow" ref={responseSectionRef}>
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-light-sidebar dark:bg-dark-header z-10">
          <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">New Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ResponseSection messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AiPage;