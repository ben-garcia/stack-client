import { UserState } from 'store/user/types';

export interface CreateWorkspaceFormProps {
  userId: UserState['id'] | undefined;
}
