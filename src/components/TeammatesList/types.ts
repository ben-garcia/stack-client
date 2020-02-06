import getCurrentChannelId from 'store/channel/actions';
import { TeammatesState } from 'store/teammates/types';
import getCurrentTeammateId from 'store/teammate/actions';
import { UserState } from 'store/user/types';

export interface TeammatesListProps {
  currentTeammateId: number;
  className?: string;
  getCurrentChannelIdAction: typeof getCurrentChannelId;
  getCurrentTeammateIdAction: typeof getCurrentTeammateId;
  teammates: TeammatesState;
  user: UserState;
}
