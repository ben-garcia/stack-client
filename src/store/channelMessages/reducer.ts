import {
  ChannelMessagesActions,
  ChannelMessagesState,
  ChannelMessagesActionTypes,
} from './types';

const initialState: ChannelMessagesState = { list: [], isLoading: false };

const MessagesReducer = (
  state: Readonly<ChannelMessagesState> = initialState,
  action: ChannelMessagesActionTypes
) => {
  switch (action.type) {
    case ChannelMessagesActions.ADD_CHANNEL_MESSAGE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ChannelMessagesActions.CLEAR_CHANNEL_MESSAGES:
      return {
        ...state,
        list: [],
      };
    case ChannelMessagesActions.REQUEST_CHANNEL_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES:
      return {
        list: [...action.payload],
        isLoading: false,
      };
    case ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR:
      return {
        list: [],
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default MessagesReducer;
