import React, { useState } from 'react';
import { LayoutCanvas, LayoutZone } from '../../types/signage';
import { useSignage } from '../../context/SignageContext';
import { 
  Plus, 
  Eye, 
  Save, 
  Sparkles, 
  Film, 
  Type, 
  CloudSun, 
  Clock, 
  QrCode, 
  Coffee 
} from 'lucide-react';
import { ZonePropertiesPanel } from './ZonePropertiesPanel';
import { LayoutTemplatesModal } from './LayoutTemplatesModal';

interface CanvasEditorProps {
  layout: LayoutCanvas;
  onSave: (layout: LayoutCanvas) => void;
  onPreviewLive: (layout: LayoutCanvas) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  layout: initialLayout,
  onSave,
  onPreviewLive
}) => {
  const { assets } = useSignage();
  const [layout, setLayout] = useState<LayoutCanvas>(initialLayout);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(initialLayout.zones[0]?.id || null);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedZone = layout.zones.find(z => z.id === selectedZoneId) || null;

  const handleAddZone = () => {
    const newZoneId = `zn-${Date.now()}`;
    const newZone: LayoutZone = {
      id: newZoneId,
      name: `Zone #${layout.zones.length + 1}`,
      x: 10,
      y: 10,
      width: 40,
      height: 35,
      zIndex: layout.zones.length + 1,
      contentType: 'image',
      contentId: assets[0]?.id
    };

    setLayout(prev => ({
      ...prev,
      zones: [...prev.zones, newZone]
    }));
    setSelectedZoneId(newZoneId);
  };

  const handleUpdateZone = (updatedZone: LayoutZone) => {
    setLayout(prev => ({
      ...prev,
      zones: prev.zones.map(z => z.id === updatedZone.id ? updatedZone : z)
    }));
  };

  const handleDeleteZone = (zoneId: string) => {
    setLayout(prev => {
      const remaining = prev.zones.filter(z => z.id !== zoneId);
      return { ...prev, zones: remaining };
    });
    if (selectedZoneId === zoneId) {
      setSelectedZoneId(layout.zones.find(z => z.id !== zoneId)?.id || null);
    }
  };

  const isPortrait = layout.aspectRatio === '9:16';

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl surface-card">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={layout.name}
            onChange={e => setLayout(prev => ({ ...prev, name: e.target.value }))}
            className="text-sm font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none"
          />

          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600 border border-slate-200">
            {layout.aspectRatio}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTemplatesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              previewMode ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Live Preview' : 'Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddZone}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            <span>Add Zone</span>
          </button>

          <button
            type="button"
            onClick={() => onSave(layout)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Canvas</span>
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Canvas Surface */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 rounded-xl surface-card min-h-[480px] bg-slate-100 relative">
          <div
            className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 transition-all ${
              isPortrait ? 'w-64 h-[440px]' : 'w-full max-w-[620px] aspect-video'
            }`}
            style={{ backgroundColor: layout.backgroundColor || '#0f172a' }}
          >
            {layout.zones.map(zone => {
              const isSelected = selectedZoneId === zone.id;
              const assignedAsset = assets.find(a => a.id === zone.contentId);

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  style={{
                    position: 'absolute',
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`,
                    zIndex: zone.zIndex
                  }}
                  className={`cursor-pointer transition-all rounded overflow-hidden select-none ${
                    isSelected
                      ? 'ring-2 ring-blue-500 shadow-md'
                      : 'hover:ring-1 hover:ring-slate-400'
                  }`}
                >
                  {zone.contentType === 'ticker' ? (
                    <div 
                      className="w-full h-full flex items-center px-3 overflow-hidden bg-slate-900 text-blue-400"
                    >
                      <div className="whitespace-nowrap font-bold text-[10px] animate-marquee">
                        <span>{zone.customData?.text || '⚡ LIVE TICKER BROADCAST'}</span>
                      </div>
                    </div>
                  ) : zone.contentType === 'clock' ? (
                    <div className="w-full h-full p-2 bg-slate-900/90 flex flex-col items-center justify-center text-center text-white">
                      <Clock className="w-3.5 h-3.5 text-blue-400 mb-0.5" />
                      <span className="text-xs font-black font-mono">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ) : zone.contentType === 'weather' ? (
                    <div className="w-full h-full p-2 bg-slate-900/90 flex flex-col items-center justify-center text-center text-white">
                      <CloudSun className="w-4 h-4 text-amber-400 mb-0.5" />
                      <span className="text-xs font-bold">24°C Sunny</span>
                    </div>
                  ) : zone.contentType === 'qr' ? (
                    <div className="w-full h-full p-2 bg-white flex flex-col items-center justify-center text-center text-slate-900">
                      <QrCode className="w-6 h-6 text-black" />
                      <span className="text-[8px] font-bold mt-0.5">Scan QR</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                      {assignedAsset ? (
                        <img
                          src={assignedAsset.thumbnailUrl || assignedAsset.url}
                          alt={assignedAsset.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Film className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  )}

                  {!previewMode && (
                    <div className="absolute top-1 left-1 bg-black/70 px-1 py-0.2 rounded text-[8px] font-bold text-white">
                      #{zone.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Inspector */}
        <div className="lg:col-span-4">
          <ZonePropertiesPanel
            zone={selectedZone}
            onUpdateZone={handleUpdateZone}
            onDeleteZone={handleDeleteZone}
          />
        </div>
      </div>

      <LayoutTemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={tpl => {
          setLayout(prev => ({
            ...prev,
            name: tpl.name,
            aspectRatio: tpl.aspectRatio,
            width: tpl.width,
            height: tpl.height,
            zones: tpl.zones
          }));
          setSelectedZoneId(tpl.zones[0]?.id || null);
        }}
      />
    </div>
  );
};
