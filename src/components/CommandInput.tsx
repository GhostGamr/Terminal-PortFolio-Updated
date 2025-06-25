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
 * Command Input Component
 * 
 * Handles all user input functionality:
 * - Command typing and execution
 * - Command history navigation (up/down arrows)
 * - Auto-completion suggestions (Tab key)
 * - Blinking cursor animation
 * - Auto-focus for seamless typing experience
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
  
  // State for blinking cursor animation
  const [showCursor, setShowCursor] = useState(true);
  
  // State for command suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Blinking cursor effect - toggles every 700ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input element when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
   * Handle keyboard input events
   * - Enter: Execute command
   * - Arrow Up/Down: Navigate command history
   * - Tab: Auto-complete with first suggestion
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        onExecute(currentCommand.trim());
        setCurrentCommand('');
        setHistoryIndex(-1);
        setSuggestions([]);
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
    }
  };

  return (
    <div className="relative">
      {/* Command suggestions dropdown */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 bg-terminal-bg border border-terminal-border rounded p-2 text-xs"
        >
          {suggestions.map((suggestion, index) => (
            <div key={suggestion} className={`px-2 py-1 ${index === 0 ? 'text-terminal-green' : 'text-terminal-text'}`}>
              {suggestion}
            </div>
          ))}
          <div className="text-terminal-text/60 mt-1 px-2">Press Tab to complete</div>
        </motion.div>
      )}
      
      {/* Command input line with prompt */}
      <div className="flex items-center gap-2 text-terminal-text">
        {/* Terminal prompt symbols */}
        <span className="text-terminal-green">➜</span>
        <span className="text-terminal-blue">~</span>
        <span className="text-terminal-text">$</span>
        
        {/* Input container with custom cursor */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-terminal-text outline-none caret-transparent"
            placeholder=""
            autoComplete="off"
            spellCheck={false}
          />
          {/* Custom blinking cursor */}
          <span 
            className={`absolute top-0 left-0 pointer-events-none text-terminal-text ${
              showCursor ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-100`}
            style={{ left: `${currentCommand.length * 0.6}em` }}
          >
            █
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandInput;