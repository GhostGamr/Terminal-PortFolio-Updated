import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    const maxPos = CANVAS_SIZE / GRID_SIZE;
    return {
      x: Math.floor(Math.random() * maxPos),
      y: Math.floor(Math.random() * maxPos)
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      const maxPos = CANVAS_SIZE / GRID_SIZE;
      if (head.x < 0 || head.x >= maxPos || head.y < 0 || head.y >= maxPos) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;
    
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-terminal-green text-center">
        <div className="text-lg font-bold">SNAKE GAME</div>
        <div className="text-sm text-terminal-text">Score: {score}</div>
      </div>
      
      <div 
        className="relative border border-terminal-green/50 bg-terminal-bg"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? 'bg-terminal-green' : 'bg-terminal-green/70'}`}
            style={{
              left: segment.x * GRID_SIZE,
              top: segment.y * GRID_SIZE,
              width: GRID_SIZE - 1,
              height: GRID_SIZE - 1,
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * GRID_SIZE + 2,
            top: food.y * GRID_SIZE + 2,
            width: GRID_SIZE - 4,
            height: GRID_SIZE - 4,
          }}
        />
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-terminal-bg/90 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-400 text-xl font-bold mb-2">GAME OVER</div>
              <div className="text-terminal-text mb-4">Final Score: {score}</div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green rounded hover:bg-terminal-green hover:text-terminal-bg transition-all"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-terminal-bg/90 flex items-center justify-center">
            <div className="text-center">
              <div className="text-terminal-green text-xl font-bold mb-4">SNAKE</div>
              <div className="text-terminal-text mb-4 text-sm">
                Use arrow keys to control the snake<br/>
                Eat the red food to grow and score points
              </div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green rounded hover:bg-terminal-green hover:text-terminal-bg transition-all"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-terminal-text/60 text-xs text-center">
        Use arrow keys to move • Avoid walls and yourself
      </div>
    </div>
  );
};

export default SnakeGame;