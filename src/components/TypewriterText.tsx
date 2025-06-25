import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Typewriter Text Component
 * 
 * Creates a typewriter effect by gradually revealing text character by character.
 * Features:
 * - Configurable typing speed
 * - HTML content support via dangerouslySetInnerHTML
 * - Completion callback for chaining animations
 * - Automatic reset when text changes
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 20, // Default speed: 20ms per character (faster than before)
  className = '',
  onComplete 
}) => {
  // Current displayed text state
  const [displayText, setDisplayText] = useState('');
  
  // Current character index being processed
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Main typewriter effect logic
   * Adds one character at a time with specified delay
   */
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      // Call completion callback when animation finishes
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  /**
   * Reset animation when text prop changes
   */
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

export default TypewriterText;