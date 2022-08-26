import React from "react";
// import avatar from "../assets/avatar.jpg";
const Message = ({ message, id }) => {
  const own =
    message?.creator === id ? " ml-2 text-gray-900 bg-gray-300" : " ml-0";

  return (
    <div className={`mb-3 gap-3 p-3 flex items-center `}>
      <div className="inline-flex items-center justify-center w-8 h-8 text-xl text-white bg-indigo-500 rounded-full">
        EB
      </div>
      {/* <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" /> */}
      <p className={`p-1 rounded-lg bg-blue-400 text-white max-w-sm ${own}`}>
        {message.messageText}
      </p>
    </div>
  );
};

export default Message;
