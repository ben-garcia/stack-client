export interface InvitePeopleFormProps {
  setInvitePeopleFormIsOpen: (state: boolean) => void;
}

export interface Username {
  id: number;
  key: number; // used to create a key prop
  visible: boolean; // whether to show the input
}

export interface UsernameValues {
  [key: string]: string;
}
