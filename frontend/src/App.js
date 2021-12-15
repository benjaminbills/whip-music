import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Subscription from "./components/Subscription";
import PaymentSuccess from "./components/PaymentSuccess";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Details from "./components/Details";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="login" element={<Login />} exact />
          <Route path="register" element={<Register />} exact />
          <Route path="subscription" element={<Subscription />} exact />
          <Route path="payment-successful" element={<PaymentSuccess />} exact />
          <Route path="users" element={<Users />} exact />
          <Route path="users/:id" element={<Details />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
