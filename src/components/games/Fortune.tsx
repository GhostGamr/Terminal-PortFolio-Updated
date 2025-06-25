import React from 'react';

// Collection of inspirational quotes and programming wisdom
const fortunes = [
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your future is created by what you do today, not tomorrow.",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "In order to be irreplaceable, one must always be different. - Coco Chanel",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
  "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs",
  "People who are crazy enough to think they can change the world, are the ones who do. - Rob Siltanen",
  "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
  "Talk is cheap. Show me the code. - Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
  "The best error message is the one that never shows up. - Thomas Fuchs"
];

/**
 * Fortune Component
 * 
 * Displays a random inspirational quote or programming wisdom.
 * Mimics the classic Unix 'fortune' command with:
 * - Random quote selection from curated collection
 * - Terminal-style formatting
 * - Mix of general wisdom and programming-specific quotes
 * - Encouragement to run again for more fortunes
 */
const Fortune: React.FC = () => {
  // Select random fortune from the collection
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Fortune display card */}
      <div className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-green/5">
        {/* Command prompt simulation */}
        <div className="text-terminal-green font-mono text-sm mb-2">$ fortune</div>
        
        {/* Fortune text */}
        <div className="text-terminal-text text-lg leading-relaxed italic">
          "{randomFortune}"
        </div>
        
        {/* Instructions for getting more fortunes */}
        <div className="mt-4 text-terminal-text/60 text-sm">
          Press any key or run 'fortune' again for another fortune...
        </div>
      </div>
    </div>
  );
};

export default Fortune;