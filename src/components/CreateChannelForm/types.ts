import { addChannel } from 'store/channels/actions';
import { WorkspaceState } from 'store/workspace/types';
import { UserState } from 'store/user/types';

export interface CreateChannelFormProps {
  addChannelAction: typeof addChannel;
  createChannelFormIsOpen: (state: boolean) => void;
  currentWorkspaceId: WorkspaceState;
  user: UserState;
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
