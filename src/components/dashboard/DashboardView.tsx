import React, { useState } from 'react';
import { OverviewMetrics } from './OverviewMetrics';
import { FleetStatusCard } from './FleetStatusCard';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { 
  PlusCircle, 
  Send,
  Radio, 
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Building2,
  AlertTriangle,
  Monitor
} from 'lucide-react';
import { useSignage } from '../../context/SignageContext';

interface DashboardViewProps {
  onOpenPairingModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenMediaUploader: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenPairingModal,
  onOpenEmergencyModal,
  onOpenMediaUploader
}) => {
  const { 
    screens, 
    loadScenarioPreset, 
    setActiveTab, 
    addScreen, 
    showToast 
  } = useSignage();

  const [activeScenario, setActiveScenario] = useState<'retail' | 'restaurant' | 'corporate' | 'emergency'>('retail');

  const handleScenarioChange = (scenario: 'retail' | 'restaurant' | 'corporate' | 'emergency') => {
    setActiveScenario(scenario);
    loadScenarioPreset(scenario);
  };

  const handleSimulateNewDisplay = () => {
    const pin = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
    addScreen({
      name: `Display #${screens.length + 1} (Live Synced)`,
      pairingCode: pin,
      location: 'Virtual Test Display',
      department: 'Customer Experience',
      group: 'Flagship Stores',
      os: 'Android 13 (SignageOS)',
      resolution: '3840x2160 (4K UHD)',
      orientation: 'landscape',
      assignedLayoutId: 'lay-001',
      tags: ['Simulated', 'Active']
    });
    showToast('New Display Connected', `Display paired with PIN ${pin} and started playing.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Top Interactive Live Showcase Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <span className="text-xs font-extrabold text-slate-900 block font-display">
              Interactive Live Scenarios
            </span>
            <span className="text-[11px] text-slate-500">
              Click to instantly change all connected displays & player layouts
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            onClick={() => handleScenarioChange('retail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'retail'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Retail Wall</span>
          </button>

          <button
            onClick={() => handleScenarioChange('restaurant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'restaurant'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Menu Board</span>
          </button>

          <button
            onClick={() => handleScenarioChange('corporate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'corporate'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate L-Bar</span>
          </button>

          <button
            onClick={() => handleScenarioChange('emergency')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'emergency'
                ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* 2. Signature Hero Bento Capsule */}
      <div className="relative overflow-hidden bento-hero p-6 sm:p-7">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OmniSign OS • {screens.length} Displays Mesh Connected</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              Cloud Digital Signage Platform
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Design multi-zone 4K split-screen canvases, automate dayparting schedules, and manage live hardware displays in real time.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={handleSimulateNewDisplay}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs transition-all hover:scale-102"
              title="Add simulated live hardware display"
            >
              <Monitor className="w-4 h-4 text-emerald-600" />
              <span>+ Simulate TV Screen</span>
            </button>

            <button
              onClick={onOpenPairingModal}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Pair Display PIN</span>
            </button>

            <button
              onClick={() => setActiveTab('publish')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs transition-all"
            >
              <Send className="w-4 h-4 text-blue-600" />
              <span>Deploy Layout</span>
            </button>
          </div>
        </div>

        {/* Live Network Broadcast Marquee Ribbon inside Hero */}
        <div className="mt-5 pt-3.5 border-t border-blue-100 flex items-center gap-3 overflow-hidden text-xs">
          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px] tracking-wider uppercase shrink-0 font-mono flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" /> Network Feed
          </span>
          <div className="overflow-hidden whitespace-nowrap text-slate-600 font-medium">
            <div className="animate-marquee inline-block font-semibold">
              ⚡ LIVE BROADCAST: {screens.length} displays online • 4K video feeds syncing at 60 FPS • Edge CDN latency 18ms • Proof-of-play cryptographically signed
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bento Metric Cards */}
      <OverviewMetrics />

      {/* 4. Quick Action Bento Tiles */}
      <QuickActions
        onOpenPairingModal={onOpenPairingModal}
        onOpenEmergencyModal={onOpenEmergencyModal}
        onOpenMediaUploader={onOpenMediaUploader}
      />

      {/* 5. Designer Smart Displays Wall */}
      <FleetStatusCard />

      {/* 6. Real-time Security & Deployment Streams */}
      <RecentActivity />
    </div>
  );
};
