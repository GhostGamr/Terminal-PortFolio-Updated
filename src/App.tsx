import React from 'react';
import Terminal from './components/Terminal';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-terminal-bg overflow-hidden">
      <div className="scanlines" />
      <Terminal />
    </div>
  );
}

export default App;