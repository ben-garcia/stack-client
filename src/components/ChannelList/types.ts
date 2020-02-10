import { getCurrentChannelId, updateChannelTopic } from 'store/channel/actions';
import { ChannelState } from 'store/channel/types';
import { ChannelsState } from 'store/channels/types';
import { requestChannelMembers } from 'store/members/actions';
import getCurrentTeammateId from 'store/teammate/actions';

export interface ChannelListProps {
  currentChannel: ChannelState;
  channels: ChannelsState;
  className?: string;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentTeammateIdAction: typeof getCurrentTeammateId;
  requestChannelMembersAction: typeof requestChannelMembers;
  updateChannelTopicAction: typeof updateChannelTopic;
}
