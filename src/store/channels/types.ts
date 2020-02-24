export enum ChannelsActions {
  ADD_CHANNEL = 'ADD_CHANNEL',
  REQUEST_WORKSPACE_CHANNELS = 'REQUEST_WORKSPACE_CHANNELS',
  RECEIVED_WORKSPACE_CHANNELS = 'RECEIVED_WORKSPACE_CHANNELS',
  RECEIVED_WORKSPACE_CHANNELS_ERROR = 'RECEIVED_WORKSPACE_CHANNELS_ERROR',
}

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
  type: typeof ChannelsActions.REQUEST_WORKSPACE_CHANNELS;
}

interface ReceivedWorkspaceChannels {
  type: typeof ChannelsActions.RECEIVED_WORKSPACE_CHANNELS;
  payload: Channel[];
}

interface ReceivedWorkspaceChannelsError {
  type: typeof ChannelsActions.RECEIVED_WORKSPACE_CHANNELS_ERROR;
  payload: ChannelsError;
}

interface AddChannel {
  type: typeof ChannelsActions.ADD_CHANNEL;
  payload: Channel;
}

export type ChannelsActionTypes =
  | RequestWorkspaceChannels
  | ReceivedWorkspaceChannels
  | ReceivedWorkspaceChannelsError
  | AddChannel;
