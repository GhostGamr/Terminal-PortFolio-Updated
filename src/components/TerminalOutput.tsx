import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import TypewriterText from './TypewriterText';
import CowSay from './games/CowSay';
import MatrixRain from './games/MatrixRain';
import SnakeGame from './games/SnakeGame';
import Fortune from './games/Fortune';
import KonamiCode from './games/KonamiCode';
import { OutputLine } from '../types/terminal';

interface TerminalOutputProps {
  output: OutputLine[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  useEffect(() => {
    // Render game components after DOM update
    output.forEach((line) => {
      if (line.content.includes('cowsay-')) {
        const match = line.content.match(/cowsay-(\d+)/);
        if (match) {
          const element = document.getElementById(`cowsay-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            // Extract message from command history or use default
            const message = 'Hello World!'; // This would need to be passed from the command
            root.render(<CowSay message={message} />);
          }
        }
      }
      
      if (line.content.includes('matrix-')) {
        const match = line.content.match(/matrix-(\d+)/);
        if (match) {
          const element = document.getElementById(`matrix-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            root.render(<MatrixRain />);
          }
        }
      }
      
      if (line.content.includes('snake-')) {
        const match = line.content.match(/snake-(\d+)/);
        if (match) {
          const element = document.getElementById(`snake-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            root.render(<SnakeGame />);
          }
        }
      }
      
      if (line.content.includes('fortune-')) {
        const match = line.content.match(/fortune-(\d+)/);
        if (match) {
          const element = document.getElementById(`fortune-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            root.render(<Fortune />);
          }
        }
      }
      
      if (line.content.includes('konami-')) {
        const match = line.content.match(/konami-(\d+)/);
        if (match) {
          const element = document.getElementById(`konami-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            root.render(<KonamiCode />);
          }
        }
      }
    });
  }, [output]);

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