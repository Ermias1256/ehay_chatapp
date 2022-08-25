import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { getUserChats } from "../app/actions/message";

import { Friend, Messages, NewMessage } from "../components";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

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
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("receive message", () => {
      dispatch(getUserChats(id, page));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);

  newMessageRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="m-2 md:m-4 p-2 h-screen md:p-5 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>

      <div className=" h-4/5 flex flex-col  justify-between p-5">
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
