import React from 'react';
import { SidebarView } from './SidebarView';
import { useSchedulerContext } from '../../context/SchedulerContext';

export const SidebarContainer: React.FC = () => {
  const { interventions, loading } = useSchedulerContext();

  const unscheduledInterventions = interventions.filter(i => !i.date);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("interventionId", id);
  };

  return (
    <SidebarView 
      interventions={unscheduledInterventions}
      loading={loading}
      onDragStart={handleDragStart}
    />
  );
};