import React from 'react';
import { Intervention } from '../../types';
import { ClipboardList, GripVertical, Loader2 } from 'lucide-react';

interface SidebarViewProps {
  interventions: Intervention[];
  loading: boolean;
  onDragStart: (e: React.DragEvent, interventionId: string) => void;
}

export const SidebarView: React.FC<SidebarViewProps> = ({ interventions, loading, onDragStart }) => {
  return (
    <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full flex flex-col shadow-sm z-10 transition-colors duration-200">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          Interventi
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trascina sul calendario per assegnare</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
        {loading ? (
           <div className="flex justify-center py-10">
               <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
           </div>
        ) : interventions.length === 0 ? (
          <div className="text-center text-slate-400 py-10 italic text-sm">
            Nessun intervento da pianificare
          </div>
        ) : (
          interventions.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, item.id)}
              className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}</span>
                <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.client}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.address}</div>
              <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {item.durationMinutes} min
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};