import {
  RECEIVED_WORKSPACE_CHANNELS,
  RECEIVED_WORKSPACE_CHANNELS_ERROR,
  ADD_CHANNEL,
  ChannelsState,
  ChannelsActionTypes,
} from './types';

const initialState: ChannelsState = {
  list: [],
};

const ChannelsReducer = (
  state: Readonly<ChannelsState> = initialState,
  action: ChannelsActionTypes
): ChannelsState => {
  switch (action.type) {
    case RECEIVED_WORKSPACE_CHANNELS:
      return {
        list: [...action.payload],
      };
    case RECEIVED_WORKSPACE_CHANNELS_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    case ADD_CHANNEL:
      return {
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

export default ChannelsReducer;
