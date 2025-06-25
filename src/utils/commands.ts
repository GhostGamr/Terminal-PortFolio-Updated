import { AVAILABLE_COMMANDS } from './constants';

/**
 * Command Utilities
 * 
 * Helper functions for command processing and validation
 */

/**
 * Get command suggestions based on user input
 * Returns up to 5 matching commands that start with the input string
 * 
 * @param input - Current user input string
 * @returns Array of matching command suggestions
 */
export const getCommandSuggestions = (input: string): string[] => {
  // Return empty array if no input provided
  if (!input.trim()) return [];
  
  // Filter commands that start with the input (case-insensitive)
  const suggestions = AVAILABLE_COMMANDS.filter(cmd => 
    cmd.toLowerCase().startsWith(input.toLowerCase())
  );
  
  // Limit to 5 suggestions to avoid overwhelming the user
  return suggestions.slice(0, 5);
};

/**
 * Check if a command is valid
 * Validates the base command (first word) against available commands
 * 
 * @param command - Full command string to validate
 * @returns Boolean indicating if command is valid
 */
export const isValidCommand = (command: string): boolean => {
  // Extract base command (first word before any spaces)
  const [baseCommand] = command.split(' ');
  
  // Check if base command exists in available commands list
  return AVAILABLE_COMMANDS.includes(baseCommand.toLowerCase());
};