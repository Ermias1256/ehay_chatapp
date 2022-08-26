import React from "react";
// import avatar from "../assets/avatar2.jpg";
import { Avatar } from ".";

const Friend = ({ chatWithFriend }) => {
  return (
    <div className="flex gap-4 items-center rounded-xl  mb-10 p-3 bg-slate-200">
      <Avatar />
      <h1>{chatWithFriend.name}</h1>
    </div>
  );
};

export default Friend;
