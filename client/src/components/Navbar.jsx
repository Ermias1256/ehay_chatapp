import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import decode from "jwt-decode";

import { AiOutlineMenu } from "react-icons/ai";

import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

// import avatar from "../assets/avatar.jpg";
import { Avatar } from ".";
import { Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <div>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </div>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    // authToken,
    // setAuthToken,
    // userName,
    // setUserName,
  } = useStateContext();

  const user = JSON.parse(localStorage.getItem("profile"));
  const authToken = user?.token;
  const userName = user?.result?.name;
  // const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   setAuthToken(user?.token);
  //   setUserName(user?.result?.name);
  //   // JWT ...
  //   if (authToken) {
  //     console.log("expiry check");
  //     const decodedToken = decode(authToken);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       dispatch({ type: "LOGOUT" });
  //       setAuthToken(null);
  //     }
  //   }
  // }, [location]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        {!authToken ? (
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <Link to="login">Login</Link>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <Avatar />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        )}

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
