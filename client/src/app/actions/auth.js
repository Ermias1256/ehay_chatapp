import { AUTH, START_LOADING, END_LOADING } from "../utils/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate, from) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);

    if (data.result.emailVerified) {
      dispatch({ type: AUTH, data });
      dispatch({ type: END_LOADING });
      navigate(from, { replace: true });
    }
    console.log({ data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signUp(formData);
    dispatch({ type: END_LOADING });
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const verifySignup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.verifySignUp(formData);
    if (data.token) {
      dispatch({ type: AUTH, data });

      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
