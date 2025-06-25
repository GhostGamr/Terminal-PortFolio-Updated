import { useState, useCallback } from 'react';
import { OutputLine } from '../types/terminal';
import { executeTerminalCommand } from '../utils/commandExecutor';

/**
 * Terminal Hook
 * 
 * Custom hook that manages all terminal state and functionality:
 * - Output history management
 * - Command execution and history
 * - Terminal state operations (clear, add output)
 * - Command history navigation
 */
export const useTerminal = () => {
  // Terminal output lines array
  const [output, setOutput] = useState<OutputLine[]>([]);
  
  // Current command being typed
  const [currentCommand, setCurrentCommand] = useState('');
  
  // Command history for up/down arrow navigation (max 50 commands)
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  // Current position in command history (-1 = not navigating)
  const [historyIndex, setHistoryIndex] = useState(-1);

  /**
   * Add new output lines to terminal
   * Accepts single line or array of lines
   */
  const addOutput = useCallback((lines: OutputLine | OutputLine[]) => {
    const linesToAdd = Array.isArray(lines) ? lines : [lines];
    setOutput(prev => [...prev, ...linesToAdd]);
  }, []);

  /**
   * Execute a terminal command
   * - Adds command to history (max 50 entries)
   * - Displays command in output
   * - Executes command and shows result
   * - Handles special 'clear' command
   */
  const executeCommand = useCallback((command: string) => {
    // Add command to history (keep last 50 commands)
    setCommandHistory(prev => [command, ...prev].slice(0, 50));
    
    // Add command line to output with terminal prompt styling
    addOutput({
      id: Date.now(),
      content: `<span class="text-terminal-green">➜</span> <span class="text-terminal-blue">~</span> <span class="text-terminal-text">$ ${command}</span>`,
      type: 'command',
      animate: false
    });

    // Handle clear command specially - clears output after brief delay
    if (command.toLowerCase().trim() === 'clear') {
      setTimeout(() => setOutput([]), 100);
      return;
    }

    // Execute command and add result to output
    const result = executeTerminalCommand(command);
    addOutput(result);
  }, [addOutput]);

  /**
   * Clear all terminal output
   */
  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  // Return all terminal state and functions
  return {
    output,
    currentCommand,
    setCurrentCommand,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    executeCommand,
    clearOutput,
    addOutput
  };
};