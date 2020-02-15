import {
  GET_CURRENT_CHANNEL,
  UPDATE_CHANNEL_TOPIC,
  ChannelState,
  ChannelActionTypes,
} from './types';

const initialState: ChannelState = {
  id: 0,
  name: '',
  topic: '',
  description: '',
};

const channelReducer = (
  state: Readonly<ChannelState> = initialState,
  action: ChannelActionTypes
): ChannelState => {
  switch (action.type) {
    case GET_CURRENT_CHANNEL:
      return {
        ...action.payload,
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
