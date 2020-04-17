export enum EditChannelDescriptionModalActions {
  OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL = 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL',
  CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL = 'CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL',
}

export type EditChannelDescrptionModalState = boolean;

interface OpenEditChannelDescriptionModal {
  type: typeof EditChannelDescriptionModalActions.OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL;
}

interface CloseEditChannelDescriptionModal {
  type: typeof EditChannelDescriptionModalActions.CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL;
}

export type EditChannelDescriptionModalActionTypes =
  | OpenEditChannelDescriptionModal
  | CloseEditChannelDescriptionModal;
