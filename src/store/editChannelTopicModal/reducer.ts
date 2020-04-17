import {
  EditChannelTopicModalActions,
  EditChannelTopicModalState,
  EditChannelTopicModalActionTypes,
} from './types';

const initialState: EditChannelTopicModalState = false;

const EditChannelTopicModalReducer = (
  state: Readonly<EditChannelTopicModalState> = initialState,
  action: EditChannelTopicModalActionTypes
): EditChannelTopicModalState => {
  switch (action.type) {
    case EditChannelTopicModalActions.OPEN_EDIT_CHANNEL_TOPIC_MODAL:
      return true;
    case EditChannelTopicModalActions.CLOSE_EDIT_CHANNEL_TOPIC_MODAL:
      return false;
    default:
      return state;
  }
};

export default EditChannelTopicModalReducer;
