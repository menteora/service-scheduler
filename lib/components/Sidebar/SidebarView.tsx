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
    <div className="w-full h-[35vh] md:w-80 md:h-full bg-white dark:bg-slate-800 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-sm z-20 transition-colors duration-200 shrink-0">
      <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 flex items-center justify-between md:block sticky top-0 z-10">
        <div>
            <h2 className="text-sm md:text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 md:w-5 md:h-5" />
            Interventi
            </h2>
            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-0.5 md:mt-1 hidden md:block">Trascina sul calendario per assegnare</p>
        </div>
        <span className="md:hidden text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300 font-medium">
            {interventions.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
        {loading ? (
           <div className="flex justify-center py-10">
               <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
           </div>
        ) : interventions.length === 0 ? (
          <div className="text-center text-slate-400 py-10 italic text-sm">
            Nessun intervento
          </div>
        ) : (
          interventions.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, item.id)}
              className="bg-white dark:bg-slate-800 p-2 md:p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group touch-manipulation"
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs md:text-sm truncate pr-2">{item.title}</span>
                <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 shrink-0" />
              </div>
              <div className="flex items-center justify-between mt-1">
                  <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[70%]">{item.client}</div>
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                    {item.durationMinutes} min
                  </div>
              </div>
              <div className="hidden md:block text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{item.address}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};