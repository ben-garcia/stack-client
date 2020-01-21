import { UserState } from 'store/user/types';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { addWorkspace } from 'store/workspaces/actions';

export interface CreateWorkspaceFormProps {
  userId: UserState['id'] | undefined;
  addWorkspaceAction: typeof addWorkspace;
  getCurrentWorkspaceIdAction: typeof getCurrentWorkspaceId;
  createWorkspaceFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
