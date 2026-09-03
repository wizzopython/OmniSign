import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { Modal } from '../common/Modal';
import { 
  RotateCw, 
  Check, 
  Monitor, 
  Smartphone 
} from 'lucide-react';
import { ScreenOrientation } from '../../types/signage';

interface ScreenPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenPairingModal: React.FC<ScreenPairingModalProps> = ({ isOpen, onClose }) => {
  const { addScreen, layouts } = useSignage();

  const [pairingCode, setPairingCode] = useState(() => `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('Retail Experience');
  const [group, setGroup] = useState('Flagship Stores');
  const [os, setOs] = useState('Android 13 (SignageOS 4.2)');
  const [resolution, setResolution] = useState('3840x2160 (4K UHD)');
  const [orientation, setOrientation] = useState<ScreenOrientation>('landscape');
  const [assignedLayoutId, setAssignedLayoutId] = useState(layouts[0]?.id || 'lay-001');

  const regenerateCode = () => {
    setPairingCode(`${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handlePairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addScreen({
      name,
      pairingCode,
      location: location || 'Main Entrance',
      department,
      group,
      os,
      resolution,
      orientation,
      assignedLayoutId,
      tags: ['Retail', 'Active']
    });

    setName('');
    setLocation('');
    regenerateCode();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pair Display Hardware"
      subtitle="Enter the 6-digit connection PIN to link your physical display to the CMS"
      maxWidth="xl"
    >
      <form onSubmit={handlePairSubmit} className="space-y-4">
        {/* PIN Banner */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-700">Pairing PIN</span>
            <div className="text-2xl font-black font-mono tracking-widest text-slate-900">
              {pairingCode}
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">Enter this code on the TV player screen</p>
          </div>
          <button
            type="button"
            onClick={regenerateCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Display Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. NYC Entrance Display"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. New York Flagship"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              OS Platform
            </label>
            <select
              value={os}
              onChange={e => setOs(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            >
              <option value="Android 13 (SignageOS 4.2)">Android 13</option>
              <option value="Samsung Tizen 6.5 Enterprise">Samsung Tizen 6.5</option>
              <option value="LG webOS Signage 6.0">LG webOS</option>
              <option value="Ubuntu Core 22.04 LTS">Ubuntu Linux</option>
              <option value="Windows 11 IoT Enterprise">Windows 11</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Layout
            </label>
            <select
              value={assignedLayoutId}
              onChange={e => setAssignedLayoutId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            >
              {layouts.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Orientation</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-colors ${
                orientation === 'landscape' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Landscape (16:9)</span>
            </button>
            <button
              type="button"
              onClick={() => setOrientation('portrait')}
              className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-colors ${
                orientation === 'portrait' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Portrait (9:16)</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Complete Pairing</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
