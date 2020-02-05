import getCurrentChannelId from 'store/channel/actions';
import { ChannelsState } from 'store/channels/types';
import getCurrentTeammateId from 'store/teammate/actions';

export interface ChannelListProps {
  currentChannelId: number;
  channels: ChannelsState;
  className?: string;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentTeammateIdAction: typeof getCurrentTeammateId;
}
