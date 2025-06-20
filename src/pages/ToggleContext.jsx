// ToggleContext.js
import { createContext, useState, useEffect } from 'react';

export const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [usePreferredText, setUsePreferredText] = useState(
    localStorage.getItem('usePreferredText') === 'true'
  );

  // New: dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved !== null ? JSON.parse(saved) : true; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('usePreferredText', usePreferredText);
  }, [usePreferredText]);

  return (
    <ToggleContext.Provider
      value={{
        usePreferredText,
        setUsePreferredText,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
