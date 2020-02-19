import {
  ADD_MEMBER,
  REQUEST_CHANNEL_MEMBERS,
  RECEIVED_CHANNEL_MEMBERS,
  RECEIVED_CHANNEL_MEMBERS_ERROR,
  MembersError,
  Member,
  MembersActionTypes,
} from './types';

export const addMember = (member: Member): MembersActionTypes => ({
  type: ADD_MEMBER,
  payload: member,
});

export const receivedChannelMembers = (
  members: Member[]
): MembersActionTypes => ({
  type: RECEIVED_CHANNEL_MEMBERS,
  payload: members,
});

export const receivedChannelMembersError = (
  error: MembersError
): MembersActionTypes => ({
  type: RECEIVED_CHANNEL_MEMBERS_ERROR,
  payload: error,
});

export const requestChannelMembers = (): MembersActionTypes => ({
  type: REQUEST_CHANNEL_MEMBERS,
});
