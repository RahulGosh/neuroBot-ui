import { useState, useRef, useEffect } from 'react';

const ResizableContainer = ({ leftContent, rightContent, defaultLeftWidth = '40%' }) => {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const separatorRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
    document.body.style.cursor = 'col-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      e.preventDefault(); // Prevent text selection
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate percentage (with min 20% and max 80%)
      const percentage = Math.min(Math.max((mouseX / containerWidth) * 100, 20), 80);
      
      setLeftWidth(`${percentage}%`);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="flex w-full h-full overflow-hidden relative"
    >
      <div 
        className="h-full overflow-hidden"
        style={{ width: leftWidth, minWidth: '20%', maxWidth: '80%' }}
      >
        {leftContent}
      </div>
      
      <div 
        ref={separatorRef}
        className="w-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 active:bg-blue-600 
                  cursor-col-resize transition-colors duration-100 flex-shrink-0"
        onMouseDown={handleMouseDown}
      />
      
      <div 
        className="h-full overflow-hidden flex-1"
      >
        {rightContent}
      </div>

      {/* Overlay to capture mouse events during drag */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
};

export default ResizableContainer;