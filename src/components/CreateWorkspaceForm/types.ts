import { UserState } from 'store/user/types';
import { addWorkspace } from 'store/workspaces/actions';

export interface CreateWorkspaceFormProps {
  userId: UserState['id'] | undefined;
  addWorkspaceAction: typeof addWorkspace;
  createWorkspaceFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
