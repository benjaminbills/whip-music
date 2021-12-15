import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

function Register() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { error, userInfo: userInfoReg } = userRegister;
  const [message, setMessage] = useState("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmpasswordRef = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let username = usernameRef.current.value;
    let confirmPassword = confirmpasswordRef.current.value;
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(username, email, password));
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmpasswordRef.current.value = "";
      usernameRef.current.value = "";
    }
  };
  useEffect(() => {
    if (userInfo || userInfoReg) {
      history("/");
    }
  }, [userInfo, history, userInfoReg]);
  return (
    <div className="container pt-5">
      <form onSubmit={submitHandler}>
        <h2>Register</h2>
        {error && <p variant="danger">{error}</p>}
        <div className="mb-3">
          <label>Username</label>
          <input type="text" ref={usernameRef} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" ref={emailRef} className="form-control" />
        </div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="mb-3">
          <label>Password</label>
          <input type="password" ref={passwordRef} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            ref={confirmpasswordRef}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-dark mb-3">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
