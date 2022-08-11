import React from "react";
import avatar from "../assets/avatar2.jpg";

const Friend = ({ chatWithFriend }) => {
  return (
    <div className="flex gap-4 items-center rounded-xl  mb-10 p-3 bg-slate-200">
      <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
      <h1>{chatWithFriend.name}</h1>
    </div>
  );
};

export default Friend;
