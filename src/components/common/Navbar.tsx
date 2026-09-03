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
  Menu,
  X,
  LayoutDashboard,
  MonitorSmartphone,
  Layers,
  FolderKanban,
  CalendarClock,
  Send,
  Users,
  BarChart3
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
    activeTab,
    setActiveTab,
    analytics
  } = useSignage();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasEmergencyActive = screens.some(s => s.emergencyAlertActive);
  const currentRoleBadge = getRoleBadge(currentUser.role);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'super_admin', title: 'Super Admin', desc: 'Full root access to fleet & publishing' },
    { role: 'content_manager', title: 'Content Manager', desc: 'Manage assets, layouts & schedules' },
    { role: 'operator', title: 'Screen Operator', desc: 'Fleet controls, reboots & pairing' },
    { role: 'viewer', title: 'Viewer', desc: 'Read-only access' },
  ];

  const mobileNavLinks = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'screens', label: 'Displays', icon: <MonitorSmartphone className="w-4 h-4" /> },
    { id: 'layouts', label: 'Canvas Studio', icon: <Layers className="w-4 h-4" /> },
    { id: 'media', label: 'Media Vault', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'schedules', label: 'Schedules', icon: <CalendarClock className="w-4 h-4" /> },
    { id: 'publish', label: 'Deploy', icon: <Send className="w-4 h-4" /> },
    { id: 'player', label: 'Live Player', icon: <Tv className="w-4 h-4" /> },
    { id: 'analytics', label: 'Proof of Play', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'rbac', label: 'User Roles', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-[#e8e4dc] bg-white/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shadow-2xs w-full max-w-full">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div 
          onClick={() => {
            setActiveTab('dashboard');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-600 text-white font-bold shadow-xs shadow-orange-600/30 group-hover:bg-orange-700 transition-colors">
            <Tv className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base text-stone-900 tracking-tight font-display">
              Omni<span className="text-orange-600">Sign</span>
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-50 text-orange-700 border border-orange-200 uppercase font-mono hidden sm:inline">
              Studio
            </span>
          </div>
        </div>

        {/* Global Mesh Status Pill (Desktop Only) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9f6f0] border border-[#e8e4dc] text-[11px] text-stone-600 font-medium ml-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{analytics.onlineScreens}/{analytics.totalScreens} Displays Online</span>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-emerald-700 font-bold">{analytics.uptimePercent}% SLA</span>
        </div>
      </div>

      {/* Desktop Controls (Hidden on small mobile) */}
      <div className="hidden sm:flex items-center gap-2 sm:gap-3">
        {/* Emergency Alert */}
        {hasEmergencyActive ? (
          <button
            onClick={() => clearEmergencyBroadcast()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>Clear Emergency</span>
          </button>
        ) : (
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency Alert</span>
          </button>
        )}

        {/* Live Player Button */}
        <button
          onClick={onOpenPlayerModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Player</span>
        </button>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span className={`px-1.5 py-0.2 rounded text-[11px] font-bold border ${currentRoleBadge.badgeClass}`}>
              {currentRoleBadge.label.split(' ')[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>

          {roleDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 p-1.5 rounded-2xl bg-white border border-[#e8e4dc] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setRoleDropdownOpen(false)}
            >
              <div className="px-2.5 py-1.5 border-b border-stone-100 mb-1">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Switch Role</p>
              </div>

              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    setCurrentUserRole(r.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between text-xs ${
                    currentUser.role === r.role ? 'bg-orange-50 text-orange-800 font-bold' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{r.title}</span>
                  {currentUser.role === r.role && <span className="text-[10px] text-orange-600 font-bold">Active</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-orange-500 transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-stone-200"
            />
          </button>

          {profileDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white border border-[#e8e4dc] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="px-2.5 py-2 border-b border-stone-100 mb-1">
                <p className="text-xs font-bold text-stone-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => {
                    resetAllToDefaults();
                    setProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-amber-800 hover:bg-amber-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reset Demo Data</span>
                </button>

                <a
                  href="?view=player&screen=scr-001"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>Open Standalone Web Player</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Right Controls: Only Emergency + Menu Toggle */}
      <div className="flex sm:hidden items-center gap-1.5">
        {hasEmergencyActive ? (
          <button
            onClick={() => clearEmergencyBroadcast()}
            className="p-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
            title="Clear Emergency"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </button>
        ) : (
          <button
            onClick={onOpenEmergencyModal}
            className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700"
            title="Emergency Alert"
          >
            <Radio className="w-4 h-4 text-rose-600" />
          </button>
        )}

        <button
          onClick={onOpenPlayerModal}
          className="p-1.5 rounded-lg bg-orange-600 text-white"
          title="Launch Player"
        >
          <Play className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Fullscreen Slide-Down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#e8e4dc] shadow-2xl p-4 z-50 space-y-3 animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
            {mobileNavLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-700 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Role & Actions inside Mobile Drawer */}
          <div className="space-y-2 pt-1">
            <p className="text-[10px] font-bold uppercase text-stone-400 font-mono">Current Perspective</p>
            <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <span className="font-bold text-stone-800">{currentUser.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentRoleBadge.badgeClass}`}>
                {currentRoleBadge.label}
              </span>
            </div>

            <button
              onClick={() => {
                resetAllToDefaults();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
