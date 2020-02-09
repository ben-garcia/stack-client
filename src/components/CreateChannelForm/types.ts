import { addChannel } from 'store/channels/actions';
import { WorkspaceState } from 'store/workspace/types';

export interface CreateChannelFormProps {
  createChannelFormIsOpen: (state: boolean) => void;
  currentWorkspaceId: WorkspaceState;
  addChannelAction: typeof addChannel;
}

export interface Channel {
  name: string;
  description: string;
  private: boolean;
}

export interface ChannelErrors {
  name: string;
  description: string;
}
