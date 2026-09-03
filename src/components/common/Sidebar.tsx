import React from 'react';
import { useSignage } from '../../context/SignageContext';
import {
  LayoutDashboard,
  MonitorSmartphone,
  FolderKanban,
  Layers,
  CalendarClock,
  Send,
  Users,
  BarChart3,
  Tv,
  PlusCircle
} from 'lucide-react';

interface SidebarProps {
  onOpenPairingModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenPairingModal }) => {
  const { 
    activeTab, 
    setActiveTab, 
    screens, 
    assets, 
    layouts, 
    schedules, 
    analytics 
  } = useSignage();

  const navSections = [
    {
      title: 'OPERATIONS',
      items: [
        {
          id: 'dashboard',
          label: 'Overview & Hub',
          icon: <LayoutDashboard className="w-4 h-4" />,
          badge: null
        },
        {
          id: 'screens',
          label: 'Hardware Displays',
          icon: <MonitorSmartphone className="w-4 h-4" />,
          badge: `${screens.filter(s => s.status === 'online').length}/${screens.length}`
        },
        {
          id: 'layouts',
          label: 'Canvas Studio',
          icon: <Layers className="w-4 h-4" />,
          badge: layouts.length
        }
      ]
    },
    {
      title: 'CONTENT & RULES',
      items: [
        {
          id: 'media',
          label: 'Media Assets',
          icon: <FolderKanban className="w-4 h-4" />,
          badge: assets.length
        },
        {
          id: 'schedules',
          label: 'Daypart Schedules',
          icon: <CalendarClock className="w-4 h-4" />,
          badge: schedules.filter(s => s.isActive).length
        },
        {
          id: 'publish',
          label: 'Deploy & Publish',
          icon: <Send className="w-4 h-4" />,
          badge: null
        }
      ]
    },
    {
      title: 'PLAYBACK & AUDIT',
      items: [
        {
          id: 'player',
          label: 'Hardware Player',
          icon: <Tv className="w-4 h-4" />,
          badge: 'Live'
        },
        {
          id: 'analytics',
          label: 'Proof of Play',
          icon: <BarChart3 className="w-4 h-4" />,
          badge: null
        },
        {
          id: 'rbac',
          label: 'Users & Roles',
          icon: <Users className="w-4 h-4" />,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside className="w-60 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-4rem)] select-none">
      {/* Navigation Sections */}
      <div className="p-3.5 space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            <p className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1 font-mono">
              {section.title}
            </p>
            {section.items.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-xs transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Pair New Screen Quick Button */}
        <div className="pt-1">
          <button
            onClick={onOpenPairingModal}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Pair Display PIN</span>
          </button>
        </div>
      </div>

      {/* Light Telemetry Health Box */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-800">Fleet Status</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            {analytics.uptimePercent}%
          </span>
        </div>

        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${analytics.uptimePercent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-center pt-1">
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-900 block font-mono">
              {analytics.onlineScreens}/{analytics.totalScreens}
            </span>
            <span className="text-[9px] text-slate-500 uppercase font-semibold">Online</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-blue-600 block font-mono">
              {analytics.bandwidthUsedGb} GB
            </span>
            <span className="text-[9px] text-slate-500 uppercase font-semibold">Mesh</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
