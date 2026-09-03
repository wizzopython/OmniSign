import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { DeviceScreen } from '../../types/signage';
import { 
  X, 
  RotateCw, 
  RefreshCw, 
  Volume2, 
  Sun, 
  MapPin, 
  Trash2, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { getStatusBadge } from '../../utils/helpers';

interface ScreenDetailsDrawerProps {
  screen: DeviceScreen | null;
  onClose: () => void;
  onOpenPlayer: (screen: DeviceScreen) => void;
}

export const ScreenDetailsDrawer: React.FC<ScreenDetailsDrawerProps> = ({
  screen,
  onClose,
  onOpenPlayer
}) => {
  const { 
    updateScreen, 
    rebootScreen, 
    syncScreen, 
    deleteScreen, 
    layouts 
  } = useSignage();

  if (!screen) return null;

  const [volume, setVolume] = useState(screen.volume);
  const [brightness, setBrightness] = useState(screen.brightness);
  const [assignedLayoutId, setAssignedLayoutId] = useState(screen.assignedLayoutId);

  const badge = getStatusBadge(screen.status);
  const currentLayout = layouts.find(l => l.id === screen.assignedLayoutId);

  const handleSaveControls = () => {
    updateScreen(screen.id, {
      volume,
      brightness,
      assignedLayoutId
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto z-10">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${badge.badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                  {badge.label}
                </span>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  PIN: {screen.pairingCode}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <div className="my-4">
              <h2 className="text-base font-bold text-slate-900">{screen.name}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{screen.location}</span>
                <span>•</span>
                <span>{screen.group}</span>
              </div>
            </div>

            {/* Live Screenshot */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video mb-5 group">
              <img
                src={screen.screenshotUrl}
                alt={screen.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3 justify-between">
                <span className="text-xs font-bold text-white truncate">{currentLayout?.name || 'Active Layout'}</span>

                <button
                  onClick={() => onOpenPlayer(screen)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Player</span>
                </button>
              </div>
            </div>

            {/* Specs Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-4 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Platform OS:</span>
                <span className="text-slate-900 font-semibold">{screen.os}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Resolution:</span>
                <span className="text-slate-900 font-semibold">{screen.resolution} ({screen.orientation})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IP Address:</span>
                <span className="text-slate-900 font-mono text-[11px]">{screen.ipAddress}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CPU / RAM:</span>
                <span className="text-slate-900 font-semibold">{screen.cpuUsage}% / {screen.ramUsage}%</span>
              </div>
            </div>

            {/* Assigned Layout Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Assigned Content Layout
              </label>
              <select
                value={assignedLayoutId}
                onChange={e => {
                  setAssignedLayoutId(e.target.value);
                  updateScreen(screen.id, { assignedLayoutId: e.target.value });
                }}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
              >
                {layouts.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* Sliders */}
            <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Volume</span>
                  <span className="font-bold text-slate-900">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  onMouseUp={handleSaveControls}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5" /> Brightness</span>
                  <span className="font-bold text-slate-900">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={brightness}
                  onChange={e => setBrightness(Number(e.target.value))}
                  onMouseUp={handleSaveControls}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => syncScreen(screen.id)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Force Sync</span>
              </button>

              <button
                onClick={() => rebootScreen(screen.id)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-600" />
                <span>Reboot</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (confirm(`Unpair ${screen.name}?`)) {
                  deleteScreen(screen.id);
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Unpair Display</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
