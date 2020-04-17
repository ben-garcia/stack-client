import {
  EditChannelDescriptionModalActions,
  EditChannelDescriptionModalActionTypes,
} from './types';

export const openEditChannelDescriptionModal = (): EditChannelDescriptionModalActionTypes => ({
  type: EditChannelDescriptionModalActions.OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL,
});

export const closeEditChannelDescriptionModal = (): EditChannelDescriptionModalActionTypes => ({
  type: EditChannelDescriptionModalActions.CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL,
});
