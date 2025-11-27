import { APP_CONFIG, INITIAL_INTERVENTIONS, SAMPLE_OPERATORS } from "./fakeData";
import { CalendarConfig, Intervention, Operator } from "../../lib/types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchConfig = async (): Promise<CalendarConfig> => {
  await delay(300);
  return APP_CONFIG;
};

export const fetchOperators = async (): Promise<Operator[]> => {
  await delay(300);
  return SAMPLE_OPERATORS;
};

export const fetchInterventions = async (): Promise<Intervention[]> => {
  await delay(400); // Slightly longer for "data"
  return INITIAL_INTERVENTIONS;
};

export const updateInterventionApi = async (intervention: Intervention): Promise<Intervention> => {
  await delay(100); // Fast update
  return intervention;
};