import {
  GET_CURRENT_CHANNEL_ID,
  ChannelState,
  ChannelActionTypes,
} from './types';

const initialState: ChannelState = 0;

const ChannelReducer = (
  state: ChannelState = initialState,
  action: ChannelActionTypes
) => {
  switch (action.type) {
    case GET_CURRENT_CHANNEL_ID:
      return action.payload;
    default:
      return state;
  }
};

export default ChannelReducer;
