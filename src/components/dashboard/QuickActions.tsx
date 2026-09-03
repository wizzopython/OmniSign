import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  PlusCircle, 
  Layers, 
  Send, 
  Film, 
  Radio, 
  CalendarClock,
  ArrowRight
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
      title: 'Canvas Studio',
      desc: 'Multi-zone designer',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />,
      onClick: () => setActiveTab('layouts'),
      iconBox: 'bg-orange-50 border-orange-100 text-orange-600'
    },
    {
      title: 'Pair Display PIN',
      desc: 'Link screen via PIN',
      icon: <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      onClick: onOpenPairingModal,
      iconBox: 'bg-emerald-50 border-emerald-100 text-emerald-600'
    },
    {
      title: 'Deploy to Fleet',
      desc: 'Target publish layouts',
      icon: <Send className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />,
      onClick: () => setActiveTab('publish'),
      iconBox: 'bg-amber-50 border-amber-100 text-amber-600'
    },
    {
      title: 'Upload Media',
      desc: '4K video & graphics',
      icon: <Film className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />,
      onClick: onOpenMediaUploader,
      iconBox: 'bg-purple-50 border-purple-100 text-purple-600'
    },
    {
      title: 'Daypart Schedules',
      desc: 'Automated rules',
      icon: <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" />,
      onClick: () => setActiveTab('schedules'),
      iconBox: 'bg-stone-100 border-stone-200 text-stone-700'
    },
    {
      title: 'Emergency Alert',
      desc: 'Instant screen override',
      icon: <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />,
      onClick: onOpenEmergencyModal,
      iconBox: 'bg-rose-50 border-rose-100 text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 w-full">
      {actions.map((act, idx) => (
        <button
          key={idx}
          onClick={act.onClick}
          className="p-3.5 sm:p-4 rounded-2xl bento-card text-left flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-md transition-all w-full"
        >
          <div>
            <div className={`p-2 sm:p-2.5 w-fit rounded-xl border ${act.iconBox} mb-2.5 sm:mb-3 group-hover:scale-105 transition-transform`}>
              {act.icon}
            </div>

            <h4 className="text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
              {act.title}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 line-clamp-1">
              {act.desc}
            </p>
          </div>

          <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-semibold group-hover:text-orange-600">
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  );
};
