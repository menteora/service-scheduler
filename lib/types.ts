export interface Operator {
  id: string;
  name: string;
  color: string; // Tailwind bg color class prefix or hex
  avatar?: string;
}

export interface Intervention {
  id: string;
  title: string;
  client: string;
  address: string;
  durationMinutes: number; // Defaults to 15
  
  // Scheduling info (null if in the sidebar)
  date?: string; // ISO Date string YYYY-MM-DD
  startTime?: string; // HH:mm format
  operatorId?: string;
}

export interface CalendarConfig {
  startHour: number; // e.g., 7
  endHour: number; // e.g., 19
  daysIncluded: number[]; // 0=Sun, 1=Mon, ..., 6=Sat. Requirement: Mon-Sat (1-6)
  slotDurationMinutes: number; // e.g., 15
}