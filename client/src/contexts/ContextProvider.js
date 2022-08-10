import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

const initialAuthState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);

  const [authData, setAuthData] = useState(initialAuthState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        isClicked,
        setIsClicked,
        themeSettings,
        setThemeSettings,

        authData,
        setAuthData,

        initialState,
        handleClick,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
