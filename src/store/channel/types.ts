import { Channel } from 'store/channels/types';

export const GET_CURRENT_CHANNEL = 'GET_CURRENT_CHANNEL';
export const UPDATE_CHANNEL_TOPIC = 'UPDATE_CHANNEL_TOPIC';
export const UPDATE_CHANNEL_DESCRIPTION = 'UPDATE_CHANNEL_DESCRIPTION';

export interface ChannelState {
  id: number;
  name?: string;
  description?: string;
  topic?: string;
  private?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface GetCurrentChannel {
  type: typeof GET_CURRENT_CHANNEL;
  payload: Channel;
}

interface UpdateChannelTopic {
  type: typeof UPDATE_CHANNEL_TOPIC;
  payload: string;
}

interface UpdateChannelDescription {
  type: typeof UPDATE_CHANNEL_DESCRIPTION;
  payload: string;
}

export type ChannelActionTypes =
  | GetCurrentChannel
  | UpdateChannelTopic
  | UpdateChannelDescription;
