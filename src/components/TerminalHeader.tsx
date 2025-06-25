import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

/**
 * Terminal Header Component
 * 
 * Renders the top bar of the terminal window with:
 * - Terminal icon and title
 * - macOS-style window control buttons (minimize, maximize, close)
 * - Authentic terminal appearance
 */
const TerminalHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-terminal-header border-b border-terminal-border px-4 py-2">
      {/* Left side: Terminal icon and title */}
      <div className="flex items-center gap-2">
        <TerminalIcon size={16} className="text-terminal-green" />
        <span className="text-terminal-text text-sm font-medium">
          portfolio@terminal:~$
        </span>
      </div>
      
      {/* Right side: macOS-style window controls */}
      <div className="flex items-center gap-2">
        {/* Minimize button (yellow) */}
        <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors" />
        {/* Maximize button (green) */}
        <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors" />
        {/* Close button (red) */}
        <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors" />
      </div>
    </div>
  );
};

export default TerminalHeader;