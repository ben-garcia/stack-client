export enum EditChannelTopicModalActions {
  OPEN_EDIT_CHANNEL_TOPIC_MODAL = 'OPEN_EDIT_CHANNEL_TOPIC_MODAL',
  CLOSE_EDIT_CHANNEL_TOPIC_MODAL = 'CLOSE_EDIT_CHANNEL_TOPIC_MODAL',
}

export type EditChannelTopicModalState = boolean;

interface OpenEditChannelTopicModal {
  type: typeof EditChannelTopicModalActions.OPEN_EDIT_CHANNEL_TOPIC_MODAL;
}

interface CloseEditChannelTopicModal {
  type: typeof EditChannelTopicModalActions.CLOSE_EDIT_CHANNEL_TOPIC_MODAL;
}

export type EditChannelTopicModalActionTypes =
  | OpenEditChannelTopicModal
  | CloseEditChannelTopicModal;
