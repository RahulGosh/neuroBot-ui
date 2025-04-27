import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseSection from "../components/chatPage/responseSection";
import InputSection from "../components/chatPage/inputSection";
import { chatHistoryData } from '../data/chatHistoryData';

const AiPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = (text, imageData = null) => {
    // First create a new message from the user
    const newUserMessage = { text, image: imageData, isUser: true };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    
    // Simulate AI response
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
      
      // Create a new chat history entry after the first exchange
      if (messages.length === 0) {
        // Generate a title from the first user message
        const title = text.length > 30 ? `${text.substring(0, 30)}...` : text;
        
        // Create a new chat history entry
        const newChatId = chatHistoryData.length > 0 
          ? Math.max(...chatHistoryData.map(chat => chat.id)) + 1 
          : 1;
          
        const newChat = {
          id: newChatId,
          title: title,
          category: "today",
          messages: finalMessages
        };
        
        // Add to history (in a real app, this would be saved to a backend)
        chatHistoryData.unshift(newChat);
        
        // Navigate to the new chat
        navigate(`/chat/${newChatId}`);
      }
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-white dark:bg-dark-header transition-colors duration-200">
      <div className="w-full lg:w-1/2 flex-1 order-1 lg:order-2">
        <ResponseSection messages={messages} isLoading={isLoading} />
      </div>
      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-gray-700 p-4 order-2 lg:order-1">
        <InputSection onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default AiPage;