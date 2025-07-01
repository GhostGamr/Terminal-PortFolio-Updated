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

/**
 * Stable Terminal Output Component
 * 
 * Renders all terminal output with enhanced stability:
 * - Ultra-fast typewriter animations
 * - Robust game component rendering
 * - Proper cleanup and error handling
 * - Optimized performance and visual feedback
 * - Stable message passing for interactive components
 */
const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  
  /**
   * Stable game component rendering
   * Enhanced error handling and proper message extraction
   */
  useEffect(() => {
    // Small delay to ensure DOM elements are ready
    const renderTimeout = setTimeout(() => {
      output.forEach((line) => {
        try {
          // Render CowSay component with extracted message
          if (line.content.includes('cowsay-')) {
            const match = line.content.match(/cowsay-(\d+)/);
            if (match) {
              const element = document.getElementById(`cowsay-${match[1]}`);
              if (element && !element.hasChildNodes()) {
                const root = createRoot(element);
                const message = element.getAttribute('data-message') || 'Hello World!';
                root.render(<CowSay message={message} />);
              }
            }
          }
          
          // Render Matrix Rain component
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
          
          // Render Snake Game component
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
          
          // Render Fortune component
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
          
          // Render Konami Code component
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
        } catch (error) {
          console.warn('Error rendering game component:', error);
        }
      });
    }, 100);

    return () => clearTimeout(renderTimeout);
  }, [output]);

  return (
    <div className="space-y-2">
      {output.map((line, index) => (
        <motion.div
          key={`${line.id}-${index}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          className={`${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-terminal-green' : 
            line.type === 'command' ? 'text-terminal-blue' :
            'text-terminal-text'
          }`}
        >
          {/* Render with ultra-fast typewriter or static content */}
          {line.animate ? (
            <TypewriterText 
              text={line.content} 
              speed={line.speed || 8} // Ultra-fast default speed
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