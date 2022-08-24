import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { getUserChats } from "../app/actions/message";
import { createMessage } from "../app/actions/message";

import { Friend, Messages, NewMessage } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const page = 0;

  const { friends: userFriends } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getUserChats(id, page));
  }, [dispatch, id, page]);

  const chatWithFriend = userFriends.find((friend) => friend._id === id);

  socket.on("connect", () => {
    setIsConnected(true);
  });

  socket.on("receive message", (msg) => {
    setLastMessage(msg);
    dispatch(getUserChats(id, page));
  });

  socket.on("disconnect", () => {
    setIsConnected(false);
  });

  return (
    <div className="m-2 md:m-4 p-2 h-screen md:p-5 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>

      <div className=" h-4/5 flex flex-col  justify-between p-5">
        <div className=" overflow-y-auto md:hover:overflow-auto">
          <Messages id={id} socket={socket} />
        </div>
        <div>
          <NewMessage receiverId={id} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
