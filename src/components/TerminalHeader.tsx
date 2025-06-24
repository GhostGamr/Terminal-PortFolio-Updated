import React from 'react';
import { Minimize2, Square, X, Terminal as TerminalIcon } from 'lucide-react';

const TerminalHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-terminal-header border-b border-terminal-border px-4 py-2">
      <div className="flex items-center gap-2">
        <TerminalIcon size={16} className="text-terminal-green" />
        <span className="text-terminal-text text-sm font-medium">
          portfolio@terminal:~$
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors" />
        <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors" />
        <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors" />
      </div>
    </div>
  );
};

export default TerminalHeader;