import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  MonitorSmartphone, 
  Layers, 
  Eye, 
  HardDrive,
  Activity,
  CalendarClock
} from 'lucide-react';
import { formatBytes } from '../../utils/helpers';

export const OverviewMetrics: React.FC = () => {
  const { assets, layouts, schedules, analytics } = useSignage();

  const totalBytes = assets.reduce((acc, a) => acc + a.sizeBytes, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
      {/* 1. Fleet Displays Status */}
      <div className="lg:col-span-4 bento-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <MonitorSmartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono block">
                Screen Displays
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {analytics.uptimePercent}%
          </span>
        </div>

        <div className="my-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight font-display">
            {analytics.onlineScreens} <span className="text-slate-400 text-xl font-normal">/ {analytics.totalScreens}</span>
          </span>
          <span className="text-xs font-semibold text-slate-500">Active Screens</span>
        </div>

        {/* Progress meter */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>Network Health</span>
            <span className="text-emerald-700 font-bold font-mono">{analytics.uptimePercent}% Uptime</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${analytics.uptimePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Studio Canvases & Zones */}
      <div className="lg:col-span-4 bento-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono block">
                Canvas Studio
              </span>
              <span className="text-[11px] text-blue-600 font-semibold">
                Split Layouts
              </span>
            </div>
          </div>

          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            4K & 9:16
          </span>
        </div>

        <div className="my-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight font-display">
            {layouts.length}
          </span>
          <span className="text-xs font-semibold text-slate-500">Canvases ({layouts.reduce((acc, l) => acc + l.zones.length, 0)} split zones)</span>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">Templates:</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-100 font-mono text-[10px]">16:9 Retail</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-100 font-mono text-[10px]">9:16 Kiosk</span>
        </div>
      </div>

      {/* 3. Proof-of-Play & Automation */}
      <div className="lg:col-span-4 bento-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono block">
                Proof of Play
              </span>
              <span className="text-[11px] text-purple-600 font-semibold">
                Daily Telemetry
              </span>
            </div>
          </div>

          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
            <Activity className="w-3 h-3 text-purple-600" />
            <span>Verified</span>
          </span>
        </div>

        <div className="my-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight font-display">
            {analytics.totalImpressions.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-500">Plays Today</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
          <span className="text-slate-500">Storage: <strong className="text-slate-800">{assets.length} items ({formatBytes(totalBytes)})</strong></span>
          <span className="font-bold text-blue-600">100% Signed</span>
        </div>
      </div>
    </div>
  );
};
