import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  CalendarClock, 
  Plus, 
  Clock, 
  Trash2, 
  Power, 
  Check
} from 'lucide-react';
import { TimelineCalendar } from './TimelineCalendar';
import { Modal } from '../common/Modal';
import { DAYS_OF_WEEK } from '../../utils/helpers';
import { TargetType } from '../../types/signage';

export const ScheduleManager: React.FC = () => {
  const { 
    schedules, 
    layouts, 
    addSchedule, 
    updateSchedule, 
    deleteSchedule 
  } = useSignage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [layoutId, setLayoutId] = useState(layouts[0]?.id || 'lay-001');
  const [targetGroup, setTargetGroup] = useState('Flagship Stores');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('22:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSchedule({
      name,
      layoutId,
      targetType: 'group',
      targets: [targetGroup],
      priority: 'standard',
      startDate: '2026-09-01',
      endDate: '2026-12-31',
      startTime,
      endTime,
      daysOfWeek: selectedDays,
      isActive: true
    });

    setName('');
    setIsModalOpen(false);
  };

  const toggleDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter(d => d !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Scheduling & Automation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure automated dayparting and recurring content rotations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Schedule</span>
        </button>
      </div>

      {/* Timeline Matrix */}
      <TimelineCalendar
        schedules={schedules}
        layouts={layouts}
        onToggleActive={(id, cur) => updateSchedule(id, { isActive: !cur })}
        onDeleteSchedule={deleteSchedule}
      />

      {/* Schedules List */}
      <div className="rounded-xl surface-card p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Configured Rules</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {schedules.map(sch => {
            const layout = layouts.find(l => l.id === sch.layoutId);

            return (
              <div
                key={sch.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  sch.isActive
                    ? 'bg-white border-slate-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{sch.name}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase bg-blue-50 text-blue-700 border border-blue-200">
                      {sch.priority}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mb-2">
                    Layout: <strong className="text-slate-800">{layout?.name || 'Default'}</strong>
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-700 mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono">{sch.startTime} - {sch.endTime}</span>
                  </div>

                  {/* Day badges */}
                  <div className="flex flex-wrap gap-1">
                    {DAYS_OF_WEEK.map((d, i) => {
                      const isSelected = sch.daysOfWeek.includes(i);
                      return (
                        <span
                          key={i}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {d.slice(0, 3)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => updateSchedule(sch.id, { isActive: !sch.isActive })}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                      sch.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{sch.isActive ? 'Active' : 'Paused'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete ${sch.name}?`)) {
                        deleteSchedule(sch.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Schedule Rule"
        subtitle="Configure start/end times and recurrence"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rule Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Lunch Hour Menu"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Layout</label>
              <select
                value={layoutId}
                onChange={e => setLayoutId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
              >
                {layouts.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Group</label>
              <input
                type="text"
                value={targetGroup}
                onChange={e => setTargetGroup(e.target.value)}
                placeholder="Flagship Stores"
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Active Days</label>
            <div className="grid grid-cols-7 gap-1">
              {DAYS_OF_WEEK.map((d, i) => {
                const isSelected = selectedDays.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleDay(i)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Rule</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
