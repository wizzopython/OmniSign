import React from 'react';
import { DeviceScreen, LayoutCanvas } from '../../types/signage';
import { Modal } from '../common/Modal';
import { HardwarePlayer } from './HardwarePlayer';

interface PlayerEmulatorProps {
  isOpen: boolean;
  onClose: () => void;
  screen?: DeviceScreen | null;
  layout?: LayoutCanvas | null;
}

export const PlayerEmulator: React.FC<PlayerEmulatorProps> = ({
  isOpen,
  onClose,
  screen,
  layout
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hardware Display Player Simulator"
      subtitle={screen ? `Emulating: ${screen.name}` : layout ? `Previewing Layout: ${layout.name}` : 'Live Hardware Emulation'}
      maxWidth="6xl"
    >
      <HardwarePlayer initialScreen={screen} customLayout={layout} />
    </Modal>
  );
};
