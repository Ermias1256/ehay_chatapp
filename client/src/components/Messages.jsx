import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Message } from ".";

const Messages = () => {
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
    </div>
  );
};

export default Messages;
