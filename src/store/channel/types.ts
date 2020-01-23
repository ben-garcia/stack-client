export const GET_CURRENT_CHANNEL_ID = 'GET_CURRENT_CHANNEL_ID';

export type ChannelState = number;

interface GetCurrentChannelId {
  type: typeof GET_CURRENT_CHANNEL_ID;
  payload: number;
}

export type ChannelActionTypes = GetCurrentChannelId;
