import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponseSection from "../components/chatPage/responseSection";
import InputSection from "../components/chatPage/inputSection";
import { getChatById } from '../data/chatHistoryData';
import { Resizable } from 're-resizable';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatTitle, setChatTitle] = useState('');
  const [inputWidth, setInputWidth] = useState(500);
  const [isMobile, setIsMobile] = useState(false);
  const responseSectionRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const chatData = getChatById(id);
    if (chatData) {
      setMessages(chatData.messages || []);
      setChatTitle(chatData.title);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

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

  if (isMobile) {
    return (
      <div className="flex flex-col h-[90vh]">
        <div className="p-1 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-sm font-medium text-center truncate px-2">{chatTitle}</h1>
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
          <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">{chatTitle}</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ResponseSection messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;