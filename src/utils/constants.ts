import { OutputLine } from '../types/terminal';

// Terminal prompt configuration
export const TERMINAL_PROMPT = '➜ ~ $';

// ASCII art banner for the portfolio - displays "GHOSTGAMR"
export const ASCII_BANNER = `
 ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗ ██████╗  █████╗ ███╗   ███╗██████╗ 
██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔════╝ ██╔══██╗████╗ ████║██╔══██╗
██║  ███╗███████║██║   ██║███████╗   ██║   ██║  ███╗███████║██╔████╔██║██████╔╝
██║   ██║██╔══██║██║   ██║╚════██║   ██║   ██║   ██║██╔══██║██║╚██╔╝██║██╔══██╗
╚██████╔╝██║  ██║╚██████╔╝███████║   ██║   ╚██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
`;

// Tagline displayed below the banner
export const TAGLINE = "Full Stack Developer | AI Enthusiast | Problem Solver | Dreamer (Procastinator)";

// List of all available terminal commands
export const AVAILABLE_COMMANDS = [
  'banner',      // Display ASCII art banner
  'about',       // Personal information and interests
  'services',    // Professional services offered
  'projects',    // Portfolio projects showcase
  'achievements',// Certifications and accomplishments
  'contact',     // Contact information and social links
  'fun',         // Fun commands and games overview
  'help',        // Command help and usage guide
  'clear',       // Clear terminal output
  'echo',        // Echo back user message
  'cowsay',      // ASCII cow with custom message
  'matrix',      // Matrix digital rain animation
  'snake',       // Snake game
  'fortune',     // Random fortune/quote generator
  'konami'       // Konami code easter egg
];

// Command descriptions for help system
export const COMMAND_DESCRIPTIONS = {
  banner: 'Display the ASCII art banner',
  about: 'Learn more about me',
  services: 'View my services and expertise',
  projects: 'Explore my featured projects',
  achievements: 'See my certifications and accomplishments',
  contact: 'Get in touch with me',
  fun: 'Discover easter eggs and mini-games',
  help: 'Show all available commands',
  clear: 'Clear the terminal screen',
  echo: 'Echo back your message'
};

// Initial output array - empty to prevent auto-loading banner
export const INITIAL_OUTPUT: OutputLine[] = [];