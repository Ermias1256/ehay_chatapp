import {
  FETCH_FRIENDS,
  START_LOADING,
  END_LOADING,
  FETCH_CHATS,
  NEW_MESSAGE,
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

export const getUserChats = (id, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getUserChats(id, page);
    console.log({ data });
    dispatch({ type: FETCH_CHATS, data });

    dispatch({ type: END_LOADING });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.newMessage(message);

    dispatch({ type: NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
