export enum ChannelDetailsActions {
  OPEN_CHANNEL_DETAILS = 'OPEN_CHANNEL_DETAILS',
  CLOSE_CHANNEL_DETAILS = 'CLOSE_CHANNEL_DETAILS',
}

export type ChannelDetailsState = boolean;

interface OpenChannelDetails {
  type: typeof ChannelDetailsActions.OPEN_CHANNEL_DETAILS;
}

interface CloseChannelDetails {
  type: typeof ChannelDetailsActions.CLOSE_CHANNEL_DETAILS;
}

export type ChannelDetailsActionTypes =
  | OpenChannelDetails
  | CloseChannelDetails;
