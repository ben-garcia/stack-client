import {
  GET_CURRENT_CHANNEL_ID,
  UPDATE_CHANNEL_TOPIC,
  ChannelState,
  ChannelActionTypes,
} from './types';

const initialState: ChannelState = {
  id: 0,
  topic: '',
};

const channelReducer = (
  state: Readonly<ChannelState> = initialState,
  action: ChannelActionTypes
) => {
  switch (action.type) {
    case GET_CURRENT_CHANNEL_ID:
      return {
        ...state,
        id: action.payload,
      };
    case UPDATE_CHANNEL_TOPIC:
      return {
        ...state,
        topic: action.payload,
      };
    default:
      return state;
  }
};

export default channelReducer;
