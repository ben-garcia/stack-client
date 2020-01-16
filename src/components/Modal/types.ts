export interface ModalProps {
  header: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'fullscreen';
  className?: string;
  onClose?: () => void; // function to be called when close button is clicked
}
