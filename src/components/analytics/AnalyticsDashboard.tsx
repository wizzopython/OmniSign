import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  BarChart3, 
  Eye, 
  Download, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = () => {
  const { analytics, showToast } = useSignage();

  const proofOfPlayLogs = [
    { id: 'pop-1', time: '12:30', screenName: 'NYC Flagship - Video Wall', layout: '3-Zone Retail Showcase', asset: 'Summer Luxe Collection 4K', plays: 1420 },
    { id: 'pop-2', time: '12:29', screenName: 'London Mall - Kiosk #3', layout: 'Vertical Interactive Kiosk', asset: 'Vertical Store Showcase', plays: 980 },
    { id: 'pop-3', time: '12:28', screenName: 'SF Bistro - Station A', layout: 'Digital Menu Board', asset: 'Artisan Espresso & Bakery Menu', plays: 2140 },
    { id: 'pop-4', time: '12:25', screenName: 'Tokyo HQ - Lobby Display', layout: 'Corporate Executive L-Bar', asset: 'Global Tech Keynote', plays: 830 },
  ];

  const handleExport = (format: string) => {
    showToast('Report Exported', `Downloaded Proof-of-Play summary in ${format.toUpperCase()} format.`, 'success');
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Proof of Play & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified impression logs and device playback metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl surface-card">
          <span className="text-xs font-semibold text-slate-500">Fleet Availability</span>
          <span className="text-2xl font-bold text-slate-900 block mt-1">{analytics.uptimePercent}%</span>
          <span className="text-[11px] text-slate-500">{analytics.onlineScreens} of {analytics.totalScreens} screens active</span>
        </div>

        <div className="p-4 rounded-xl surface-card">
          <span className="text-xs font-semibold text-slate-500">Impressions Today</span>
          <span className="text-2xl font-bold text-blue-600 block mt-1">{analytics.totalImpressions.toLocaleString()}</span>
          <span className="text-[11px] text-slate-500">Verified play cycles</span>
        </div>

        <div className="p-4 rounded-xl surface-card">
          <span className="text-xs font-semibold text-slate-500">CDN Data Transfer</span>
          <span className="text-2xl font-bold text-purple-600 block mt-1">{analytics.bandwidthUsedGb} GB</span>
          <span className="text-[11px] text-slate-500">Synced to device caches</span>
        </div>
      </div>

      {/* Proof of Play Table */}
      <div className="rounded-xl surface-card p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Recent Verified Playbacks</span>
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Time</th>
                <th className="py-2.5 px-3 font-semibold">Display Screen</th>
                <th className="py-2.5 px-3 font-semibold">Layout Canvas</th>
                <th className="py-2.5 px-3 font-semibold">Asset Name</th>
                <th className="py-2.5 px-3 font-semibold">Plays</th>
                <th className="py-2.5 px-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {proofOfPlayLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono text-slate-500">{log.time}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{log.screenName}</td>
                  <td className="py-2.5 px-3 text-slate-600">{log.layout}</td>
                  <td className="py-2.5 px-3 font-medium text-blue-600">{log.asset}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{log.plays.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface AnalyticsDashboardProps {}
