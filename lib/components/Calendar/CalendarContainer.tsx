import React, { useState, useMemo } from 'react';
import { CalendarView } from './CalendarView';
import { useSchedulerContext } from '../../context/SchedulerContext';
import { getWeekStart, addDays, generateTimeSlots } from '../../utils/dateUtils';

export const CalendarContainer: React.FC = () => {
  const { 
    interventions, 
    operators, 
    config, 
    loading, 
    isDarkMode, 
    toggleTheme, 
    moveIntervention 
  } = useSchedulerContext();
  
  const [currentDate, setCurrentDate] = useState(new Date());

  // Logic for Grid Generation
  const weekStart = useMemo(() => getWeekStart(currentDate), [currentDate]);

  const weekDays = useMemo(() => {
    if (!config) return [];
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(weekStart, i);
      if (config.daysIncluded.includes(d.getDay())) {
        days.push(d);
      }
    }
    return days;
  }, [weekStart, config]);

  const timeSlots = useMemo(() => {
    return config ? generateTimeSlots(config) : [];
  }, [config]);

  // Handlers
  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const handleToday = () => setCurrentDate(new Date());

  const handleDrop = (e: React.DragEvent, date: string, time: string, operatorId: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("interventionId");
    if (id) {
      moveIntervention(id, date, time, operatorId);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("interventionId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const scheduledInterventions = interventions.filter(i => !!i.date);

  return (
    <CalendarView 
      loading={loading}
      operators={operators}
      interventions={scheduledInterventions}
      weekDays={weekDays}
      timeSlots={timeSlots}
      currentDate={currentDate}
      isDarkMode={isDarkMode}
      onPrevWeek={handlePrevWeek}
      onNextWeek={handleNextWeek}
      onToday={handleToday}
      onToggleTheme={toggleTheme}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
    />
  );
};