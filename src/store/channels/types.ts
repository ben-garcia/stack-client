export const REQUEST_WORKSPACE_CHANNELS = 'REQUEST_WORKSPACE_CHANNELS';
export const RECEIVED_WORKSPACE_CHANNELS = 'RECEIVED_WORKSPACE_CHANNELS';
export const RECEIVED_WORKSPACE_CHANNELS_ERROR =
  'RECEIVED_WORKSPACE_CHANNELS_ERROR';
// update channels store with the newly created channel
export const ADD_CHANNEL = 'ADD_CHANNEL';

export interface Channel {
  id: number;
  name: string;
  description: string;
  private: boolean;
  topic: string;
  createdAt: string;
  updatedAt: string;
}

export type ChannelsError = string;

export interface ChannelsState {
  list: Channel[];
  error?: ChannelsError;
}

interface RequestWorkspaceChannels {
  type: typeof REQUEST_WORKSPACE_CHANNELS;
}

interface ReceivedWorkspaceChannels {
  type: typeof RECEIVED_WORKSPACE_CHANNELS;
  payload: Channel[];
}

interface ReceivedWorkspaceChannelsError {
  type: typeof RECEIVED_WORKSPACE_CHANNELS_ERROR;
  payload: ChannelsError;
}

interface AddChannel {
  type: typeof ADD_CHANNEL;
  payload: Channel;
}

export type ChannelsActionTypes =
  | RequestWorkspaceChannels
  | ReceivedWorkspaceChannels
  | ReceivedWorkspaceChannelsError
  | AddChannel;
