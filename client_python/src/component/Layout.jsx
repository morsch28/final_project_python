import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Header from "./header/Header";
import Main from "./main/Main";
import { useEffect, useState } from "react";
import SignIn from "../pages/SignIn";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
    </div>
  );
}

export default Layout;
