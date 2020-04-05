import {
  DirectMessagesActions,
  DirectMessagesState,
  DirectMessagesActionTypes,
} from './types';

const initialState: DirectMessagesState = { list: [] };

const DirectMessagesReducer = (
  state: Readonly<DirectMessagesState> = initialState,
  action: DirectMessagesActionTypes
) => {
  switch (action.type) {
    case DirectMessagesActions.ADD_DIRECT_MESSAGE:
      return {
        list: [...state.list, action.payload],
      };
    case DirectMessagesActions.CLEAR_DIRECT_MESSAGES:
      return {
        list: [],
      };
    case DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES:
      return {
        list: [...action.payload],
      };
    case DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES_ERROR:
      return {
        list: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DirectMessagesReducer;
