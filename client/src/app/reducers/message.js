import {
  FETCH_FRIENDS,
  START_LOADING,
  END_LOADING,
  FETCH_CHATS,
  NEW_MESSAGE,
} from "../utils/actionTypes";

const messageReducer = (
  state = { messageData: null, friends: [], chats: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_FRIENDS:
      return { ...state, friends: action?.data };
    case FETCH_CHATS:
      return { ...state, chats: action?.data };
    case NEW_MESSAGE:
      return [...state, action?.payload];

    default:
      return state;
  }
};

export default messageReducer;
