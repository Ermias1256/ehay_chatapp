import {
  FETCH_FRIENDS,
  START_LOADING,
  END_LOADING,
} from "../utils/actionTypes";
import * as api from "../api";

export const getFriends = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getFriends();
    dispatch({ type: FETCH_FRIENDS, data });

    dispatch({ type: END_LOADING });

    return data;
  } catch (error) {
    console.log(error);
  }
};
