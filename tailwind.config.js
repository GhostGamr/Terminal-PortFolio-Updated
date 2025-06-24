/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Mono', 'Consolas', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        'terminal-bg': '#0d1117',
        'terminal-window': '#161b22',
        'terminal-header': '#21262d',
        'terminal-border': '#30363d',
        'terminal-text': '#e6edf3',
        'terminal-green': '#00ff99',
        'terminal-blue': '#58a6ff',
        'terminal-yellow': '#f1e05a',
        'terminal-red': '#ff6b6b',
        'terminal-purple': '#a855f7',
        'terminal-cyan': '#39d0d6',
      },
      animation: {
        'blink': 'blink 1s infinite',
        'matrix': 'matrix 20s linear infinite',
        'glitch': 'glitch 2s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
};