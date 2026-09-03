import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { Modal } from '../common/Modal';
import { 
  AlertTriangle, 
  Radio, 
  Flame, 
  CloudLightning, 
  ShieldAlert, 
  BellRing
} from 'lucide-react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({ isOpen, onClose }) => {
  const { triggerEmergencyBroadcast, screens } = useSignage();

  const [message, setMessage] = useState('🚨 EMERGENCY OVERRIDE: Severe Weather Warning in effect. Please proceed calmly to designated safety shelters.');
  const [selectedPreset, setSelectedPreset] = useState<string>('weather');

  const presets = [
    {
      id: 'weather',
      title: 'Weather Advisory',
      icon: <CloudLightning className="w-4 h-4 text-amber-600" />,
      msg: '🚨 EMERGENCY ALERT: Severe weather advisory in effect. Please seek immediate shelter indoors.'
    },
    {
      id: 'fire',
      title: 'Fire Evacuation',
      icon: <Flame className="w-4 h-4 text-rose-600" />,
      msg: '🔥 FIRE ALARM OVERRIDE: Evacuate the premises immediately via the nearest marked emergency exit.'
    },
    {
      id: 'security',
      title: 'Security Alert',
      icon: <ShieldAlert className="w-4 h-4 text-purple-600" />,
      msg: '🛡️ SECURITY PROTOCOL: Facility is currently under temporary protocol. Please stay in your current location.'
    },
    {
      id: 'custom',
      title: 'Announcement',
      icon: <BellRing className="w-4 h-4 text-blue-600" />,
      msg: '📢 SPECIAL ANNOUNCEMENT: Executive keynote starting now in Main Auditorium A.'
    }
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.id);
    setMessage(p.msg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    triggerEmergencyBroadcast(message);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Emergency Broadcast Override"
      subtitle="Push an immediate high-priority takeover across network displays"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>Executing this alert will immediately suspend regular layouts on all {screens.length} displays.</span>
        </div>

        {/* Presets */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preset Templates</label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs transition-colors ${
                  selectedPreset === p.id ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                {p.icon}
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Alert Message *</label>
          <textarea
            rows={3}
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-rose-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Dispatch Override</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
