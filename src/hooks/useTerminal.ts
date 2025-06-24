import { useState, useCallback } from 'react';
import { OutputLine } from '../types/terminal';
import { executeTerminalCommand } from '../utils/commandExecutor';

export const useTerminal = () => {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addOutput = useCallback((lines: OutputLine | OutputLine[]) => {
    const linesToAdd = Array.isArray(lines) ? lines : [lines];
    setOutput(prev => [...prev, ...linesToAdd]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    // Add command to history
    setCommandHistory(prev => [command, ...prev].slice(0, 50)); // Keep last 50 commands
    
    // Add command line to output
    addOutput({
      id: Date.now(),
      content: `<span class="text-terminal-green">➜</span> <span class="text-terminal-blue">~</span> <span class="text-terminal-text">$ ${command}</span>`,
      type: 'command',
      animate: false
    });

    // Execute command and add result to output
    const result = executeTerminalCommand(command);
    addOutput(result);
  }, [addOutput]);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

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