import { NEW_ROOM } from "../utils/actionTypes";
import * as api from "../api";

export const createRoom = () => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.newRoom();
    return data;
    // dispatch({ type: NEW_ROOM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
