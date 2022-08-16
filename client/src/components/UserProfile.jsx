import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";

import { useStateContext } from "../contexts/ContextProvider";

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-12 bg-light-gray dark:bg-[#42464D] p-4 rounded-lg w-82">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="50%"
        />
      </div>

      <div>{/* TODO - user profile display */}</div>
      <div className="mt-2">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          size="sm"
        />
      </div>
    </div>
  );
};

export default UserProfile;
