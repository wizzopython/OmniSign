import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { LayoutCanvas } from '../../types/signage';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  ExternalLink, 
  ArrowLeft
} from 'lucide-react';
import { CanvasEditor } from './CanvasEditor';

interface LayoutStudioProps {
  onOpenPlayerWithLayout: (layout: LayoutCanvas) => void;
}

export const LayoutStudio: React.FC<LayoutStudioProps> = ({ onOpenPlayerWithLayout }) => {
  const { 
    layouts, 
    addLayout, 
    updateLayout, 
    deleteLayout, 
    selectedLayout
  } = useSignage();

  const [editingLayout, setEditingLayout] = useState<LayoutCanvas | null>(selectedLayout || null);

  const handleCreateNew = () => {
    const newCanvas = addLayout({
      name: `Canvas Layout #${layouts.length + 1}`,
      description: 'Split-screen digital signage layout',
      aspectRatio: '16:9',
      width: 1920,
      height: 1080,
      backgroundColor: '#0f172a',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
      zones: [
        {
          id: `zn-${Date.now()}-1`,
          name: 'Primary Zone',
          x: 2,
          y: 2,
          width: 96,
          height: 80,
          zIndex: 1,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-2`,
          name: 'Ticker',
          x: 2,
          y: 84,
          width: 96,
          height: 14,
          zIndex: 2,
          contentType: 'ticker',
          customData: {
            text: '⚡ WELCOME TO OMNISIGN CLOUD DIGITAL SIGNAGE',
            speed: 20,
            color: '#2563eb'
          }
        }
      ]
    });

    setEditingLayout(newCanvas);
  };

  const handleDuplicate = (layout: LayoutCanvas) => {
    const duplicated = addLayout({
      name: `${layout.name} (Copy)`,
      description: layout.description,
      aspectRatio: layout.aspectRatio,
      width: layout.width,
      height: layout.height,
      backgroundColor: layout.backgroundColor,
      thumbnailUrl: layout.thumbnailUrl,
      zones: layout.zones.map(z => ({ ...z, id: `zn-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` }))
    });
    setEditingLayout(duplicated);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Canvas Studio & Layouts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Design multi-zone canvases, tickers, and split-screen templates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {editingLayout && (
            <button
              onClick={() => setEditingLayout(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to List</span>
            </button>
          )}

          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Canvas</span>
          </button>
        </div>
      </div>

      {editingLayout ? (
        <CanvasEditor
          layout={editingLayout}
          onSave={updated => {
            updateLayout(updated.id, updated);
          }}
          onPreviewLive={layout => {
            onOpenPlayerWithLayout(layout);
          }}
        />
      ) : (
        /* Layout Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layouts.map(layout => (
            <div
              key={layout.id}
              className="rounded-xl surface-card surface-card-hover flex flex-col justify-between overflow-hidden"
            >
              {/* Thumbnail */}
              <div 
                className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setEditingLayout(layout)}
              >
                <img
                  src={layout.thumbnailUrl}
                  alt={layout.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 shadow-xs text-slate-800">
                    {layout.aspectRatio}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 shadow-xs text-slate-700">
                    {layout.zones.length} Zones
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setEditingLayout(layout)}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                    title={layout.name}
                  >
                    {layout.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {layout.description}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{layout.updatedAt}</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(layout)}
                      className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                      title="Clone"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenPlayerWithLayout(layout)}
                      className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded"
                      title="Player"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditingLayout(layout)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete layout ${layout.name}?`)) {
                          deleteLayout(layout.id);
                        }
                      }}
                      className="p-1 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
