import {
  GET_CURRENT_CHANNEL_ID,
  UPDATE_CHANNEL_TOPIC,
  ChannelActionTypes,
} from './types';

export const getCurrentChannelId = (id: number): ChannelActionTypes => ({
  type: GET_CURRENT_CHANNEL_ID,
  payload: id,
});

export const updateChannelTopic = (topic: string): ChannelActionTypes => ({
  type: UPDATE_CHANNEL_TOPIC,
  payload: topic,
});
