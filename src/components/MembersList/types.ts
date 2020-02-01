import getCurrentChannelId from 'store/channel/actions';
import { MembersState } from 'store/members/types';
import getCurrentMemberId from 'store/member/actions';

export interface MembersListProps {
  currentMemberId: number;
  className?: string;
  members: MembersState;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentMemberIdAction: typeof getCurrentMemberId;
}
