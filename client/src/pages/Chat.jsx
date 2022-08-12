import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserChats } from "../app/actions/message";

import { Friend, Messages, NewMessage } from "../components";

const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const page = 0;

  useEffect(() => {
    dispatch(getUserChats(id, page));
  }, [id, page]);

  const { friends: userFriends } = useSelector((state) => state.message);
  const chatWithFriend = userFriends.find((friend) => friend._id === id);

  return (
    <div className="m-2 md:m-10 p-2 h-screen md:p-10 bg-white rounded-3xl">
      <div>{chatWithFriend && <Friend chatWithFriend={chatWithFriend} />}</div>
      <div className="flex flex-col h-3/5  justify-between ...">
        <div>
          <Messages />
        </div>
        <div>
          <NewMessage receiverId={id} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
