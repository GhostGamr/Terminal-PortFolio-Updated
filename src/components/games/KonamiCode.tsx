import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Konami Code Component
 * 
 * Interactive easter egg that detects the famous Konami Code sequence.
 * Features:
 * - Real-time keyboard sequence detection
 * - Classic Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
 * - Achievement unlock animation
 * - Gaming history facts and trivia
 * - Ability to hide/show the secret
 */
const KonamiCode: React.FC = () => {
  // State to track if the secret has been unlocked
  const [showSecret, setShowSecret] = useState(false);

  /**
   * Effect to handle Konami Code detection
   * Listens for keyboard input and matches against the classic sequence
   */
  useEffect(() => {
    // The legendary Konami Code sequence
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    
    // Track current input sequence
    let currentSequence: string[] = [];

    /**
     * Handle keyboard input and check for sequence match
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add current key to sequence
      currentSequence.push(event.code);
      
      // Keep only the last 10 keys (length of Konami sequence)
      if (currentSequence.length > konamiSequence.length) {
        currentSequence = currentSequence.slice(-konamiSequence.length);
      }
      
      // Check if the current sequence matches the Konami Code
      if (currentSequence.length === konamiSequence.length) {
        const matches = konamiSequence.every((key, index) => key === currentSequence[index]);
        if (matches) {
          setShowSecret(true);
          currentSequence = []; // Reset sequence after successful match
        }
      }
    };

    // Add event listener for keyboard input
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show instructions if secret hasn't been unlocked yet
  if (!showSecret) {
    return (
      <div className="text-center">
        <div className="text-terminal-green text-lg font-bold mb-4">🎮 KONAMI CODE ACTIVATED</div>
        <div className="text-terminal-text mb-4">
          Enter the legendary sequence to unlock a secret...
        </div>
        {/* Visual representation of the Konami Code */}
        <div className="font-mono text-terminal-blue text-sm bg-terminal-bg border border-terminal-border rounded p-3">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <div className="text-terminal-text/60 text-xs mt-2">
          Use your keyboard arrow keys, then press B and A
        </div>
      </div>
    );
  }

  // Show secret content when Konami Code is successfully entered
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Success header */}
      <div className="text-terminal-green text-2xl font-bold mb-4">🎉 SECRET UNLOCKED! 🎉</div>
      
      <div className="space-y-4">
        {/* Congratulations message */}
        <div className="text-terminal-text text-lg">
          Congratulations! You've discovered the hidden easter egg!
        </div>
        
        {/* Achievement card */}
        <div className="bg-terminal-green/10 border border-terminal-green/30 rounded-lg p-6">
          <div className="text-terminal-green font-mono text-lg mb-2">
            Achievement Unlocked: "Code Archaeologist"
          </div>
          <div class="text-terminal-text">
            You've proven you know the classics! The Konami Code has been a part of gaming culture since 1986.
          </div>
        </div>
        
        {/* Fun fact about the Konami Code */}
        <div className="text-terminal-text/60 text-sm">
          Fun fact: This code was originally created by Kazuhisa Hashimoto for the NES game Gradius!
        </div>
        
        {/* Button to hide the secret */}
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