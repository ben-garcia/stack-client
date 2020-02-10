import { ChannelState } from 'store/channel/types';
import { Channel } from 'store/channels/types';

export interface ChannelInfoProps {
  channel?: Channel;
  className?: string;
  currentChannel?: ChannelState;
  membersSize?: number;
}
