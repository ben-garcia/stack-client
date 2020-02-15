import { Channel } from 'store/channels/types';

import {
  GET_CURRENT_CHANNEL,
  UPDATE_CHANNEL_TOPIC,
  ChannelActionTypes,
} from './types';

export const getCurrentChannel = (channel: Channel): ChannelActionTypes => ({
  type: GET_CURRENT_CHANNEL,
  payload: channel,
});

export const updateChannelTopic = (topic: string): ChannelActionTypes => ({
  type: UPDATE_CHANNEL_TOPIC,
  payload: topic,
});
