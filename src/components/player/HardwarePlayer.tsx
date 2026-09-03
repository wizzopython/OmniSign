import React, { useState, useRef } from 'react';
import { useSignage } from '../../context/SignageContext';
import { DeviceScreen, LayoutCanvas } from '../../types/signage';
import { ZoneRenderer } from './ZoneRenderer';
import { 
  Maximize, 
  Minimize, 
  Tv, 
  RotateCw, 
  RefreshCw, 
  AlertTriangle, 
  Monitor, 
  Smartphone
} from 'lucide-react';
import { getStatusBadge } from '../../utils/helpers';

interface HardwarePlayerProps {
  initialScreen?: DeviceScreen | null;
  customLayout?: LayoutCanvas | null;
}

export const HardwarePlayer: React.FC<HardwarePlayerProps> = ({
  initialScreen,
  customLayout
}) => {
  const { 
    screens, 
    layouts, 
    assets, 
    rebootScreen, 
    syncScreen 
  } = useSignage();

  const [selectedScreenId, setSelectedScreenId] = useState<string>(
    initialScreen?.id || screens[0]?.id || 'scr-001'
  );
  const [showBezel, setShowBezel] = useState(true);
  const [forceOrientation, setForceOrientation] = useState<'auto' | 'landscape' | 'portrait'>('auto');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentScreen = screens.find(s => s.id === selectedScreenId) || screens[0];
  const activeLayout = customLayout || layouts.find(l => l.id === currentScreen?.assignedLayoutId) || layouts[0];

  const orientation = forceOrientation === 'auto'
    ? (currentScreen?.orientation || activeLayout?.aspectRatio === '9:16' ? 'portrait' : 'landscape')
    : forceOrientation;

  const isPortrait = orientation === 'portrait';
  const badge = getStatusBadge(currentScreen.status);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error(err));
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl surface-card text-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <Tv className="w-4 h-4 text-blue-600" />
            <span>Screen:</span>
            <select
              value={selectedScreenId}
              onChange={e => setSelectedScreenId(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-600"
            >
              {screens.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            <button
              onClick={() => setForceOrientation('landscape')}
              className={`px-2 py-1 rounded text-xs font-semibold ${orientation === 'landscape' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
            >
              16:9 Landscape
            </button>
            <button
              onClick={() => setForceOrientation('portrait')}
              className={`px-2 py-1 rounded text-xs font-semibold ${orientation === 'portrait' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
            >
              9:16 Portrait
            </button>
          </div>

          <button
            onClick={() => setShowBezel(!showBezel)}
            className={`px-2.5 py-1 rounded-lg border font-semibold ${
              showBezel ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {showBezel ? 'Bezel On' : 'Frameless'}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => syncScreen(currentScreen.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Sync</span>
          </button>

          <button
            onClick={() => rebootScreen(currentScreen.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reboot</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Screen Emulator Surface */}
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl bg-slate-200/80 border border-slate-300 min-h-[500px]"
      >
        <div
          className={`relative overflow-hidden transition-all duration-200 ${
            showBezel
              ? isPortrait
                ? 'w-full max-w-[320px] h-[580px] real-hardware-bezel-portrait'
                : 'w-full max-w-[800px] aspect-video real-hardware-bezel'
              : isPortrait
                ? 'w-full max-w-[320px] h-[580px] rounded-lg'
                : 'w-full max-w-[800px] aspect-video rounded-lg shadow-lg'
          }`}
          style={{ backgroundColor: activeLayout?.backgroundColor || '#0f172a' }}
        >
          {/* Emergency Alert Overlay */}
          {currentScreen.emergencyAlertActive && (
            <div className="absolute inset-0 z-50 bg-rose-900/95 flex flex-col items-center justify-center p-6 text-center text-white">
              <AlertTriangle className="w-12 h-12 text-white mb-2 animate-bounce" />
              <h2 className="text-xl font-bold uppercase tracking-wider">
                Emergency Alert
              </h2>
              <p className="text-sm font-semibold mt-1 max-w-md">
                {currentScreen.emergencyAlertMessage || 'EMERGENCY PROTOCOL IN EFFECT'}
              </p>
            </div>
          )}

          {/* Zones Layer */}
          {activeLayout?.zones.map(zone => (
            <div
              key={zone.id}
              style={{
                position: 'absolute',
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
                zIndex: zone.zIndex
              }}
              className="overflow-hidden"
            >
              <ZoneRenderer zone={zone} assets={assets} />
            </div>
          ))}

          {/* Clean HUD Pill in player */}
          <div className="absolute bottom-2 left-2 right-2 z-40 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-white flex items-center justify-between pointer-events-none">
            <span className="font-bold truncate max-w-[150px]">{currentScreen.name}</span>
            <span className="font-mono text-emerald-400 font-bold">ONLINE</span>
          </div>
        </div>

        {showBezel && !isPortrait && (
          <div className="w-36 h-2 bg-slate-700 rounded-b-lg shadow-md" />
        )}
      </div>
    </div>
  );
};
