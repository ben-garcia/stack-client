import {
  EditChannelTopicModalActions,
  EditChannelTopicModalActionTypes,
} from './types';

export const openEditChannelTopicModal = (): EditChannelTopicModalActionTypes => ({
  type: EditChannelTopicModalActions.OPEN_EDIT_CHANNEL_TOPIC_MODAL,
});

export const closeEditChannelTopicModal = (): EditChannelTopicModalActionTypes => ({
  type: EditChannelTopicModalActions.CLOSE_EDIT_CHANNEL_TOPIC_MODAL,
});
