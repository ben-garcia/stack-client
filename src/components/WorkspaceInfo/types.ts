import { Channel } from 'store/channels/types';
import { Member } from 'store/members/types';

export interface WorkspaceInfoProps {
  channel?: Channel;
  className?: string;
  member?: Member;
  username?: string;
  workspaceName?: string;
}
