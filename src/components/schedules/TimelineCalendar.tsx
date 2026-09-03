import React from 'react';
import { ScheduleEvent, LayoutCanvas } from '../../types/signage';
import { CalendarClock } from 'lucide-react';
import { DAYS_OF_WEEK } from '../../utils/helpers';

interface TimelineCalendarProps {
  schedules: ScheduleEvent[];
  layouts: LayoutCanvas[];
  onToggleActive: (id: string, current: boolean) => void;
  onDeleteSchedule: (id: string) => void;
}

export const TimelineCalendar: React.FC<TimelineCalendarProps> = ({
  schedules,
  layouts
}) => {
  const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

  return (
    <div className="rounded-xl surface-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <CalendarClock className="w-4 h-4 text-purple-600" />
          <span>Weekly Day-Parting Schedule</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px] border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50 p-2 text-slate-500 font-mono text-[10px]">
            <div className="font-semibold text-slate-700">Day</div>
            {hours.slice(0, 7).map((h, i) => (
              <div key={i} className="text-center">{h}</div>
            ))}
          </div>

          {/* Days */}
          {DAYS_OF_WEEK.map((dayName, dayIndex) => {
            const activeSchedulesForDay = schedules.filter(s => s.daysOfWeek.includes(dayIndex) && s.isActive);

            return (
              <div key={dayIndex} className="grid grid-cols-8 border-b border-slate-100 p-2 items-center hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-700 text-[11px]">{dayName.slice(0, 3)}</span>

                <div className="col-span-7 flex items-center gap-1.5 overflow-hidden">
                  {activeSchedulesForDay.length > 0 ? (
                    activeSchedulesForDay.map(sch => (
                      <div
                        key={sch.id}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold truncate border bg-purple-50 border-purple-200 text-purple-800 flex items-center gap-1"
                        title={`${sch.name}: ${sch.startTime} - ${sch.endTime}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                        <span className="truncate">{sch.name}</span>
                        <span className="font-mono text-purple-600 text-[9px]">{sch.startTime}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Default</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
