import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCommandSuggestions } from '../utils/commands';

interface CommandInputProps {
  currentCommand: string;
  setCurrentCommand: (command: string) => void;
  onExecute: (command: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

/**
 * Ultra-Stable Command Input Component
 * 
 * Handles all user input with maximum stability:
 * - Persistent focus management without interference
 * - Stable cursor animation
 * - Robust command history navigation
 * - Enhanced auto-completion
 * - Optimized performance and responsiveness
 */
const CommandInput: React.FC<CommandInputProps> = ({
  currentCommand,
  setCurrentCommand,
  onExecute,
  commandHistory,
  historyIndex,
  setHistoryIndex
}) => {
  // Reference to input element for stable focus management
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Stable cursor blinking state
  const [showCursor, setShowCursor] = useState(true);
  
  // Command suggestions state
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /**
   * Ultra-stable cursor blinking effect
   * Consistent timing for smooth visual feedback
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Stable 500ms blink rate
    return () => clearInterval(interval);
  }, []);

  /**
   * Robust focus management
   * Ensures input stays focused without interfering with games
   */
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        // Only focus if no game is currently active
        const hasActiveGame = document.querySelector('.snake-container canvas, .matrix-container canvas');
        if (!hasActiveGame) {
          inputRef.current.focus();
        }
      }
    };

    // Initial focus
    focusInput();

    // Smart re-focus on clicks (avoid interfering with games)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isGameElement = target.closest('.snake-container, .matrix-container, .konami-container');
      
      if (!isGameElement) {
        setTimeout(focusInput, 50);
      }
    };

    // Re-focus on relevant key presses
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with arrow keys when games are active
      const hasActiveGame = document.querySelector('.snake-container, .matrix-container');
      if (!hasActiveGame || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        focusInput();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Generate command suggestions efficiently
  useEffect(() => {
    if (currentCommand.trim()) {
      setSuggestions(getCommandSuggestions(currentCommand));
    } else {
      setSuggestions([]);
    }
  }, [currentCommand]);

  /**
   * Enhanced keyboard input handling
   * Robust event handling with proper cleanup
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        onExecute(currentCommand.trim());
        setCurrentCommand('');
        setHistoryIndex(-1);
        setSuggestions([]);
        
        // Ensure focus returns after command execution
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 200);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? 0 : Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentCommand(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCurrentCommand('');
      setSuggestions([]);
      setHistoryIndex(-1);
    }
  };

  return (
    <div className="relative">
      {/* Stable suggestions dropdown */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full mb-2 bg-terminal-window border border-terminal-border rounded-lg p-3 text-xs shadow-xl"
        >
          <div className="text-terminal-green font-semibold mb-2">Suggestions:</div>
          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion} 
              className={`px-2 py-1 rounded transition-colors ${
                index === 0 
                  ? 'text-terminal-green bg-terminal-green/10' 
                  : 'text-terminal-text hover:bg-terminal-border/20'
              }`}
            >
              {suggestion}
            </div>
          ))}
          <div className="text-terminal-text/60 mt-2 px-2 text-xs">
            Press <kbd className="bg-terminal-border px-1 rounded text-xs">Tab</kbd> to complete
          </div>
        </motion.div>
      )}
      
      {/* Stable command input line */}
      <div className="flex items-center gap-3 text-terminal-text">
        {/* Terminal prompt */}
        <span className="text-terminal-green font-bold">➜</span>
        <span className="text-terminal-blue font-semibold">~</span>
        <span className="text-terminal-text font-bold">$</span>
        
        {/* Input with stable cursor */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-terminal-text outline-none caret-transparent font-mono"
            placeholder=""
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          {/* Ultra-stable custom cursor */}
          <span 
            className={`absolute top-0 left-0 pointer-events-none text-terminal-green font-bold ${
              showCursor ? 'opacity-100' : 'opacity-20'
            } transition-opacity duration-200`}
            style={{ 
              left: `${currentCommand.length * 0.6}em`,
              textShadow: '0 0 3px rgba(0, 255, 153, 0.3)'
            }}
          >
            █
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandInput;