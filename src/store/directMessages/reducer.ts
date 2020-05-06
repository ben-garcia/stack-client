import {
  DirectMessagesActions,
  DirectMessagesState,
  DirectMessagesActionTypes,
} from './types';

const initialState: DirectMessagesState = { isLoading: false, list: [] };

const DirectMessagesReducer = (
  state: Readonly<DirectMessagesState> = initialState,
  action: DirectMessagesActionTypes
) => {
  switch (action.type) {
    case DirectMessagesActions.ADD_DIRECT_MESSAGE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case DirectMessagesActions.CLEAR_DIRECT_MESSAGES:
      return {
        ...state,
        list: [],
      };
    case DirectMessagesActions.REQUEST_USER_DIRECT_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES:
      return {
        isLoading: false,
        list: [...action.payload],
      };
    case DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES_ERROR:
      return {
        error: action.payload,
        isLoading: false,
        list: [],
      };
    default:
      return state;
  }
};

export default DirectMessagesReducer;
