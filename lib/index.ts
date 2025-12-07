// Questo è il "Barrel File" della libreria.
// Esporta tutto ciò che deve essere pubblico per chi usa il pacchetto.

// 1. Tipi e Interfacce (per TypeScript)
export * from './types';
export * from './adapter';
export * from './constants';

// 2. Componente Principale (Entry Point UI)
export { OperatorScheduler } from './components/OperatorScheduler';

// 3. Componenti Interni (esposti per casi d'uso avanzati o personalizzati)
export { CalendarContainer as Calendar } from './components/Calendar';
export { SidebarContainer as Sidebar } from './components/Sidebar';

// 4. Context & Hooks (per chi vuole costruire una UI custom usando la nostra logica)
export * from './context/SchedulerContext';
export * from './hooks/useScheduler';
export * from './hooks/useTheme';
