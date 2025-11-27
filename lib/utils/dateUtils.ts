import { DEFAULT_CONFIG } from "../constants";

// Helper to access config values safely or use defaults
const getConfig = () => DEFAULT_CONFIG;

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  // Adjust to get Monday (1) as start. If Sunday (0), go back 6 days.
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDateISO = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
};

export const formatDayName = (date: Date): string => {
  return date.toLocaleDateString('it-IT', { weekday: 'short' });
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
};

// Generates time slots array ["07:00", "07:15", ...]
export const generateTimeSlots = (config = getConfig()): string[] => {
  const slots: string[] = [];
  const totalSlots = (config.endHour - config.startHour) * (60 / config.slotDurationMinutes);
  
  for (let i = 0; i <= totalSlots; i++) {
    const totalMinutes = (config.startHour * 60) + (i * config.slotDurationMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    // Stop if we reach the exact end hour
    if (hours > config.endHour || (hours === config.endHour && mins > 0)) break;

    const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    slots.push(timeString);
  }
  return slots;
};

export const isSameDate = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};