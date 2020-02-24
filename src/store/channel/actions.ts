import { Channel } from 'store/channels';

import { ChannelActions, ChannelActionTypes } from './types';

export const getCurrentChannel = (channel: Channel): ChannelActionTypes => ({
  type: ChannelActions.GET_CURRENT_CHANNEL,
  payload: channel,
});

export const updateChannelTopic = (topic: string): ChannelActionTypes => ({
  type: ChannelActions.UPDATE_CHANNEL_TOPIC,
  payload: topic,
});

export const updateChannelDescription = (
  description: string
): ChannelActionTypes => ({
  type: ChannelActions.UPDATE_CHANNEL_DESCRIPTION,
  payload: description,
});
