import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Message } from ".";

const Messages = ({ id }) => {
  const { chats: userChats, isLoading } = useSelector((state) => state.message);
  const [roomId, setRoomId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // get room id
    if (userChats?.length > 0) {
      setRoomId(userChats[0].roomId);
    } else {
      setRoomId(dispatch(createRoom()).roomId);
    }

    //join room id
    socket.emit("join room", roomId);
  }, [roomId]);

  return (
    <div>
      {userChats?.length > 0 ? (
        <div className="flex flex-col-reverse">
          {userChats?.map((message) => (
            <div key={message._id}>
              <Message message={message} id={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
};

export default Messages;
