import { useEffect, useState, useCallback } from "react";

export function useTheme(externalIsDarkMode?: boolean, externalToggle?: () => void) {
  const [internalIsDarkMode, setInternalIsDarkMode] = useState(false);

  // Determine if we are in controlled mode
  const isControlled = externalIsDarkMode !== undefined;
  
  // Use external state if controlled, otherwise internal
  const isDarkMode = isControlled ? externalIsDarkMode : internalIsDarkMode;

  useEffect(() => {
    // Sync with document element to ensure Tailwind works
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    if (isControlled && externalToggle) {
      externalToggle();
    } else if (!isControlled) {
      setInternalIsDarkMode(prev => !prev);
    }
  }, [isControlled, externalToggle]);

  return { isDarkMode, toggleTheme };
}