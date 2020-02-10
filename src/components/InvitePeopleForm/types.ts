import { addTeammate } from 'store/teammates/actions';
import { UserState } from 'store/user/types';

export interface InvitePeopleFormProps {
  addTeammateAction: typeof addTeammate;
  setInvitePeopleFormIsOpen: (state: boolean) => void;
  username: UserState['username'];
}

export interface Username {
  id: number;
  key: number; // used to create a key prop
  visible: boolean; // whether to show the input
}

export interface UsernameValues {
  [key: string]: string;
}
