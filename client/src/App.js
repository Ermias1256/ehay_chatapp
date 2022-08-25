import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import PrivateRoutes from "./app/utils/PrivateRoutes";

import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { authToken, setAuthToken, setUserName } = useStateContext();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setAuthToken(null);
  };

  useEffect(() => {
    setAuthToken(user?.token);
    setUserName(user?.result?.name);
    // JWT ...
    if (authToken) {
      console.log("expiry check");
      const decodedToken = decode(authToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PrivateRoutes />}>
              <Route path=":id" element={<Chat />} />
            </Route>

            <Route
              path="login"
              exact
              element={!authToken ? <Login /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
