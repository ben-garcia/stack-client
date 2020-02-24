import { Channel } from 'store/channels';
import { Teammate } from 'store/teammates/types';

export interface WorkspaceInfoProps {
  channel?: Channel;
  className?: string;
  teammate?: Teammate;
  username?: string;
  workspaceName?: string;
}
