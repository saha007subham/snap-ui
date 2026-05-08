import React, { useState, useEffect } from 'react';

export const TypewriterText = ({ 
  text = "Build interfaces in a snap.", 
  className = "", 
  speed = 100,
  cursorChar = "|"
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (!isDeleting && displayedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(prev => 
          isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      <span className="inline-block animate-[pulse_1s_ease-in-out_infinite] opacity-80 font-light ml-[2px]">
        {cursorChar}
      </span>
    </span>
  );
};
