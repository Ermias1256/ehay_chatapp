import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { getUserChats } from "../app/actions/message";
import { Friend, Messages, NewMessage } from "../components";
import { createMessage } from "../app/actions/message";

const socket = io.connect("http://localhost:5000");

const initialMessage = {
  roomId: "",
  receiverId: "",
  messageText: "",
};

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [newMessage, setNewMessage] = useState(initialMessage);
  const [roomId, setRoomId] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const page = 0;

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    if (roomId) socket.emit("join room", roomId);

    socket.on("chat message", (msg) => {
      setLastMessage(msg);
      dispatch(getUserChats(id, page));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    dispatch(getUserChats(id, page));
  }, [id, page]);

  const handleSubmit = async () => {
    await dispatch(createMessage(newMessage));
    //join room id

    socket.emit("chat message", newMessage);
  };

  const { friends: userFriends } = useSelector((state) => state.message);
  const chatWithFriend = userFriends.find((friend) => friend._id === id);

  return (
    <div className="m-2 md:m-4 p-2 h-screen md:p-5 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>
      <div className=" h-4/5 flex flex-col  justify-between p-5">
        <div className=" overflow-y-auto md:hover:overflow-auto">
          <Messages id={id} setRoomId={setRoomId} />
        </div>
        <div>
          <NewMessage
            roomId={roomId}
            setRoomId={setRoomId}
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
