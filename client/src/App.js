import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Login";
import Layout from "./pages/Layout";

import PrivateRoutes from "./app/utils/PrivateRoutes";

import "./App.css";
import Chat from "./pages/Chat";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const authToken = user?.token;

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
