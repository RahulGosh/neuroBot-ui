import { useState, useRef, useEffect } from "react";
import { FiPaperclip, FiSend, FiImage, FiUpload } from "react-icons/fi";

const InputSection = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Check if mobile on initial render and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check container width to determine compact view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkContainerSize = () => {
      const containerWidth = container.getBoundingClientRect().width;
      setIsCompactView(containerWidth < 400);
    };

    const resizeObserver = new ResizeObserver(checkContainerSize);
    resizeObserver.observe(container);
    checkContainerSize();

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Adjust textarea height when input changes or when view mode changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const minHeight = isMobile || isCompactView ? 40 : 24;
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, 150));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input, isMobile, isCompactView]);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;
    onSendMessage(input.trim(), imagePreview);
    setInput("");
    setImagePreview(null);

    if (textareaRef.current) {
      textareaRef.current.style.height =
        isMobile || isCompactView ? "40px" : "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview({
          url: e.target.result,
          name: file.name,
          type: file.type,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.log("File selected:", file);
    }
  };

  const removeImagePreview = () => {
    setImagePreview(null);
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const useCompactLayout = isMobile || isCompactView;

  // For mobile, we only render the input bar (fixed at bottom)
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-light-sidebar dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="relative rounded-lg shadow-sm bg-light-sidebar dark:bg-gray-800">
          {imagePreview && (
            <div className="p-1 pl-2 flex items-center">
              <div className="relative w-6 h-6 mr-1">
                <img
                  src={imagePreview.url}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  onClick={removeImagePreview}
                  className="absolute -top-1 -right-1 bg-gray-800 hover:bg-red-500 rounded-full p-0.5 text-white"
                >
                  <span className="text-[0.6rem]">×</span>
                </button>
              </div>
              <span className="text-[0.65rem] text-gray-500 truncate">
                {imagePreview.name}
              </span>
            </div>
          )}

          <div className="flex">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-2 px-3 text-base text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none resize-none overflow-hidden min-h-[48px] max-h-[150px]"
              placeholder="Type your message..."
              rows="1"
            />

            <div className="flex items-start p-2">
              <button
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={handleAttachClick}
              >
                <FiPaperclip className="w-5 h-5" />
              </button>

              <button
                onClick={handleSend}
                disabled={!input.trim() && !imagePreview}
                className={`p-1 ${
                  input.trim() || imagePreview
                    ? "text-blue-500 hover:text-blue-600"
                    : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For desktop, render the full component
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col justify-center p-2 sm:p-4 space-y-2 sm:space-y-4 overflow-hidden"
    >
      <h1
        className={`${
          useCompactLayout ? "text-sm sm:text-lg" : "text-lg sm:text-xl"
        } font-bold text-center text-gray-800 dark:text-gray-200`}
      >
        What can we help you with?
      </h1>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Input Section */}
      <div className="relative rounded-lg shadow-sm sm:shadow-md bg-light-sidebar dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {imagePreview && (
          <div className="p-1 pl-2 sm:p-2 sm:pl-3 flex items-center">
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 mr-1 sm:mr-2">
              <img
                src={imagePreview.url}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <button
                onClick={removeImagePreview}
                className="absolute -top-1 -right-1 bg-gray-800 hover:bg-red-500 rounded-full p-0.5 text-white"
              >
                <span className="text-[0.6rem]">×</span>
              </button>
            </div>
            <span className="text-[0.65rem] sm:text-xs text-gray-500 truncate">
              {imagePreview.name}
            </span>
          </div>
        )}

        <div className="flex">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full py-1 sm:py-3 px-2 sm:px-4 text-[16px] sm:text-base text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none resize-none overflow-hidden ${
              useCompactLayout ? "min-h-10" : ""
            }`}
            placeholder="Type your message..."
            rows="1"
            style={{
              minHeight: useCompactLayout ? "48px" : "24px",
              maxHeight: "150px",
              fontSize: useCompactLayout ? "14px" : "16px",
            }}
          />

          <div className={`flex items-start ${useCompactLayout ? "p-2" : "p-1 sm:p-2"}`}>
            <button
              className={`${useCompactLayout ? "p-2" : "p-1"} text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`}
              onClick={handleAttachClick}
            >
              <FiPaperclip className={`${useCompactLayout ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5"}`} />
            </button>

            <button
              onClick={handleSend}
              disabled={!input.trim() && !imagePreview}
              className={`${useCompactLayout ? "p-2" : "p-1"} ${
                input.trim() || imagePreview
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiSend className={`${useCompactLayout ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Drag & Drop Section - Only show on non-mobile screens */}
      {!isMobile &&
        (useCompactLayout ? (
          <div
            ref={dropZoneRef}
            className={`mt-1 h-8 flex items-center justify-center rounded-lg border ${
              isDragging
                ? "border-blue-500 border-dashed bg-blue-50/50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 border-dashed"
            } transition-all duration-200`}
          >
            <FiImage
              className={`w-3 h-3 mr-1 ${
                isDragging
                  ? "text-blue-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
            <span
              className={`text-[0.6rem] ${
                isDragging
                  ? "text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {isDragging ? "Drop to upload" : "Drag files here"}
            </span>
          </div>
        ) : (
          <div
            ref={dropZoneRef}
            className={`p-2 sm:p-8 rounded-lg sm:rounded-xl border-2 flex flex-col items-center justify-center space-y-1 sm:space-y-3 transition-all duration-200 ${
              isDragging
                ? "border-blue-500 border-dashed bg-blue-50/50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 border-dashed bg-gray-50/50 dark:bg-gray-800/50"
            }`}
          >
            <div className="p-1 sm:p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/30">
              <FiUpload
                className={`w-3 h-3 sm:w-6 sm:h-6 ${
                  isDragging
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
            </div>
            <p
              className={`text-[0.7rem] sm:text-lg font-medium ${
                isDragging
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {isDragging ? "Drop your files here" : "Drag and drop files here"}
            </p>
            <p className="text-[0.6rem] sm:text-sm text-gray-500 dark:text-gray-400">
              Upload NDA And Upload Lease Aggrement
            </p>
            <button
              onClick={handleAttachClick}
              className="mt-1 sm:mt-2 px-2 py-0.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[0.6rem] sm:text-sm font-medium transition-colors"
            >
              Or select files
            </button>
          </div>
        ))}
    </div>
  );
};

export default InputSection;