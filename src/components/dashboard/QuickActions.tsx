import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  PlusCircle, 
  Layers, 
  Send, 
  Film, 
  Radio, 
  CalendarClock,
  ArrowRight,
  DollarSign,
  Zap
} from 'lucide-react';

interface QuickActionsProps {
  onOpenPairingModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenMediaUploader: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenPairingModal,
  onOpenEmergencyModal,
  onOpenMediaUploader
}) => {
  const { setActiveTab } = useSignage();

  const actions = [
    {
      title: 'Ad Slot Canvases',
      desc: '10s slot loop & split zones',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      onClick: () => setActiveTab('layouts'),
      iconBox: 'bg-blue-50 border-blue-100 text-blue-600'
    },
    {
      title: 'Pair Billboard PIN',
      desc: 'Connect outdoor LED display',
      icon: <PlusCircle className="w-5 h-5 text-emerald-600" />,
      onClick: onOpenPairingModal,
      iconBox: 'bg-emerald-50 border-emerald-100 text-emerald-600'
    },
    {
      title: 'Deploy to DSPs',
      desc: 'Push ad loops & floor rates',
      icon: <Send className="w-5 h-5 text-cyan-600" />,
      onClick: () => setActiveTab('publish'),
      iconBox: 'bg-cyan-50 border-cyan-100 text-cyan-600'
    },
    {
      title: 'Upload VAST Ad',
      desc: '4K video & HTML5 creatives',
      icon: <Film className="w-5 h-5 text-purple-600" />,
      onClick: onOpenMediaUploader,
      iconBox: 'bg-purple-50 border-purple-100 text-purple-600'
    },
    {
      title: 'Daypart Yield Rules',
      desc: 'Rush-hour CPM multipliers',
      icon: <CalendarClock className="w-5 h-5 text-amber-600" />,
      onClick: () => setActiveTab('schedules'),
      iconBox: 'bg-amber-50 border-amber-100 text-amber-600'
    },
    {
      title: 'Emergency Takeover',
      desc: 'Broadcast public safety alert',
      icon: <Radio className="w-5 h-5 text-rose-600" />,
      onClick: onOpenEmergencyModal,
      iconBox: 'bg-rose-50 border-rose-100 text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {actions.map((act, idx) => (
        <button
          key={idx}
          onClick={act.onClick}
          className="p-4 rounded-2xl bento-card text-left flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-md transition-all"
        >
          <div>
            <div className={`p-2.5 w-fit rounded-xl border ${act.iconBox} mb-3 group-hover:scale-105 transition-transform`}>
              {act.icon}
            </div>

            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {act.title}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              {act.desc}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold group-hover:text-blue-600">
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  );
};
