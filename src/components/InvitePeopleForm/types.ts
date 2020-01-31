import { UserState } from 'store/user/types';

export interface InvitePeopleFormProps {
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
