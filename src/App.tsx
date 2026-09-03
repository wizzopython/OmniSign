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

const AppContent: React.FC = () => {
  const { activeTab } = useSignage();

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
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
        {/* Sidebar */}
        <Sidebar
          onOpenPairingModal={() => setIsPairingOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full overflow-y-auto">
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
