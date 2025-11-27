import React from 'react';
import { SidebarContainer as Sidebar } from './Sidebar';
import { CalendarContainer as Calendar } from './Calendar';
import { SchedulerProvider } from '../context/SchedulerContext';
import { SchedulerAdapter } from '../adapter';

interface OperatorSchedulerProps {
    adapter: SchedulerAdapter;
    isDarkMode?: boolean;
    onToggleTheme?: () => void;
}

export const OperatorScheduler: React.FC<OperatorSchedulerProps> = ({ 
  adapter, 
  isDarkMode, 
  onToggleTheme 
}) => {
  return (
    <SchedulerProvider adapter={adapter} isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            {/* Sidebar Container */}
            <Sidebar />

            {/* Main Content: Calendar Container */}
            <main className="flex-1 flex flex-col h-full overflow-hidden shadow-xl rounded-l-2xl border-l border-slate-200 dark:border-slate-800 ml-[-1px] z-0 relative">
                <Calendar />
            </main>
        </div>
    </SchedulerProvider>
  );
};