import React from "react";
import { useSelector } from "react-redux";

import { Message } from ".";

const Messages = ({ id }) => {
  const { chats: userChats, isLoading } = useSelector((state) => state.message);

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
