import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { getUserChats } from "../app/actions/message";

import { Friend, Messages, NewMessage } from "../components";
import {
  REACT_APP_ENDPOINT_BASE_URL_LOCAL,
  REACT_APP_ENDPOINT_BASE_URL,
  REACT_APP_LOCAL,
} from "../app/utils/constants";

const ENDPOINT_BASE_URL = REACT_APP_LOCAL
  ? REACT_APP_ENDPOINT_BASE_URL_LOCAL
  : REACT_APP_ENDPOINT_BASE_URL;

const socket = io.connect(ENDPOINT_BASE_URL);

const Chat = () => {
  const newMessageRef = useRef();

  const dispatch = useDispatch();

  const { id } = useParams();
  const page = 0;

  const { friends: userFriends } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getUserChats(id, page));
  }, [dispatch, id, page]);

  const chatWithFriend = userFriends.find((friend) => friend._id === id);

  useEffect(() => {
    socket.on("receive message", () => {
      dispatch(getUserChats(id, page));
    });
  }, [dispatch, id, page]);

  newMessageRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="m-2 md:m-4 p-2 h-screen md:p-5 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>

      <div className=" h-4/5 flex flex-col gap-3  justify-between p-5">
        <div className=" overflow-y-auto md:hover:overflow-auto">
          <Messages id={id} />
          <div ref={newMessageRef} />
        </div>
        <div>
          <NewMessage receiverId={id} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
