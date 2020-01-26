export interface ModalProps {
  children: React.ReactNode;
  header?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
  onClose?: () => void; // function to be called when close button is clicked
  background?: boolean; // set dark background
}
