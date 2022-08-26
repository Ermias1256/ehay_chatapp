import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
// import { AiOutlineCancel, AiOutlineSearch } from "react-icons/ai";

import { useStateContext } from "../contexts/ContextProvider";
import { Friends } from ".";

import { useDispatch } from "react-redux";
import { getFriends } from "../app/actions/message";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, authToken } =
    useStateContext();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch, activeMenu, authToken]);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center ">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-2 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Chat with...</span>
            </Link>

            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <hr />
          <div className="flex item-center my-2 mx-2">
            <input
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-t-0 border-x-0 border-b-1 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="text"
              placeholder="search friends"
              name="search"
            />
          </div>
          <div className="mt-7 ">
            <Friends />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
