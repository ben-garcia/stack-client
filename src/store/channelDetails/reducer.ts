import {
  ChannelDetailsActions,
  ChannelDetailsActionTypes,
  ChannelDetailsState,
} from './types';

const initialState: ChannelDetailsState = {
  isOpen: false,
};

const ChannelDetailsReducer = (
  state: Readonly<ChannelDetailsState> = initialState,
  action: ChannelDetailsActionTypes
): ChannelDetailsState => {
  switch (action.type) {
    case ChannelDetailsActions.OPEN_CHANNEL_DETAILS:
      return { isOpen: true, withMembers: false };
    case ChannelDetailsActions.OPEN_CHANNEL_DETAILS_WITH_MEMBERS:
      return { isOpen: true, withMembers: true };
    case ChannelDetailsActions.CLOSE_CHANNEL_DETAILS:
      return { isOpen: false };
    default:
      return state;
  }
};

export default ChannelDetailsReducer;
