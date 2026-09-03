import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  Plus, 
  Search, 
  Film, 
  Image as ImageIcon, 
  Eye, 
  Trash2, 
  Coffee,
  Layers
} from 'lucide-react';
import { MediaAsset, AssetType } from '../../types/signage';
import { formatBytes, formatDuration } from '../../utils/helpers';
import { AssetPreviewModal } from './AssetPreviewModal';
import { MediaUploader } from './MediaUploader';

export const MediaLibrary: React.FC = () => {
  const { assets, deleteAsset } = useSignage();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const categories = ['all', 'Promotions', 'Menu Boards', 'Corporate', 'Widgets'];

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalBytes = assets.reduce((acc, a) => acc + a.sizeBytes, 0);

  const getTypeIcon = (type: AssetType) => {
    switch (type) {
      case 'video':
        return <Film className="w-3.5 h-3.5 text-blue-600" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-purple-600" />;
      case 'menu':
        return <Coffee className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Media & Asset Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store 4K videos, promotional banners, menus and dynamic widgets.
          </p>
        </div>

        <button
          onClick={() => setIsUploaderOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl surface-card">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors shrink-0 ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Assets' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            className="rounded-xl surface-card surface-card-hover flex flex-col justify-between overflow-hidden group"
          >
            {/* Thumbnail */}
            <div 
              className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer"
              onClick={() => setPreviewAsset(asset)}
            >
              <img
                src={asset.thumbnailUrl}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-white/90 shadow-xs text-slate-800">
                  {getTypeIcon(asset.type)}
                  <span>{asset.type}</span>
                </span>

                <span className="text-[10px] font-semibold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
                  {formatDuration(asset.durationSec)}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => setPreviewAsset(asset)}
                  className="text-xs font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                  title={asset.name}
                >
                  {asset.name}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>{asset.category}</span>
                  <span className="font-mono">{formatBytes(asset.sizeBytes)}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 text-[10px]">{asset.uploadedAt}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewAsset(asset)}
                    className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded"
                    title="Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete ${asset.name}?`)) {
                        deleteAsset(asset.id);
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

      <AssetPreviewModal
        asset={previewAsset}
        onClose={() => setPreviewAsset(null)}
      />

      <MediaUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />
    </div>
  );
};
