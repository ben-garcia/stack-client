import { ChannelsActions, ChannelsState, ChannelsActionTypes } from './types';

const initialState: ChannelsState = {
  list: [],
  isLoading: false,
};

const ChannelsReducer = (
  state: Readonly<ChannelsState> = initialState,
  action: ChannelsActionTypes
): ChannelsState => {
  switch (action.type) {
    case ChannelsActions.ADD_CHANNEL:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ChannelsActions.REQUEST_WORKSPACE_CHANNELS:
      return {
        ...state,
        isLoading: true,
      };
    case ChannelsActions.RECEIVED_WORKSPACE_CHANNELS:
      return {
        list: [...action.payload],
        isLoading: false,
      };
    case ChannelsActions.RECEIVED_WORKSPACE_CHANNELS_ERROR:
      return {
        list: [],
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default ChannelsReducer;
