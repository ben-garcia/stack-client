import { Channel } from 'store/channels/types';

export interface WorkspaceInfoProps {
  channel?: Channel;
  workspaceName?: string;
  username?: string;
  className?: string;
}
