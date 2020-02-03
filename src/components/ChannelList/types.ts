import getCurrentChannelId from 'store/channel/actions';
import { ChannelsState } from 'store/channels/types';
import getCurrentMemberId from 'store/member/actions';

export interface ChannelListProps {
  currentChannelId: number;
  channels: ChannelsState;
  className?: string;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentMemberIdAction: typeof getCurrentMemberId;
}
