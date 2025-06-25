import React, { useEffect, useRef } from 'react';

/**
 * Matrix Rain Component
 * 
 * Creates the iconic Matrix digital rain effect using HTML5 Canvas.
 * Features:
 * - 60 FPS smooth animation
 * - Random character generation from Matrix-style character set
 * - Falling green text effect with fade trails
 * - Responsive canvas sizing
 * - Proper cleanup on component unmount
 */
const MatrixRain: React.FC = () => {
  // Canvas reference for direct drawing operations
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 400;

    // Character set for Matrix effect (letters, numbers, symbols)
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    // Font configuration
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    // Array to track drop positions for each column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationId: number;

    /**
     * Main animation loop
     * Draws the Matrix rain effect frame by frame
     */
    const draw = () => {
      // Create fade effect by drawing semi-transparent background
      ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = '#00ff99'; // Matrix green color
      ctx.font = fontSize + 'px monospace';

      // Draw characters for each column
      for (let i = 0; i < drops.length; i++) {
        // Select random character from matrix set
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Draw character at current drop position
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top when it reaches bottom (with random chance)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down one position
        drops[i]++;
      }

      // Schedule next frame
      animationId = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup function to cancel animation on unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Header with title and instructions */}
      <div className="text-terminal-green text-center mb-2">
        <div className="text-lg font-bold">MATRIX DIGITAL RAIN</div>
        <div className="text-sm text-terminal-text/60">Press Ctrl+C to exit</div>
      </div>
      
      {/* Canvas element for Matrix animation */}
      <canvas
        ref={canvasRef}
        className="border border-terminal-green/30 rounded bg-terminal-bg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default MatrixRain;