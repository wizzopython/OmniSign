import React from 'react';
import { MediaAsset } from '../../types/signage';
import { Modal } from '../common/Modal';
import { formatBytes, formatDuration } from '../../utils/helpers';
import { 
  Film, 
  Clock, 
  HardDrive, 
  Layers, 
  ExternalLink
} from 'lucide-react';

interface AssetPreviewModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
}

export const AssetPreviewModal: React.FC<AssetPreviewModalProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  return (
    <Modal
      isOpen={!!asset}
      onClose={onClose}
      title={asset.name}
      subtitle={`Category: ${asset.category}`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Media Preview Player */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
          {asset.type === 'video' ? (
            <video
              src={asset.url}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={asset.url || asset.thumbnailUrl}
              alt={asset.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Technical Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Format</span>
            <span className="text-sm font-bold text-slate-900 uppercase">{asset.type}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Dimensions</span>
            <span className="text-sm font-bold text-slate-900">{asset.dimensions}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Size</span>
            <span className="text-sm font-bold text-slate-900">{formatBytes(asset.sizeBytes)}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Duration</span>
            <span className="text-sm font-bold text-slate-900">{formatDuration(asset.durationSec)}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          {asset.url && (
            <a
              href={asset.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Source URL</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
