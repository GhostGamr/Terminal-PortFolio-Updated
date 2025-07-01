import { OutputLine } from '../types/terminal';
import { ASCII_BANNER, TAGLINE, COMMAND_DESCRIPTIONS } from './constants';

/**
 * Command Executor
 * 
 * Central command processing system that handles all terminal commands.
 * Each command returns OutputLine(s) that get displayed in the terminal.
 * All text output now uses enhanced typewriter animation for authentic feel.
 */
export const executeTerminalCommand = (command: string): OutputLine | OutputLine[] => {
  // Parse command and arguments
  const [baseCommand, ...args] = command.toLowerCase().split(' ');
  const fullArgs = args.join(' ');
  
  // Generate unique ID for this command execution
  const commandId = Date.now();

  switch (baseCommand) {
    /**
     * BANNER COMMAND
     * Displays the main ASCII art banner with GHOSTGAMR branding
     */
    case 'banner':
      return [
        {
          id: commandId,
          content: `<pre class="text-terminal-green font-bold text-xs md:text-sm glitch" data-text="${ASCII_BANNER}">${ASCII_BANNER}</pre>`,
          type: 'success',
          animate: false, // ASCII art displays instantly for impact
          className: 'mb-4'
        },
        {
          id: commandId + 1,
          content: `<div class="text-center text-terminal-text text-lg font-semibold mb-6">${TAGLINE}</div>`,
          type: 'normal',
          animate: true,
          speed: 25 // Slower for emphasis
        },
        {
          id: commandId + 2,
          content: `<div class="flex gap-4 justify-center mt-4">
            <button onclick="window.open('https://github.com/GhostGamr', '_blank')" class="px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green rounded hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300 cursor-pointer">
              $ ./see-my-work
            </button>
            <button onclick="window.open('https://www.linkedin.com/in/harshit-raj-mishra-641111306/', '_blank')" class="px-4 py-2 bg-terminal-blue/20 text-terminal-blue border border-terminal-blue rounded hover:bg-terminal-blue hover:text-terminal-bg transition-all duration-300 cursor-pointer">
              $ ./connect-with-me
            </button>
          </div>`,
          type: 'normal',
          animate: false, // Buttons appear instantly after text
          className: 'mb-6'
        },
        {
          id: commandId + 3,
          content: `<div class="text-terminal-text text-sm text-center mt-4">
            Type <span class="text-terminal-green">help</span> to see available commands.
          </div>`,
          type: 'normal',
          animate: true,
          speed: 20,
          className: 'mb-6'
        }
      ];

    /**
     * ABOUT COMMAND
     * Personal information with enhanced typewriter animation
     */
    case 'about':
      return [
        {
          id: commandId,
          content: 'Gathering facts… Done. Printing biography.',
          type: 'success',
          animate: true,
          speed: 35 // Slightly slower for dramatic effect
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4 space-y-4">
            <p class="text-terminal-text">
              Hey there! I'm a passionate full-stack developer who loves crafting digital experiences 
              that make a difference. When I'm not coding, you'll find me studying something, playing a sport, 
              contributing to open source, or binge watching a show...
            </p>
            <div class="mt-4">
              <h3 class="text-terminal-green font-semibold mb-2">$ interests --list</h3>
              <ul class="space-y-1 pl-4">
                <li class="text-terminal-text">🚀 Building scalable web applications</li>
                <li class="text-terminal-text">🤖 Machine Learning & AI development</li>
                <li class="text-terminal-text">🏏 Sports</li>
                <li class="text-terminal-text">🍳 Playing Drums</li>
                <li class="text-terminal-text">🎤 Video Games</li>
                <li class="text-terminal-text">📚 Always learning something new</li>
              </ul>
            </div>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 20 // Comfortable reading speed
        }
      ];

    /**
     * SERVICES COMMAND
     * Professional services with typewriter animation
     */
    case 'services':
      return [
        {
          id: commandId,
          content: 'Loading service catalog...',
          type: 'success',
          animate: true,
          speed: 40
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Web Development Service Card -->
            <div class="border border-terminal-green/30 rounded-lg p-4 hover:border-terminal-green hover:shadow-lg hover:shadow-terminal-green/20 transition-all duration-300">
              <h3 class="text-terminal-green font-semibold text-lg mb-2">Web Development</h3>
              <ul class="space-y-1 text-terminal-text">
                <li>• Full-stack applications</li>
                <li>• React/Next.js frontends</li>
                <li>• Node.js/Python backends</li>
                <li>• Database design & optimization</li>
                <li>• API development & integration</li>
              </ul>
            </div>
            <!-- AI & ML Service Card -->
            <div class="border border-terminal-blue/30 rounded-lg p-4 hover:border-terminal-blue hover:shadow-lg hover:shadow-terminal-blue/20 transition-all duration-300">
              <h3 class="text-terminal-blue font-semibold text-lg mb-2">AI & Machine Learning</h3>
              <ul class="space-y-1 text-terminal-text">
                <li>• Custom ML model development</li>
                <li>• Natural Language Processing</li>
                <li>• Computer Vision solutions</li>
                <li>• AI integration & deployment</li>
                <li>• Data analysis & visualization</li>
              </ul>
            </div>
            <!-- Cloud & DevOps Service Card -->
            <div class="border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300">
              <h3 class="text-yellow-500 font-semibold text-lg mb-2">Cloud & DevOps</h3>
              <ul class="space-y-1 text-terminal-text">
                <li>• AWS/Azure cloud architecture</li>
                <li>• CI/CD pipeline setup</li>
                <li>• Docker containerization</li>
                <li>• Infrastructure as Code</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
            <!-- Consulting Service Card -->
            <div class="border border-purple-500/30 rounded-lg p-4 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <h3 class="text-purple-500 font-semibold text-lg mb-2">Consulting</h3>
              <ul class="space-y-1 text-terminal-text">
                <li>• Technical architecture review</li>
                <li>• Code audits & optimization</li>
                <li>• Team mentoring & training</li>
                <li>• Technology stack selection</li>
                <li>• Project planning & estimation</li>
              </ul>
            </div>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 15, // Faster for structured content
          className: 'mb-4'
        }
      ];

    /**
     * PROJECTS COMMAND
     * Portfolio projects with typewriter effect
     */
    case 'projects':
      return [
        {
          id: commandId,
          content: '$ git branch --list-projects',
          type: 'success',
          animate: true,
          speed: 30
        },
        {
          id: commandId + 1,
          content: `<div class="text-terminal-text mt-4">
            <p>Projects are coming soon...</p>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 25,
          className: 'mb-4'
        }
      ];

    /**
     * ACHIEVEMENTS COMMAND
     * Certifications and accomplishments with animation
     */
    case 'achievements':
      return [
        {
          id: commandId,
          content: '$ cat achievements.log | sort -r',
          type: 'success',
          animate: true,
          speed: 30
        },
        {
          id: commandId + 1,
          content: `<div class="text-terminal-text mt-4">
            <p>Achievements are loading...</p>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 25,
          className: 'mb-4'
        }
      ];

    /**
     * CONTACT COMMAND
     * Contact information with enhanced typewriter effect
     */
    case 'contact':
      return [
        {
          id: commandId,
          content: 'Establishing secure connections...',
          type: 'success',
          animate: true,
          speed: 45 // Slower for dramatic effect
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4 space-y-4">
            <div class="text-terminal-text">
              <p class="mb-4">Choose your preferred communication channel:</p>
              <div class="space-y-3">
                <!-- Email Contact -->
                <div onclick="window.open('https://mail.google.com/mail/u/0/#inbox?compose=new', '_blank')" class="flex items-center gap-3 p-3 border border-terminal-green/30 rounded hover:border-terminal-green hover:bg-terminal-green/5 transition-all cursor-pointer">
                  <span class="text-terminal-green font-mono">1.</span>
                  <span class="text-terminal-text">📧</span>
                  <div class="flex-1">
                    <div class="text-terminal-text font-medium">Email</div>
                    <div class="text-terminal-text/60 text-sm">your.email@example.com</div>
                  </div>
                  <span class="text-terminal-green text-sm">→</span>
                </div>
                
                <!-- LinkedIn Contact -->
                <div onclick="window.open('https://www.linkedin.com/in/harshit-raj-mishra-641111306/', '_blank')" class="flex items-center gap-3 p-3 border border-terminal-blue/30 rounded hover:border-terminal-blue hover:bg-terminal-blue/5 transition-all cursor-pointer">
                  <span class="text-terminal-blue font-mono">2.</span>
                  <span class="text-terminal-text">💼</span>
                  <div class="flex-1">
                    <div class="text-terminal-text font-medium">LinkedIn</div>
                    <div class="text-terminal-text/60 text-sm">Professional networking</div>
                  </div>
                  <span class="text-terminal-blue text-sm">→</span>
                </div>
                
                <!-- GitHub Contact -->
                <div onclick="window.open('https://github.com/GhostGamr', '_blank')" class="flex items-center gap-3 p-3 border border-purple-500/30 rounded hover:border-purple-500 hover:bg-purple-500/5 transition-all cursor-pointer">
                  <span class="text-purple-500 font-mono">3.</span>
                  <span class="text-terminal-text">🐙</span>
                  <div class="flex-1">
                    <div class="text-terminal-text font-medium">GitHub</div>
                    <div class="text-terminal-text/60 text-sm">Check out my code</div>
                  </div>
                  <span class="text-purple-500 text-sm">→</span>
                </div>
                
                <!-- Twitter/X Contact -->
                <div onclick="window.open('https://x.com/_thisishrm', '_blank')" class="flex items-center gap-3 p-3 border border-cyan-500/30 rounded hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer">
                  <span class="text-cyan-500 font-mono">4.</span>
                  <span class="text-terminal-text">🐦</span>
                  <div class="flex-1">
                    <div class="text-terminal-text font-medium">Twitter/X</div>
                    <div class="text-terminal-text/60 text-sm">Tech discussions & updates</div>
                  </div>
                  <span class="text-cyan-500 text-sm">→</span>
                </div>
              </div>
              
              <!-- Call to Action -->
              <div class="mt-6 p-4 border border-terminal-green/30 rounded bg-terminal-green/5">
                <div class="text-terminal-green text-sm font-mono">$ echo "Let's build something together."</div>
              </div>
            </div>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 18,
          className: 'mb-4'
        }
      ];

    /**
     * FUN COMMAND
     * Interactive games overview with clickable buttons
     */
    case 'fun':
      return [
        {
          id: commandId,
          content: 'Initializing fun protocols...',
          type: 'success',
          animate: true,
          speed: 40
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4">
            <div class="text-terminal-text mb-4">Welcome to the fun zone! Click any game to play:</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- CowSay Game Card -->
              <div onclick="document.querySelector('input').value='cowsay Hello World!'; document.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));" class="border border-terminal-green/30 rounded p-3 hover:border-terminal-green transition-all cursor-pointer hover:bg-terminal-green/5">
                <div class="text-terminal-green font-mono">$ cowsay "Hello World!"</div>
                <div class="text-terminal-text/60 text-sm mt-1">Classic ASCII cow says your message</div>
              </div>
              <!-- Matrix Game Card -->
              <div onclick="document.querySelector('input').value='matrix'; document.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));" class="border border-terminal-blue/30 rounded p-3 hover:border-terminal-blue transition-all cursor-pointer hover:bg-terminal-blue/5">
                <div class="text-terminal-blue font-mono">$ matrix</div>
                <div class="text-terminal-text/60 text-sm mt-1">Enter the Matrix digital rain</div>
              </div>
              <!-- Snake Game Card -->
              <div onclick="document.querySelector('input').value='snake'; document.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));" class="border border-yellow-500/30 rounded p-3 hover:border-yellow-500 transition-all cursor-pointer hover:bg-yellow-500/5">
                <div class="text-yellow-500 font-mono">$ snake</div>
                <div class="text-terminal-text/60 text-sm mt-1">Play a classic Snake game</div>
              </div>
              <!-- Fortune Game Card -->
              <div onclick="document.querySelector('input').value='fortune'; document.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));" class="border border-purple-500/30 rounded p-3 hover:border-purple-500 transition-all cursor-pointer hover:bg-purple-500/5">
                <div class="text-purple-500 font-mono">$ fortune</div>
                <div class="text-terminal-text/60 text-sm mt-1">Display a random fortune</div>
              </div>
            </div>
            <!-- Pro Tip Section -->
            <div class="mt-4 p-3 bg-terminal-green/10 border border-terminal-green/30 rounded">
              <div class="text-terminal-green font-mono">Pro tip:</div>
              <div class="text-terminal-text text-sm mt-1">Try typing <code class="bg-terminal-bg px-1 rounded">konami</code> for a special surprise! 🎮</div>
            </div>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 20
        }
      ];

    /**
     * GAME COMMANDS
     * Interactive games and activities
     */
    
    // CowSay - ASCII cow with custom message
    case 'cowsay':
      const cowMessage = fullArgs || 'Hello World!';
      return [
        {
          id: commandId,
          content: `Summoning ASCII cow...`,
          type: 'success',
          animate: true,
          speed: 35
        },
        {
          id: commandId + 1,
          content: `<div id="cowsay-${commandId}" data-message="${cowMessage}"></div>`,
          type: 'normal',
          animate: false,
          className: 'cowsay-container mt-4'
        }
      ];

    // Matrix - Digital rain animation
    case 'matrix':
      return [
        {
          id: commandId,
          content: 'Entering the Matrix...',
          type: 'success',
          animate: true,
          speed: 40
        },
        {
          id: commandId + 1,
          content: `<div id="matrix-${commandId}"></div>`,
          type: 'normal',
          animate: false,
          className: 'matrix-container mt-4'
        }
      ];

    // Snake - Classic Snake game
    case 'snake':
      return [
        {
          id: commandId,
          content: 'Loading Snake game...',
          type: 'success',
          animate: true,
          speed: 35
        },
        {
          id: commandId + 1,
          content: `<div id="snake-${commandId}"></div>`,
          type: 'normal',
          animate: false,
          className: 'snake-container mt-4'
        }
      ];

    // Fortune - Random quote/fortune generator
    case 'fortune':
      return [
        {
          id: commandId,
          content: 'Consulting the digital oracle...',
          type: 'success',
          animate: true,
          speed: 40
        },
        {
          id: commandId + 1,
          content: `<div id="fortune-${commandId}"></div>`,
          type: 'normal',
          animate: false,
          className: 'fortune-container mt-4'
        }
      ];

    // Konami - Secret easter egg
    case 'konami':
      return [
        {
          id: commandId,
          content: 'Activating Konami Code detector...',
          type: 'success',
          animate: true,
          speed: 35
        },
        {
          id: commandId + 1,
          content: `<div id="konami-${commandId}"></div>`,
          type: 'normal',
          animate: false,
          className: 'konami-container mt-4'
        }
      ];

    /**
     * HELP COMMAND
     * Display all available commands with typewriter animation
     */
    case 'help':
      return [
        {
          id: commandId,
          content: 'Available commands:',
          type: 'success',
          animate: true,
          speed: 30
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4 space-y-2">
            <!-- Main Commands List -->
            ${Object.entries(COMMAND_DESCRIPTIONS).map(([cmd, desc]) => 
              `<div class="flex">
                <span class="text-terminal-green font-mono w-20">${cmd}</span>
                <span class="text-terminal-text">- ${desc}</span>
              </div>`
            ).join('')}
            
            <!-- Fun Commands Section -->
            <div class="mt-4 text-terminal-text/60 text-sm">
              <p>🎮 Fun Commands:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div class="flex">
                  <span class="text-terminal-green font-mono w-20">cowsay</span>
                  <span class="text-terminal-text">- ASCII cow with message</span>
                </div>
                <div class="flex">
                  <span class="text-terminal-blue font-mono w-20">matrix</span>
                  <span class="text-terminal-text">- Matrix digital rain</span>
                </div>
                <div class="flex">
                  <span class="text-yellow-500 font-mono w-20">snake</span>
                  <span class="text-terminal-text">- Play Snake game</span>
                </div>
                <div class="flex">
                  <span class="text-purple-500 font-mono w-20">fortune</span>
                  <span class="text-terminal-text">- Random fortune cookie</span>
                </div>
                <div class="flex">
                  <span class="text-red-500 font-mono w-20">konami</span>
                  <span class="text-terminal-text">- Secret easter egg</span>
                </div>
              </div>
            </div>
            
            <!-- Usage Tips -->
            <div class="mt-4 text-terminal-text/60 text-sm">
              <p>💡 Tips:</p>
              <ul class="list-disc list-inside space-y-1 mt-2">
                <li>Use ↑/↓ arrow keys to browse command history</li>
                <li>Press Tab for command autocompletion</li>
                <li>Type a command and press Enter to execute</li>
                <li>Try 'cowsay your message' to make the cow say something custom</li>
              </ul>
            </div>
          </div>`,
          type: 'normal',
          animate: true,
          speed: 15 // Faster for reference material
        }
      ];

    /**
     * CLEAR COMMAND
     * Clear terminal output (handled by terminal hook)
     */
    case 'clear':
      return {
        id: commandId,
        content: '',
        type: 'normal',
        animate: false
      };

    /**
     * ECHO COMMAND
     * Echo back user message with typewriter effect
     */
    case 'echo':
      const message = fullArgs || 'Hello World!';
      return {
        id: commandId,
        content: message,
        type: 'normal',
        animate: true,
        speed: 25
      };

    /**
     * DEFAULT CASE
     * Handle unknown commands with helpful suggestions
     */
    default:
      const suggestions = ['help', 'about', 'projects', 'fun'];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      return {
        id: commandId,
        content: `command not found: ${baseCommand}\nDid you mean '${randomSuggestion}'? Type 'help' to see all available commands.`,
        type: 'error',
        animate: true,
        speed: 30
      };
  }
};