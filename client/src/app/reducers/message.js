import {
  FETCH_FRIENDS,
  START_LOADING,
  END_LOADING,
} from "../utils/actionTypes";

const messageReducer = (
  state = { messageData: null, friends: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_FRIENDS:
      return { ...state, friends: action?.data };

    default:
      return state;
  }
};

export default messageReducer;
