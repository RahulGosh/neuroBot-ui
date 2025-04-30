import { useState, useCallback } from "react";

const CompactUploadFile = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    console.log("Uploading files:", files);
    setFiles([]);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  }, []);

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
        {/* Upload Button - now full width on mobile */}
        {/* <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base rounded-lg transition-colors ${
            files.length === 0
              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Upload {files.length > 0 && `(${files.length})`}
        </button> */}

        {/* Compact drag-and-drop input area */}
        <div 
          className={`flex-1 w-full border rounded-lg p-2 transition-all duration-200 ${
            isDragging 
              ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-gray-600"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-between">
            <label className="cursor-pointer flex items-center gap-1 sm:gap-2 w-full">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {isDragging ? "Drop files here" : "Drag files or click to browse"}
              </span>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base rounded-lg transition-colors ${
            files.length === 0
              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Upload {files.length > 0 && `(${files.length})`}
        </button>
      </div>

    


      {/* File list (appears below) */}
      {files.length > 0 && (
        <div className="mt-2 sm:mt-3 border rounded-lg p-2 bg-white dark:bg-gray-800 shadow-sm">
          <ul className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto text-xs sm:text-sm">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-1 sm:p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                  {file.type.startsWith("image/") ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
                    />
                  ) : (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <span className="truncate text-xs sm:text-sm">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 ml-1 sm:ml-2 p-0.5 sm:p-1 text-sm"
                  aria-label="Remove file"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompactUploadFile;