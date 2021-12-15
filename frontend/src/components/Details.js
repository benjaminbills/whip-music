import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/userActions";
import axios from "axios";
function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [success, setSuccess] = useState(false);
  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;
  useEffect(() => {
    if (!user || user.id !== Number(id) || success) {
      dispatch(getUserProfile(id));
    } else {
      setUserDetails(user);
    }
  }, [dispatch, id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/user/premium/${user.id}/`)
      .then((res) => {
        dispatch(getUserProfile(id));
      });
  };
  return (
    <div className="container padding">
      <p>Username: {userDetails.user_name}</p>
      <p>Email: {userDetails.email}</p>
      <p>
        Is Premium:{" "}
        {userDetails.is_premium ? <span>True</span> : <span>False</span>}
      </p>
      <p>
        Paid Until:{" "}
        {userDetails.paid_until ? <span>Paid</span> : <span>Not paid</span>}
      </p>
      <form onSubmit={submitHandler}>
        <button type="submit">Activate Premium</button>
      </form>
    </div>
  );
}

export default Details;
