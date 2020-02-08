export const GET_CURRENT_CHANNEL_ID = 'GET_CURRENT_CHANNEL_ID';
export const UPDATE_CHANNEL_TOPIC = 'UPDATE_CHANNEL_TOPIC';

export interface ChannelState {
  id: number;
  topic: string;
}

interface GetCurrentChannelId {
  type: typeof GET_CURRENT_CHANNEL_ID;
  payload: number;
}

interface UpdateChannelTopic {
  type: typeof UPDATE_CHANNEL_TOPIC;
  payload: string;
}

export type ChannelActionTypes = GetCurrentChannelId | UpdateChannelTopic;
