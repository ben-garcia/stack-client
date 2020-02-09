import {
  REQUEST_CHANNEL_MEMBERS,
  RECEIVED_CHANNEL_MEMBERS,
  RECEIVED_CHANNEL_MEMBERS_ERROR,
  MembersError,
  Member,
  MembersActionTypes,
} from './types';

export const requestChannelMembers = (): MembersActionTypes => ({
  type: REQUEST_CHANNEL_MEMBERS,
});

export const receivedChannelMembers = (
  members: Member[]
): MembersActionTypes => ({
  type: RECEIVED_CHANNEL_MEMBERS,
  payload: members,
});

export const receivedChannelMembersError = (error: MembersError) => ({
  type: RECEIVED_CHANNEL_MEMBERS_ERROR,
  payload: error,
});
