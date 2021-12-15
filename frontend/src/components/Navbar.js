import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
function Navbar() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-md-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          WMA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            {!userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
            )}
            {!userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
            )}
            {userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="subscription">
                  Subscribe
                </Link>
              </li>
            )}
            {userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="users">
                  Users
                </Link>
              </li>
            )}
            {userInfo && <button onClick={logoutHandler}>Logout</button>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
