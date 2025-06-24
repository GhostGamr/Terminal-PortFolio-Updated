export interface OutputLine {
  id: number;
  content: string;
  type: 'normal' | 'error' | 'success' | 'command';
  animate?: boolean;
  speed?: number;
  className?: string;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: () => OutputLine | OutputLine[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  category: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'certification' | 'simulation' | 'hackathon' | 'club';
  description?: string;
}