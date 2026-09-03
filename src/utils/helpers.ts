import { ScreenStatus, UserRole } from '../types/signage';

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return 'Dynamic';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs > 0 ? `${secs}s` : ''}`;
}

export function getStatusBadge(status: ScreenStatus) {
  switch (status) {
    case 'online':
      return {
        label: 'Online',
        dotClass: 'bg-emerald-500 animate-pulse',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    case 'offline':
      return {
        label: 'Offline',
        dotClass: 'bg-rose-500',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    case 'syncing':
      return {
        label: 'Syncing',
        dotClass: 'bg-blue-500 animate-spin',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    case 'alert':
      return {
        label: 'Emergency Alert',
        dotClass: 'bg-amber-500 animate-ping',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
      };
  }
}

export function getRoleBadge(role: UserRole) {
  switch (role) {
    case 'super_admin':
      return {
        label: 'Super Admin',
        badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    case 'content_manager':
      return {
        label: 'Content Manager',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    case 'operator':
      return {
        label: 'Operator',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'viewer':
      return {
        label: 'Viewer',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200'
      };
  }
}

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
