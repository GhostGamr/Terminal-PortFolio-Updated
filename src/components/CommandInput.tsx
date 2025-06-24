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

const CommandInput: React.FC<CommandInputProps> = ({
  currentCommand,
  setCurrentCommand,
  onExecute,
  commandHistory,
  historyIndex,
  setHistoryIndex
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle command suggestions
  useEffect(() => {
    if (currentCommand.trim()) {
      setSuggestions(getCommandSuggestions(currentCommand));
    } else {
      setSuggestions([]);
    }
  }, [currentCommand]);

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
    }
  };

  return (
    <div className="relative">
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
      
      <div className="flex items-center gap-2 text-terminal-text">
        <span className="text-terminal-green">➜</span>
        <span className="text-terminal-blue">~</span>
        <span className="text-terminal-text">$</span>
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