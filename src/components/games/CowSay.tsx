import React from 'react';

interface CowSayProps {
  message: string;
}

/**
 * CowSay Component
 * 
 * Renders the classic ASCII cow that "says" a custom message.
 * Features:
 * - Dynamic speech bubble sizing based on message length
 * - Authentic ASCII art cow design
 * - Proper text formatting and alignment
 * 
 * @param message - The message for the cow to say
 */
const CowSay: React.FC<CowSayProps> = ({ message }) => {
  // Calculate bubble width based on message length (minimum 20 characters)
  const bubbleWidth = Math.max(message.length + 4, 20);
  
  // Create top and bottom borders for speech bubble
  const topBorder = ' ' + '_'.repeat(bubbleWidth - 2) + ' ';
  const bottomBorder = ' ' + '-'.repeat(bubbleWidth - 2) + ' ';
  
  return (
    <div className="font-mono text-terminal-text whitespace-pre">
{/* Speech bubble with message */}
{topBorder}
{'< ' + message.padEnd(bubbleWidth - 4) + ' >'}
{bottomBorder}
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
    </div>
  );
};

export default CowSay;