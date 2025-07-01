import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Enhanced Typewriter Text Component
 * 
 * Creates an authentic typewriter effect with:
 * - Character-by-character reveal with variable timing
 * - Blinking cursor that follows the text
 * - Realistic typing speed variations
 * - Support for HTML content
 * - Pause effects for punctuation
 * - Completion callbacks for chaining animations
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 30, // Base speed in milliseconds per character
  className = '',
  onComplete 
}) => {
  // Current displayed text state
  const [displayText, setDisplayText] = useState('');
  
  // Current character index being processed
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Cursor visibility state for blinking effect
  const [showCursor, setShowCursor] = useState(true);
  
  // Animation completion state
  const [isComplete, setIsComplete] = useState(false);

  /**
   * Blinking cursor effect
   * Creates authentic typewriter cursor that blinks every 530ms
   */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Slightly irregular timing for realism

    return () => clearInterval(cursorInterval);
  }, []);

  /**
   * Calculate typing delay based on character type
   * Adds realistic pauses for punctuation and spaces
   */
  const getTypingDelay = (char: string): number => {
    // Base speed with slight randomization for human-like typing
    let delay = speed + Math.random() * 20 - 10;
    
    // Longer pauses for punctuation
    if (char === '.' || char === '!' || char === '?') {
      delay += 200; // Pause after sentences
    } else if (char === ',' || char === ';' || char === ':') {
      delay += 100; // Shorter pause for commas
    } else if (char === ' ') {
      delay += 30; // Slight pause for spaces
    } else if (char === '\n') {
      delay += 150; // Pause for line breaks
    }
    
    return Math.max(delay, 10); // Minimum 10ms delay
  };

  /**
   * Main typewriter effect logic
   * Processes one character at a time with realistic timing
   */
  useEffect(() => {
    if (currentIndex < text.length) {
      const currentChar = text[currentIndex];
      const delay = getTypingDelay(currentChar);
      
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentChar);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // Animation completed
      setIsComplete(true);
      if (onComplete) {
        // Small delay before calling completion callback
        setTimeout(onComplete, 100);
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  /**
   * Reset animation when text prop changes
   */
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursor(true);
  }, [text]);

  return (
    <div className={`${className} relative`}>
      {/* Main text content */}
      <span 
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      
      {/* Animated cursor */}
      {!isComplete && (
        <span 
          className={`inline-block w-2 h-5 bg-terminal-green ml-1 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
          style={{
            animation: 'none', // Disable CSS animation in favor of React state
          }}
        >
          █
        </span>
      )}
      
      {/* Final cursor that appears after completion */}
      {isComplete && (
        <span 
          className={`inline-block w-2 h-5 bg-terminal-green/60 ml-1 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
        >
          █
        </span>
      )}
    </div>
  );
};

export default TypewriterText;