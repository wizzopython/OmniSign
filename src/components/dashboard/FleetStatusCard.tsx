import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  RotateCw, 
  RefreshCw, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Tv, 
  Cpu, 
  Thermometer, 
  Layers 
} from 'lucide-react';
import { getStatusBadge } from '../../utils/helpers';

export const FleetStatusCard: React.FC = () => {
  const { screens, layouts, rebootScreen, syncScreen, setSelectedScreen, setActiveTab } = useSignage();

  return (
    <div className="bento-card p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Tv className="w-5 h-5 text-blue-600" />
              <span>Smart Hardware Displays</span>
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {screens.length} Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time display monitors with hardware telemetry & instant remote controls
          </p>
        </div>

        <button
          onClick={() => setActiveTab('screens')}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-colors w-fit"
        >
          <span>View Fleet</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Screen Displays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screens.slice(0, 6).map(screen => {
          const badge = getStatusBadge(screen.status);
          const layout = layouts.find(l => l.id === screen.assignedLayoutId);
          const isPortrait = screen.orientation === 'portrait';

          return (
            <div
              key={screen.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                {/* Designer Silver / White TV Frame */}
                <div className="relative mb-3">
                  <div className={`silver-tv-frame overflow-hidden bg-slate-100 ${
                    isPortrait ? 'w-28 mx-auto aspect-[9/16]' : 'aspect-video'
                  }`}>
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <img
                        src={screen.screenshotUrl}
                        alt={screen.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                      {/* Screen Badges on Mockup */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border backdrop-blur-md ${badge.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                          {badge.label}
                        </span>

                        <span className="text-[9px] font-mono font-bold text-slate-800 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                          {screen.pairingCode}
                        </span>
                      </div>

                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-white">
                        <span className="truncate">{screen.resolution.split(' ')[0]}</span>
                        <span className="text-emerald-300 font-bold">60fps</span>
                      </div>
                    </div>
                  </div>
                  {!isPortrait && <div className="silver-tv-stand" />}
                </div>

                {/* Display Info */}
                <div>
                  <h4 
                    onClick={() => {
                      setSelectedScreen(screen);
                      setActiveTab('screens');
                    }}
                    className="text-xs font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors truncate"
                    title={screen.name}
                  >
                    {screen.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{screen.location}</span>
                  </p>
                </div>

                {/* Assigned Layout */}
                <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-blue-600" /> Layout:
                  </span>
                  <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                    {layout?.name || 'Default'}
                  </span>
                </div>

                {/* Telemetry */}
                <div className="grid grid-cols-2 gap-2 text-[11px] my-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 text-[10px] flex items-center gap-1"><Cpu className="w-3 h-3 text-blue-600" /> CPU</span>
                    <strong className="text-slate-800 font-mono text-[10px]">{screen.cpuUsage}%</strong>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 text-[10px] flex items-center gap-1"><Thermometer className="w-3 h-3 text-amber-600" /> Temp</span>
                    <strong className="text-slate-800 font-mono text-[10px]">{screen.temperatureC}°C</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 text-[10px] font-mono">{screen.lastHeartbeat}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => syncScreen(screen.id)}
                    title="Force sync"
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => rebootScreen(screen.id)}
                    title="Remote reboot"
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedScreen(screen);
                      setActiveTab('player');
                    }}
                    title="Launch Player Emulator"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Emulate</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
