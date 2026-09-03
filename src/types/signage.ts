export type ScreenStatus = 'online' | 'offline' | 'syncing' | 'alert';
export type ScreenOrientation = 'landscape' | 'portrait';
export type AssetType = 'video' | 'image' | 'menu' | 'widget';
export type UserRole = 'super_admin' | 'content_manager' | 'operator' | 'viewer';
export type TargetType = 'all' | 'group' | 'screen' | 'tag';
export type ZoneContentType = 'video' | 'image' | 'media' | 'ticker' | 'clock' | 'weather' | 'menu' | 'qr';

export interface DeviceScreen {
  id: string;
  name: string;
  pairingCode: string;
  location: string;
  department: string;
  group: string;
  status: ScreenStatus;
  os: string;
  resolution: string;
  orientation: ScreenOrientation;
  assignedLayoutId: string;
  lastHeartbeat: string;
  ipAddress: string;
  macAddress: string;
  storageTotalGb: number;
  storageUsedGb: number;
  cpuUsage: number;
  ramUsage: number;
  temperatureC: number;
  volume: number;
  brightness: number;
  screenshotUrl: string;
  tags: string[];
  emergencyAlertActive?: boolean;
  emergencyAlertMessage?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: AssetType;
  category: 'Promotions' | 'Information' | 'Menu Boards' | 'Live Streams' | 'Widgets' | 'Corporate' | string;
  url: string;
  thumbnailUrl: string;
  sizeBytes: number;
  dimensions: string;
  durationSec: number;
  uploadedAt: string;
  tags: string[];
}

export interface LayoutZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  contentType: ZoneContentType;
  contentId?: string;
  customData?: Record<string, any>;
}

export interface LayoutCanvas {
  id: string;
  name: string;
  description: string;
  aspectRatio: '16:9' | '9:16' | '32:9';
  width: number;
  height: number;
  backgroundColor: string;
  thumbnailUrl: string;
  zones: LayoutZone[];
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  items: { assetId: string; durationSec: number }[];
}

export interface ScheduleEvent {
  id: string;
  name: string;
  layoutId: string;
  targetType: TargetType;
  targets: string[];
  priority: 'emergency' | 'high_yield' | 'standard' | 'remnant_fill';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  isActive: boolean;
}

export interface DeploymentLog {
  id: string;
  layoutId: string;
  layoutName: string;
  version: string;
  targetSummary: string;
  targetScreenIds: string[];
  publishedBy: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'rolled_back' | 'deploying';
  totalDisplaysTargeted: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
}

export interface NetworkAnalytics {
  onlineScreens: number;
  totalScreens: number;
  uptimePercent: number;
  totalImpressions: number;
  bandwidthUsedGb: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole?: string;
  action: string;
  target: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}
