import {
  EditChannelDescriptionModalActions,
  EditChannelDescrptionModalState,
  EditChannelDescriptionModalActionTypes,
} from './types';

const initialState: EditChannelDescrptionModalState = false;

const EditChannelDescriptionModalReducer = (
  state: Readonly<EditChannelDescrptionModalState> = initialState,
  action: EditChannelDescriptionModalActionTypes
): EditChannelDescrptionModalState => {
  switch (action.type) {
    case EditChannelDescriptionModalActions.OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL:
      return true;
    case EditChannelDescriptionModalActions.CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL:
      return false;
    default:
      return state;
  }
};

export default EditChannelDescriptionModalReducer;
