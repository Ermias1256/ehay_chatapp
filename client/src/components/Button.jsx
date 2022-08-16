import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState, setAuthToken } = useStateContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setAuthToken(null);
  };

  const handleClick = () => {
    if (text === "Logout") {
      logout();
      navigate("/login", { replace: true });
    }
    setIsClicked(initialState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
