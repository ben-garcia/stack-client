import { MessagesActions, MessagesState, MessagesActionTypes } from './types';

const initialState: MessagesState = { list: [], isLoading: false };

const MessagesReducer = (
  state: Readonly<MessagesState> = initialState,
  action: MessagesActionTypes
) => {
  switch (action.type) {
    case MessagesActions.ADD_MESSAGE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case MessagesActions.CLEAR_MESSAGES:
      return {
        ...state,
        list: [],
      };
    case MessagesActions.REQUEST_CHANNEL_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case MessagesActions.RECEIVED_CHANNEL_MESSAGES:
      return {
        list: [...action.payload],
        isLoading: false,
      };
    case MessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR:
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
