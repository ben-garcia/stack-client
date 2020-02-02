import getCurrentChannelId from 'store/channel/actions';
import { MembersState } from 'store/members/types';
import getCurrentMemberId from 'store/member/actions';
import { UserState } from 'store/user/types';

export interface MembersListProps {
  currentMemberId: number;
  className?: string;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentMemberIdAction: typeof getCurrentMemberId;
  members: MembersState;
  user: UserState;
}
