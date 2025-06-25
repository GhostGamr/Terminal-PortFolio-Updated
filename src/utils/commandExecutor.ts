import { OutputLine } from '../types/terminal';
import { ASCII_BANNER, TAGLINE, COMMAND_DESCRIPTIONS } from './constants';

/**
 * Command Executor
 * 
 * Central command processing system that handles all terminal commands.
 * Each command returns OutputLine(s) that get displayed in the terminal.
 * 
 * Supported commands:
 * - banner: Display ASCII art banner
 * - about: Personal information
 * - services: Professional services
 * - projects: Portfolio showcase
 * - achievements: Certifications and accomplishments
 * - contact: Contact information
 * - fun: Games and easter eggs overview
 * - Game commands: cowsay, matrix, snake, fortune, konami
 * - Utility commands: help, clear, echo
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
          animate: false,
          className: 'mb-4'
        },
        {
          id: commandId + 1,
          content: `<div class="text-center text-terminal-text text-lg font-semibold mb-6">${TAGLINE}</div>`,
          type: 'normal',
          animate: false,
          speed: 15
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
          animate: false,
          className: 'mb-6'
        },
        {
          id: commandId + 3,
          content: `<div class="text-terminal-text text-sm text-center mt-4">
            Type <span class="text-terminal-green">help</span> to see available commands.
          </div>`,
          type: 'normal',
          animate: false,
          className: 'mb-6'
        }
      ];

    /**
     * ABOUT COMMAND
     * Personal information, interests, and background
     */
    case 'about':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">Gathering facts… Done. Printing biography.</span>',
          type: 'success',
          animate: true,
          speed: 20
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
          speed: 15
        }
      ];

    /**
     * SERVICES COMMAND
     * Professional services and expertise areas
     */
    case 'services':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">Loading service catalog...</span>',
          type: 'success',
          animate: true,
          speed: 25
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
          animate: false,
          className: 'mb-4'
        }
      ];

    /**
     * PROJECTS COMMAND
     * Portfolio projects showcase with detailed information
     */
    case 'projects':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">$ git branch --list-projects</span>',
          type: 'success',
          animate: true,
          speed: 20
        },
        {
          id: commandId + 1,
          content: `<div class="text-terminal-text mt-4">
            <p>Projects are coming soon:</p>
          </div>`,
          // content: `<div class="mt-4 space-y-6">
          //   <!-- AI Voice Assistant Project -->
          //   <div class="border border-terminal-green/30 rounded-lg p-4 hover:border-terminal-green hover:shadow-lg hover:shadow-terminal-green/20 transition-all duration-300">
          //     <div class="flex flex-wrap items-center justify-between mb-3">
          //       <h3 class="text-terminal-green font-semibold text-lg">AI Voice Assistant Platform</h3>
          //       <span class="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 rounded">VoiceTech</span>
          //     </div>
          //     <p class="text-terminal-text mb-3">
          //       Built a comprehensive voice assistant platform with real-time speech recognition, 
          //       natural language understanding, and multi-language support. Handles 10k+ daily interactions.
          //     </p>
          //     <div class="flex flex-wrap gap-2 mb-3">
          //       <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Python</span>
          //       <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">FastAPI</span>
          //       <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">React</span>
          //       <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">TensorFlow</span>
          //       <span class="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">WebRTC</span>
          //     </div>
          //     <div class="flex gap-3">
          //       <a href="#" class="text-terminal-green hover:text-terminal-green/80 underline">GitHub →</a>
          //       <a href="#" class="text-terminal-blue hover:text-terminal-blue/80 underline">Live Demo →</a>
          //     </div>
          //   </div>

          //   <!-- HealthTech Analytics Project -->
          //   <div class="border border-terminal-blue/30 rounded-lg p-4 hover:border-terminal-blue hover:shadow-lg hover:shadow-terminal-blue/20 transition-all duration-300">
          //     <div class="flex flex-wrap items-center justify-between mb-3">
          //       <h3 class="text-terminal-blue font-semibold text-lg">HealthTech Analytics Dashboard</h3>
          //       <span class="text-xs bg-terminal-blue/20 text-terminal-blue px-2 py-1 rounded">HealthTech</span>
          //     </div>
          //     <p class="text-terminal-text mb-3">
          //       Developed a real-time healthcare analytics platform that processes patient data, 
          //       generates insights, and provides predictive analytics for better patient outcomes.
          //     </p>
          //     <div class="flex flex-wrap gap-2 mb-3">
          //       <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">TypeScript</span>
          //       <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Next.js</span>
          //       <span class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">D3.js</span>
          //       <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">PostgreSQL</span>
          //       <span class="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Docker</span>
          //     </div>
          //     <div class="flex gap-3">
          //       <a href="#" class="text-terminal-green hover:text-terminal-green/80 underline">GitHub →</a>
          //       <a href="#" class="text-terminal-blue hover:text-terminal-blue/80 underline">Case Study →</a>
          //     </div>
          //   </div>

          //   <!-- Smart Trading Algorithm Project -->
          //   <div class="border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300">
          //     <div class="flex flex-wrap items-center justify-between mb-3">
          //       <h3 class="text-yellow-500 font-semibold text-lg">Smart Trading Algorithm</h3>
          //       <span class="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">AI</span>
          //     </div>
          //     <p class="text-terminal-text mb-3">
          //       Created an intelligent trading system using machine learning to analyze market patterns 
          //       and execute trades. Achieved 23% better performance than traditional strategies.
          //     </p>
          //     <div class="flex flex-wrap gap-2 mb-3">
          //       <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Python</span>
          //       <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Pandas</span>
          //       <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Scikit-learn</span>
          //       <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Redis</span>
          //       <span class="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">AWS</span>
          //     </div>
          //     <div class="flex gap-3">
          //       <a href="#" class="text-terminal-green hover:text-terminal-green/80 underline">GitHub →</a>
          //       <a href="#" class="text-terminal-blue hover:text-terminal-blue/80 underline">Research Paper →</a>
          //     </div>
          //   </div>
          // </div>`,
          type: 'normal',
          animate: false,
          className: 'mb-4'
        }
      ];

    /**
     * ACHIEVEMENTS COMMAND
     * Certifications, job simulations, and accomplishments
     */
    case 'achievements':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">$ cat achievements.log | sort -r</span>',
          type: 'success',
          animate: true,
          speed: 20
        },
        {
          id: commandId + 1,
          content: `<div class="text-terminal-text mt-4">
            <p>Achievements are loading:</p>
            </div>`,
          // content: `<div class="mt-4 space-y-4">
          //   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          //     <!-- Certifications Section -->
          //     <div class="space-y-3">
          //       <h3 class="text-terminal-green font-semibold text-lg border-b border-terminal-green/30 pb-1">🏆 Certifications</h3>
          //       <div class="space-y-2">
          //         <div class="flex items-center gap-3 p-2 border border-terminal-green/20 rounded">
          //           <span class="text-terminal-green">✓</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">AWS Solutions Architect</div>
          //             <div class="text-terminal-text/60 text-sm">Amazon Web Services • 2024</div>
          //           </div>
          //         </div>
          //         <div class="flex items-center gap-3 p-2 border border-terminal-green/20 rounded">
          //           <span class="text-terminal-green">✓</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">Machine Learning Specialization</div>
          //             <div class="text-terminal-text/60 text-sm">DeepLearning.AI • 2023</div>
          //           </div>
          //         </div>
          //         <div class="flex items-center gap-3 p-2 border border-terminal-green/20 rounded">
          //           <span class="text-terminal-green">✓</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">Azure Developer Associate</div>
          //             <div class="text-terminal-text/60 text-sm">Microsoft • 2023</div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
              
          //     <!-- Job Simulations Section -->
          //     <div class="space-y-3">
          //       <h3 class="text-terminal-blue font-semibold text-lg border-b border-terminal-blue/30 pb-1">💼 Job Simulations</h3>
          //       <div class="space-y-2">
          //         <div class="flex items-center gap-3 p-2 border border-terminal-blue/20 rounded">
          //           <span class="text-terminal-blue">●</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">Software Engineering Virtual Experience</div>
          //             <div class="text-terminal-text/60 text-sm">J.P. Morgan Chase & Co. • 2024</div>
          //           </div>
          //         </div>
          //         <div class="flex items-center gap-3 p-2 border border-terminal-blue/20 rounded">
          //           <span class="text-terminal-blue">●</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">Backend Engineering Program</div>
          //             <div class="text-terminal-text/60 text-sm">Skyscanner • 2024</div>
          //           </div>
          //         </div>
          //         <div class="flex items-center gap-3 p-2 border border-terminal-blue/20 rounded">
          //           <span class="text-terminal-blue">●</span>
          //           <div>
          //             <div class="text-terminal-text font-medium">Data Science Virtual Internship</div>
          //             <div class="text-terminal-text/60 text-sm">Accenture • 2023</div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
            
          //   <!-- Hackathons & Competitions Section -->
          //   <div class="mt-6">
          //     <h3 class="text-yellow-500 font-semibold text-lg border-b border-yellow-500/30 pb-1 mb-3">🚀 Hackathons & Competitions</h3>
          //     <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          //       <div class="flex items-center gap-3 p-2 border border-yellow-500/20 rounded">
          //         <span class="text-yellow-500">🥇</span>
          //         <div>
          //           <div class="text-terminal-text font-medium">1st Place - AI Healthcare Hackathon</div>
          //           <div class="text-terminal-text/60 text-sm">TechCrunch Disrupt • 2024</div>
          //         </div>
          //       </div>
          //       <div class="flex items-center gap-3 p-2 border border-yellow-500/20 rounded">
          //         <span class="text-yellow-500">🥈</span>
          //         <div>
          //           <div class="text-terminal-text font-medium">2nd Place - FinTech Innovation Challenge</div>
          //           <div class="text-terminal-text/60 text-sm">MIT • 2023</div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>`,
          type: 'normal',
          animate: false,
          className: 'mb-4'
        }
      ];

    /**
     * CONTACT COMMAND
     * Contact information and social media links
     */
    case 'contact':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">Establishing secure connections...</span>',
          type: 'success',
          animate: true,
          speed: 25
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
          animate: false,
          className: 'mb-4'
        }
      ];

    /**
     * FUN COMMAND
     * Overview of available games and easter eggs
     */
    case 'fun':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">Initializing fun protocols...</span>',
          type: 'success',
          animate: true,
          speed: 25
        },
        {
          id: commandId + 1,
          content: `<div class="mt-4">
            <div class="text-terminal-text mb-4">Welcome to the fun zone! Here are some easter eggs to try:</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- CowSay Game Card -->
              <div class="border border-terminal-green/30 rounded p-3 hover:border-terminal-green transition-all">
                <div class="text-terminal-green font-mono">$ cowsay "Hello World!"</div>
                <div class="text-terminal-text/60 text-sm mt-1">Classic ASCII cow says your message</div>
              </div>
              <!-- Matrix Game Card -->
              <div class="border border-terminal-blue/30 rounded p-3 hover:border-terminal-blue transition-all">
                <div class="text-terminal-blue font-mono">$ matrix</div>
                <div class="text-terminal-text/60 text-sm mt-1">Enter the Matrix digital rain</div>
              </div>
              <!-- Snake Game Card -->
              <div class="border border-yellow-500/30 rounded p-3 hover:border-yellow-500 transition-all">
                <div class="text-yellow-500 font-mono">$ snake</div>
                <div class="text-terminal-text/60 text-sm mt-1">Play a classic Snake game</div>
              </div>
              <!-- Fortune Game Card -->
              <div class="border border-purple-500/30 rounded p-3 hover:border-purple-500 transition-all">
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
          animate: false
        }
      ];

    /**
     * GAME COMMANDS
     * Interactive games and activities
     */
    
    // CowSay - ASCII cow with custom message
    case 'cowsay':
      const cowMessage = fullArgs || 'Hello World!';
      return {
        id: commandId,
        content: `<div id="cowsay-${commandId}"></div>`,
        type: 'normal',
        animate: false,
        className: 'cowsay-container'
      };

    // Matrix - Digital rain animation
    case 'matrix':
      return {
        id: commandId,
        content: `<div id="matrix-${commandId}"></div>`,
        type: 'normal',
        animate: false,
        className: 'matrix-container'
      };

    // Snake - Classic Snake game
    case 'snake':
      return {
        id: commandId,
        content: `<div id="snake-${commandId}"></div>`,
        type: 'normal',
        animate: false,
        className: 'snake-container'
      };

    // Fortune - Random quote/fortune generator
    case 'fortune':
      return {
        id: commandId,
        content: `<div id="fortune-${commandId}"></div>`,
        type: 'normal',
        animate: false,
        className: 'fortune-container'
      };

    // Konami - Secret easter egg
    case 'konami':
      return {
        id: commandId,
        content: `<div id="konami-${commandId}"></div>`,
        type: 'normal',
        animate: false,
        className: 'konami-container'
      };

    /**
     * HELP COMMAND
     * Display all available commands with descriptions
     */
    case 'help':
      return [
        {
          id: commandId,
          content: '<span class="text-terminal-green">Available commands:</span>',
          type: 'success',
          animate: true,
          speed: 20
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
          animate: false
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
     * Echo back user message
     */
    case 'echo':
      const message = fullArgs || 'Hello World!';
      return {
        id: commandId,
        content: message,
        type: 'normal',
        animate: true,
        speed: 15
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
        content: `<span class="text-red-400">command not found: ${baseCommand}</span><br>
                 <span class="text-terminal-text/60">Did you mean '<span class="text-terminal-green">${randomSuggestion}</span>'? Type '<span class="text-terminal-green">help</span>' to see all available commands.</span>`,
        type: 'error',
        animate: true,
        speed: 25
      };
  }
};