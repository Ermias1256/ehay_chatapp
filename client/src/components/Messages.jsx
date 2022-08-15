import React from "react";
import { useSelector } from "react-redux";

import { Message } from ".";
const Messages = ({ lastMessage }) => {
  const { chats: userChats, isLoading } = useSelector((state) => state.message);

  return (
    <div className="max-h-72 overflow-auto md:hover:overflow-auto">
      {userChats?.length > 0 ? (
        <div className="flex flex-col-reverse">
          {userChats?.map((message) => (
            <div key={message._id}>
              <Message message={message} />
            </div>
          ))}
        </div>
      ) : (
        <p>No chats found.</p>
      )}
      {!lastMessage && <div>{lastMessage}</div>}
    </div>
  );
};

export default Messages;
