import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  MonitorSmartphone, 
  Layers, 
  Eye, 
  HardDrive,
  CalendarClock
} from 'lucide-react';
import { formatBytes } from '../../utils/helpers';

export const OverviewMetrics: React.FC = () => {
  const { assets, layouts, schedules, analytics } = useSignage();

  const totalBytes = assets.reduce((acc, a) => acc + a.sizeBytes, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
      {/* 1. Fleet Displays Status */}
      <div className="lg:col-span-4 bento-card p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <MonitorSmartphone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono block">
                Screen Displays
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
            {analytics.uptimePercent}%
          </span>
        </div>

        <div className="my-2.5 sm:my-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-display">
            {analytics.onlineScreens} <span className="text-stone-400 text-lg sm:text-xl font-normal">/ {analytics.totalScreens}</span>
          </span>
          <span className="text-xs font-semibold text-stone-500">Active Screens</span>
        </div>

        {/* Progress meter */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <div className="flex justify-between text-[11px] text-stone-500 font-medium">
            <span>Network Health</span>
            <span className="text-emerald-700 font-bold font-mono">{analytics.uptimePercent}% Uptime</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${analytics.uptimePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Studio Canvases & Zones */}
      <div className="lg:col-span-4 bento-card p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-orange-50 text-orange-700 border border-orange-200">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono block">
                Canvas Studio
              </span>
              <span className="text-[11px] text-orange-700 font-semibold">
                Split Layouts
              </span>
            </div>
          </div>

          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
            4K & 9:16
          </span>
        </div>

        <div className="my-2.5 sm:my-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-display">
            {layouts.length}
          </span>
          <span className="text-xs font-semibold text-stone-500">Canvases ({layouts.reduce((acc, l) => acc + l.zones.length, 0)} split zones)</span>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
          <span className="font-semibold text-stone-700">Templates:</span>
          <span className="px-1.5 py-0.2 rounded bg-stone-100 font-mono text-[10px]">16:9 Retail</span>
          <span className="px-1.5 py-0.2 rounded bg-stone-100 font-mono text-[10px]">9:16 Kiosk</span>
        </div>
      </div>

      {/* 3. Proof-of-Play & Storage */}
      <div className="lg:col-span-4 bento-card p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono block">
                Proof of Play
              </span>
              <span className="text-[11px] text-amber-700 font-semibold">
                Verified Telemetry
              </span>
            </div>
          </div>

          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Active
          </span>
        </div>

        <div className="my-2.5 sm:my-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-display">
            {analytics.totalImpressions.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-stone-500">Plays Today</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]">
          <span className="text-stone-500">Storage: <strong className="text-stone-800">{assets.length} items ({formatBytes(totalBytes)})</strong></span>
          <span className="font-bold text-orange-600">100% Signed</span>
        </div>
      </div>
    </div>
  );
};
