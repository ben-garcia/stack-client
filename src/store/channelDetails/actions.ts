import { ChannelDetailsActionTypes, ChannelDetailsActions } from './types';

export const openChannelDetails = (): ChannelDetailsActionTypes => ({
  type: ChannelDetailsActions.OPEN_CHANNEL_DETAILS,
});

export const openChannelDetailsWithMembers = (): ChannelDetailsActionTypes => ({
  type: ChannelDetailsActions.OPEN_CHANNEL_DETAILS_WITH_MEMBERS,
});

export const closeChannelDetails = (): ChannelDetailsActionTypes => ({
  type: ChannelDetailsActions.CLOSE_CHANNEL_DETAILS,
});
