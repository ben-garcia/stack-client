export interface ModalProps {
  header: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
  onClose?: () => void; // function to be called when close button is clicked
  background?: boolean; // set dark background
}
