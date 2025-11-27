import React, { useState } from 'react';
import { OperatorScheduler } from './lib';
import { fakeAdapter } from './demo/adapters/fakeAdapter';

const App: React.FC = () => {
  // External Theme Management
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <OperatorScheduler 
      adapter={fakeAdapter} 
      isDarkMode={isDarkMode}
      onToggleTheme={() => setIsDarkMode(prev => !prev)}
    />
  );
};

export default App;