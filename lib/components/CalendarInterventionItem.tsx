import React from 'react';
import { Intervention, Operator } from '../types';

interface Props {
  intervention: Intervention;
  operator: Operator;
  onDragStart: (e: React.DragEvent, interventionId: string) => void;
}

export const CalendarInterventionItem: React.FC<Props> = ({ intervention, operator, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, intervention.id)}
      className={`absolute inset-x-0.5 top-0 bottom-0 z-10 rounded border text-[10px] leading-tight p-1 overflow-hidden cursor-move shadow-sm select-none opacity-90 hover:opacity-100 dark:brightness-110 ${operator.color}`}
      title={`${intervention.title} - ${intervention.client}`}
    >
      <div className="font-bold truncate">{intervention.title}</div>
      <div className="truncate opacity-80">{intervention.client}</div>
    </div>
  );
};