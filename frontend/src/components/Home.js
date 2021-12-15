import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let history = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    // dispatch({ type: BOOK_COLLECTED_RESET });
  }, [userInfo, history]);
  return (
    <div className="padding container">
      <h2>Welcome</h2>
    </div>
  );
}

export default Home;
