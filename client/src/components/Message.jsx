import React from "react";
import avatar from "../assets/avatar.jpg";
const Message = ({ message }) => {
  return (
    <div className="mb-3 gap-3 flex items-center">
      <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
      <p className="p-1 rounded-lg bg-blue-400 text-white">
        {message.messageText}
      </p>
    </div>
  );
};

export default Message;
