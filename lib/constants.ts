import { CalendarConfig } from "./types";

export const DEFAULT_CONFIG: CalendarConfig = {
  startHour: 7,
  endHour: 19,
  daysIncluded: [1, 2, 3, 4, 5, 6], // Monday to Saturday
  slotDurationMinutes: 15,
};