import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseSection from "../components/chatPage/responseSection";
import InputSection from "../components/chatPage/inputSection";
import { chatHistoryData } from '../data/chatHistoryData';
import { Resizable } from 're-resizable';

const AiPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputWidth, setInputWidth] = useState(500);
  const [isMobile, setIsMobile] = useState(false);
  const responseSectionRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setInputWidth(window.innerWidth);
      }
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

      // Create new chat if it's the first message
      if (messages.length === 0) {
        const title = text.length > 30 ? `${text.substring(0, 30)}...` : text;
        const newChatId = chatHistoryData.length > 0
          ? Math.max(...chatHistoryData.map(chat => chat.id)) + 1
          : 1;

        const newChat = {
          id: newChatId,
          title,
          category: "today",
          messages: [...updatedMessages, aiResponse]
        };

        chatHistoryData.unshift(newChat);
        navigate(`/chat/${newChatId}`);
      }
    }, 1500);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-auto overflow-hidden bg-light-sidebar dark:bg-dark-header">
        {/* Messages container - takes up remaining space */}
        <div 
          ref={responseSectionRef}
          className="flex-1 overflow-y-auto pb-16 px-2"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}} />
          <ResponseSection messages={messages} isLoading={isLoading} />
        </div>
        
        {/* Fixed input at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-light-sidebar dark:bg-dark-header border-t border-gray-200 dark:border-gray-700">
          <InputSection onSendMessage={handleSendMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-light-sidebar dark:bg-dark-header">
      <Resizable
        size={{ width: inputWidth, height: '100%' }}
        minWidth={400}
        maxWidth={800}
        enable={{ right: true }}
        onResizeStop={(e, direction, ref, d) => {
          setInputWidth(inputWidth + d.width);
        }}
        className="flex flex-col border-r border-gray-300 dark:border-gray-700 bg-light-sidebar dark:bg-dark-header"
      >
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            <InputSection onSendMessage={handleSendMessage} />
          </div>
        </div>
      </Resizable>

      <div 
        className="flex flex-col flex-grow h-full overflow-hidden"
        ref={responseSectionRef}
      >
        <div className="flex-1 overflow-y-auto" style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}} />
          <ResponseSection messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AiPage;