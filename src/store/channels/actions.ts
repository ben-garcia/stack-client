import {
  REQUEST_WORKSPACE_CHANNELS,
  RECEIVED_WORKSPACE_CHANNELS,
  RECEIVED_WORKSPACE_CHANNELS_ERROR,
  ADD_CHANNEL,
  ChannelsError,
  Channel,
  ChannelsActionTypes,
} from './types';

export const requestWorkspaceChannels = (): ChannelsActionTypes => ({
  type: REQUEST_WORKSPACE_CHANNELS,
});

export const receivedWorkspaceChannels = (
  channels: Channel[]
): ChannelsActionTypes => ({
  type: RECEIVED_WORKSPACE_CHANNELS,
  payload: channels,
});

export const receivedWorkspaceChannelsError = (
  error: ChannelsError
): ChannelsActionTypes => ({
  type: RECEIVED_WORKSPACE_CHANNELS_ERROR,
  payload: error,
});

export const addChannel = (channel: Channel): ChannelsActionTypes => ({
  type: ADD_CHANNEL,
  payload: channel,
});
