export enum MembersActions {
  ADD_MEMBERS = 'ADD_MEMBERS',
  CLEAR_CHANNEL_MEMBERS = 'CLEAR_CHANNEL_MEMBERS',
  REQUEST_CHANNEL_MEMBERS = 'REQUEST_CHANNEL_MEMBERS',
  RECEIVED_CHANNEL_MEMBERS = 'RECEIVED_CHANNEL_MEMBERS',
  RECEIVED_CHANNEL_MEMBERS_ERROR = 'RECEIVED_CHANNEL_MEMBERS_ERROR',
}

export interface Member {
  id: number;
  username: string;
  color?: string;
}

export type MembersError = string;

export interface MembersState {
  list: Member[];
  error?: MembersError;
}

interface AddMember {
  type: typeof MembersActions.ADD_MEMBERS;
  payload: Member;
}

interface ClearMembers {
  type: typeof MembersActions.CLEAR_CHANNEL_MEMBERS;
}

interface RequestChannelMembers {
  type: typeof MembersActions.REQUEST_CHANNEL_MEMBERS;
}

interface ReceivedChannelMembers {
  type: typeof MembersActions.RECEIVED_CHANNEL_MEMBERS;
  payload: Member[];
}

interface ReceivedChannelMembersError {
  type: typeof MembersActions.RECEIVED_CHANNEL_MEMBERS_ERROR;
  payload: MembersError;
}

export type MembersActionTypes =
  | AddMember
  | ClearMembers
  | RequestChannelMembers
  | ReceivedChannelMembers
  | ReceivedChannelMembersError;
