import { AVAILABLE_COMMANDS } from './constants';

export const getCommandSuggestions = (input: string): string[] => {
  if (!input.trim()) return [];
  
  const suggestions = AVAILABLE_COMMANDS.filter(cmd => 
    cmd.toLowerCase().startsWith(input.toLowerCase())
  );
  
  return suggestions.slice(0, 5); // Limit to 5 suggestions
};

export const isValidCommand = (command: string): boolean => {
  const [baseCommand] = command.split(' ');
  return AVAILABLE_COMMANDS.includes(baseCommand.toLowerCase());
};