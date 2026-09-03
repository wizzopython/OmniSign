import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  PlusCircle, 
  Search, 
  LayoutGrid, 
  List, 
  RotateCw, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  ExternalLink
} from 'lucide-react';
import { DeviceScreen } from '../../types/signage';
import { getStatusBadge } from '../../utils/helpers';
import { ScreenDetailsDrawer } from './ScreenDetailsDrawer';

interface ScreenListProps {
  onOpenPairingModal: () => void;
  onOpenPlayer: (screen: DeviceScreen) => void;
}

export const ScreenList: React.FC<ScreenListProps> = ({
  onOpenPairingModal,
  onOpenPlayer
}) => {
  const { 
    screens, 
    layouts, 
    rebootScreen, 
    syncScreen, 
    selectedScreen 
  } = useSignage();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [drawerScreen, setDrawerScreen] = useState<DeviceScreen | null>(selectedScreen);

  const filteredScreens = screens.filter(screen => {
    const matchesStatus = statusFilter === 'all' || screen.status === statusFilter;
    const matchesSearch = 
      screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.pairingCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Device Fleet Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time display telemetry, screen pairing, and remote reboot actions.
          </p>
        </div>

        <button
          onClick={onOpenPairingModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Pair Display PIN</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-xl surface-card">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'online', 'offline', 'syncing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors shrink-0 ${
                statusFilter === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'all' ? 'All Displays' : tab}
            </button>
          ))}
        </div>

        {/* Search & View Mode */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search displays..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen Displays Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScreens.map(screen => {
            const badge = getStatusBadge(screen.status);
            const layout = layouts.find(l => l.id === screen.assignedLayoutId);

            return (
              <div
                key={screen.id}
                className="rounded-xl surface-card surface-card-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={screen.screenshotUrl}
                    alt={screen.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md ${badge.badgeClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                      {badge.label}
                    </span>

                    <span className="font-mono text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-xs">
                      PIN: {screen.pairingCode}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 text-[10px] font-mono font-semibold text-white">
                    {screen.resolution.split(' ')[0]} • {screen.orientation}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => setDrawerScreen(screen)}
                      className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                      title={screen.name}
                    >
                      {screen.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{screen.location}</span>
                    </p>

                    <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] flex items-center justify-between">
                      <span className="text-slate-500">Layout:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                        {layout?.name || 'Default'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] my-2.5">
                      <div className="p-1.5 rounded bg-slate-50 border border-slate-100 text-slate-600 text-center">
                        <span>CPU: <strong className="text-slate-900">{screen.cpuUsage}%</strong></span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-50 border border-slate-100 text-slate-600 text-center">
                        <span>Temp: <strong className="text-slate-900">{screen.temperatureC}°C</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 text-[10px]">{screen.lastHeartbeat}</span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => syncScreen(screen.id)}
                        className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded"
                        title="Sync"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => rebootScreen(screen.id)}
                        className="p-1 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded"
                        title="Reboot"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenPlayer(screen)}
                        className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded"
                        title="Player"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDrawerScreen(screen)}
                        className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="Settings"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-xl surface-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Display</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Layout</th>
                <th className="py-3 px-4 font-semibold">Specs</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScreens.map(screen => {
                const badge = getStatusBadge(screen.status);
                const layout = layouts.find(l => l.id === screen.assignedLayoutId);

                return (
                  <tr key={screen.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{screen.name}</div>
                      <span className="font-mono text-[10px] text-slate-500">PIN: {screen.pairingCode}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{screen.location}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{layout?.name || 'Default'}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{screen.os.split(' ')[0]} • {screen.cpuUsage}% CPU</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => syncScreen(screen.id)} className="p-1 text-slate-500 hover:text-blue-600">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => rebootScreen(screen.id)} className="p-1 text-slate-500 hover:text-rose-600">
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onOpenPlayer(screen)} className="p-1 text-slate-500 hover:text-emerald-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      <ScreenDetailsDrawer
        screen={drawerScreen}
        onClose={() => setDrawerScreen(null)}
        onOpenPlayer={onOpenPlayer}
      />
    </div>
  );
};
