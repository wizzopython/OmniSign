import React, { useState } from 'react';
import { SignageProvider, useSignage } from './context/SignageContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardView } from './components/dashboard/DashboardView';
import { ScreenList } from './components/screens/ScreenList';
import { ScreenPairingModal } from './components/screens/ScreenPairingModal';
import { MediaLibrary } from './components/media/MediaLibrary';
import { MediaUploader } from './components/media/MediaUploader';
import { LayoutStudio } from './components/layouts/LayoutStudio';
import { ScheduleManager } from './components/schedules/ScheduleManager';
import { EmergencyAlertModal } from './components/schedules/EmergencyAlertModal';
import { DeploymentCenter } from './components/publish/DeploymentCenter';
import { HardwarePlayer } from './components/player/HardwarePlayer';
import { PlayerEmulator } from './components/player/PlayerEmulator';
import { UserManagement } from './components/rbac/UserManagement';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { DeviceScreen, LayoutCanvas } from './types/signage';
import { 
  LayoutDashboard, 
  MonitorSmartphone, 
  Layers, 
  FolderKanban, 
  Tv 
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useSignage();

  // Modals state
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState<DeviceScreen | null>(null);
  const [modalLayout, setModalLayout] = useState<LayoutCanvas | null>(null);

  const handleOpenPlayerForScreen = (screen: DeviceScreen) => {
    setModalScreen(screen);
    setModalLayout(null);
    setIsPlayerModalOpen(true);
  };

  const handleOpenPlayerForLayout = (layout: LayoutCanvas) => {
    setModalLayout(layout);
    setModalScreen(null);
    setIsPlayerModalOpen(true);
  };

  const mobileBottomTabs = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'screens', label: 'Screens', icon: <MonitorSmartphone className="w-4 h-4" /> },
    { id: 'layouts', label: 'Studio', icon: <Layers className="w-4 h-4" /> },
    { id: 'media', label: 'Vault', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'player', label: 'Player', icon: <Tv className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onOpenPlayerModal={() => {
          setModalScreen(null);
          setModalLayout(null);
          setIsPlayerModalOpen(true);
        }}
      />

      {/* Main Body */}
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Sidebar for Desktop / Tablets */}
        <Sidebar
          onOpenPairingModal={() => setIsPairingOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onOpenPairingModal={() => setIsPairingOpen(true)}
              onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
              onOpenMediaUploader={() => setIsUploaderOpen(true)}
            />
          )}

          {activeTab === 'screens' && (
            <ScreenList
              onOpenPairingModal={() => setIsPairingOpen(true)}
              onOpenPlayer={handleOpenPlayerForScreen}
            />
          )}

          {activeTab === 'media' && <MediaLibrary />}

          {activeTab === 'layouts' && (
            <LayoutStudio
              onOpenPlayerWithLayout={handleOpenPlayerForLayout}
            />
          )}

          {activeTab === 'schedules' && <ScheduleManager />}

          {activeTab === 'publish' && <DeploymentCenter />}

          {activeTab === 'player' && <HardwarePlayer />}

          {activeTab === 'rbac' && <UserManagement />}

          {activeTab === 'analytics' && <AnalyticsDashboard />}
        </main>
      </div>

      {/* Mobile Bottom Floating Navigation Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg">
        {mobileBottomTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${
                isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                {tab.icon}
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modals */}
      <ScreenPairingModal
        isOpen={isPairingOpen}
        onClose={() => setIsPairingOpen(false)}
      />

      <EmergencyAlertModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <MediaUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />

      <PlayerEmulator
        isOpen={isPlayerModalOpen}
        onClose={() => setIsPlayerModalOpen(false)}
        screen={modalScreen}
        layout={modalLayout}
      />

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SignageProvider>
      <AppContent />
    </SignageProvider>
  );
}
