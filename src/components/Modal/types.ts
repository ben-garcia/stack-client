import React from 'react';

export interface ModalProps {
  nonModal?: boolean; // true when using as popover(false by default)
  children: React.ReactNode;
  header?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
  onClose?: () => void; // function to be called when close button is clicked
  background?: boolean; // set dark background
}
