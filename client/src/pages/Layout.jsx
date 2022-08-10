import React from "react";
import { Outlet } from "react-router-dom";

import { FiSettings } from "react-icons/fi";

import { Navbar, Sidebar, ThemeSettings } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Layout = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* THEME */}
        {/* display button to select a theme for the app */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            style={{ background: currentColor, borderRadius: "50%" }}
            onClick={() => setThemeSettings(true)}
          >
            <FiSettings />
          </button>
        </div>
        <div>
          {/* if the user clicks the theme settings button - display it */}
          {themeSettings && <ThemeSettings />}
        </div>

        {/* SIDEBAR */}
        {/* if user click to show sidemenu then show else hide */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/* NAVBAR */}
        <div
          className={
            // set the margin left to the width of the sidebar if sidebar is displayed
            activeMenu
              ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
              : "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full flex-2"
          }
        >
          <div className="sticky md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
