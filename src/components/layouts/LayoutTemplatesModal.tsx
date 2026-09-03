import React from 'react';
import { LayoutCanvas, LayoutZone } from '../../types/signage';
import { Modal } from '../common/Modal';
import { Check } from 'lucide-react';

interface LayoutTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Omit<LayoutCanvas, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const LayoutTemplatesModal: React.FC<LayoutTemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  const templates: Array<{
    title: string;
    description: string;
    aspectRatio: '16:9' | '9:16' | '32:9';
    zonesCount: number;
    zones: LayoutZone[];
  }> = [
    {
      title: '3-Zone Retail Showcase & Ticker',
      description: 'Primary media zone, side promo banner, and bottom ticker.',
      aspectRatio: '16:9',
      zonesCount: 3,
      zones: [
        {
          id: `zn-${Date.now()}-1`,
          name: 'Showcase Video',
          x: 2,
          y: 3,
          width: 68,
          height: 82,
          zIndex: 1,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-2`,
          name: 'Promo Sidebar',
          x: 72,
          y: 3,
          width: 26,
          height: 82,
          zIndex: 2,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-3`,
          name: 'Live Ticker',
          x: 2,
          y: 88,
          width: 96,
          height: 9,
          zIndex: 3,
          contentType: 'ticker',
          customData: {
            text: '⚡ SPECIAL OFFER: Save 20% on all seasonal items! Scan QR code for details.',
            speed: 20,
            color: '#2563eb'
          }
        }
      ]
    },
    {
      title: '9:16 Vertical Portrait Kiosk',
      description: 'Designed for vertical retail kiosks and lobby totems.',
      aspectRatio: '9:16',
      zonesCount: 3,
      zones: [
        {
          id: `zn-${Date.now()}-p1`,
          name: 'Header Clock',
          x: 4,
          y: 2,
          width: 92,
          height: 12,
          zIndex: 1,
          contentType: 'clock',
          customData: { city: 'Local Time' }
        },
        {
          id: `zn-${Date.now()}-p2`,
          name: 'Main Media',
          x: 4,
          y: 16,
          width: 92,
          height: 60,
          zIndex: 2,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-p3`,
          name: 'QR Connect',
          x: 4,
          y: 78,
          width: 92,
          height: 20,
          zIndex: 2,
          contentType: 'qr',
          customData: { qrValue: 'https://omnisign.cloud', text: 'Scan for directory' }
        }
      ]
    },
    {
      title: 'Corporate Executive L-Bar',
      description: 'L-Bar configuration for boardrooms with world clocks & news.',
      aspectRatio: '16:9',
      zonesCount: 3,
      zones: [
        {
          id: `zn-${Date.now()}-c1`,
          name: 'Announcements',
          x: 2,
          y: 3,
          width: 70,
          height: 84,
          zIndex: 1,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-c2`,
          name: 'World Time',
          x: 74,
          y: 3,
          width: 24,
          height: 84,
          zIndex: 2,
          contentType: 'clock'
        },
        {
          id: `zn-${Date.now()}-c3`,
          name: 'News Ticker',
          x: 2,
          y: 89,
          width: 96,
          height: 8,
          zIndex: 3,
          contentType: 'ticker',
          customData: { text: '📊 Global Markets Update • Welcome to Headquarters', speed: 22, color: '#16a34a' }
        }
      ]
    },
    {
      title: 'Digital Menu Board',
      description: 'Restaurant menu board with item highlights and pricing.',
      aspectRatio: '16:9',
      zonesCount: 3,
      zones: [
        {
          id: `zn-${Date.now()}-m1`,
          name: 'Food Photo',
          x: 2,
          y: 3,
          width: 40,
          height: 84,
          zIndex: 1,
          contentType: 'image'
        },
        {
          id: `zn-${Date.now()}-m2`,
          name: 'Menu Items',
          x: 44,
          y: 3,
          width: 54,
          height: 84,
          zIndex: 2,
          contentType: 'menu'
        },
        {
          id: `zn-${Date.now()}-m3`,
          name: 'Bottom Ticker',
          x: 2,
          y: 89,
          width: 96,
          height: 8,
          zIndex: 3,
          contentType: 'ticker',
          customData: { text: '☕ ORDER AT TABLE VIA QR CODE FOR 10% OFF', speed: 20, color: '#d97706' }
        }
      ]
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Layout Templates"
      subtitle="Select a pre-built split-screen blueprint to start"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {templates.map((tpl, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 transition-all flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-sm"
            onClick={() => {
              onSelectTemplate({
                name: tpl.title,
                description: tpl.description,
                aspectRatio: tpl.aspectRatio,
                width: tpl.aspectRatio === '9:16' ? 1080 : 1920,
                height: tpl.aspectRatio === '9:16' ? 1920 : 1080,
                backgroundColor: '#0f172a',
                thumbnailUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
                zones: tpl.zones
              });
              onClose();
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tpl.title}
                </h4>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                  {tpl.aspectRatio}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {tpl.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/80 text-[11px]">
              <span className="text-slate-500">{tpl.zonesCount} Zones</span>
              <span className="text-blue-600 font-bold flex items-center gap-1">
                <span>Use</span>
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
