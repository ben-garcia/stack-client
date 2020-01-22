import { addChannel } from 'store/channels/actions';
import { WorkspaceState } from 'store/workspace/types';

export interface CreateChannelFormProps {
  currentWorkspaceId: WorkspaceState;
  addChannelAction: typeof addChannel;
}

export interface Channel {
  name: string;
  description: string;
  public: boolean;
}

export interface ChannelErrors {
  name: string;
  description: string;
}
