import { MessagesActions, MessagesState, MessagesActionTypes } from './types';

const initialState: MessagesState = { list: [] };

const MessagesReducer = (
  state: Readonly<MessagesState> = initialState,
  action: MessagesActionTypes
) => {
  switch (action.type) {
    case MessagesActions.ADD_MESSAGE:
      return {
        list: [...state.list, action.payload],
      };
    case MessagesActions.CLEAR_MESSAGES:
      return {
        list: [],
      };
    case MessagesActions.RECEIVED_CHANNEL_MESSAGES:
      return {
        list: [...action.payload],
      };
    case MessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MessagesReducer;
