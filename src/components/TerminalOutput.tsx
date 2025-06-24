import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { OutputLine } from '../types/terminal';

interface TerminalOutputProps {
  output: OutputLine[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="space-y-2">
      {output.map((line, index) => (
        <motion.div
          key={`${line.id}-${index}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className={`${line.type === 'error' ? 'text-red-400' : 
                     line.type === 'success' ? 'text-terminal-green' : 
                     line.type === 'command' ? 'text-terminal-blue' :
                     'text-terminal-text'}`}
        >
          {line.animate ? (
            <TypewriterText 
              text={line.content} 
              speed={line.speed || 50}
              className={line.className || ''}
            />
          ) : (
            <div 
              className={line.className || ''}
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TerminalOutput;