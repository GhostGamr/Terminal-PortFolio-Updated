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
 * Enhanced Command Input Component
 * 
 * Handles all user input functionality with improved focus management:
 * - Command typing and execution
 * - Command history navigation (up/down arrows)
 * - Auto-completion suggestions (Tab key)
 * - Enhanced blinking cursor animation
 * - Persistent auto-focus for seamless typing experience
 * - Better visual feedback and responsiveness
 */
const CommandInput: React.FC<CommandInputProps> = ({
  currentCommand,
  setCurrentCommand,
  onExecute,
  commandHistory,
  historyIndex,
  setHistoryIndex
}) => {
  // Reference to input element for focus management
  const inputRef = useRef<HTMLInputElement>(null);
  
  // State for enhanced blinking cursor animation
  const [showCursor, setShowCursor] = useState(true);
  
  // State for command suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /**
   * Enhanced blinking cursor effect
   * More realistic timing that mimics actual terminal cursors
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600); // Slightly faster blink for better responsiveness
    return () => clearInterval(interval);
  }, []);

  /**
   * Persistent auto-focus management
   * Ensures input stays focused even after command execution
   */
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Focus on mount
    focusInput();

    // Re-focus when clicking anywhere on the terminal
    const handleGlobalClick = () => {
      setTimeout(focusInput, 10); // Small delay to ensure other events complete
    };

    // Re-focus when pressing any key globally
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with game controls
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        focusInput();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Generate command suggestions based on current input
  useEffect(() => {
    if (currentCommand.trim()) {
      setSuggestions(getCommandSuggestions(currentCommand));
    } else {
      setSuggestions([]);
    }
  }, [currentCommand]);

  /**
   * Enhanced keyboard input handling
   * - Enter: Execute command with improved feedback
   * - Arrow Up/Down: Navigate command history
   * - Tab: Auto-complete with first suggestion
   * - Escape: Clear current input
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        onExecute(currentCommand.trim());
        setCurrentCommand('');
        setHistoryIndex(-1);
        setSuggestions([]);
        // Ensure focus returns to input after command execution
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate backwards through command history
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? 0 : Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate forwards through command history
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
      // Auto-complete with first suggestion
      if (suggestions.length > 0) {
        setCurrentCommand(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Clear current input
      setCurrentCommand('');
      setSuggestions([]);
      setHistoryIndex(-1);
    }
  };

  return (
    <div className="relative">
      {/* Enhanced command suggestions dropdown */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full mb-3 bg-terminal-window border border-terminal-border rounded-lg p-3 text-xs shadow-lg shadow-terminal-green/10"
        >
          <div className="text-terminal-green font-semibold mb-2">Suggestions:</div>
          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion} 
              className={`px-3 py-1 rounded transition-colors ${
                index === 0 
                  ? 'text-terminal-green bg-terminal-green/10' 
                  : 'text-terminal-text hover:bg-terminal-border/30'
              }`}
            >
              {suggestion}
            </div>
          ))}
          <div className="text-terminal-text/60 mt-2 px-3 text-xs">
            Press <kbd className="bg-terminal-border px-1 rounded">Tab</kbd> to complete
          </div>
        </motion.div>
      )}
      
      {/* Enhanced command input line with improved styling */}
      <div className="flex items-center gap-3 text-terminal-text">
        {/* Enhanced terminal prompt symbols */}
        <span className="text-terminal-green font-bold">➜</span>
        <span className="text-terminal-blue font-semibold">~</span>
        <span className="text-terminal-text font-bold">$</span>
        
        {/* Input container with enhanced cursor */}
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
          {/* Enhanced custom blinking cursor */}
          <span 
            className={`absolute top-0 left-0 pointer-events-none text-terminal-green font-bold ${
              showCursor ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-150`}
            style={{ 
              left: `${currentCommand.length * 0.6}em`,
              textShadow: '0 0 5px rgba(0, 255, 153, 0.5)'
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