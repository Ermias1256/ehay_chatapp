import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { getUserChats } from "../app/actions/message";
import { Friend, Messages, NewMessage } from "../components";
import { createMessage } from "../app/actions/message";

const socket = io.connect("http://localhost:5000");

const initialMessage = {
  receiverId: "",
  messageText: "",
};

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [newMessage, setNewMessage] = useState(initialMessage);

  const dispatch = useDispatch();
  const { id } = useParams();
  const page = 0;

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("chat message", (msg) => {
      setLastPong(msg);
    });
  }, []);

  useEffect(() => {
    dispatch(getUserChats(id, page));
  }, [id, page]);

  const handleSubmit = async () => {
    await dispatch(createMessage(newMessage));
    socket.emit("chat message", newMessage.messageText);
  };

  const { friends: userFriends } = useSelector((state) => state.message);
  const chatWithFriend = userFriends.find((friend) => friend._id === id);

  return (
    <div className="m-2 md:m-10 p-2 h-screen md:p-10 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>
      <div className="flex flex-col h-3/5  justify-between ...">
        <div>
          <p>Connected: {"" + isConnected}</p>
          <p>Last pong: {lastPong || "-"}</p>
          <Messages />
        </div>
        <div>
          <NewMessage
            receiverId={id}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
