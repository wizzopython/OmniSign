import React from 'react';
import { LayoutZone, ZoneContentType } from '../../types/signage';
import { useSignage } from '../../context/SignageContext';
import { 
  Layers, 
  Trash2, 
  Sliders, 
  Type, 
  CloudSun, 
  Clock, 
  QrCode, 
  Film, 
  Coffee
} from 'lucide-react';

interface ZonePropertiesPanelProps {
  zone: LayoutZone | null;
  onUpdateZone: (updated: LayoutZone) => void;
  onDeleteZone: (zoneId: string) => void;
}

export const ZonePropertiesPanel: React.FC<ZonePropertiesPanelProps> = ({
  zone,
  onUpdateZone,
  onDeleteZone
}) => {
  const { assets } = useSignage();

  if (!zone) {
    return (
      <div className="p-6 rounded-xl surface-card text-center flex flex-col items-center justify-center min-h-[300px]">
        <Layers className="w-8 h-8 text-slate-300 mb-2" />
        <p className="text-xs font-bold text-slate-700">No Zone Selected</p>
        <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
          Click any canvas zone on the left to configure its content, position and size.
        </p>
      </div>
    );
  }

  const handleContentTypeChange = (type: ZoneContentType) => {
    let customData = zone.customData || {};
    if (type === 'ticker' && !customData.text) {
      customData.text = '⚡ SPECIAL OFFER: 20% OFF all seasonal items this weekend! Scan QR code for details.';
      customData.speed = 20;
      customData.color = '#2563eb';
    } else if (type === 'weather' && !customData.city) {
      customData.city = 'New York, USA';
      customData.tempUnit = 'C';
    } else if (type === 'clock' && !customData.city) {
      customData.city = 'Local Time';
    } else if (type === 'qr' && !customData.qrValue) {
      customData.qrValue = 'https://omnisign.io/offer';
      customData.text = 'Scan with your mobile camera';
    }

    onUpdateZone({
      ...zone,
      contentType: type,
      customData
    });
  };

  const handleCustomDataChange = (key: string, value: any) => {
    onUpdateZone({
      ...zone,
      customData: {
        ...(zone.customData || {}),
        [key]: value
      }
    });
  };

  return (
    <div className="p-4 rounded-xl surface-card space-y-4">
      {/* Zone Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Selected Zone</span>
          <input
            type="text"
            value={zone.name}
            onChange={e => onUpdateZone({ ...zone, name: e.target.value })}
            className="text-sm font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none block w-full mt-0.5"
          />
        </div>

        <button
          onClick={() => onDeleteZone(zone.id)}
          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors"
          title="Delete Zone"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Coordinates */}
      <div>
        <span className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-blue-600" /> Size & Position (%)
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">X (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={zone.x}
              onChange={e => onUpdateZone({ ...zone, x: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Y (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={zone.y}
              onChange={e => onUpdateZone({ ...zone, y: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Width (%)</label>
            <input
              type="number"
              min="5"
              max="100"
              value={zone.width}
              onChange={e => onUpdateZone({ ...zone, width: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Height (%)</label>
            <input
              type="number"
              min="5"
              max="100"
              value={zone.height}
              onChange={e => onUpdateZone({ ...zone, height: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Content Type */}
      <div>
        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Content Type</span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'image', label: 'Media', icon: <Film className="w-3.5 h-3.5" /> },
            { id: 'ticker', label: 'Ticker', icon: <Type className="w-3.5 h-3.5" /> },
            { id: 'clock', label: 'Clock', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'weather', label: 'Weather', icon: <CloudSun className="w-3.5 h-3.5" /> },
            { id: 'menu', label: 'Menu', icon: <Coffee className="w-3.5 h-3.5" /> },
            { id: 'qr', label: 'QR Code', icon: <QrCode className="w-3.5 h-3.5" /> }
          ].map(ct => (
            <button
              key={ct.id}
              type="button"
              onClick={() => handleContentTypeChange(ct.id as ZoneContentType)}
              className={`p-2 rounded-lg text-left border flex items-center gap-1.5 text-xs transition-colors ${
                zone.contentType === ct.id
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {ct.icon}
              <span>{ct.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Inspector */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
        {(zone.contentType === 'image' || zone.contentType === 'video' || zone.contentType === 'media') && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Select Asset
            </label>
            <select
              value={zone.contentId || ''}
              onChange={e => onUpdateZone({ ...zone, contentId: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Choose asset...</option>
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        )}

        {zone.contentType === 'ticker' && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Ticker Message
            </label>
            <textarea
              rows={2}
              value={zone.customData?.text || ''}
              onChange={e => handleCustomDataChange('text', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        )}

        {zone.contentType === 'weather' && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              City Name
            </label>
            <input
              type="text"
              value={zone.customData?.city || ''}
              onChange={e => handleCustomDataChange('city', e.target.value)}
              placeholder="e.g. New York, USA"
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
            />
          </div>
        )}

        {zone.contentType === 'qr' && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Destination URL
            </label>
            <input
              type="url"
              value={zone.customData?.qrValue || ''}
              onChange={e => handleCustomDataChange('qrValue', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
            />
          </div>
        )}
      </div>
    </div>
  );
};
