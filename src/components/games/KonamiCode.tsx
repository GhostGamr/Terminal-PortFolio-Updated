import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const KonamiCode: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    
    let currentSequence: string[] = [];

    const handleKeyDown = (event: KeyboardEvent) => {
      currentSequence.push(event.code);
      
      // Keep only the last 10 keys
      if (currentSequence.length > konamiSequence.length) {
        currentSequence = currentSequence.slice(-konamiSequence.length);
      }
      
      // Check if the sequence matches
      if (currentSequence.length === konamiSequence.length) {
        const matches = konamiSequence.every((key, index) => key === currentSequence[index]);
        if (matches) {
          setShowSecret(true);
          currentSequence = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showSecret) {
    return (
      <div className="text-center">
        <div className="text-terminal-green text-lg font-bold mb-4">🎮 KONAMI CODE ACTIVATED</div>
        <div className="text-terminal-text mb-4">
          Enter the legendary sequence to unlock a secret...
        </div>
        <div className="font-mono text-terminal-blue text-sm bg-terminal-bg border border-terminal-border rounded p-3">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <div className="text-terminal-text/60 text-xs mt-2">
          Use your keyboard arrow keys, then press B and A
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="text-terminal-green text-2xl font-bold mb-4">🎉 SECRET UNLOCKED! 🎉</div>
      <div className="space-y-4">
        <div className="text-terminal-text text-lg">
          Congratulations! You've discovered the hidden easter egg!
        </div>
        <div className="bg-terminal-green/10 border border-terminal-green/30 rounded-lg p-6">
          <div className="text-terminal-green font-mono text-lg mb-2">
            Achievement Unlocked: "Code Archaeologist"
          </div>
          <div className="text-terminal-text">
            You've proven you know the classics! The Konami Code has been a part of gaming culture since 1986.
          </div>
        </div>
        <div className="text-terminal-text/60 text-sm">
          Fun fact: This code was originally created by Kazuhisa Hashimoto for the NES game Gradius!
        </div>
        <button
          onClick={() => setShowSecret(false)}
          className="px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green rounded hover:bg-terminal-green hover:text-terminal-bg transition-all"
        >
          Hide Secret
        </button>
      </div>
    </motion.div>
  );
};

export default KonamiCode;