import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import CommandInput from './CommandInput';
import { useTerminal } from '../hooks/useTerminal';

/**
 * Main Terminal Component
 * 
 * This is the core terminal interface that handles:
 * - Terminal window layout and styling
 * - Auto-scrolling to bottom on new output
 * - Initial banner display (only once on first load)
 * - Integration of all terminal sub-components
 */
const Terminal: React.FC = () => {
  // Reference to terminal container for auto-scrolling
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // State to track if banner has been shown to prevent duplicate displays
  const [bannerShown, setBannerShown] = useState(false);
  
  // Terminal hook provides all terminal functionality
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

  // Auto-scroll to bottom whenever new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Display banner only once on initial load
  useEffect(() => {
    if (output.length === 0 && !bannerShown) {
      executeCommand('banner');
      setBannerShown(true);
    }
  }, [executeCommand, bannerShown, output.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Main terminal window with CRT-style appearance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl h-[90vh] bg-terminal-window border border-terminal-border rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Terminal header with window controls */}
        <TerminalHeader />
        
        {/* Main terminal content area */}
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-6 font-mono text-sm"
          style={{ height: 'calc(100% - 40px)' }}
        >
          {/* Terminal output with bottom padding for fixed input */}
          <div className="pb-20">
            <AnimatePresence mode="wait">
              <TerminalOutput output={output} />
            </AnimatePresence>
          </div>
          
          {/* Fixed command input at bottom */}
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