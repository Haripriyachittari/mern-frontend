import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="header">
      <div>
        <h1 className="mainlogo">G</h1>
      </div>
      <div className="logo">
        <Link to="/">
          <h2>GOALSETTER</h2>
        </Link>
      </div>
      <div>
        {" "}
        {user && (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
