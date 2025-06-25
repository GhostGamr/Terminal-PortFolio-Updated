import { OutputLine } from '../types/terminal';

export const TERMINAL_PROMPT = '➜ ~ $';

export const ASCII_BANNER = `
███████╗███████╗██╗   ██╗    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔════╝██╔════╝██║   ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
███████╗█████╗  ██║   ██║    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
╚════██║██╔══╝  ╚██╗ ██╔╝    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
███████║███████╗ ╚████╔╝     ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚══════╝╚══════╝  ╚═══╝      ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`;

export const TAGLINE = "Full Stack Developer | AI Enthusiast | Problem Solver";

export const AVAILABLE_COMMANDS = [
  'banner',
  'about', 
  'services',
  'projects',
  'achievements',
  'contact',
  'fun',
  'help',
  'clear',
  'echo',
  'cowsay',
  'matrix',
  'snake',
  'fortune',
  'konami'
];

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

export const INITIAL_OUTPUT: OutputLine[] = [];