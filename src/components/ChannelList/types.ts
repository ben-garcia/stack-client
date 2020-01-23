import getCurrentChannelId from 'store/channel/actions';
import { ChannelsState } from 'store/channels/types';

export interface ChannelListProps {
  channels: ChannelsState;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  className?: string;
}
