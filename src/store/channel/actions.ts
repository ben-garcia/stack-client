import { GET_CURRENT_CHANNEL_ID, ChannelActionTypes } from './types';

const getCurrentChannelId = (id: number): ChannelActionTypes => ({
  type: GET_CURRENT_CHANNEL_ID,
  payload: id,
});

export default getCurrentChannelId;
