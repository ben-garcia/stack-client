import { ChannelActions, ChannelState, ChannelActionTypes } from './types';

const initialState: ChannelState = {
  id: 0,
  name: '',
  topic: '',
  description: '',
};

const ChannelReducer = (
  state: Readonly<ChannelState> = initialState,
  action: ChannelActionTypes
): ChannelState => {
  switch (action.type) {
    case ChannelActions.GET_CURRENT_CHANNEL:
      return {
        ...action.payload,
      };
    case ChannelActions.UPDATE_CHANNEL_TOPIC:
      return {
        ...state,
        topic: action.payload,
      };
    case ChannelActions.UPDATE_CHANNEL_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
};

export default ChannelReducer;
