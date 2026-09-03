import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { Modal } from '../common/Modal';
import { 
  UploadCloud, 
  Sparkles, 
  Check, 
  Loader2 
} from 'lucide-react';
import { AssetType } from '../../types/signage';

interface MediaUploaderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ isOpen, onClose }) => {
  const { addAsset } = useSignage();

  const [name, setName] = useState('');
  const [type, setType] = useState<AssetType>('image');
  const [category, setCategory] = useState<'Promotions' | 'Information' | 'Menu Boards' | 'Live Streams' | 'Widgets' | 'Corporate'>('Promotions');
  const [url, setUrl] = useState('');
  const [dimensions, setDimensions] = useState('1920x1080');
  const [durationSec, setDurationSec] = useState(15);
  const [isUploading, setIsUploading] = useState(false);

  const samplePresets = [
    {
      name: 'Summer Fashion Promo 4K',
      type: 'video' as AssetType,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-models-in-a-fashion-show-42861-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      category: 'Promotions' as const,
      dimensions: '3840x2160 (4K)',
      duration: 30
    },
    {
      name: 'Artisan Cafe & Bakery Board',
      type: 'menu' as AssetType,
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
      category: 'Menu Boards' as const,
      dimensions: '1920x1080',
      duration: 15
    }
  ];

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setName(preset.name);
    setType(preset.type);
    setUrl(preset.url);
    setCategory(preset.category);
    setDimensions(preset.dimensions);
    setDurationSec(preset.duration);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      const defaultThumbnail = url || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80';

      addAsset({
        name,
        type,
        category,
        url: url || defaultThumbnail,
        thumbnailUrl: defaultThumbnail,
        sizeBytes: type === 'video' ? 38500000 : 2400000,
        dimensions,
        durationSec: Number(durationSec) || 10,
        tags: ['Uploaded', 'Active']
      });

      setName('');
      setUrl('');
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Media Asset"
      subtitle="Upload 4K video clips, graphic posters, or dynamic menu templates"
      maxWidth="xl"
    >
      <form onSubmit={handleUploadSubmit} className="space-y-4">
        {/* Presets */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Stock Blueprints
          </span>
          <div className="grid grid-cols-2 gap-2">
            {samplePresets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-500 text-left transition-colors"
              >
                <span className="text-[10px] font-bold uppercase text-blue-600 block">{p.type}</span>
                <span className="text-xs font-semibold text-slate-900 line-clamp-1">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Asset Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Summer Promo 4K"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            >
              <option value="Promotions">Promotions</option>
              <option value="Menu Boards">Menu Boards</option>
              <option value="Corporate">Corporate</option>
              <option value="Information">Information</option>
              <option value="Widgets">Widgets</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Asset Type
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            >
              <option value="image">Image (PNG / JPG)</option>
              <option value="video">Video (MP4 / 4K)</option>
              <option value="menu">Digital Menu Board</option>
              <option value="widget">Interactive Widget</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Source URL
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Upload Asset</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
