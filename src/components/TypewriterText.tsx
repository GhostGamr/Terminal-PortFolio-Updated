import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Ultra-Fast Stable Typewriter Text Component
 * 
 * Creates a lightning-fast typewriter effect with:
 * - Extremely fast character-by-character reveal (5-15ms per character)
 * - Stable cursor animation without glitches
 * - Minimal delays for maximum speed
 * - Support for HTML content
 * - Robust error handling and cleanup
 * - Optimized performance for smooth animations
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 8, // Ultra-fast base speed (8ms per character)
  className = '',
  onComplete 
}) => {
  // Current displayed text state
  const [displayText, setDisplayText] = useState('');
  
  // Current character index being processed
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Cursor visibility state for stable blinking
  const [showCursor, setShowCursor] = useState(true);
  
  // Animation completion state
  const [isComplete, setIsComplete] = useState(false);

  /**
   * Stable cursor blinking effect
   * Optimized timing for smooth visual feedback
   */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Stable 500ms blink rate

    return () => clearInterval(cursorInterval);
  }, []);

  /**
   * Calculate ultra-fast typing delay
   * Minimal delays for maximum speed while maintaining readability
   */
  const getTypingDelay = (char: string): number => {
    // Ultra-fast base speed with minimal variation
    let delay = speed + Math.random() * 3; // Only 0-3ms variation
    
    // Very short pauses for punctuation (much faster than before)
    if (char === '.' || char === '!' || char === '?') {
      delay += 50; // Brief pause after sentences
    } else if (char === ',' || char === ';' || char === ':') {
      delay += 25; // Minimal pause for commas
    } else if (char === ' ') {
      delay += 5; // Almost no pause for spaces
    } else if (char === '\n') {
      delay += 30; // Short pause for line breaks
    }
    
    return Math.max(delay, 3); // Minimum 3ms delay for stability
  };

  /**
   * Ultra-fast typewriter effect logic
   * Optimized for maximum speed and stability
   */
  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
      const currentChar = text[currentIndex];
      const delay = getTypingDelay(currentChar);
      
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentChar);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && !isComplete) {
      // Animation completed
      setIsComplete(true);
      if (onComplete) {
        // Immediate callback for chaining
        setTimeout(onComplete, 50);
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  /**
   * Robust reset when text changes
   * Prevents glitches and ensures clean state
   */
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursor(true);
  }, [text]);

  return (
    <div className={`${className} relative inline-block`}>
      {/* Main text content with stable rendering */}
      <span 
        dangerouslySetInnerHTML={{ __html: displayText }}
        className="inline-block"
      />
      
      {/* Stable animated cursor during typing */}
      {!isComplete && (
        <span 
          className={`inline-block w-2 h-5 bg-terminal-green ml-1 align-top ${
            showCursor ? 'opacity-100' : 'opacity-20'
          } transition-opacity duration-200`}
        >
          █
        </span>
      )}
      
      {/* Subtle final cursor after completion */}
      {isComplete && (
        <span 
          className={`inline-block w-2 h-5 bg-terminal-green/40 ml-1 align-top ${
            showCursor ? 'opacity-60' : 'opacity-10'
          } transition-opacity duration-300`}
        >
          █
        </span>
      )}
    </div>
  );
};

export default TypewriterText;