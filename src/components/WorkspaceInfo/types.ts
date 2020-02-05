import { Channel } from 'store/channels/types';
import { Teammate } from 'store/teammates/types';

export interface WorkspaceInfoProps {
  channel?: Channel;
  className?: string;
  teammate?: Teammate;
  username?: string;
  workspaceName?: string;
}
