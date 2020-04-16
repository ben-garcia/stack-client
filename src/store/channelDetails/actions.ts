import { ChannelDetailsActionTypes, ChannelDetailsActions } from './types';

export const openChannelDetails = (): ChannelDetailsActionTypes => ({
  type: ChannelDetailsActions.OPEN_CHANNEL_DETAILS,
});

export const closeChannelDetails = (): ChannelDetailsActionTypes => ({
  type: ChannelDetailsActions.CLOSE_CHANNEL_DETAILS,
});
