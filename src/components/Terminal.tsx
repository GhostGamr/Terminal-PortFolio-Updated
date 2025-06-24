import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import CommandInput from './CommandInput';
import { useTerminal } from '../hooks/useTerminal';
import { INITIAL_OUTPUT } from '../utils/constants';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const {
    output,
    currentCommand,
    setCurrentCommand,
    commandHistory,
    historyIndex,
    executeCommand,
    setHistoryIndex,
    clearOutput
  } = useTerminal();

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Initialize with banner on first load
  useEffect(() => {
    if (output.length === 0) {
      executeCommand('banner');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl h-[90vh] bg-terminal-window border border-terminal-border rounded-lg shadow-2xl overflow-hidden"
      >
        <TerminalHeader />
        
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-6 font-mono text-sm"
          style={{ height: 'calc(100% - 40px)' }}
        >
          <div className="pb-20">
            <AnimatePresence mode="wait">
              <TerminalOutput output={output} />
            </AnimatePresence>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 bg-terminal-window border-t border-terminal-border p-6">
            <div className="max-w-6xl mx-auto">
              <CommandInput
                currentCommand={currentCommand}
                setCurrentCommand={setCurrentCommand}
                onExecute={executeCommand}
                commandHistory={commandHistory}
                historyIndex={historyIndex}
                setHistoryIndex={setHistoryIndex}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;