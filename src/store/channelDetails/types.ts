export enum ChannelDetailsActions {
  OPEN_CHANNEL_DETAILS = 'OPEN_CHANNEL_DETAILS',
  OPEN_CHANNEL_DETAILS_WITH_MEMBERS = 'OPEN_CHANNEL_DETAILS_WITH_MEMBERS',
  CLOSE_CHANNEL_DETAILS = 'CLOSE_CHANNEL_DETAILS',
}

export interface ChannelDetailsState {
  isOpen: boolean;
  withMembers?: boolean;
}

interface OpenChannelDetails {
  type: typeof ChannelDetailsActions.OPEN_CHANNEL_DETAILS;
}

interface OpenChannelDetailsWithMembers {
  type: typeof ChannelDetailsActions.OPEN_CHANNEL_DETAILS_WITH_MEMBERS;
}

interface CloseChannelDetails {
  type: typeof ChannelDetailsActions.CLOSE_CHANNEL_DETAILS;
}

export type ChannelDetailsActionTypes =
  | OpenChannelDetails
  | OpenChannelDetailsWithMembers
  | CloseChannelDetails;
