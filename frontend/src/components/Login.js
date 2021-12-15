import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  let history = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    dispatch(login(email, password));
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  return (
    <div className="container pt-5">
      <form onSubmit={submitHandler}>
        {error && <p>{error}</p>}
        <h2>Sign In</h2>
        <p>Use this credentials to get full access</p>
        <p>Email: admin@admin.com</p>
        <p>Password: Passadmin1</p>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" ref={emailRef} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" ref={passwordRef} className="form-control" />
        </div>

        <button type="submit" className="btn btn-dark mb-3">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
