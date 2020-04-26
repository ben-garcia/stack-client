import {
  MembersActions,
  MembersError,
  Member,
  MembersActionTypes,
} from './types';

export const addMember = (member: Member): MembersActionTypes => ({
  type: MembersActions.ADD_MEMBER,
  payload: member,
});

export const clearMembers = (): MembersActionTypes => ({
  type: MembersActions.CLEAR_CHANNEL_MEMBERS,
});

export const receivedChannelMembers = (
  members: Member[]
): MembersActionTypes => ({
  type: MembersActions.RECEIVED_CHANNEL_MEMBERS,
  payload: members,
});

export const receivedChannelMembersError = (
  error: MembersError
): MembersActionTypes => ({
  type: MembersActions.RECEIVED_CHANNEL_MEMBERS_ERROR,
  payload: error,
});

export const requestChannelMembers = (): MembersActionTypes => ({
  type: MembersActions.REQUEST_CHANNEL_MEMBERS,
});
