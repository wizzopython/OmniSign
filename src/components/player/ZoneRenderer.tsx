import React, { useState, useEffect } from 'react';
import { LayoutZone, MediaAsset } from '../../types/signage';
import { 
  Clock, 
  CloudSun, 
  QrCode, 
  Coffee, 
  Film, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

interface ZoneRendererProps {
  zone: LayoutZone;
  assets: MediaAsset[];
}

export const ZoneRenderer: React.FC<ZoneRendererProps> = ({ zone, assets }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const assignedAsset = assets.find(a => a.id === zone.contentId);

  // Render by content type
  switch (zone.contentType) {
    case 'ticker':
      return (
        <div
          className="w-full h-full flex items-center px-4 overflow-hidden"
          style={{
            backgroundColor: zone.customData?.backgroundColor || '#0f172a',
            color: zone.customData?.color || '#38bdf8'
          }}
        >
          <div 
            className="whitespace-nowrap font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-3 animate-marquee"
            style={{ animationDuration: `${zone.customData?.speed || 20}s` }}
          >
            <span>{zone.customData?.text || '⚡ LIVE DIGITAL SIGNAGE BROADCAST FEED'}</span>
          </div>
        </div>
      );

    case 'clock':
      return (
        <div className="w-full h-full p-4 bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center text-center text-white border border-slate-700/50 shadow-inner">
          <Clock className="w-6 h-6 text-brand-400 mb-1 animate-pulse" />
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-white">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-xs text-brand-300 font-semibold mt-0.5">
            {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1">
            {zone.customData?.city || 'Local Time'}
          </span>
        </div>
      );

    case 'weather':
      return (
        <div className="w-full h-full p-4 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center text-center text-white border border-slate-700/50 shadow-inner">
          <CloudSun className="w-8 h-8 text-amber-400 mb-1 animate-bounce" />
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            24°{zone.customData?.tempUnit || 'C'}
          </div>
          <div className="text-xs text-slate-300 font-medium mt-0.5">
            Partly Sunny • Humidity 48%
          </div>
          <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider mt-1">
            {zone.customData?.city || 'New York, USA'}
          </span>
        </div>
      );

    case 'qr':
      return (
        <div className="w-full h-full p-3 bg-white flex flex-col items-center justify-center text-center text-slate-900 shadow-md">
          <div className="p-2 bg-slate-100 rounded-xl border border-slate-300">
            <QrCode className="w-14 h-14 sm:w-16 sm:h-16 text-black" />
          </div>
          <span className="text-[11px] font-bold text-slate-900 mt-2 px-2 leading-tight">
            {zone.customData?.text || 'Scan with your smartphone camera'}
          </span>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-full">
            {zone.customData?.qrValue || 'https://omnisign.cloud'}
          </span>
        </div>
      );

    case 'menu':
      return (
        <div className="w-full h-full p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex flex-col justify-between text-white border border-amber-500/30">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">Chef Specials & Menu</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Fresh Daily
            </span>
          </div>

          <div className="space-y-2.5 my-2 overflow-y-auto pr-1">
            {(zone.customData?.menuItems || [
              { name: 'Caramel Nitro Cold Brew', price: '$6.50', desc: 'Single-origin espresso & organic oat milk', tag: 'Bestseller' },
              { name: 'Smoked Salmon Avocado Toast', price: '$12.95', desc: 'Poached egg, microgreens, sourdough', tag: 'Fresh' },
              { name: 'Matcha Blossom Latte & Boba', price: '$7.20', desc: 'Uji ceremonial matcha with honey boba', tag: 'Popular' }
            ]).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-800/60">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white truncate">{item.name}</span>
                    {item.tag && (
                      <span className="text-[9px] font-bold text-brand-400 bg-brand-500/10 px-1.5 py-0.2 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                </div>
                <span className="font-mono font-black text-amber-400 text-sm">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-800/80">
            ⚡ Scan table QR code for contactless ordering & instant reward points
          </div>
        </div>
      );

    case 'video':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
          {assignedAsset?.url ? (
            <video
              src={assignedAsset.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <Film className="w-10 h-10 text-slate-600 mx-auto mb-1 animate-pulse" />
              <span className="text-xs text-slate-400">4K Video Channel</span>
            </div>
          )}
        </div>
      );

    case 'image':
    default:
      return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
          {assignedAsset ? (
            <img
              src={assignedAsset.url || assignedAsset.thumbnailUrl}
              alt={assignedAsset.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-1" />
              <span className="text-xs text-slate-400">Media Content Zone</span>
            </div>
          )}
        </div>
      );
  }
};
