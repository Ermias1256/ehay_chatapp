import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../assets/avatar2.jpg";

const Friends = () => {
  const { friends: userFriends } = useSelector((state) => state.message);
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  console.log({ userFriends });
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div>
      {userFriends ? (
        userFriends?.map((friend) => (
          <NavLink
            to={`/${friend._id}`}
            key={friend._id}
            onClick={handleCloseSideBar}
            style={({ isActive }) => ({
              backgroundColor: isActive ? currentColor : "",
            })}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <span className="capitalize ">{friend.name}</span>
          </NavLink>
        ))
      ) : (
        <h5>No friends yet.</h5>
      )}
    </div>
  );
};

export default Friends;
