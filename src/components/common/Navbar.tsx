import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  Tv, 
  AlertTriangle, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  Radio,
  Search
} from 'lucide-react';
import { UserRole } from '../../types/signage';
import { getRoleBadge } from '../../utils/helpers';

interface NavbarProps {
  onOpenEmergencyModal: () => void;
  onOpenPlayerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmergencyModal,
  onOpenPlayerModal
}) => {
  const { 
    currentUser, 
    setCurrentUserRole, 
    screens, 
    resetAllToDefaults,
    clearEmergencyBroadcast,
    setActiveTab,
    analytics
  } = useSignage();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const hasEmergencyActive = screens.some(s => s.emergencyAlertActive);
  const currentRoleBadge = getRoleBadge(currentUser.role);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'super_admin', title: 'Super Admin', desc: 'Full root access to fleet & publishing' },
    { role: 'content_manager', title: 'Content Manager', desc: 'Manage assets, layouts & schedules' },
    { role: 'operator', title: 'Screen Operator', desc: 'Fleet controls, reboots & pairing' },
    { role: 'viewer', title: 'Viewer', desc: 'Read-only access' },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white px-4 lg:px-6 flex items-center justify-between shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base text-slate-900 tracking-tight">
              Omni<span className="text-blue-600">Sign</span>
            </span>
            <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              CMS
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{analytics.onlineScreens}/{analytics.totalScreens} Displays Online</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-emerald-700 font-bold">{analytics.uptimePercent}% Uptime</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Emergency Alert */}
        {hasEmergencyActive ? (
          <button
            onClick={() => clearEmergencyBroadcast()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>Clear Emergency</span>
          </button>
        ) : (
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Emergency Alert</span>
          </button>
        )}

        {/* Live Player Button */}
        <button
          onClick={onOpenPlayerModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Player</span>
        </button>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className={`px-1.5 py-0.2 rounded text-[11px] font-bold border ${currentRoleBadge.badgeClass}`}>
              {currentRoleBadge.label}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setRoleDropdownOpen(false)}
            >
              <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Switch Role</p>
              </div>

              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    setCurrentUserRole(r.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between text-xs ${
                    currentUser.role === r.role ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{r.title}</span>
                  {currentUser.role === r.role && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
          </button>

          {profileDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-white border border-slate-200 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="px-2.5 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => {
                    resetAllToDefaults();
                    setProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>

                <a
                  href="?view=player&screen=scr-001"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Standalone Web Player</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
