export interface ModalProps {
  open: boolean;
  header: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
