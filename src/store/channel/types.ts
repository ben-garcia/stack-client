import { Channel } from 'store/channels/types';

export enum ChannelActions {
  GET_CURRENT_CHANNEL = 'GET_CURRENT_CHANNEL',
  UPDATE_CHANNEL_TOPIC = 'UPDATE_CHANNEL_TOPIC',
  UPDATE_CHANNEL_DESCRIPTION = 'UPDATE_CHANNEL_DESCRIPTION',
}

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
  type: typeof ChannelActions.GET_CURRENT_CHANNEL;
  payload: Channel;
}

interface UpdateChannelTopic {
  type: typeof ChannelActions.UPDATE_CHANNEL_TOPIC;
  payload: string;
}

interface UpdateChannelDescription {
  type: typeof ChannelActions.UPDATE_CHANNEL_DESCRIPTION;
  payload: string;
}

export type ChannelActionTypes =
  | GetCurrentChannel
  | UpdateChannelTopic
  | UpdateChannelDescription;
