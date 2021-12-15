import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import { subscription } from "../actions/userActions";
const customStyles = {
  overlay: {
    backgroundColor: "grey",
    opacity: "0.95",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
function Subscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const subscribe = useSelector((state) => state.subscribe);
  const { data, success } = subscribe;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.user_name);
      setEmail(userInfo.email);
    }
    if (success) {
      window.location.href = data;
    }
  }, [userInfo, data, success]);

  const [open, setOpen] = useState(false);

  const closeModalHandler = () => {
    setOpen(false);
  };
  const openModalHandler = () => {
    setOpen(true);
  };
  const subscribeHandler = (e) => {
    e.preventDefault();
    dispatch(subscription(name, email, phone, userInfo.id));
  };
  return (
    <div className="container padding">
      <Modal
        closeTimeoutMS={400}
        style={customStyles}
        isOpen={open}
        onRequestClose={closeModalHandler}
      >
        <form onSubmit={subscribeHandler}>
          <h6>Enter Phone number to checkout with flutterwave</h6>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" readOnly value={name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone number</label>
            <input
              type="text"
              className="form-control"
              placeholder="+25474356011"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="btn btn-dark">Submit</button>
        </form>
      </Modal>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Subscribe to Premium package</h5>
              <p className="card-text">
                Get access to amazing content content.
              </p>
              <h3>@20usd/per month</h3>
              <button onClick={openModalHandler} className="btn btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
