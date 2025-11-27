import { CalendarConfig, Intervention, Operator } from "../../lib/types";

export const SAMPLE_OPERATORS: Operator[] = [
  { id: "op-1", name: "Mario Rossi", color: "bg-blue-100 border-blue-300 text-blue-800" },
  { id: "op-2", name: "Luigi Verdi", color: "bg-green-100 border-green-300 text-green-800" },
];

export const INITIAL_INTERVENTIONS: Intervention[] = [
  {
    id: "int-1",
    title: "Boiler Maintenance",
    client: "Hotel Plaza",
    address: "Via Roma 1, Milano",
    durationMinutes: 15,
    date: undefined,
    startTime: undefined,
    operatorId: undefined,
  },
  {
    id: "int-2",
    title: "Leak Repair",
    client: "Bar Centrale",
    address: "Corso Italia 22, Monza",
    durationMinutes: 15,
    date: undefined,
    startTime: undefined,
    operatorId: undefined,
  },
  {
    id: "int-3",
    title: "Electrical Inspection",
    client: "School A. Volta",
    address: "Piazza Sempione, Milano",
    durationMinutes: 15,
    date: undefined,
    startTime: undefined,
    operatorId: undefined,
  },
  {
    id: "int-4",
    title: "AC Installation",
    client: "Office Tower B",
    address: "Via Dante 10, Milano",
    durationMinutes: 15,
    date: undefined,
    startTime: undefined,
    operatorId: undefined,
  },
  {
    id: "int-5",
    title: "Filter Change",
    client: "Gym Fit",
    address: "Viale Umbria 4, Milano",
    durationMinutes: 15,
    date: undefined,
    startTime: undefined,
    operatorId: undefined,
  },
];

export const APP_CONFIG: CalendarConfig = {
  startHour: 7,
  endHour: 19,
  daysIncluded: [1, 2, 3, 4, 5, 6], // Monday to Saturday
  slotDurationMinutes: 15,
};