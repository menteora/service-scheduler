import { CalendarConfig, Intervention, Operator } from "./types";

export interface SchedulerAdapter {
  fetchConfig(): Promise<CalendarConfig>;
  fetchOperators(): Promise<Operator[]>;
  fetchInterventions(): Promise<Intervention[]>;
  updateIntervention(intervention: Intervention): Promise<Intervention>;
  saveSchedule(interventions: Intervention[]): Promise<void>;
}