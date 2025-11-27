import { SchedulerAdapter } from "../../lib/adapter";
import * as api from "../api/fakeApi";

export const fakeAdapter: SchedulerAdapter = {
    fetchConfig: api.fetchConfig,
    fetchOperators: api.fetchOperators,
    fetchInterventions: api.fetchInterventions,
    updateIntervention: api.updateInterventionApi
};