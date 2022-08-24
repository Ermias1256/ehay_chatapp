import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Message } from ".";

const Messages = ({ id, socket }) => {
  const { chats: userChats, isLoading } = useSelector((state) => state.message);

  if (!userChats.length && !isLoading) return "No chat message";

  if (userChats.length > 0) {
    socket.emit("join room", userChats[0].roomId);
  }

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
