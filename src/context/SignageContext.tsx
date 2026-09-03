import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DeviceScreen,
  MediaAsset,
  LayoutCanvas,
  Playlist,
  ScheduleEvent,
  DeploymentLog,
  UserAccount,
  AuditLogItem,
  NetworkAnalytics,
  UserRole,
  TargetType
} from '../types/signage';
import {
  INITIAL_SCREENS,
  INITIAL_ASSETS,
  INITIAL_LAYOUTS,
  INITIAL_PLAYLISTS,
  INITIAL_SCHEDULES,
  INITIAL_DEPLOYMENTS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ANALYTICS
} from '../mock/initialData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface SignageContextType {
  screens: DeviceScreen[];
  assets: MediaAsset[];
  layouts: LayoutCanvas[];
  playlists: Playlist[];
  schedules: ScheduleEvent[];
  deployments: DeploymentLog[];
  users: UserAccount[];
  auditLogs: AuditLogItem[];
  analytics: NetworkAnalytics;
  currentUser: UserAccount;
  activeTab: string;
  toasts: ToastMessage[];
  
  // Navigation & Selections
  setActiveTab: (tab: string) => void;
  selectedScreen: DeviceScreen | null;
  setSelectedScreen: (screen: DeviceScreen | null) => void;
  selectedLayout: LayoutCanvas | null;
  setSelectedLayout: (layout: LayoutCanvas | null) => void;
  loadScenarioPreset: (scenario: 'retail' | 'restaurant' | 'corporate' | 'emergency') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  setCurrentUserRole: (role: UserRole) => void;
  showToast: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  resetAllToDefaults: () => void;

  // Screen Actions
  addScreen: (screenData: Partial<DeviceScreen>) => DeviceScreen;
  updateScreen: (id: string, updates: Partial<DeviceScreen>) => void;
  deleteScreen: (id: string) => void;
  rebootScreen: (id: string) => void;
  syncScreen: (id: string) => void;
  triggerEmergencyBroadcast: (message: string, targetScreenIds?: string[]) => void;
  clearEmergencyBroadcast: (targetScreenIds?: string[]) => void;

  // Asset Actions
  addAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => MediaAsset;
  deleteAsset: (id: string) => void;

  // Layout Actions
  addLayout: (layout: Omit<LayoutCanvas, 'id' | 'createdAt' | 'updatedAt'>) => LayoutCanvas;
  updateLayout: (id: string, updates: Partial<LayoutCanvas>) => void;
  deleteLayout: (id: string) => void;

  // Schedule Actions
  addSchedule: (schedule: Omit<ScheduleEvent, 'id'>) => void;
  updateSchedule: (id: string, updates: Partial<ScheduleEvent>) => void;
  deleteSchedule: (id: string) => void;

  // Deployment Actions
  deployLayout: (layoutId: string, targetType: TargetType, targets: string[]) => Promise<void>;
  rollbackDeployment: (deploymentId: string) => void;

  // Audit
  addAuditLog: (action: string, target: string, details: string, status?: 'success' | 'warning' | 'error') => void;
}

const SignageContext = createContext<SignageContextType | undefined>(undefined);

export const SignageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [screens, setScreens] = useState<DeviceScreen[]>(() => {
    const saved = localStorage.getItem('omnisign_screens');
    return saved ? JSON.parse(saved) : INITIAL_SCREENS;
  });

  const [assets, setAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem('omnisign_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [layouts, setLayouts] = useState<LayoutCanvas[]>(() => {
    const saved = localStorage.getItem('omnisign_layouts');
    return saved ? JSON.parse(saved) : INITIAL_LAYOUTS;
  });

  const [playlists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('omnisign_playlists');
    return saved ? JSON.parse(saved) : INITIAL_PLAYLISTS;
  });

  const [schedules, setSchedules] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem('omnisign_schedules');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
  });

  const [deployments, setDeployments] = useState<DeploymentLog[]>(() => {
    const saved = localStorage.getItem('omnisign_deployments');
    return saved ? JSON.parse(saved) : INITIAL_DEPLOYMENTS;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('omnisign_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('omnisign_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [analytics, setAnalytics] = useState<NetworkAnalytics>(INITIAL_ANALYTICS);

  // App UI State
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedScreen, setSelectedScreen] = useState<DeviceScreen | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<LayoutCanvas | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const loadScenarioPreset = (scenario: 'retail' | 'restaurant' | 'corporate' | 'emergency') => {
    if (scenario === 'retail') {
      const retailLayout = layouts.find(l => l.aspectRatio === '16:9') || layouts[0];
      setScreens(prev => prev.map(s => ({
        ...s,
        assignedLayoutId: retailLayout.id,
        emergencyAlertActive: false
      })));
      showToast('Scenario: Luxury Retail Wall', 'Applied 4K retail showcase layout across all displays.', 'success');
    } else if (scenario === 'restaurant') {
      const menuLayout = layouts.find(l => l.name.includes('Menu')) || layouts[0];
      setScreens(prev => prev.map(s => ({
        ...s,
        assignedLayoutId: menuLayout.id,
        emergencyAlertActive: false
      })));
      showToast('Scenario: Digital Menu Board', 'Activated breakfast & lunch restaurant menu board rotation.', 'success');
    } else if (scenario === 'corporate') {
      const corpLayout = layouts.find(l => l.name.includes('Corporate') || l.name.includes('L-Bar')) || layouts[0];
      setScreens(prev => prev.map(s => ({
        ...s,
        assignedLayoutId: corpLayout.id,
        emergencyAlertActive: false
      })));
      showToast('Scenario: Corporate L-Bar', 'Deployed corporate news and executive lobby ticker.', 'info');
    } else if (scenario === 'emergency') {
      triggerEmergencyBroadcast('🚨 SIMULATED EMERGENCY ALERT: Severe weather advisory in effect. Please seek immediate shelter.');
    }
  };

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Check URL query parameters for standalone player route (e.g. ?view=player&screen=scr-001)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const screenParam = params.get('screen');

    if (viewParam === 'player') {
      setActiveTab('player');
      if (screenParam) {
        const found = screens.find(s => s.id === screenParam || s.pairingCode === screenParam);
        if (found) setSelectedScreen(found);
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('omnisign_screens', JSON.stringify(screens));
  }, [screens]);

  useEffect(() => {
    localStorage.setItem('omnisign_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('omnisign_layouts', JSON.stringify(layouts));
  }, [layouts]);

  useEffect(() => {
    localStorage.setItem('omnisign_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('omnisign_deployments', JSON.stringify(deployments));
  }, [deployments]);

  useEffect(() => {
    localStorage.setItem('omnisign_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('omnisign_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Update online/offline stats dynamically
  useEffect(() => {
    const online = screens.filter(s => s.status === 'online').length;
    const offline = screens.filter(s => s.status === 'offline').length;
    setAnalytics(prev => ({
      ...prev,
      totalScreens: screens.length,
      onlineScreens: online,
      offlineScreens: offline,
      uptimePercent: screens.length ? Number(((online / screens.length) * 100).toFixed(1)) : 100
    }));
  }, [screens]);

  // Toast System
  const showToast = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (action: string, target: string, details: string, status: 'success' | 'warning' | 'error' = 'success') => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: formatted,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role.replace('_', ' ').toUpperCase(),
      action,
      target,
      details,
      status
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const setCurrentUserRole = (role: UserRole) => {
    const found = users.find(u => u.role === role) || {
      ...currentUser,
      role
    };
    setCurrentUser(found);
    showToast('Role Switched', `Switched active perspective to ${role.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const resetAllToDefaults = () => {
    localStorage.clear();
    setScreens(INITIAL_SCREENS);
    setAssets(INITIAL_ASSETS);
    setLayouts(INITIAL_LAYOUTS);
    setSchedules(INITIAL_SCHEDULES);
    setDeployments(INITIAL_DEPLOYMENTS);
    setUsers(INITIAL_USERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setAnalytics(INITIAL_ANALYTICS);
    setSelectedScreen(null);
    setSelectedLayout(null);
    showToast('System Reset', 'All data restored to factory demo state.', 'success');
  };

  // Screen Actions
  const addScreen = (screenData: Partial<DeviceScreen>): DeviceScreen => {
    const newId = `scr-${String(screens.length + 1).padStart(3, '0')}`;
    const code = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
    
    const newScreen: DeviceScreen = {
      id: newId,
      name: screenData.name || `Signage Display #${screens.length + 1}`,
      pairingCode: screenData.pairingCode || code,
      status: 'online',
      location: screenData.location || 'HQ Lobby',
      department: screenData.department || 'Operations',
      group: screenData.group || 'Default Group',
      resolution: screenData.resolution || '1920x1080 (Full HD)',
      orientation: screenData.orientation || 'landscape',
      os: screenData.os || 'Android 13 (SignageOS)',
      ipAddress: screenData.ipAddress || `192.168.1.${Math.floor(10 + Math.random() * 200)}`,
      macAddress: `00:1A:79:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}`,
      cpuUsage: Math.floor(15 + Math.random() * 30),
      ramUsage: Math.floor(40 + Math.random() * 35),
      storageUsedGb: 10.4,
      storageTotalGb: 32.0,
      temperatureC: 41.2,
      lastHeartbeat: 'Just now',
      assignedLayoutId: screenData.assignedLayoutId || layouts[0]?.id || 'lay-001',
      volume: screenData.volume !== undefined ? screenData.volume : 80,
      brightness: screenData.brightness !== undefined ? screenData.brightness : 90,
      screenshotUrl: screenData.screenshotUrl || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
      tags: screenData.tags || ['New Display', 'Signage']
    };

    setScreens(prev => [newScreen, ...prev]);
    addAuditLog('Pair Screen', newScreen.name, `New display hardware linked via pairing code ${newScreen.pairingCode}`);
    showToast('Screen Paired', `${newScreen.name} registered to fleet successfully.`, 'success');
    return newScreen;
  };

  const updateScreen = (id: string, updates: Partial<DeviceScreen>) => {
    setScreens(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    if (selectedScreen && selectedScreen.id === id) {
      setSelectedScreen(prev => prev ? { ...prev, ...updates } : null);
    }
    showToast('Device Updated', 'Hardware settings saved.', 'info');
  };

  const deleteScreen = (id: string) => {
    const screen = screens.find(s => s.id === id);
    setScreens(prev => prev.filter(s => s.id !== id));
    if (selectedScreen?.id === id) setSelectedScreen(null);
    if (screen) {
      addAuditLog('Unpair Screen', screen.name, `Removed hardware device from fleet`);
      showToast('Screen Removed', `${screen.name} has been unregistered.`, 'warning');
    }
  };

  const rebootScreen = (id: string) => {
    const screen = screens.find(s => s.id === id);
    if (!screen) return;

    updateScreen(id, { status: 'syncing', cpuUsage: 90, lastHeartbeat: 'Rebooting...' });
    showToast('Reboot Signal Sent', `Restart command dispatched to ${screen.name}`, 'info');

    setTimeout(() => {
      updateScreen(id, { status: 'online', cpuUsage: 22, lastHeartbeat: 'Just now' });
      addAuditLog('Device Reboot', screen.name, 'Hardware reboot completed successfully');
      showToast('Device Online', `${screen.name} rebooted and verified heartbeat.`, 'success');
    }, 2800);
  };

  const syncScreen = (id: string) => {
    const screen = screens.find(s => s.id === id);
    if (!screen) return;

    updateScreen(id, { status: 'syncing', lastHeartbeat: 'Syncing assets...' });
    showToast('Payload Dispatched', `Force sync initiated for ${screen.name}`, 'info');

    setTimeout(() => {
      updateScreen(id, { status: 'online', lastHeartbeat: 'Synced just now' });
      addAuditLog('Force Sync', screen.name, 'Content cache refreshed from cloud CDN');
      showToast('Sync Finished', `${screen.name} cache updated to latest layout version.`, 'success');
    }, 2000);
  };

  const triggerEmergencyBroadcast = (message: string, targetScreenIds?: string[]) => {
    setScreens(prev => prev.map(s => {
      if (!targetScreenIds || targetScreenIds.includes(s.id)) {
        return {
          ...s,
          emergencyAlertActive: true,
          emergencyAlertMessage: message
        };
      }
      return s;
    }));

    addAuditLog('Emergency Broadcast', 'Fleet Wide', `Triggered alert: "${message}"`, 'warning');
    showToast('EMERGENCY BROADCAST ACTIVE', 'Priority emergency takeover sent to targeted screens.', 'error');
  };

  const clearEmergencyBroadcast = (targetScreenIds?: string[]) => {
    setScreens(prev => prev.map(s => {
      if (!targetScreenIds || targetScreenIds.includes(s.id)) {
        return {
          ...s,
          emergencyAlertActive: false,
          emergencyAlertMessage: undefined
        };
      }
      return s;
    }));

    addAuditLog('Clear Emergency Alert', 'Fleet Wide', 'Emergency override cleared. Standard rotation restored.');
    showToast('Emergency Alert Cleared', 'Normal playlist layout resumed across all screens.', 'success');
  };

  // Asset Actions
  const addAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt'>): MediaAsset => {
    const newId = `ast-${String(assets.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newAsset: MediaAsset = {
      ...assetData,
      id: newId,
      uploadedAt: today
    };

    setAssets(prev => [newAsset, ...prev]);
    addAuditLog('Upload Asset', newAsset.name, `New asset (${newAsset.type}) added to ${newAsset.category}`);
    showToast('Asset Uploaded', `${newAsset.name} ready in media library.`, 'success');
    return newAsset;
  };

  const deleteAsset = (id: string) => {
    const asset = assets.find(a => a.id === id);
    setAssets(prev => prev.filter(a => a.id !== id));
    if (asset) {
      addAuditLog('Delete Asset', asset.name, `Asset removed from library`);
      showToast('Asset Deleted', `${asset.name} was removed.`, 'info');
    }
  };

  // Layout Actions
  const addLayout = (layoutData: Omit<LayoutCanvas, 'id' | 'createdAt' | 'updatedAt'>): LayoutCanvas => {
    const newId = `lay-${String(layouts.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newLayout: LayoutCanvas = {
      ...layoutData,
      id: newId,
      createdAt: today,
      updatedAt: today
    };

    setLayouts(prev => [newLayout, ...prev]);
    addAuditLog('Create Layout', newLayout.name, `New ${newLayout.aspectRatio} canvas with ${newLayout.zones.length} zones created`);
    showToast('Layout Saved', `${newLayout.name} created successfully.`, 'success');
    return newLayout;
  };

  const updateLayout = (id: string, updates: Partial<LayoutCanvas>) => {
    const today = new Date().toISOString().split('T')[0];
    setLayouts(prev => prev.map(l => l.id === id ? { ...l, ...updates, updatedAt: today } : l));
    if (selectedLayout && selectedLayout.id === id) {
      setSelectedLayout(prev => prev ? { ...prev, ...updates, updatedAt: today } : null);
    }
    showToast('Layout Updated', 'Canvas changes saved.', 'success');
  };

  const deleteLayout = (id: string) => {
    const layout = layouts.find(l => l.id === id);
    setLayouts(prev => prev.filter(l => l.id !== id));
    if (selectedLayout?.id === id) setSelectedLayout(null);
    if (layout) {
      addAuditLog('Delete Layout', layout.name, 'Layout blueprint removed');
      showToast('Layout Deleted', `${layout.name} removed.`, 'info');
    }
  };

  // Schedule Actions
  const addSchedule = (scheduleData: Omit<ScheduleEvent, 'id'>) => {
    const newId = `sch-${String(schedules.length + 1).padStart(3, '0')}`;
    const newSchedule: ScheduleEvent = {
      ...scheduleData,
      id: newId
    };

    setSchedules(prev => [newSchedule, ...prev]);
    addAuditLog('Create Schedule', newSchedule.name, `Scheduled layout playback with ${newSchedule.priority} priority`);
    showToast('Schedule Created', `${newSchedule.name} is now automated.`, 'success');
  };

  const updateSchedule = (id: string, updates: Partial<ScheduleEvent>) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    showToast('Schedule Updated', 'Automation rule modified.', 'info');
  };

  const deleteSchedule = (id: string) => {
    const sch = schedules.find(s => s.id === id);
    setSchedules(prev => prev.filter(s => s.id !== id));
    if (sch) {
      addAuditLog('Delete Schedule', sch.name, 'Removed scheduled rule');
      showToast('Schedule Deleted', `${sch.name} removed.`, 'info');
    }
  };

  // Deploy Action
  const deployLayout = async (layoutId: string, targetType: TargetType, targets: string[]) => {
    const layout = layouts.find(l => l.id === layoutId);
    if (!layout) return;

    let targetedScreens: DeviceScreen[] = [];
    if (targetType === 'all') {
      targetedScreens = screens;
    } else if (targetType === 'screen') {
      targetedScreens = screens.filter(s => targets.includes(s.id));
    } else if (targetType === 'group') {
      targetedScreens = screens.filter(s => targets.includes(s.group));
    } else if (targetType === 'tag') {
      targetedScreens = screens.filter(s => s.tags.some(t => targets.includes(t)));
    }

    const version = `v2.${deployments.length + 5}.0`;
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newDep: DeploymentLog = {
      id: `dep-${Date.now()}`,
      timestamp: formatted,
      publishedBy: currentUser.name,
      layoutName: layout.name,
      layoutId: layout.id,
      targetSummary: `${targetType.toUpperCase()}: ${targets.length ? targets.join(', ') : 'All Fleet Screens'} (${targetedScreens.length} displays)`,
      totalDisplaysTargeted: targetedScreens.length,
      targetScreenIds: targetedScreens.map(s => s.id),
      status: 'deploying',
      version
    };

    setDeployments(prev => [newDep, ...prev]);
    showToast('Publishing Deployment', `Deploying "${layout.name}" to ${targetedScreens.length} screen(s)...`, 'info');

    // Simulate instant deployment propagation
    setScreens(prev => prev.map(s => {
      if (targetedScreens.some(ts => ts.id === s.id)) {
        return {
          ...s,
          assignedLayoutId: layout.id,
          status: 'syncing'
        };
      }
      return s;
    }));

    // Complete deployment
    setTimeout(() => {
      setScreens(prev => prev.map(s => {
        if (targetedScreens.some(ts => ts.id === s.id)) {
          return {
            ...s,
            status: 'online',
            lastHeartbeat: 'Just now'
          };
        }
        return s;
      }));

      setDeployments(prev => prev.map(d => d.id === newDep.id ? { ...d, status: 'completed' } : d));
      addAuditLog('Deploy Layout', layout.name, `Pushed ${version} to ${targetedScreens.length} displays successfully`);
      showToast('Deployment Succeeded', `All ${targetedScreens.length} screens are now rendering "${layout.name}".`, 'success');
    }, 2200);
  };

  const rollbackDeployment = (deploymentId: string) => {
    const dep = deployments.find(d => d.id === deploymentId);
    if (!dep) return;

    setDeployments(prev => prev.map(d => d.id === deploymentId ? { ...d, status: 'rolled_back' } : d));
    addAuditLog('Rollback Deployment', dep.layoutName, `Rolled back publication ${dep.version}`, 'warning');
    showToast('Deployment Rolled Back', `Version ${dep.version} has been rolled back.`, 'warning');
  };

  return (
    <SignageContext.Provider
      value={{
        screens,
        assets,
        layouts,
        playlists,
        schedules,
        deployments,
        users,
        auditLogs,
        analytics,
        currentUser,
        activeTab,
        selectedScreen,
        selectedLayout,
        toasts,
        setSelectedScreen,
        setSelectedLayout,
        loadScenarioPreset,
        isAuthenticated,
        setIsAuthenticated,
        setActiveTab,
        setCurrentUserRole,
        showToast,
        dismissToast,
        resetAllToDefaults,
        addScreen,
        updateScreen,
        deleteScreen,
        rebootScreen,
        syncScreen,
        triggerEmergencyBroadcast,
        clearEmergencyBroadcast,
        addAsset,
        deleteAsset,
        addLayout,
        updateLayout,
        deleteLayout,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        deployLayout,
        rollbackDeployment,
        addAuditLog
      }}
    >
      {children}
    </SignageContext.Provider>
  );
};

export const useSignage = () => {
  const context = useContext(SignageContext);
  if (!context) {
    throw new Error('useSignage must be used within a SignageProvider');
  }
  return context;
};
