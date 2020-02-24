import {
  ChannelsActions,
  ChannelsError,
  Channel,
  ChannelsActionTypes,
} from './types';

export const requestWorkspaceChannels = (): ChannelsActionTypes => ({
  type: ChannelsActions.REQUEST_WORKSPACE_CHANNELS,
});

export const receivedWorkspaceChannels = (
  channels: Channel[]
): ChannelsActionTypes => ({
  type: ChannelsActions.RECEIVED_WORKSPACE_CHANNELS,
  payload: channels,
});

export const receivedWorkspaceChannelsError = (
  error: ChannelsError
): ChannelsActionTypes => ({
  type: ChannelsActions.RECEIVED_WORKSPACE_CHANNELS_ERROR,
  payload: error,
});

export const addChannel = (channel: Channel): ChannelsActionTypes => ({
  type: ChannelsActions.ADD_CHANNEL,
  payload: channel,
});
