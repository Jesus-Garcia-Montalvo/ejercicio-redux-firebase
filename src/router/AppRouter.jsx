import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivatedRoutes from "./PrivatedRoutes";
import Register from "../pages/Register/Register";
import Login from "../pages/login/Login";
import LoginWithPhone from "../pages/loginWithPhone/loginWithPhone";
import Home from "../pages/home/home";
import { useSelector } from "react-redux";

function AppRouter() {
  const { isAuthenticate } = useSelector((store) => store.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<PublicRoutes isAuthenticate={isAuthenticate} />}>
            <Route path="Register" element={<Register />} />
            <Route path="Login" element={<Login />} />
            <Route path="LoginWithPhone" element={<LoginWithPhone />} />
          </Route>
          <Route element={<PrivatedRoutes isAuthenticate={isAuthenticate} />}>
            <Route path="Home" element={<Home />} />
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
