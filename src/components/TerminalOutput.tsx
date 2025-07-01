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
 * Terminal Output Component
 * 
 * Renders all terminal output with enhanced typewriter animations:
 * - Regular text output with realistic typing effects
 * - Interactive game components with proper message passing
 * - Dynamic content rendering based on command type
 * - Proper cleanup and React root management for games
 * - Enhanced visual feedback and animations
 */
const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  
  /**
   * Effect to render interactive game components
   * Scans output for game command markers and renders appropriate React components
   * Now includes proper message extraction for CowSay
   */
  useEffect(() => {
    // Process each output line for game components
    output.forEach((line) => {
      // Render CowSay component with custom message
      if (line.content.includes('cowsay-')) {
        const match = line.content.match(/cowsay-(\d+)/);
        if (match) {
          const element = document.getElementById(`cowsay-${match[1]}`);
          if (element && !element.hasChildNodes()) {
            const root = createRoot(element);
            // Extract message from data attribute or use default
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
    });
  }, [output]);

  return (
    <div className="space-y-3">
      {output.map((line, index) => (
        <motion.div
          key={`${line.id}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-terminal-green' : 
            line.type === 'command' ? 'text-terminal-blue' :
            'text-terminal-text'
          }`}
        >
          {/* Render with enhanced typewriter animation or static content */}
          {line.animate ? (
            <TypewriterText 
              text={line.content} 
              speed={line.speed || 25}
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