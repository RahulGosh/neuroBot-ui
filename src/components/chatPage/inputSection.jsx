import { useState, useRef, useEffect } from "react";
import { FiPaperclip, FiSend, FiImage } from "react-icons/fi";

const InputSection = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    const dropZone = dropZoneRef.current;

    if (dropZone) {
      const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      };

      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "copy";
        setIsDragging(true);
      };

      const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
          setIsDragging(false);
        }
      };

      const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          processFile(file);
        }
      };

      dropZone.addEventListener("dragenter", handleDragEnter);
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("dragleave", handleDragLeave);
      dropZone.addEventListener("drop", handleDrop);

      return () => {
        dropZone.removeEventListener("dragenter", handleDragEnter);
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("dragleave", handleDragLeave);
        dropZone.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;
    onSendMessage(input.trim(), imagePreview);
    setInput("");
    setImagePreview(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
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

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        What can we help you with?
      </h1>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="relative rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {imagePreview && (
          <div className="p-2 pl-3 flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <img
                src={imagePreview.url}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <button
                onClick={removeImagePreview}
                className="absolute -top-1 -right-1 bg-gray-800 hover:bg-red-500 rounded-full p-0.5 text-white"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
            <span className="text-xs text-gray-500 truncate">
              {imagePreview.name}
            </span>
          </div>
        )}

        <div className="flex">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full py-3 px-4 text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none resize-none overflow-hidden min-h-10"
            placeholder="Type your message..."
            rows="1"
            style={{ maxHeight: "200px" }}
          />

          <div className="flex items-start p-2">
            <button
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={handleAttachClick}
            >
              <FiPaperclip className="w-5 h-5" />
            </button>

            <button
              onClick={handleSend}
              disabled={!input.trim() && !imagePreview}
              className={`p-2 ${
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

      <div
        ref={dropZoneRef}
        className={`mt-3 h-10 flex items-center justify-center rounded-lg border ${
          isDragging
            ? "border-blue-500 border-dashed bg-blue-50/50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 border-dashed"
        } transition-all duration-200`}
      >
        <FiImage
          className={`w-4 h-4 mr-2 ${
            isDragging ? "text-blue-500" : "text-gray-400 dark:text-gray-500"
          }`}
        />
        <span
          className={`text-sm ${
            isDragging ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isDragging ? "Drop to upload" : "Drag files here"}
        </span>
      </div>
    </div>
  );
};

export default InputSection;
