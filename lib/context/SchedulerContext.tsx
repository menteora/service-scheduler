import React, { createContext, useContext, ReactNode } from "react";
import { useScheduler } from "../hooks/useScheduler";
import { useTheme } from "../hooks/useTheme";
import { SchedulerAdapter } from "../adapter";

type SchedulerContextType = ReturnType<typeof useScheduler> & ReturnType<typeof useTheme>;

const SchedulerContext = createContext<SchedulerContextType | null>(null);

interface SchedulerProviderProps {
  children: ReactNode;
  adapter: SchedulerAdapter;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const SchedulerProvider: React.FC<SchedulerProviderProps> = ({ 
  children, 
  adapter, 
  isDarkMode, 
  onToggleTheme 
}) => {
  const schedulerData = useScheduler(adapter);
  const themeData = useTheme(isDarkMode, onToggleTheme);

  return (
    <SchedulerContext.Provider value={{ ...schedulerData, ...themeData }}>
      {children}
    </SchedulerContext.Provider>
  );
};

export const useSchedulerContext = () => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error("useSchedulerContext must be used within a SchedulerProvider");
  }
  return context;
};