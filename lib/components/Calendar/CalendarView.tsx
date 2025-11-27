import React from 'react';
import { Operator, Intervention } from '../../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Loader2, Save } from 'lucide-react';
import { CalendarInterventionItem } from '../CalendarInterventionItem';
import { formatDateISO, formatDayName, formatDisplayDate, formatMonthYear, isSameDate } from '../../utils/dateUtils';

interface CalendarViewProps {
  loading: boolean;
  saving?: boolean;
  operators: Operator[];
  interventions: Intervention[];
  weekDays: Date[];
  timeSlots: string[];
  currentDate: Date;
  isDarkMode: boolean;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onSave: () => void;
  onDrop: (e: React.DragEvent, date: string, time: string, operatorId: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  loading,
  saving = false,
  operators,
  interventions,
  weekDays,
  timeSlots,
  currentDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  onSave,
  onDrop,
  onDragStart
}) => {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const getInterventionForSlot = (dateStr: string, time: string, operatorId: string) => {
    return interventions.find(i => 
      i.date === dateStr && 
      i.startTime === time && 
      i.operatorId === operatorId
    );
  };

  if (loading) {
    return (
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="text-slate-500 text-sm">Caricamento calendario...</span>
            </div>
        </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shrink-0 gap-3 md:gap-0">
        
        {/* Title and Nav */}
        <div className="flex items-center justify-between md:justify-start gap-4 w-full md:w-auto">
          <h2 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-100 capitalize flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-slate-600 dark:text-slate-400" />
            {formatMonthYear(weekDays[0] || currentDate)}
          </h2>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            <button onClick={onPrevWeek} className="p-1 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded transition-all text-slate-600 dark:text-slate-400">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button onClick={onToday} className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-x border-slate-200 dark:border-slate-700 mx-1">
              Oggi
            </button>
            <button onClick={onNextWeek} className="p-1 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded transition-all text-slate-600 dark:text-slate-400">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Operators & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Save Button */}
            <button 
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs md:text-sm font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden md:inline">{saving ? 'Salvataggio...' : 'Salva'}</span>
            </button>

            <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

            <div className="flex items-center overflow-x-auto no-scrollbar gap-2 mask-linear-fade flex-1 md:flex-none">
                <div className="hidden md:flex text-sm text-slate-500 dark:text-slate-400 mr-2 items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="whitespace-nowrap">{operators.length} Ops</span>
                </div>
                {operators.map(op => (
                    <div key={op.id} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm text-[10px] md:text-xs font-medium">
                        <div className={`w-2 h-2 rounded-full ${op.color.split(' ')[0].replace('bg-', 'bg-')}`} style={{backgroundColor: 'currentColor'}} />
                        <span className="text-slate-700 dark:text-slate-300 whitespace-nowrap">{op.name.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-auto relative bg-white dark:bg-slate-900">
        <div className="min-w-[1000px] h-full flex flex-col">
            
            {/* Days Header */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-850 z-20 shadow-sm">
                <div className="w-16 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850"></div> {/* Time Gutter Header */}
                {weekDays.map((day) => {
                    const isToday = isSameDate(day, new Date());
                    return (
                        <div key={day.toISOString()} className={`flex-1 flex flex-col border-r border-slate-200 dark:border-slate-700 last:border-r-0 ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                            <div className="text-center py-3">
                              <div className={`text-xs font-semibold uppercase ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {formatDayName(day)}
                              </div>
                              <div className={`text-xl font-light ${isToday ? 'text-blue-700 dark:text-blue-300 font-normal' : 'text-slate-700 dark:text-slate-200'}`}>
                                  {formatDisplayDate(day)}
                              </div>
                            </div>
                            
                            {/* Operator Sub-headers (Swimlanes) */}
                            <div className="flex mt-auto border-t border-slate-200 dark:border-slate-700">
                                {operators.map((op, idx) => (
                                    <div key={op.id} className={`flex-1 text-[10px] py-1.5 text-center text-slate-400 dark:text-slate-500 truncate px-1 bg-slate-50 dark:bg-slate-800/50 ${idx !== operators.length -1 ? 'border-r border-dashed border-slate-200 dark:border-slate-700' : ''}`}>
                                        {op.name.split(' ')[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Grid Body */}
            <div className="flex-1 pb-10 md:pb-0">
                {timeSlots.map((time) => {
                    const isFullHour = time.endsWith("00");
                    return (
                    <div key={time} className="flex min-h-[44px]">
                        {/* Time Label */}
                        <div className="w-16 flex-shrink-0 flex items-start justify-center pt-1 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 select-none">
                            {isFullHour && (
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 -mt-2.5 bg-slate-50 dark:bg-slate-850 px-1 relative z-10">
                                    {time}
                                </span>
                            )}
                        </div>

                        {/* Day Columns */}
                        {weekDays.map((day) => {
                             const dateStr = formatDateISO(day);
                             return (
                                <div key={`${dateStr}-${time}`} className="flex-1 flex border-r border-slate-200 dark:border-slate-700 relative">
                                    {/* Horizontal Line */}
                                    <div className={`absolute inset-x-0 top-0 pointer-events-none ${isFullHour ? 'border-t border-slate-200 dark:border-slate-700' : 'border-t border-slate-100 dark:border-slate-800 border-dashed'}`}></div>

                                    {/* Operator Splits (Swimlanes) */}
                                    {operators.map((op, opIdx) => {
                                        const intervention = getInterventionForSlot(dateStr, time, op.id);
                                        
                                        return (
                                            <div 
                                                key={`${dateStr}-${time}-${op.id}`}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => onDrop(e, dateStr, time, op.id)}
                                                className={`flex-1 relative transition-colors ${
                                                    opIdx !== operators.length - 1 ? 'border-r border-dashed border-slate-100 dark:border-slate-800' : ''
                                                } hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                                            >
                                                {intervention && (
                                                    <CalendarInterventionItem 
                                                        intervention={intervention} 
                                                        operator={op}
                                                        onDragStart={onDragStart}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                             );
                        })}
                    </div>
                )})}
            </div>
        </div>
      </div>
    </div>
  );
};