import { useEffect, useRef, useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiCopy, FiCheck } from "react-icons/fi";

const ResponseSection = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  const [feedback, setFeedback] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleFeedback = (messageId, isLike) => {
    setFeedback((prev) => ({
      ...prev,
      [messageId]: isLike ? "liked" : "disliked",
    }));
  };

  const handleCopyText = (index, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({
        ...prev,
        [index]: true,
      }));

      setTimeout(() => {
        setCopiedStates((prev) => ({
          ...prev,
          [index]: false,
        }));
      }, 2000);
    });
  };

  return (
    <div className="w-full h-full p-3 sm:p-4 lg:p-6 overflow-y-auto">
  {messages.length === 0 ? (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-sm">
        Your responses will appear here
      </div>
    </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 w-full">
          {" "}
          {/* Added w-full */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 sm:p-3 rounded-lg w-full ${
                message.isUser
                  ? "bg-blue-100 dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              style={{ maxWidth: "100%" }} // Ensure messages don't overflow
            >
              <div className="flex items-start max-w-full">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mr-2 sm:mr-3 overflow-hidden flex-shrink-0">
                  {message.isUser ? (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-[10px] sm:text-xs font-medium">
                        Y
                      </span>
                    </div>
                  ) : (
                    <img
                      src="/ai-avatar.avif"
                      alt="AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-start mb-1 max-w-full">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm truncate">
                      {message.isUser ? "You" : "NeuroBot"}
                    </p>
                    <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                      {!message.isUser && (
                        <>
                          <button
                            onClick={() => handleCopyText(index, message.text)}
                            className={`p-1 rounded-full ${
                              copiedStates[index]
                                ? "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
                                : "text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                            } transition-colors`}
                            aria-label="Copy response"
                            title="Copy response"
                          >
                            {copiedStates[index] ? (
                              <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                            ) : (
                              <FiCopy className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => handleFeedback(index, true)}
                            className={`p-1 rounded-full ${
                              feedback[index] === "liked"
                                ? "text-green-500 bg-green-100 dark:bg-green-900/30"
                                : "text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                            } transition-colors`}
                            aria-label="Like this response"
                            title="Like"
                          >
                            <FiThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>

                          <button
                            onClick={() => handleFeedback(index, false)}
                            className={`p-1 rounded-full ${
                              feedback[index] === "disliked"
                                ? "text-red-500 bg-red-100 dark:bg-red-900/30"
                                : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                            } transition-colors`}
                            aria-label="Dislike this response"
                            title="Dislike"
                          >
                            <FiThumbsDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {message.image && (
                    <div className="mt-1 sm:mt-2 mb-2 sm:mb-3 max-w-full">
                      <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 inline-block max-w-full">
                        <img
                          src={message.image.url}
                          alt={message.image.name || "Uploaded image"}
                          className="max-w-[50px] sm:max-w-[60px] max-h-[40px] sm:max-h-[45px] object-contain"
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate max-w-full">
                        {message.image.name}
                      </p>
                    </div>
                  )}

                  <p
                    className="mt-1 text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap text-xs sm:text-sm"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 max-w-full">
              <div className="flex items-start max-w-full">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mr-2 sm:mr-3 overflow-hidden flex-shrink-0">
                  <img
                    src="/ai-avatar.avif"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1 text-xs sm:text-sm truncate">
                    NeuroBot
                  </p>
                  <div className="mt-1 sm:mt-2 flex space-x-1 sm:space-x-2">
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ResponseSection;
