import React, { useState } from 'react';
import { OperatorScheduler } from './lib';
import { fakeAdapter } from './demo/adapters/fakeAdapter';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  // External Theme Management
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 transition-colors duration-200`}>
      {/* External Application Header */}
      <header className="h-14 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-50">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">S</div>
            <h1 className="font-semibold text-slate-800 dark:text-white">Service Scheduler</h1>
         </div>

         {/* The External Theme Toggle Button */}
         <button 
            onClick={() => setIsDarkMode(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 text-sm font-medium"
         >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
         </button>
      </header>

      {/* The Scheduler Component Filling the Remaining Space */}
      <div className="flex-1 overflow-hidden relative">
        <OperatorScheduler 
          adapter={fakeAdapter} 
          isDarkMode={isDarkMode}
          // Pass callback even if not used internally by the new View, supports future/internal toggles
          onToggleTheme={() => setIsDarkMode(prev => !prev)}
        />
      </div>
    </div>
  );
};

export default App;