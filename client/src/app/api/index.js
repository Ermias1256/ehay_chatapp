import axios from "axios";
import {
  REACT_APP_ENDPOINT_BASE_URL_LOCAL,
  REACT_APP_ENDPOINT_BASE_URL,
  REACT_APP_LOCAL,
} from "../utils/constants";

const ENDPOINT_BASE_URL = REACT_APP_LOCAL
  ? REACT_APP_ENDPOINT_BASE_URL_LOCAL
  : REACT_APP_ENDPOINT_BASE_URL;

const API = axios.create({ baseURL: ENDPOINT_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// Authentications
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const verifySignUp = (formData) =>
  API.post("/user/verifySignup", formData);

// Messages

export const newRoom = () => API.post("/room/new");

export const getFriends = () => API.get("/message/getfriends");
export const getUserChats = (id, page) =>
  API.get(`/message/userchats?chatWithId=${id}&p=${page}`);

export const newMessage = (formData) => API.post("/message/new", formData);
