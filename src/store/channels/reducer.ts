import { ChannelsActions, ChannelsState, ChannelsActionTypes } from './types';

const initialState: ChannelsState = {
  list: [],
};

const ChannelsReducer = (
  state: Readonly<ChannelsState> = initialState,
  action: ChannelsActionTypes
): ChannelsState => {
  switch (action.type) {
    case ChannelsActions.ADD_CHANNEL:
      return {
        list: [...state.list, action.payload],
      };
    case ChannelsActions.RECEIVED_WORKSPACE_CHANNELS:
      return {
        list: [...action.payload],
      };
    case ChannelsActions.RECEIVED_WORKSPACE_CHANNELS_ERROR:
      return {
        list: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ChannelsReducer;
