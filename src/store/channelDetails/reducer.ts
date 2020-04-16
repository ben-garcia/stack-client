import {
  ChannelDetailsActions,
  ChannelDetailsActionTypes,
  ChannelDetailsState,
} from './types';

const initialState: ChannelDetailsState = false;

const ChannelDetailsReducer = (
  state: Readonly<ChannelDetailsState> = initialState,
  action: ChannelDetailsActionTypes
): ChannelDetailsState => {
  switch (action.type) {
    case ChannelDetailsActions.OPEN_CHANNEL_DETAILS:
      return true;
    case ChannelDetailsActions.CLOSE_CHANNEL_DETAILS:
      return false;
    default:
      return state;
  }
};

export default ChannelDetailsReducer;
