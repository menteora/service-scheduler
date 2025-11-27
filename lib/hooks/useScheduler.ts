import { useState, useEffect, useCallback } from "react";
import { Intervention, Operator, CalendarConfig } from "../types";
import { SchedulerAdapter } from "../adapter";

export function useScheduler(adapter: SchedulerAdapter) {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [config, setConfig] = useState<CalendarConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [configData, opsData, intsData] = await Promise.all([
          adapter.fetchConfig(),
          adapter.fetchOperators(),
          adapter.fetchInterventions(),
        ]);
        setConfig(configData);
        setOperators(opsData);
        setInterventions(intsData);
      } catch (err: any) {
        setError(err.message || "Failed to load scheduler data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [adapter]);

  // Action: Move/Schedule Intervention
  const moveIntervention = useCallback(async (id: string, date: string, time: string, operatorId: string) => {
    // Optimistic Update
    let previousInterventions: Intervention[] = [];
    
    setInterventions(prev => {
      previousInterventions = prev;
      const index = prev.findIndex(i => i.id === id);
      if (index === -1) return prev;

      const updatedList = [...prev];
      updatedList[index] = {
        ...updatedList[index],
        date,
        startTime: time,
        operatorId,
        durationMinutes: 15, // Enforce business rule
      };
      return updatedList;
    });

    try {
      // Find the updated object to send to API
      const updatedItem = interventions.find(i => i.id === id);
      // We need to re-find it from the state update if we were inside a component, but here we rely on 'interventions' closure or local calculation.
      // Better approach for optimistic UI inside a closure: construct the object locally.
      const itemToUpdate = previousInterventions.find(i => i.id === id);
      
      if (itemToUpdate) {
          const payload = { 
            ...itemToUpdate, 
            date, 
            startTime: time, 
            operatorId, 
            durationMinutes: 15 
          };
          await adapter.updateIntervention(payload);
      }
    } catch (err) {
      // Rollback on error
      console.error("Failed to update", err);
      setInterventions(previousInterventions);
      setError("Failed to update intervention");
    }
  }, [interventions, adapter]);

  return {
    interventions,
    operators,
    config,
    loading,
    error,
    moveIntervention,
  };
}