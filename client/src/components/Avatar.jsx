import React from "react";

const Avatar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userName = user?.result?.name;
  let userInitials = "";
  if (userName) {
    if (userName.includes(" ")) {
      let names = userName.split(" ");
      userInitials = `${names[0].slice(0, 1)}${names[1].slice(0, 1)}`;
    } else {
      userInitials = userName.slice(0, 1);
    }
  }

  return (
    <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-indigo-500 rounded-full">
      {userInitials}
    </div>
  );
};

export default Avatar;
