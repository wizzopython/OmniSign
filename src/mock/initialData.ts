import { 
  DeviceScreen, 
  MediaAsset, 
  LayoutCanvas, 
  Playlist,
  ScheduleEvent, 
  DeploymentLog, 
  UserAccount, 
  AuditLogItem, 
  NetworkAnalytics 
} from '../types/signage';

export const INITIAL_SCREENS: DeviceScreen[] = [
  {
    id: 'scr-001',
    name: 'NYC Flagship - Main Entrance Video Wall',
    pairingCode: '749-218',
    location: 'New York, 5th Avenue',
    department: 'Retail Experience',
    group: 'Flagship Stores',
    status: 'online',
    os: 'Android 13 (SignageOS 4.2)',
    resolution: '3840x2160 (4K UHD)',
    orientation: 'landscape',
    assignedLayoutId: 'lay-001',
    lastHeartbeat: 'Just now',
    ipAddress: '192.168.1.101',
    macAddress: '00:1A:79:CB:12:01',
    storageTotalGb: 64,
    storageUsedGb: 28.4,
    cpuUsage: 34,
    ramUsage: 48,
    temperatureC: 42,
    volume: 75,
    brightness: 90,
    screenshotUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    tags: ['4K UHD', 'Flagship', 'Entrance']
  },
  {
    id: 'scr-002',
    name: 'London Mall - Interactive Portrait Kiosk #3',
    pairingCode: '382-901',
    location: 'London, Oxford Street',
    department: 'Wayfinding & Directory',
    group: 'London Mall Kiosks',
    status: 'online',
    os: 'Ubuntu Core 22.04 LTS',
    resolution: '1080x1920 (9:16 Portrait)',
    orientation: 'portrait',
    assignedLayoutId: 'lay-002',
    lastHeartbeat: '10s ago',
    ipAddress: '192.168.2.45',
    macAddress: '00:1A:79:CB:12:02',
    storageTotalGb: 32,
    storageUsedGb: 14.1,
    cpuUsage: 22,
    ramUsage: 39,
    temperatureC: 38,
    volume: 60,
    brightness: 85,
    screenshotUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    tags: ['Portrait', 'Touchscreen', 'Wayfinding']
  },
  {
    id: 'scr-003',
    name: 'Tokyo HQ - Executive Lobby Display',
    pairingCode: '519-440',
    location: 'Tokyo, Shibuya',
    department: 'Corporate Comms',
    group: 'Corporate Offices',
    status: 'online',
    os: 'Samsung Tizen 6.5 Enterprise',
    resolution: '1920x1080 (Full HD)',
    orientation: 'landscape',
    assignedLayoutId: 'lay-003',
    lastHeartbeat: '25s ago',
    ipAddress: '192.168.3.12',
    macAddress: '00:1A:79:CB:12:03',
    storageTotalGb: 32,
    storageUsedGb: 8.5,
    cpuUsage: 18,
    ramUsage: 35,
    temperatureC: 36,
    volume: 50,
    brightness: 80,
    screenshotUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    tags: ['L-Bar', 'Corporate', 'News Ticker']
  },
  {
    id: 'scr-004',
    name: 'SF Bistro - Digital Menu Board Station A',
    pairingCode: '627-119',
    location: 'San Francisco, Market St',
    department: 'Dining & Kitchen',
    group: 'Bistro Menu Boards',
    status: 'syncing',
    os: 'LG webOS Signage 6.0',
    resolution: '1920x1080 (Full HD)',
    orientation: 'landscape',
    assignedLayoutId: 'lay-004',
    lastHeartbeat: '1m ago',
    ipAddress: '192.168.4.88',
    macAddress: '00:1A:79:CB:12:04',
    storageTotalGb: 16,
    storageUsedGb: 6.2,
    cpuUsage: 45,
    ramUsage: 62,
    temperatureC: 44,
    volume: 40,
    brightness: 95,
    screenshotUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    tags: ['Menu Board', 'POS Sync', 'Food']
  },
  {
    id: 'scr-005',
    name: 'Singapore Airport - Terminal 3 Gate 12',
    pairingCode: '840-771',
    location: 'Singapore, Changi Airport',
    department: 'Passenger Information',
    group: 'Airport Displays',
    status: 'online',
    os: 'Windows 11 IoT Enterprise',
    resolution: '3840x2160 (4K UHD)',
    orientation: 'landscape',
    assignedLayoutId: 'lay-001',
    lastHeartbeat: '5s ago',
    ipAddress: '192.168.5.210',
    macAddress: '00:1A:79:CB:12:05',
    storageTotalGb: 128,
    storageUsedGb: 45.0,
    cpuUsage: 29,
    ramUsage: 51,
    temperatureC: 40,
    volume: 70,
    brightness: 88,
    screenshotUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    tags: ['4K UHD', 'Transit', 'High Brightness']
  },
  {
    id: 'scr-006',
    name: 'Chicago Branch - Employee Cafeteria',
    pairingCode: '492-311',
    location: 'Chicago, Michigan Ave',
    department: 'Internal Comms',
    group: 'Corporate Offices',
    status: 'offline',
    os: 'Android 13 (SignageOS 4.2)',
    resolution: '1920x1080 (Full HD)',
    orientation: 'landscape',
    assignedLayoutId: 'lay-003',
    lastHeartbeat: '14m ago',
    ipAddress: '192.168.6.14',
    macAddress: '00:1A:79:CB:12:06',
    storageTotalGb: 32,
    storageUsedGb: 11.2,
    cpuUsage: 0,
    ramUsage: 0,
    temperatureC: 24,
    volume: 50,
    brightness: 80,
    screenshotUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tags: ['Cafeteria', 'Internal News']
  }
];

export const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: 'ast-001',
    name: 'Summer Luxe Collection 4K Video',
    type: 'video',
    category: 'Promotions',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-models-in-a-fashion-show-42861-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    sizeBytes: 38400000,
    dimensions: '3840x2160 (4K UHD)',
    durationSec: 30,
    uploadedAt: '2026-09-01 10:15',
    tags: ['Promo', 'Fashion', '4K Video']
  },
  {
    id: 'ast-002',
    name: 'Artisan Espresso & Bakery Menu',
    type: 'menu',
    category: 'Menu Boards',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    sizeBytes: 4200000,
    dimensions: '1920x1080',
    durationSec: 15,
    uploadedAt: '2026-09-02 14:20',
    tags: ['Cafe', 'Breakfast', 'Menu']
  },
  {
    id: 'ast-003',
    name: 'Corporate Annual Keynote Highlight',
    type: 'video',
    category: 'Corporate',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-speaker-at-a-business-conference-42864-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    sizeBytes: 29800000,
    dimensions: '1920x1080',
    durationSec: 25,
    uploadedAt: '2026-09-02 16:45',
    tags: ['Keynote', 'Executive', 'News']
  },
  {
    id: 'ast-004',
    name: 'Vertical Store Showcase Poster',
    type: 'image',
    category: 'Promotions',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    sizeBytes: 3100000,
    dimensions: '1080x1920 (9:16)',
    durationSec: 10,
    uploadedAt: '2026-09-03 09:30',
    tags: ['Portrait', 'Kiosk', 'Retail']
  }
];

export const INITIAL_LAYOUTS: LayoutCanvas[] = [
  {
    id: 'lay-001',
    name: '3-Zone Retail Showcase with Live Ticker',
    description: 'Split screen for 4K video reel, dynamic sidebar, and smooth news ticker',
    aspectRatio: '16:9',
    width: 3840,
    height: 2160,
    backgroundColor: '#0f172a',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28',
    updatedAt: '2026-09-03 11:20',
    zones: [
      {
        id: 'zn-001',
        name: 'Main Video Showcase',
        x: 2,
        y: 3,
        width: 68,
        height: 82,
        zIndex: 1,
        contentType: 'video',
        contentId: 'ast-001'
      },
      {
        id: 'zn-002',
        name: 'Promo Sidebar',
        x: 72,
        y: 3,
        width: 26,
        height: 82,
        zIndex: 2,
        contentType: 'image',
        contentId: 'ast-004'
      },
      {
        id: 'zn-003',
        name: 'News Ticker Bar',
        x: 2,
        y: 88,
        width: 96,
        height: 9,
        zIndex: 3,
        contentType: 'ticker',
        customData: {
          text: '⚡ SPECIAL OFFER: 20% OFF all seasonal items this weekend! Scan QR code for details.',
          speed: 20,
          color: '#2563eb'
        }
      }
    ]
  },
  {
    id: 'lay-002',
    name: 'Vertical Interactive Kiosk (9:16 Totem)',
    description: 'Portrait orientation designed for mall totems and lobby kiosks with smart clock and QR connect',
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    backgroundColor: '#0f172a',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-30',
    updatedAt: '2026-09-03 08:15',
    zones: [
      {
        id: 'zn-004',
        name: 'Header Clock Widget',
        x: 4,
        y: 2,
        width: 92,
        height: 10,
        zIndex: 1,
        contentType: 'clock',
        customData: { city: 'Local Time' }
      },
      {
        id: 'zn-005',
        name: 'Featured Media Reel',
        x: 4,
        y: 14,
        width: 92,
        height: 62,
        zIndex: 2,
        contentType: 'image',
        contentId: 'ast-004'
      },
      {
        id: 'zn-006',
        name: 'Interactive QR Code Zone',
        x: 4,
        y: 78,
        width: 92,
        height: 20,
        zIndex: 3,
        contentType: 'qr',
        customData: { qrValue: 'https://omnisign.cloud/directory', text: 'Scan for Store Directory' }
      }
    ]
  },
  {
    id: 'lay-003',
    name: 'Corporate Executive Lobby L-Bar',
    description: 'L-Bar configuration for boardrooms and lobbies with world clocks and live financial tickers',
    aspectRatio: '16:9',
    width: 1920,
    height: 1080,
    backgroundColor: '#0f172a',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-01',
    updatedAt: '2026-09-03 12:00',
    zones: [
      {
        id: 'zn-007',
        name: 'Corporate Stream',
        x: 2,
        y: 3,
        width: 70,
        height: 84,
        zIndex: 1,
        contentType: 'video',
        contentId: 'ast-003'
      },
      {
        id: 'zn-008',
        name: 'Weather & Time Widget',
        x: 74,
        y: 3,
        width: 24,
        height: 84,
        zIndex: 2,
        contentType: 'weather',
        customData: { city: 'Tokyo, Japan', tempUnit: 'C' }
      },
      {
        id: 'zn-009',
        name: 'Company Announcements Ticker',
        x: 2,
        y: 89,
        width: 96,
        height: 8,
        zIndex: 3,
        contentType: 'ticker',
        customData: { text: '📊 Q3 All-Hands Meeting at 3:00 PM • Welcome VIP Visitors to Headquarters', speed: 22, color: '#16a34a' }
      }
    ]
  },
  {
    id: 'lay-004',
    name: 'Digital Restaurant Menu Board (Breakfast & Lunch)',
    description: 'Dynamic cafe and dining menu board with live item pricing and photo showcase',
    aspectRatio: '16:9',
    width: 1920,
    height: 1080,
    backgroundColor: '#0f172a',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02',
    updatedAt: '2026-09-03 09:45',
    zones: [
      {
        id: 'zn-010',
        name: 'Food Photo Showcase',
        x: 2,
        y: 3,
        width: 40,
        height: 84,
        zIndex: 1,
        contentType: 'image',
        contentId: 'ast-002'
      },
      {
        id: 'zn-011',
        name: 'Menu Items List',
        x: 44,
        y: 3,
        width: 54,
        height: 84,
        zIndex: 2,
        contentType: 'menu'
      },
      {
        id: 'zn-012',
        name: 'Order via Mobile QR Ticker',
        x: 2,
        y: 89,
        width: 96,
        height: 8,
        zIndex: 3,
        contentType: 'ticker',
        customData: { text: '☕ ORDER AT TABLE VIA QR CODE FOR 10% OFF YOUR FIRST ORDER', speed: 20, color: '#d97706' }
      }
    ]
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-001',
    name: 'Main Retail Day Rotation',
    items: [
      { assetId: 'ast-001', durationSec: 30 },
      { assetId: 'ast-004', durationSec: 15 }
    ]
  }
];

export const INITIAL_SCHEDULES: ScheduleEvent[] = [
  {
    id: 'sch-001',
    name: 'Morning Breakfast Menu (07:00 - 11:30)',
    layoutId: 'lay-004',
    targetType: 'group',
    targets: ['Bistro Menu Boards'],
    priority: 'standard',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    startTime: '07:00',
    endTime: '11:30',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isActive: true
  },
  {
    id: 'sch-002',
    name: 'Daily Retail Video Reel Loop (11:30 - 20:00)',
    layoutId: 'lay-001',
    targetType: 'all',
    targets: ['Flagship Stores', 'Airport Displays'],
    priority: 'high_yield',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    startTime: '11:30',
    endTime: '20:00',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isActive: true
  },
  {
    id: 'sch-003',
    name: 'Corporate Headquarters Day Loop (08:00 - 19:00)',
    layoutId: 'lay-003',
    targetType: 'group',
    targets: ['Corporate Offices'],
    priority: 'standard',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    startTime: '08:00',
    endTime: '19:00',
    daysOfWeek: [1, 2, 3, 4, 5],
    isActive: true
  }
];

export const INITIAL_DEPLOYMENTS: DeploymentLog[] = [
  {
    id: 'dep-001',
    layoutId: 'lay-001',
    layoutName: '3-Zone Retail Showcase with Live Ticker',
    version: 'v2.4.0',
    targetSummary: 'All Fleet Displays (6 screens)',
    targetScreenIds: ['scr-001', 'scr-002', 'scr-003', 'scr-004', 'scr-005', 'scr-006'],
    publishedBy: 'Alexander Sterling (Super Admin)',
    timestamp: '2026-09-03 11:25',
    status: 'completed',
    totalDisplaysTargeted: 6
  },
  {
    id: 'dep-002',
    layoutId: 'lay-004',
    layoutName: 'Digital Restaurant Menu Board',
    version: 'v2.3.8',
    targetSummary: 'Bistro Menu Boards (1 screen)',
    targetScreenIds: ['scr-004'],
    publishedBy: 'Sarah Jenkins (Content Manager)',
    timestamp: '2026-09-03 09:50',
    status: 'completed',
    totalDisplaysTargeted: 1
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-001',
    name: 'Alexander Sterling',
    email: 'alexander@omnisign.io',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    department: 'Global Operations'
  },
  {
    id: 'usr-002',
    name: 'Sarah Jenkins',
    email: 'sarah.j@omnisign.io',
    role: 'content_manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    department: 'Marketing & Creative Studio'
  },
  {
    id: 'usr-003',
    name: 'Marcus Chen',
    email: 'marcus.chen@omnisign.io',
    role: 'operator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    department: 'Field Hardware Engineering'
  },
  {
    id: 'usr-004',
    name: 'Elena Rostova',
    email: 'elena@omnisign.io',
    role: 'viewer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    department: 'Executive Board'
  }
];

export const INITIAL_ANALYTICS: NetworkAnalytics = {
  onlineScreens: 5,
  totalScreens: 6,
  uptimePercent: 99.8,
  totalImpressions: 89420,
  bandwidthUsedGb: 57.8
};

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-03 13:42:10',
    userId: 'usr-002',
    userName: 'Sarah Jenkins',
    action: 'Layout Published',
    target: '3-Zone Retail Showcase with Live Ticker',
    details: 'Deployed v2.4.0 payload to 6 displays.',
    status: 'success'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-03 13:30:05',
    userId: 'usr-001',
    userName: 'Alexander Sterling',
    action: 'Screen Paired',
    target: 'NYC Flagship - Main Entrance Video Wall',
    details: 'Successfully paired hardware display via PIN 749-218.',
    status: 'success'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-03 13:15:22',
    userId: 'usr-003',
    userName: 'Marcus Chen',
    action: 'Remote Sync Executed',
    target: 'Tokyo HQ - Executive Lobby Display',
    details: 'Triggered manual payload sync on display.',
    status: 'success'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-03 12:45:00',
    userId: 'usr-002',
    userName: 'Sarah Jenkins',
    action: 'Asset Uploaded',
    target: 'Summer Luxe Collection 4K Video',
    details: 'Uploaded 38.4 MB 4K video asset.',
    status: 'success'
  }
];
