import React from 'react';

interface CowSayProps {
  message: string;
}

const CowSay: React.FC<CowSayProps> = ({ message }) => {
  const bubbleWidth = Math.max(message.length + 4, 20);
  const topBorder = ' ' + '_'.repeat(bubbleWidth - 2) + ' ';
  const bottomBorder = ' ' + '-'.repeat(bubbleWidth - 2) + ' ';
  
  return (
    <div className="font-mono text-terminal-text whitespace-pre">
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